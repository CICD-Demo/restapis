define(['backbone', 'utilities'], function (Backbone, utilities) {

    var BookingRowView = Backbone.View.extend({
        tagName:'tr',
        events:{
            "click i[data-tm-role='delete']":"delete",
            "click a":"showDetails"
        },
        render:function () {
            utilities.applyTemplate($(this.el), $("#booking-row"), this.model.attributes)
            return this;
        },
        delete:function (event) {
            if (confirm("Are you sure you want to delete booking " + this.model.get('id'))) {
                this.model.destroy({wait:true})
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
            utilities.applyTemplate($(this.el), $('#booking-table'), {})
            _.each(this.model.models, function (booking) {
                var bookingView = new BookingRowView({model:booking})
                $("#bookingList").append(bookingView.render().el)
            })
        }
    });

});