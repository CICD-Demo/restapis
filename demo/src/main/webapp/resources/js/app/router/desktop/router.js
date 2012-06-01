/**
 * A module for the router of the desktop application
 */
define("router", [
    'jquery',
    'underscore',
    'backbone',
    'utilities',
    'app/models/booking',
    'app/models/event',
    'app/models/venue',
    'app/collections/bookings',
    'app/collections/events',
    'app/collections/venues',
    'app/views/desktop/home',
    'app/views/desktop/events',
    'app/views/desktop/venues',
    'app/views/desktop/create-booking',
    'app/views/desktop/bookings',
    'app/views/desktop/event-detail',
    'app/views/desktop/venue-detail',
    'app/views/desktop/booking-detail'
],function ($,
            _,
            Backbone,
            utilities,
            Booking,
            Event,
            Venue,
            Bookings,
            Events,
            Venues,
            HomeView,
            EventsView,
            VenuesView,
            CreateBookingView,
            BookingsView,
            EventDetailView,
            VenueDetailView,
            BookingDetailView) {

    /**
     * The Router class contains all the routes within the application - 
     * i.e. URLs and the actions that will be taken as a result.
     *
     * @type {Router}
     */

    var Router = Backbone.Router.extend({
        routes:{
            "":"home",
            "about":"home",
            "events":"events",
            "events/:id":"eventDetail",
            "venues":"venues",
            "venues/:id":"venueDetail",
            "book/:showId/:performanceId":"bookTickets",
            "bookings":"listBookings",
            "bookings/:id":"bookingDetail",
            "ignore":"ignore",
            "*actions":"defaultHandler"
        },
        events:function () {
            var events = new Events();
            var eventsView = new EventsView({model:events, el:$("#content")});
            events.bind("reset",
                function () {
                    utilities.viewManager.showView(eventsView);
                }).fetch();
        },
        venues:function () {
            var venues = new Venues;
            var venuesView = new VenuesView({model:venues, el:$("#content")});
            venues.bind("reset",
                function () {
                    utilities.viewManager.showView(venuesView.render());
                }).fetch();
        },
        home:function () {
            utilities.viewManager.showView(new HomeView({el:$("#content")}));
        },
        bookTickets:function (showId, performanceId) {
            var createBookingView = 
            	new CreateBookingView({
            		model:{ showId:showId, 
            			    performanceId:performanceId, 
            			    bookingRequest:{tickets:[]}}, 
            			    el:$("#content")
            			   });
            utilities.viewManager.showView(createBookingView);
        },
        listBookings:function () {
            var bookings = new Bookings;
            var bookingsView = new BookingsView({ 
            	model:bookings, 
            	 el:$("#content")});
            bookings.bind("destroy",
                function () {
                    bookings.fetch({success:function () {
                        utilities.viewManager.showView(bookingsView);
                    }});
                });
            bookings.fetch({success:function () {
                utilities.viewManager.showView(bookingsView);
            }});
        },
        eventDetail:function (id) {
            var model = new Event({id:id});
            var eventDetailView = new EventDetailView({model:model, el:$("#content")});
            model.bind("change",
                function () {
                    utilities.viewManager.showView(eventDetailView);
                }).fetch();
        },
        venueDetail:function (id) {
            var model = new Venue({id:id});
            var venueDetailView = new VenueDetailView({model:model, el:$("#content")});
            model.bind("change",
                function () {
                    utilities.viewManager.showView(venueDetailView);
                }).fetch();
        },
        bookingDetail:function (id) {
            var bookingModel = new Booking({id:id});
            var bookingDetailView = new BookingDetailView({model:bookingModel, el:$("#content")});
            bookingModel.bind("change",
                function () {
                    utilities.viewManager.showView(bookingDetailView);
                }).fetch();

        }
    });

    // Create a router instance
    var router = new Router();

    //Begin routing
    Backbone.history.start();

    return router;
});