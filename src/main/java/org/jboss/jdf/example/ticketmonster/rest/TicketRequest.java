package org.jboss.jdf.example.ticketmonster.rest;

/**
 * <p>
 * A {@link BookingRequest} will contain multiple {@link TicketRequest}s.
 * </p>
 * 
 * @author Marius Bogoevici
 * @author Pete Muir
 * 
 */
public class TicketRequest {

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
