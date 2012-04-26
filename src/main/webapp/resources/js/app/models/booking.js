define(['backbone'], function (Backbone) {

    var Booking = Backbone.Model.extend({
        urlRoot:'rest/bookings'
    })

    return Booking;

});