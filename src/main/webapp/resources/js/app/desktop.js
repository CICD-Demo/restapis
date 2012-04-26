define(['jquery', 'underscore', 'backbone', 'utilities' ], function ($, _, Backbone, utilities) {

    var TicketMonster = new Object();

    TicketMonster.AboutView = Backbone.View.extend({
        render:function () {
            $(this.el).empty().append("<section><h1>Welcome to Ticket Monster!</h1>" +
                "Ticket Monster is a demo application</section>")
        }
    });

    TicketMonster.Router = Backbone.Router.extend({
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
            var events = new TicketMonster.Events;
            var eventsView = new TicketMonster.EventsCategoriesView({model:events, el:$("#content")})
            events.bind("reset",
                function () {
                    eventsView.render()
                }).fetch()
        },
        venues:function () {
            var venues = new TicketMonster.Venues;
            var venuesView = new TicketMonster.VenueCitiesView({model:venues, el:$("#content")})
            venues.bind("reset",
                function () {
                    venuesView.render()
                }).fetch()
        },
        about:function () {
            new TicketMonster.AboutView({el:$("#content")}).render()
        },
        bookTickets:function (showId, performanceId) {
            var createBookingView = new TicketMonster.CreateBookingView({model:{showId:showId, performanceId:performanceId, bookingRequest:{tickets:[]}}, el:$("#content")})
            createBookingView.render()
        },
        listBookings:function () {
            var bookings = new TicketMonster.Bookings()
            var bookingsView = new TicketMonster.BookingsView({model:bookings, el:$("#content")})

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
            var model = new TicketMonster.Event({id:id});
            var eventDetailView = new TicketMonster.EventDetailView({model:model, el:$("#content")});
            model.bind("change",
                function () {
                    eventDetailView.render()
                }).fetch()
        },
        venueDetail:function (id) {
            var model = new TicketMonster.Venue({id:id});
            var venueDetailView = new TicketMonster.VenueDetailView({model:model, el:$("#content")});
            model.bind("change",
                function () {
                    venueDetailView.render()
                }).fetch()
        },
        bookingDetail:function (id) {
            var bookingModel = new TicketMonster.Booking({id:id});
            var bookingDetailView = new TicketMonster.BookingDetailView({model:bookingModel, el:$("#content")})
            bookingModel.bind("change",
                function () {
                    bookingDetailView.render()
                }).fetch()

        }
    });

    var tmRouter = new TicketMonster.Router;

    Backbone.history.start();

});





