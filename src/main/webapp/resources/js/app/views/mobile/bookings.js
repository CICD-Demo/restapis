define(['backbone', 'utilities'], function (Backbone, utilities) {

    var BookingRowView = Backbone.View.extend({
        tagName:'li',
        events:{
            "click a[data-tm-role='delete']":"delete",
            "click ":"showDetails"
        },
        render:function () {
            utilities.applyTemplate($(this.el), $("#booking-row"), this.model.attributes)
            return this;
        },
        delete:function (event) {
            if (confirm("Are you sure you want to delete booking " + this.model.get('id'))) {
                var self = this
                this.model.destroy()
            }
            event.stopPropagation()
            event.stopImmediatePropagation()
        },
        showDetails:function () {
            tmRouter.navigate("#bookings/" + this.model.get('id'), true)
        }
    });


    return Backbone.View.extend({
        render:function () {
            $(this.el).empty().append("<ul data-role='listview' id='bookingDetails'/>");
            _.each(this.model.models, function (booking) {
                var bookingView = new BookingRowView({model:booking})
                $("#bookingDetails").append(bookingView.render().el)
            })
            $("#bookingDetails").listview()
            $(this.el).trigger('pagecreate')
        }
    });

});