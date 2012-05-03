define([
    'backbone',
    'utilities',
    'text!../../../../templates/desktop/booking-row.html',
    'text!../../../../templates/desktop/booking-table.html',
    'require',
    'bootstrap'
],function (Backbone,
            utilities,
            bookingRowTemplate,
            bookingTableTemplate,
            require) {


    // A subview of the BookingsView
    var BookingRowView = Backbone.View.extend({
        tagName:'tr',
        events:{
            "click i[data-tm-role='delete']":"deleteBooking",
            "click a":"showDetails"
        },
        render:function () {
            utilities.applyTemplate($(this.el), bookingRowTemplate, this.model.attributes);
            return this;
        },
        deleteBooking:function (event) {
            if (confirm("Are you sure you want to delete booking " + this.model.get('id'))) {
                this.model.destroy({wait:true});
            }
            event.stopPropagation();
            event.stopImmediatePropagation();
        },
        showDetails:function () {
            require('router').navigate("#bookings/" + this.model.get('id'), true);
        }
    });


    var BookingsView = Backbone.View.extend({
        render:function () {
            utilities.applyTemplate($(this.el), bookingTableTemplate, {});
            _.each(this.model.models, function (booking) {
                var bookingView = new BookingRowView({model:booking});
                $("#bookingList").append(bookingView.render().el);
            });
        }
    });

    return BookingsView;

});