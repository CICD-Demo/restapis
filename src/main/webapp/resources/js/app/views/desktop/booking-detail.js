/**
 * Created with IntelliJ IDEA.
 * User: marius
 * Date: 12-04-26
 * Time: 1:15 PM
 * To change this template use File | Settings | File Templates.
 */
define(function () {
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