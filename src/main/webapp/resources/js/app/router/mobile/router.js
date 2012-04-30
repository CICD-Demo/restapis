define("router", ['jquery', 'jquerymobile', 'underscore', 'backbone', 'app/models/loader', 'app/collections/loader', 'app/views/mobile/loader', 'utilities', 'text!../templates/templates-mobile.html'] , function ($, jqm, _, Backbone, Model, Collection, View, utilities, templates) {

    $('head').append(templates);

    $.mobile.hashListeningEnabled = false;
    $.mobile.linkBindingEnabled = false;
    $.mobile.pushStateEnabled = false;

    var TMRouter = Backbone.Router.extend({
        routes:{
            "":"home",
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
        defaultHandler:function (actions) {
            if ("" != actions) {
                $.mobile.changePage("#" + actions, {transition:'slide', changeHash:false, allowSamePageTransition:true})
            }
        },
        home:function () {
            utilities.applyTemplate($("#container"), $("#home-view"));
            try {
                $("#container").trigger('pagecreate')
            } catch (e) {
                // workaround for a spurious error thrown when creating the page initially
            }
        },
        events:function () {
            var events = new Collection.Events;
            var eventsView = new View.Events({model:events, el:$("#container")})
            events.bind("reset",
                function () {
                    eventsView.render()
                }).fetch();
        },
        venues:function () {
            var venues = new Collection.Venues;
            var venuesView = new View.Venues({model:venues, el:$("#container")})
            venues.bind("reset",
                function () {
                    venuesView.render()
                }).fetch()
        },
        about:function () {
            new View.About({el:$("#container")}).render();
        },
        bookTickets:function (showId, performanceId) {
            var createBookingView = new View.CreateBooking({model:{showId:showId, performanceId:performanceId, bookingRequest:{tickets:[]}}, el:$("#container")});
            createBookingView.render();
        },
        listBookings:function () {
            var bookings = new Collection.Bookings
            var bookingsView = new View.Bookings({model:bookings, el:$("#container")})
            bookings.bind("reset",
                function () {
                    bookingsView.render()
                }).bind("destroy",
                function () {
                    this.fetch()
                }).fetch();
        },
        eventDetail:function (id) {
            var model = new Model.Event({id:id});
            var eventDetailView = new View.EventDetail({model:model, el:$("#container")});
            model.bind("change",
                function () {
                    eventDetailView.render()
                }).fetch();
        },
        venueDetail:function (id) {
            var model = new Model.Venue({id:id});
            var venueDetailView = new View.VenueDetail({model:model, el:$("#container")});
            model.bind("change",
                function () {
                    venueDetailView.render()
                }).fetch();
        },
        bookingDetail:function (id) {
            var bookingModel = new Model.Booking({id:id});
            var bookingDetailView = new View.BookingDetail({model:bookingModel, el:$("#content")})
            bookingModel.bind("change",
                function () {
                    bookingDetailView.render();
                }).fetch();
        }
    });

    var router = new TMRouter();

    Backbone.history.start();

    return router;
});