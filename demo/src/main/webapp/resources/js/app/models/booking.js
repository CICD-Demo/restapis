/**
 * Module for the Booking model
 */
define([
    // Backbone is a dependency
    'backbone',
    'configuration'
], function (Backbone,
             config) {

    /**
     * The Booking model class definition
     * Used for CRUD operations against individual bookings
     */
    var Booking = Backbone.Model.extend({
        urlRoot: config.baseUrl + 'rest/bookings'
    });

    return Booking;

});