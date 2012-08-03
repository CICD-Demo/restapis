/**
 * Module for the Events collection
 */
define([
    // Backbone and the collection element type are dependencies
    'backbone',
    'app/models/event',
    'configuration'
], function (Backbone, Event, config) {
    /**
     *  Here we define the Bookings collection
     *  We will use it for CRUD operations on Bookings
     */
    var Events = Backbone.Collection.extend({
        url: config.baseUrl + "rest/events", // the URL for performing CRUD operations
        model: Event,
        id:"id", // the 'id' property of the model is the identifier
        comparator:function (model) {
            return model.get('category').id;
        }
    });
    return Events;
});