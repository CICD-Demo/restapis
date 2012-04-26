define(['app/models/booking', 'app/models/event', 'app/models/price-category-quantity', 'app/models/venue'],
    function (booking, event, priceCategoryQuantity, venue) {
    return {
        'Booking':booking,
        'Event': event,
        'PriceCategoryQuantity':priceCategoryQuantity,
        'Venue':venue
    }
});