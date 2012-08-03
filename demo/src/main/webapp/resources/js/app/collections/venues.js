/**
 * The module for a collection of Venues
 */
define([
    // Backbone and the collection element type are dependencies
    'backbone',
    'app/models/venue',
    'configuration'
], function (Backbone, Venue, config) {

    return Backbone.Collection.extend({
        url: config.baseUrl + "rest/venues",
        model:Venue,
        id:"id",
        comparator:function (model) {
            return model.get('address').city;
        }
    });
});