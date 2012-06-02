/**
 * The About view
 */
define([
    'backbone',
    'utilities',
    'text!../../../../templates/desktop/home.html'
], function (Backbone, utilities, HomeTemplate) {

    var HomeView = Backbone.View.extend({
        render:function () {
            utilities.applyTemplate($(this.el),HomeTemplate,{});
            return this;
        }
    });

    return HomeView;
});