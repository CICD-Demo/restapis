/**
 * Module for the Event model
 */
define([
    'backbone'
], function (Backbone) {

    /**
     * The Event model class definition
     * Used for CRUD operations against individual events
     */
    var Event = Backbone.Model.extend({
        urlRoot:'rest/events'
    });

    return Event;
});