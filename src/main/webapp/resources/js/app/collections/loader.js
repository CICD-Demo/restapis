/**
 * Module loader for all collections in the application. 
 * 
 */
define(['app/collections/bookings', 'app/collections/events', 'app/collections/venues'],
    function (bookings, events, venues) {
        return {
            'Bookings': bookings,
            'Events': events,
            'Venues': venues
        };
});