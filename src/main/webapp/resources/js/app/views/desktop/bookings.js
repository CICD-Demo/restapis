define([
    'backbone',
    'utilities',
    'text!../../../../templates/desktop/booking-table.html'
],function (Backbone,
            utilities,
            bookingTableTemplate) {

    var BookingsView = Backbone.View.extend({
        events:{
            "click i[data-tm-role='delete']":"deleteBooking"
        },
        render:function () {
            utilities.applyTemplate($(this.el), bookingTableTemplate, {model:this.model});
        },
        deleteBooking:function (event) {
            var id = $(event.currentTarget).data("tm-id");
            if (confirm("Are you sure you want to delete booking " + this.model.get(id).get('id'))) {
                this.model.get(id).destroy({wait:true});
            };
        }
    });

    return BookingsView;

});