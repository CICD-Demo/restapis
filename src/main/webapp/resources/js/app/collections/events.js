define(['backbone', 'app/models/loader'], function (Backbone, Model) {

    return Backbone.Collection.extend({
        url:"rest/events",
        model:Model.Event,
        id:"id",
        comparator:function (model) {
            return model.get('category').id;
        }
    });

});