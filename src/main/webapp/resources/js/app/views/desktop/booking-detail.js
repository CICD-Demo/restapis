define(['backbone',
        'utilities'],
    function (Backbone, utilities) {

    return Backbone.View.extend({
        render:function () {
            var self = this;
            $.getJSON('rest/shows/performance/' + this.model.attributes.performance.id, function (retrievedPerformance) {
                utilities.applyTemplate($(self.el), $("#booking-details"), {booking:self.model.attributes, performance:retrievedPerformance});
            });
            return this;
        }
    });
});