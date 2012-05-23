/**
 * The About view
 */
define([
    'backbone'
], function (Backbone) {

    var AboutView = Backbone.View.extend({
        render:function () {
            $(this.el).empty().append(
                "<section>" +
                    "<h2 class='light-font special-title page-header'>Welcome to Ticket Monster!</h2>" +
                "</section>");
        }
    });

    return AboutView;
});