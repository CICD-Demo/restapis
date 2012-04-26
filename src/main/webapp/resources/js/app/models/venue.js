define(['backbone'], function (Backbone) {

    var Venue = Backbone.Model.extend({
        urlRoot:'rest/venues'
    });

    return Venue;
});