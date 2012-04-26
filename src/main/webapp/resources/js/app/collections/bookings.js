define(['backbone', 'app/models/loader'], function (Backbone, Model) {

    return Backbone.Collection.extend({
        url:'rest/bookings',
        model: Model.Booking,
        id:'id'
    });
});