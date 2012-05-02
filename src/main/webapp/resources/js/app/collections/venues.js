define(['backbone', 'app/models/venue'], function (Backbone, Venue) {

    return Backbone.Collection.extend({
        url:"rest/venues",
        model:Venue,
        id:"id",
        comparator:function (model) {
            return model.get('address').city;
        }
    });
});