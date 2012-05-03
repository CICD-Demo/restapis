define(['backbone', 'utilities',
    'text!../../../../templates/desktop/city.html',
    'text!../../../../templates/desktop/venue-summary.html',
    'text!../../../../templates/desktop/venue-carousel.html',
    'text!../../../../templates/desktop/main-view.html',
    'backbone'],
    function (Backbone, utilities, cityTemplate, venueSummary, venueCarousel, mainView) {

        var VenueMenuView = Backbone.View.extend({
        events:{
            "click a":"update"
        },
        tagName:'div',
        render:function () {
            var self = this;
            $(this.el).empty();
            var current_city = null;
            _.each(this.model.models, function (event) {
                var model_city = event.get('address').city;
                if (current_city !== model_city) {
                    $(self.el).append(utilities.renderTemplate(cityTemplate, event.get('address')));
                    current_city = model_city;
                }
                var view = new VenueSummaryLineView({summaryView:self.options.summaryView, model:event});
                $("#city-" + current_city).append(view.render().el);
            });
            $(".collapse").collapse();
            return this;
        },
        update:function () {
            $("a[rel='popover']").popover('hide')
        }
    });

    var VenueSummaryLineView = Backbone.View.extend({
        tagName:'div',
        events:{
            "click":"notify"
        },
        render:function () {
            utilities.applyTemplate($(this.el), venueSummary, this.model.attributes);
            return this;
        },
        notify:function () {
            this.options.summaryView.render(this.model)
        }
    });


        var VenueSummaryView = Backbone.View.extend({
            render:function () {
                utilities.applyTemplate($(this.el), venueCarousel, {models:this.model.models});
                $(this.el).find('.item:first').addClass('active');
                return this;
            }
        });

        return Backbone.View.extend({
        render:function () {
            utilities.applyTemplate($(this.el), mainView, {});
            var venueSummaryView = new VenueSummaryView({model:this.model});
            $("#itemSummary").append(venueSummaryView.render().el)
            this.menuView = new VenueMenuView({summaryView:venueSummaryView, model:this.model, el:$("#itemMenu")});
            this.menuView.render()
        }
    })
});