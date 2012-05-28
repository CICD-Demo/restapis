package org.jboss.jdf.example.ticketmonster.model;

/**
 * The exception thrown if an error occurs in seat allocation
 * 
 * @author Marius Bogoevici
 */
@SuppressWarnings("serial")
public class SeatAllocationException extends RuntimeException {

    public SeatAllocationException() {
    }

    public SeatAllocationException(String s) {
        super(s);
    }

    public SeatAllocationException(String s, Throwable throwable) {
        super(s, throwable);
    }

    public SeatAllocationException(Throwable throwable) {
        super(throwable);
    }
}
