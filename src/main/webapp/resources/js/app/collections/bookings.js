define(['backbone'], function (Backbone) {

    var Bookings = Backbone.Collection.extend({
        url:'rest/bookings',
        model:TicketMonster.Booking,
        id:'id'
    });

    return Bookings;
});