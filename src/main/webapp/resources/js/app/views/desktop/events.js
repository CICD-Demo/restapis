define(['backbone', 'utilities',
    'text!../../../../templates/desktop/category-title.html',
    'text!../../../../templates/desktop/event-summary.html',
    'text!../../../../templates/desktop/event-carousel.html',
    'text!../../../../templates/desktop/main-view.html',
    'backbone'],
    function (Backbone, utilities, categoryTitleTemplate, eventSummary, eventCarousel, mainView) {

        var EventMenuView = Backbone.View.extend({
            events:{
                "click a":"update"
            },
            tagName:'div',
            render:function () {
                var self = this
                $(this.el).empty()
                var current_category = null
                _.each(this.model.models, function (event) {
                    var model_category = event.get('category')
                    if (current_category !== model_category.id) {
                        $(self.el).append(utilities.renderTemplate(categoryTitleTemplate, model_category));
                        current_category = model_category.id;
                    }
                    var view = new EventSummaryLineView({summaryView:self.options.summaryView, model:event});
                    $("#category-" + current_category).append(view.render().el);
                })
                $(".collapse").collapse()
                $("a[rel='popover']").popover({trigger:'hover'})
                return this
            },
            update:function () {
                $("a[rel='popover']").popover('hide')
            }
        });

        var EventSummaryLineView = Backbone.View.extend({
            tagName:'div',
            events:{
                "click":"notify"
            },
            render:function () {
                utilities.applyTemplate($(this.el), eventSummary, this.model.attributes)
                return this;
            },
            notify:function () {
                this.options.summaryView.render(this.model)
            }
        });

        var EventSummaryView = Backbone.View.extend({
            render:function () {
                utilities.applyTemplate($(this.el), eventCarousel, {models:this.model.models});
                $(this.el).find('.item:first').addClass('active');
                return this;
            }
        });


        return  Backbone.View.extend({
            render:function () {
                utilities.applyTemplate($(this.el), mainView, {})
                var summaryView = new EventSummaryView({model:this.model});
                $("#itemSummary").append(summaryView.render().el)
                this.menuView = new EventMenuView({summaryView:summaryView, model:this.model, el:$("#itemMenu")});
                this.menuView.render()
            }
        });
    });