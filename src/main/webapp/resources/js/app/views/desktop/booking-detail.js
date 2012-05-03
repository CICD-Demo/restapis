define([
    'backbone',
    'utilities',
    'text!../../../../templates/desktop/booking-details.html',
    'bootstrap'],
    function (Backbone, utilities, bookingDetailsTemplate) {

    return Backbone.View.extend({
        render:function () {
            var self = this;
            $.getJSON('rest/shows/performance/' + this.model.attributes.performance.id, function (retrievedPerformance) {
                utilities.applyTemplate($(self.el), bookingDetailsTemplate, {booking:self.model.attributes, performance:retrievedPerformance});
            });
            return this;
        }
    });
});