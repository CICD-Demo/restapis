/**
 * The module for a collection of Bookings
 */
define([
    // Backbone and the collection element type are dependencies
    'backbone',
    'app/models/booking'
], function (Backbone, Booking) {

    // Here we define the Bookings collection
    // We will use it for CRUD operations on Bookings

    var Bookings = Backbone.Collection.extend({
        url:'rest/bookings',
        model: Booking,
        id:'id'
    });

    return Bookings;
});