/**
 * Defines a Backbone collection of Bookings
 */
define(['backbone', 'app/models/booking'], function (Backbone, Booking) {

    return Backbone.Collection.extend({
        url:'rest/bookings',
        model: Booking,
        id:'id'
    });
});