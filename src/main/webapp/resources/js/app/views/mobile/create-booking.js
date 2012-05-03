define([
    'backbone',
    'utilities',
    'require',
    'text!../../../../templates/mobile/booking-details.html',
    'text!../../../../templates/mobile/create-booking.html',
    'text!../../../../templates/mobile/confirm-booking.html',
    'text!../../../../templates/mobile/select-section.html',
    'text!../../../../templates/mobile/ticket-entry.html',
    'text!../../../../templates/mobile/ticket-entries.html',
    'text!../../../../templates/mobile/ticket-summary-view.html'
], function (
    Backbone,
    utilities,
    require,
    bookingDetailsTemplate,
    createBookingTemplate,
    confirmBookingTemplate,
    selectSectionTemplate,
    ticketEntryTemplate,
    ticketEntriesTemplate,
    ticketSummaryViewTemplate) {

    var SectionSelectorView = Backbone.View.extend({
        render:function () {
            var self = this;
            utilities.applyTemplate($(this.el), selectSectionTemplate, { sections:_.uniq(_.sortBy(_.pluck(self.model.priceCategories, 'section'), function (item) {
                return item.id;
            }), true, function (item) {
                return item.id;
            })});
            $(this.el).trigger('pagecreate');
            return this;
        }
    });

    var TicketCategoryView = Backbone.View.extend({
        events:{
            "change input":"onChange"
        },
        render:function () {
            utilities.applyTemplate($(this.el), ticketEntryTemplate, this.model);
            $(this.el).trigger('pagecreate');
            return this;
        },
        onChange:function (event) {
            var value = event.currentTarget.value;
            if (value != '' && value != 0) {
                this.model.quantity = parseInt(value);
            }
            else {
                delete this.model.quantity;
            }
        }
    });


    var TicketCategoriesView = Backbone.View.extend({
        id:'categoriesView',
        render:function () {
            var views = {};

            if (this.model != null) {
                var priceCategories = _.map(this.model, function (item) {
                    return item.priceCategory;
                });
                utilities.applyTemplate($(this.el), ticketEntriesTemplate, {priceCategories:priceCategories});

                _.each(this.model, function (model) {
                    $("#ticket-category-input-" + model.priceCategory.id).append(new TicketCategoryView({model:model}).render().el);

                });
            } else {
                $(this.el).empty();
            }
            $(this.el).trigger('pagecreate');
            return this;
        }
    });

     var TicketSummaryView = Backbone.View.extend({
        render:function () {
            utilities.applyTemplate($(this.el), ticketSummaryViewTemplate, this.model.bookingRequest)
        }
    });

    var ConfirmBookingView = Backbone.View.extend({
        events:{
            "click a[id='saveBooking']":"save",
            "click a[id='goBack']":"back"
        },
        render:function () {
            utilities.applyTemplate($(this.el), confirmBookingTemplate, this.model)
            this.ticketSummaryView = new TicketSummaryView({model:this.model, el:$("#ticketSummaryView")});
            this.ticketSummaryView.render();
            $(this.el).trigger('pagecreate')
        },
        back:function () {
            require("router").navigate('book/' + this.model.bookingRequest.show.id + '/' + this.model.bookingRequest.performance.id, true)

        }, save:function (event) {
            var bookingRequest = {ticketRequests:[]};
            var self = this;
            _.each(this.model.bookingRequest.tickets, function (collection) {
                _.each(collection, function (model) {
                    if (model.quantity != undefined) {
                        bookingRequest.ticketRequests.push({priceCategory:model.priceCategory.id, quantity:model.quantity})
                    };
                })
            });

            bookingRequest.email = this.model.email;
            bookingRequest.performance = this.model.performanceId;
            $.ajax({url:"rest/bookings",
                data:JSON.stringify(bookingRequest),
                type:"POST",
                dataType:"json",
                contentType:"application/json",
                success:function (booking) {
                    utilities.applyTemplate($(self.el), bookingDetailsTemplate, booking)
                    $(self.el).trigger('pagecreate');
                }}).error(function (error) {
                    alert(error);
                });
            this.model = {};
        }
    });


    var CreateBookingView = Backbone.View.extend({

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
                    return item.id == self.model.performanceId;
                });
                utilities.applyTemplate($(self.el), createBookingTemplate, { show:selectedShow,
                    performance:self.model.performance});
                $(self.el).trigger('pagecreate');
                self.selectorView = new SectionSelectorView({model:selectedShow, el:$("#sectionSelectorPlaceholder")}).render();
                self.ticketCategoriesView = new TicketCategoriesView({model:{}, el:$("#ticketCategoriesViewPlaceholder") });
                self.model.show = selectedShow;
                self.ticketCategoriesView.render();
                $('a[id="confirmBooking"]').addClass('ui-disabled');
                $("#sectionSelector").change();
            });

        },
        refreshPrices:function (event) {
            if (event.currentTarget.value != "Choose a section") {
                var priceCategories = _.filter(this.model.show.priceCategories, function (item) {
                    return item.section.id == event.currentTarget.value;
                });
                var priceCategoryInputs = new Array();
                _.each(priceCategories, function (priceCategory) {
                    var model = {};
                    model.priceCategory = priceCategory;
                    priceCategoryInputs.push(model);
                });
                $("#ticketCategoriesViewPlaceholder").show();
                this.ticketCategoriesView.model = priceCategoryInputs;
                this.ticketCategoriesView.render();
                $(this.el).trigger('pagecreate');
            } else {
                $("#ticketCategoriesViewPlaceholder").hide();
                this.ticketCategoriesView.model = new Array();
                this.updateForm();
            }
        },
        checkout:function () {
            this.model.bookingRequest.tickets.push(this.ticketCategoriesView.model);
            this.model.performance = new ConfirmBookingView({model:this.model, el:$("#container")}).render();
            $("#container").trigger('pagecreate');
        },
        updateForm:function () {

            var totals = _.reduce(this.ticketCategoriesView.model, function (partial, model) {
                if (model.quantity != undefined) {
                    partial.tickets += model.quantity;
                    partial.price += model.quantity * model.priceCategory.price;
                    return partial;
                }
            }, {tickets:0, price:0.0});
            this.model.email = $("input[type='email']").val();
            this.model.bookingRequest.totals = totals;
            if (totals.tickets > 0 && $("input[type='email']").val()) {
                $('a[id="confirmBooking"]').removeClass('ui-disabled');
            } else {
                $('a[id="confirmBooking"]').addClass('ui-disabled');
            }
        }
    });
    return CreateBookingView;
});