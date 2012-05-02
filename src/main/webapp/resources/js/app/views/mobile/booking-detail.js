define(['backbone', 'utilities'], function (Backbone, utilities) {

    return Backbone.View.extend({
        render:function () {
            utilities.applyTemplate($(this.el), $("#booking-details"), this.model.attributes);
            $(this.el).trigger('pagecreate');
            return this;
        }
    });
});