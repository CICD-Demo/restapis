package org.jboss.jdf.example.ticketmonster.model;

import static javax.persistence.GenerationType.IDENTITY;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

/**
 * An allocation consists of one or more contiguous sold seats
 * within a SectionRow.
 *
 * @author Shane Bryzak
 * @author Marius Bogoevici
 */
@Entity
public class Ticket implements Serializable {
    private static final long serialVersionUID = 8738724150877088864L;

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    private Seat seat;

    @ManyToOne
    private TicketCategory ticketCategory;

    private float price;


    /**
     * Np-arg constructor for persistence
     */
    public Ticket() {

    }

    public Ticket(Seat seat, TicketCategory ticketCategory, float price) {
        this.seat = seat;
        this.ticketCategory = ticketCategory;
        this.price = price;
    }

    public Long getId() {
        return id;
    }


    public TicketCategory getTicketCategory() {
        return ticketCategory;
    }

    public float getPrice() {
        return price;
    }


    public Seat getSeat() {
        return seat;
    }
}

