/**
 * Module loader for all models in the application
 */
define(['app/models/booking', 'app/models/event', 'app/models/venue'],
    function (booking, event, venue) {
    return {
        'Booking':booking,
        'Event': event,
        'Venue':venue
    };
});