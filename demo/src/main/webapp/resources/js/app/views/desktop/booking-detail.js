define([
    'backbone',
    'utilities',
    'text!../../../../templates/desktop/booking-details.html'
], function (Backbone, utilities, BookingDetailsTemplate) {

    var BookingDetailView = Backbone.View.extend({
        render:function () {
            var self = this;
            // retrieve the details
            $.getJSON('rest/shows/performance/' + this.model.attributes.performance.id, function (retrievedPerformance) {
                utilities.applyTemplate($(self.el), BookingDetailsTemplate, {booking:self.model.attributes, performance:retrievedPerformance});
            });
            return this;
        }
    });

    return BookingDetailView;
});