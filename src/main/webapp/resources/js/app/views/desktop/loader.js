define(
    [   'app/views/desktop/about',
        'app/views/desktop/booking-detail',
        'app/views/desktop/bookings',
        'app/views/desktop/create-booking',
        'app/views/desktop/event-detail',
        'app/views/desktop/events',
        'app/views/desktop/venue-detail',
        'app/views/desktop/venues'],
    function (About, BookingDetail, Bookings, CreateBooking, EventDetail, Events, VenueDetail, Venues) {
        return {
            'About': About,
            'BookingDetail': BookingDetail,
            'Bookings': Bookings,
            'CreateBooking':CreateBooking,
            'EventDetail': EventDetail,
            'Events': Events,
            'VenueDetail': VenueDetail,
            'Venues': Venues
        }
    });