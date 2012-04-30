define(['backbone', 'utilities', 'app/models/loader', 'app/collections/loader'], function (Backbone, utilities, Model, Collection) {


    var SectionSelectorView = Backbone.View.extend({
        render:function () {
            var self = this;
            utilities.applyTemplate($(this.el), $("#select-section"), { sections:_.uniq(_.sortBy(_.pluck(self.model.priceCategories, 'section'), function (item) {
                return item.id
            }), true, function (item) {
                return item.id
            })});
            $(this.el).trigger('pagecreate');
            return this
        }
    });

    var TicketCategoryView = TicketCategoryView = Backbone.View.extend({
        events:{
            "change input":"onChange"
        },
        render:function () {
            utilities.applyTemplate($(this.el), $('#ticket-entry'), this.model.attributes);
            $(this.el).trigger('pagecreate')
            return this;
        },
        onChange:function (event) {
            var value = event.currentTarget.value;
            if (value != '' && value != 0) {
                this.model.set('quantity', parseInt(value))
            }
            else {
                this.model.unset('quantity')
            }
        }
    });


    var TicketCategoriesView = Backbone.View.extend({

        id:'categoriesView',
        render:function () {
            var views = {};

            if (this.model != null) {
                var priceCategories = _.map(this.model.models, function (item) {
                    return item.attributes.priceCategory
                })
                utilities.applyTemplate($(this.el), $('#ticket-entries'), {priceCategories:priceCategories});

                _.each(this.model.models, function (model) {
                    $("#ticket-category-input-" + model.attributes.priceCategory.id).append(new TicketCategoryView({model:model}).render().el);

                });
            } else {
                $(this.el).empty()
            }
            $(this.el).trigger('pagecreate')
            return this;
        },
        updateModel:function () {

        }
    });

     var TicketSummaryView = Backbone.View.extend({
        render:function () {
            utilities.applyTemplate($(this.el), $('#ticket-summary-view'), this.model.bookingRequest)
        }
    });

    var ConfirmBookingView = Backbone.View.extend({
        events:{
            "click a[id='saveBooking']":"save",
            "click a[id='goBack']":"back"
        },
        render:function () {
            utilities.applyTemplate($(this.el), $("#confirm-booking"), this.model)
            this.ticketSummaryView = new TicketSummaryView({model:this.model, el:$("#ticketSummaryView")});
            this.ticketSummaryView.render();
            $(this.el).trigger('pagecreate')
        },
        back:function () {
            tmRouter.navigate('book/' + this.model.bookingRequest.show.id + '/' + this.model.bookingRequest.performance.id, true)

        }, save:function (event) {
            var bookingRequest = {ticketRequests:[]};
            var self = this;
            _.each(this.model.bookingRequest.tickets, function (collection) {
                _.each(collection.models, function (model) {
                    if (model.attributes.quantity != undefined) {
                        bookingRequest.ticketRequests.push({priceCategory:model.attributes.priceCategory.id, quantity:model.attributes.quantity})
                    }
                })
            })

            bookingRequest.email = this.model.email;
            bookingRequest.performance = this.model.performanceId
            $.ajax({url:"rest/bookings",
                data:JSON.stringify(bookingRequest),
                type:"POST",
                dataType:"json",
                contentType:"application/json",
                success:function (booking) {
                    utilities.applyTemplate($(self.el), $("#booking-details"), booking)
                    $(self.el).trigger('pagecreate')
                }}).error(function (error) {
                    alert(error)
                })
            this.model = {}
        }
    })


    return Backbone.View.extend({
        events:{
            "click a[id='confirmBooking']":"checkout",
            "change select":"refreshPrices",
            "change input[type='number']":"updateForm",
            "change input[name='email']":"updateForm"
        },
        render:function () {

            var self = this;

            $.getJSON("rest/shows/" + this.model.showId, function (selectedShow) {
                self.model.performance = _.find(selectedShow.performances, function (item) {
                    return item.id == self.model.performanceId
                })
                utilities.applyTemplate($(self.el), $("#create-booking"), { show:selectedShow,
                    performance:self.model.performance});
                $(self.el).trigger('pagecreate')
                self.selectorView = new SectionSelectorView({model:selectedShow, el:$("#sectionSelectorPlaceholder")}).render();
                self.ticketCategoriesView = new TicketCategoriesView({model:{}, el:$("#ticketCategoriesViewPlaceholder") });
                self.model.show = selectedShow
                self.ticketCategoriesView.render();
                $('a[id="confirmBooking"]').addClass('ui-disabled')
                $("#sectionSelector").change();
            });

        },
        refreshPrices:function (event) {
            if (event.currentTarget.value != "Choose a section") {
                var priceCategories = _.filter(this.model.show.priceCategories, function (item) {
                    return item.section.id == event.currentTarget.value
                })
                var models = new Array()
                _.each(priceCategories, function (priceCategory) {
                    var model = new Model.PriceCategoryQuantity()
                    model.set('priceCategory', priceCategory)
                    models.push(model)
                })
                $("#ticketCategoriesViewPlaceholder").show()
                this.ticketCategoriesView.model = new Collection.SectionQuantities(models);
                this.ticketCategoriesView.render();
                $(this.el).trigger('pagecreate')
            } else {
                $("#ticketCategoriesViewPlaceholder").hide()
                this.ticketCategoriesView.model = new Collection.SectionQuantities([])
                this.updateForm()
            }
        },
        checkout:function () {
            this.model.bookingRequest.tickets.push(this.ticketCategoriesView.model)
            this.model.performance = new ConfirmBookingView({model:this.model, el:$("#container")}).render()
            $("#container").trigger('pagecreate')
        },
        updateForm:function () {

            var totals = _.reduce(this.ticketCategoriesView.model.models, function (partial, model) {
                if (model.attributes.quantity != undefined) {
                    partial.tickets += model.attributes.quantity
                    partial.price += model.attributes.quantity * model.attributes.priceCategory.price
                    return partial
                }
            }, {tickets:0, price:0.0})
            this.model.email = $("input[type='email']").val()
            this.model.bookingRequest.totals = totals
            if (totals.tickets > 0 && $("input[type='email']").val()) {
                $('a[id="confirmBooking"]').removeClass('ui-disabled')
            } else {
                $('a[id="confirmBooking"]').addClass('ui-disabled')
            }
        }
    });
});