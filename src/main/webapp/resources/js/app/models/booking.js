/**
 * Module for the Booking model
 */
define([
    // Backbone is a dependency
    'backbone'
], function (Backbone) {

    /**
     * The Booking model class definition
     * Used for CRUD operations against individual bookings
     */
    var Booking = Backbone.Model.extend({
        urlRoot:'rest/bookings'
    });

    return Booking;

});