/**
 * The module for a collection of Bookings
 */
define([
    // Backbone and the collection element type are dependencies
    'backbone',
    'app/models/booking',
    'configuration'
], function (Backbone, Booking, config) {

    // Here we define the Bookings collection
    // We will use it for CRUD operations on Bookings

    var Bookings = Backbone.Collection.extend({
        url: config.baseUrl + 'rest/bookings',
        model: Booking,
        id:'id'
    });

    return Bookings;
});