/**
 * Defines a Backbone collection of Events
 */
define(['backbone', 'app/models/event'], function (Backbone, Event) {

    return Backbone.Collection.extend({
        url:"rest/events",
        model: Event,
        id:"id",
        comparator:function (model) {
            return model.get('category').id;
        }
    });

});