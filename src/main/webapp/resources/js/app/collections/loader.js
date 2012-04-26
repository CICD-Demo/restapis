define(['app/collections/bookings', 'app/collections/events', 'app/collections/section-quantities', 'app/collections/venues'],
    function (bookings, events, sectionQuantities, venues) {
        return {
            'Bookings': bookings,
            'Events': events,
            'SectionQuantities': sectionQuantities,
            'Venues': venues
        }
    });