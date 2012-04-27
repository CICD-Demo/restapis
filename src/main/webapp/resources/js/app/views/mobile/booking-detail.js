define(['backbone', 'utilities', 'app/models/loader', 'app/collections/loader'], function (Backbone, utilities, Model, Collection) {

    return Backbone.View.extend({
        render:function () {
            utilities.applyTemplate($(this.el), $("#booking-details"), this.model.attributes)
            $(this.el).trigger('pagecreate')
            return this
        }
    });
});