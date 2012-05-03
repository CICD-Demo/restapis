/**
 * Module for the Venue model
 */
define([
    'backbone'
], function (Backbone) {

    /**
     * The Venue model class definition
     * Used for CRUD operations against individual events
     */
    var Venue = Backbone.Model.extend({
        urlRoot:'rest/venues'
    });

    return Venue;
});