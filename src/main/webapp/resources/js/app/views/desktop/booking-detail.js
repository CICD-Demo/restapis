define(['backbone', 'utilities', 'app/models/loader', 'app/collections/loader'], function (Backbone, utilities, Model, Collection) {

    return Backbone.View.extend({
        render:function () {
            var self = this
            $.getJSON('rest/shows/performance/' + this.model.attributes.performance.id, function (retrievedPerformance) {
                utilities.applyTemplate($(self.el), $("#booking-details"), {booking:self.model.attributes, performance:retrievedPerformance})
            });
            return this
        }
    })
});