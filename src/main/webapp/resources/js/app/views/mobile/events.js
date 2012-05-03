define(['backbone', 'utilities',
    'text!../../../../templates/mobile/category-title.html',
    'text!../../../../templates/mobile/event-summary.html',
    'text!../../../../templates/mobile/item-view.html'],
    function (Backbone, utilities, categoryTitleTemplate, eventSummary, itemView) {

    var EventMenuView = Backbone.View.extend({
        render:function () {
            var self = this
            $(this.el).empty().append("<div id='categoryMenu' data-role='listview' data-filter='true' data-filter-placeholder='Event category name ...'/>")
            var rootView = $("#categoryMenu")
            var current_category = null
            _.each(this.model.models, function (event) {
                var model_category = event.get('category')
                if (current_category !== model_category.id) {
                    $(rootView).append(utilities.renderTemplate(categoryTitleTemplate, model_category));
                    current_category = model_category.id;
                }
                var view = new EventSummaryLineView({summaryView:self.options.summaryView, model:event});
                $("#category-" + current_category).append(view.render().el);
            });
            $("#categoryMenu").listview();
        }
    });

    var EventSummaryLineView = Backbone.View.extend({
        tagName:'li',
        events:{
            'click a': 'openDetail'
        },
        render:function () {
            utilities.applyTemplate($(this.el), eventSummary, this.model.attributes);
            return this;
        },
        openDetail: function() {
            $.mobile.changePage($("#container"), {transition:'slide', changeHash:false});
        }
    });


    return Backbone.View.extend({
        render:function () {
            utilities.applyTemplate($(this.el), itemView, {'items':'Categories', 'description':'Event categories'})
            this.menuView = new EventMenuView({model:this.model, el:$("#itemMenu")});
            this.menuView.render();
            $(this.el).trigger('pagecreate')
        }
    });
});