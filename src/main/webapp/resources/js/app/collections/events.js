define(['backbone'], function (Backbone) {

    var Events = Backbone.Collection.extend({
        url:"rest/events",
        model:TicketMonster.Event,
        id:"id",
        comparator:function (model) {
            return model.get('category').id;
        }
    });

    return Events;

});