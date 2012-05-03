define([
    'backbone',
    'utilities',
    'text!../../../../templates/desktop/events.html',
    'backbone'
], function (
    Backbone,
    utilities,
    eventsTemplate) {

    var EventsView = Backbone.View.extend({
        events:{
            "click a":"update"
        },
        render:function () {
            utilities.applyTemplate($(this.el), eventsTemplate, {model:this.model})
            $(this.el).find('.item:first').addClass('active');
            $(".collapse").collapse()
            $("a[rel='popover']").popover({trigger:'hover'});
            return this
        },
        update:function () {
            $("a[rel='popover']").popover('hide')
        }
    });

    return  EventsView;
});