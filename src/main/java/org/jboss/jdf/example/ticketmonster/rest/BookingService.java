package org.jboss.jdf.example.ticketmonster.rest;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.ejb.Stateful;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.jboss.jdf.example.ticketmonster.model.Booking;
import org.jboss.jdf.example.ticketmonster.model.Performance;
import org.jboss.jdf.example.ticketmonster.model.Seat;
import org.jboss.jdf.example.ticketmonster.model.Section;
import org.jboss.jdf.example.ticketmonster.model.Ticket;
import org.jboss.jdf.example.ticketmonster.model.TicketCategory;
import org.jboss.jdf.example.ticketmonster.model.TicketPriceCategory;
import org.jboss.jdf.example.ticketmonster.service.SeatAllocationService;

/**
 * JAX-RS endpoint that handles bookings
 * 
 * @author Marius Bogoevici
 * @author Pete Muir
 */
@Path("/bookings")
@Stateful
@RequestScoped
public class BookingService extends BaseEntityService<Booking> {

    @Inject
    SeatAllocationService seatAllocationService;

    public BookingService() {
        super(Booking.class);
    }

    @DELETE
    @Path("/{id:[0-9][0-9]*}")
    public Response deleteBooking(@PathParam("id") Long id) {
        Booking booking = getEntityManager().find(Booking.class, id);
        if (booking == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        getEntityManager().remove(booking);
        return Response.ok().build();
    }

    @SuppressWarnings("unchecked")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createBooking(BookingRequest bookingRequest) {
        try {

            // First, validate the posted data
            // There will be more validation when persistence occurs
            Set<Long> priceCategoryIds = new HashSet<Long>();
            for (TicketRequest ticketRequest : bookingRequest.getTicketRequests()) {
                if (priceCategoryIds.contains(ticketRequest.getPriceCategory())) {
                    throw new RuntimeException("Duplicate price category id");
                }
                priceCategoryIds.add(ticketRequest.getPriceCategory());
            }

            // First, load the entities that make up this booking's relationships
            Performance performance = getEntityManager().find(Performance.class, bookingRequest.getPerformance());

            // As we can have a mix of ticket types in a booking, we need to load all of them that are relevant, and map them by
            // id
            List<TicketPriceCategory> ticketPrices = (List<TicketPriceCategory>) getEntityManager()
                    .createQuery("select p from TicketPriceCategory p where p.id in :ids")
                    .setParameter("ids", priceCategoryIds).getResultList();
            // Now, map them by id
            Map<Long, TicketPriceCategory> ticketPricesById = new HashMap<Long, TicketPriceCategory>();
            for (TicketPriceCategory ticketPrice : ticketPrices) {
                ticketPricesById.put(ticketPrice.getId(), ticketPrice);
            }

            // Now, start to create the booking from the posted data
            // Set the simple stuff first!
            Booking booking = new Booking();
            booking.setContactEmail(bookingRequest.getEmail());
            booking.setPerformance(performance);
            booking.setCancellationCode("abc");

            // Now, we iterate over each ticket that was requested, and organize them by section and category
            Map<Section, Map<TicketCategory, TicketRequest>> ticketRequestsPerSection = new LinkedHashMap<Section, Map<TicketCategory, TicketRequest>>();
            for (TicketRequest ticketRequest : bookingRequest.getTicketRequests()) {
                final TicketPriceCategory priceCategory = ticketPricesById.get(ticketRequest.getPriceCategory());
                if (!ticketRequestsPerSection.containsKey(priceCategory.getSection())) {
                    ticketRequestsPerSection
                            .put(priceCategory.getSection(), new LinkedHashMap<TicketCategory, TicketRequest>());
                }
                ticketRequestsPerSection.get(priceCategory.getSection()).put(
                        ticketPricesById.get(ticketRequest.getPriceCategory()).getTicketCategory(), ticketRequest);
            }

            // Now, we can allocate the tickets
            // Iterate over the sections
            for (Section section : ticketRequestsPerSection.keySet()) {
                int totalTicketsRequestedPerSection = 0;
                // Compute the total number of tickets required (a ticket category doesn't impact the actual seat!)
                final Map<TicketCategory, TicketRequest> ticketRequestsByCategories = ticketRequestsPerSection.get(section);
                for (TicketRequest ticketRequest : ticketRequestsByCategories.values()) {
                    totalTicketsRequestedPerSection += ticketRequest.getQuantity();
                }
                // Allocate the seats
                List<Seat> seats = seatAllocationService.allocateSeats(section, performance, totalTicketsRequestedPerSection,
                        true);
                int seatCounter = 0;
                // Now, add a ticket for each requested ticket to the booking
                for (TicketCategory ticketCategory : ticketRequestsByCategories.keySet()) {
                    final TicketRequest ticketRequest = ticketRequestsByCategories.get(ticketCategory);
                    final TicketPriceCategory ticketPriceCategory = ticketPricesById.get(ticketRequest.getPriceCategory());
                    for (int i = 0; i < ticketRequest.getQuantity(); i++) {
                        Ticket ticket = new Ticket(seats.get(seatCounter + i), ticketCategory, ticketPriceCategory.getPrice());
                        // getEntityManager().persist(ticket);
                        booking.getTickets().add(ticket);
                    }
                    seatCounter += ticketRequest.getQuantity();
                }
            }

            // Persist the booking, including cascaded relationships
            getEntityManager().persist(booking);
            // And finally, tell the app we succeeded
            return Response.ok().entity(booking).type(MediaType.APPLICATION_JSON_TYPE).build();
        } catch (ConstraintViolationException e) {
            // If validation of the data failed using Bean Validation, then send an error
            Map<String, Object> errors = new HashMap<String, Object>();
            List<String> errorMessages = new ArrayList<String>();
            for (ConstraintViolation<?> constraintViolation : e.getConstraintViolations()) {
                errorMessages.add(constraintViolation.getMessage());
            }
            errors.put("errors", errorMessages);
            return Response.status(Response.Status.BAD_REQUEST).entity(errors).build();
        } catch (Exception e) {
            // Finally, handle unexpected exceptions
            Map<String, Object> errors = new HashMap<String, Object>();
            errors.put("errors", Collections.singletonList(e.getMessage()));
            return Response.status(Response.Status.BAD_REQUEST).entity(errors).build();
        }
    }

    /**
     * A {@link BookingRequest} is populated with unmarshalled JSON data, and handed to @{link
     * {@link BookingService#createBooking(BookingRequest)}.
     * 
     * @author Marius Bogoevici
     * @author Pete Muir
     * 
     */
    public static class BookingRequest {

        private List<TicketRequest> ticketRequests = new ArrayList<TicketRequest>();
        private long performance;
        private String email;

        public List<TicketRequest> getTicketRequests() {
            return ticketRequests;
        }

        public void setTicketRequests(List<TicketRequest> ticketRequests) {
            this.ticketRequests = ticketRequests;
        }

        public long getPerformance() {
            return performance;
        }

        public void setPerformance(long performance) {

            this.performance = performance;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }
    }

    /**
     * A {@link BookingRequest} will contain multiple {@link TicketRequest}s.
     * 
     * @author Marius Bogoevici
     * @author Pete Muir
     * 
     */
    public static class TicketRequest {

        private long priceCategory;

        private int quantity;

        public long getPriceCategory() {
            return priceCategory;
        }

        public void setPriceCategory(long priceCategory) {
            this.priceCategory = priceCategory;
        }

        public int getQuantity() {
            return quantity;
        }

        public void setQuantity(int quantity) {
            this.quantity = quantity;
        }
    }
}
