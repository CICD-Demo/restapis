define(['backbone'], function (Backbone) {

    define(function () {

        var Venues = Backbone.Collection.extend({
            url:"rest/venues",
            model:TicketMonster.Venue,
            id:"id",
            comparator:function (model) {
                return model.get('address').city;
            }
        });

        return Venues;
    })
});