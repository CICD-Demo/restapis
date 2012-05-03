define(['backbone', 'utilities',
    'text!../../../../templates/mobile/city.html',
    'text!../../../../templates/mobile/venue-summary.html',
    'text!../../../../templates/mobile/item-view.html'],
    function (Backbone, utilities, cityTemplate, venueSummary, itemView) {

        var VenueMenuView = Backbone.View.extend({
        render:function () {
            var self = this
            $(this.el).empty().append("<div id='cityMenu' data-role='listview' data-filter='true' data-filter-placeholder='City name ...'/>")
            var rootView = $("#cityMenu")
            var current_city = null
            _.each(this.model.models, function (venue) {
                var city = venue.get('address').city
                if (current_city !== city) {
                    $(rootView).append(utilities.renderTemplate(cityTemplate, {'city':city}));
                    current_city = city;
                }
                var view = new VenueSummaryLineView({summaryView:self.options.summaryView, model:venue});
                $("#city-" + current_city).append(view.render().el);
            });
            $("#cityMenu").listview();
        }
    });

    var VenueSummaryLineView = Backbone.View.extend({
        tagName:'li',
        events:{
            'click a': 'openDetail'
        },
        render:function () {
            utilities.applyTemplate($(this.el), venueSummary, this.model.attributes)
            return this;
        },
        openDetail: function() {
            $.mobile.changePage($("#container"), {transition:'slide', changeHash:false});
        }
    });

    return Backbone.View.extend({
        render:function () {
            utilities.applyTemplate($(this.el), itemView, {'items':'Cities', 'description':'Cities with Venues'})
            this.menuView = new VenueMenuView({model:this.model, el:$("#itemMenu")});
            this.menuView.render()
            $(this.el).trigger('pagecreate');
        }
    });
});