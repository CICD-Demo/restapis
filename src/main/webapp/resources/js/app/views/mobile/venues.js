define(['backbone', 'utilities'], function (Backbone, utilities) {

    var VenueMenuView = Backbone.View.extend({
        render:function () {
            var self = this
            $(this.el).empty().append("<div id='cityMenu' data-role='listview' data-filter='true' data-filter-placeholder='City name ...'/>")
            var rootView = $("#cityMenu")
            var current_city = null
            _.each(this.model.models, function (venue) {
                var city = venue.get('address').city
                if (current_city !== city) {
                    $(rootView).append(utilities.renderTemplate($('#city'), {'city':city}));
                    current_city = city;
                }
                var view = new VenueSummaryLineView({summaryView:self.options.summaryView, model:venue});
                $("#city-" + current_city).append(view.render().el);
            })
            $("#cityMenu").listview()
        }
    });

    var VenueSummaryLineView = Backbone.View.extend({
        tagName:'li',
        render:function () {
            utilities.applyTemplate($(this.el), $("#venue-summary"), this.model.attributes)
            return this;
        }
    });

    return Backbone.View.extend({
        render:function () {
            utilities.applyTemplate($(this.el), $('#item-view'), {'items':'Cities', 'description':'Cities with Venues'})
            this.menuView = new VenueMenuView({model:this.model, el:$("#itemMenu")});
            this.menuView.render()
            $(this.el).trigger('pagecreate')
        }
    });
});