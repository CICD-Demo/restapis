define("router", ['jquery', 'underscore', 'backbone', 'app/models/loader', 'app/collections/loader', 'app/views/desktop/loader'] , function ($, _, Backbone, Model, Collection, View) {


    var TMRouter = Backbone.Router.extend({
        routes:{
            "":"events",
            "events":"events",
            "events/:id":"eventDetail",
            "venues":"venues",
            "venues/:id":"venueDetail",
            "about":"about",
            "book/:showId/:performanceId":"bookTickets",
            "bookings":"listBookings",
            "bookings/:id":"bookingDetail",
            "ignore":"ignore",
            "*actions":"defaultHandler"
        },
        events:function () {
            var events = new Collection.Events;
            var eventsView = new View.Events({model:events, el:$("#content")});
            events.bind("reset",
                function () {
                    eventsView.render()
                }).fetch()
        },
        venues:function () {
            var venues = new Collection.Venues;
            var venuesView = new View.Venues({model:venues, el:$("#content")})
            venues.bind("reset",
                function () {
                    venuesView.render()
                }).fetch()
        },
        about:function () {
            new View.About({el:$("#content")}).render()
        },
        bookTickets:function (showId, performanceId) {
            var createBookingView = new View.CreateBooking({model:{showId:showId, performanceId:performanceId, bookingRequest:{tickets:[]}}, el:$("#content")})
            createBookingView.render()
        },
        listBookings:function () {
            var bookings = new Collection.Bookings;
            var bookingsView = new View.Bookings({model:bookings, el:$("#content")})

            bookings.bind("destroy",
                function () {
                    bookings.fetch({success:function () {
                        bookingsView.render()
                    }})
                });

            bookings.fetch({success:function () {
                bookingsView.render()
            }});
        },
        eventDetail:function (id) {
            var model = new Model.Event({id:id});
            var eventDetailView = new View.EventDetail({model:model, el:$("#content")});
            model.bind("change",
                function () {
                    eventDetailView.render()
                }).fetch()
        },
        venueDetail:function (id) {
            var model = new Model.Venue({id:id});
            var venueDetailView = new View.EventDetail({model:model, el:$("#content")});
            model.bind("change",
                function () {
                    venueDetailView.render()
                }).fetch()
        },
        bookingDetail:function (id) {
            var bookingModel = new Model.Booking({id:id});
            var bookingDetailView = new View.BookingDetail({model:bookingModel, el:$("#content")})
            bookingModel.bind("change",
                function () {
                    bookingDetailView.render()
                }).fetch()

        }
    });

    var router = new TMRouter();

    Backbone.history.start();


    return router;
});