define(
    [   'app/views/mobile/about',
        'app/views/mobile/booking-detail',
        'app/views/mobile/bookings',
        'app/views/mobile/create-booking',
        'app/views/mobile/event-detail',
        'app/views/mobile/events',
        'app/views/mobile/venue-detail',
        'app/views/mobile/venues'],
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