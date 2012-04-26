define(['backbone', 'app/models/loader'], function (Backbone, Model) {

    return Backbone.Collection.extend({
        url:"rest/venues",
        model:Model.Venue,
        id:"id",
        comparator:function (model) {
            return model.get('address').city;
        }
    });
});