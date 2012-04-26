define(['backbone', 'utilities', 'app/models/loader', 'app/collections/loader'], function (Backbone, utilities, Model, Collection) {


    var SectionSelectorView = Backbone.View.extend({
        render:function () {
            var self = this;
            utilities.applyTemplate($(this.el), $("#select-section"), { sections:_.uniq(_.sortBy(_.pluck(self.model.priceCategories, 'section'), function (item) {
                return item.id
            }), true, function (item) {
                return item.id
            })});
            return this
        }
    });

    var TicketCategoryView = Backbone.View.extend({
        events:{
            "change input":"onChange"
        },
        render:function () {
            utilities.applyTemplate($(this.el), $('#ticket-entry'), this.model.attributes);
            return this;
        },
        onChange:function (event) {
            var value = event.currentTarget.value;
            if ($.isNumeric(value) && value > 0) {
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
            return this;
        },
        updateModel:function () {

        }
    });

    var TicketSummaryLineView = Backbone.View.extend({
        tagName:'tr',
        events:{
            "click i":"removeEntry"
        },
        render:function () {
            utilities.applyTemplate($(this.el), $('#ticket-request-summary'), {ticketRequest:this.model.ticketRequest})
            return this
        },
        removeEntry:function () {
            this.model.tickets.splice(this.model.index, 1)
        }
    });

    var TicketSummaryView = Backbone.View.extend({
        render:function () {
            var self = this
            utilities.applyTemplate($(this.el), $('#ticket-summary-view'), this.model.bookingRequest)
            _.each(this.model.bookingRequest.tickets, function (ticketRequest, index, tickets) {
                $('#ticketRequestSummary')
                    .append(new TicketSummaryLineView({model:{ticketRequest:ticketRequest, index:index, tickets:tickets, parentView:self}}).render().el);
            });
        }
    });

    return Backbone.View.extend({
        events:{
            "click input[name='submit']":"save",
            "change select":"refreshPrices",
            "keyup #email":"updateEmail",
            "click input[name='add']":"addQuantities",
            "click i":"updateQuantities"
        },
        render:function () {

            var self = this;
            $.getJSON("rest/shows/" + this.model.showId, function (selectedShow) {

                self.currentPerformance = _.find(selectedShow.performances, function (item) {
                    return item.id == self.model.performanceId
                });
                utilities.applyTemplate($(self.el), $("#create-booking"), { show:selectedShow,
                    performance:self.currentPerformance});
                self.selectorView = new SectionSelectorView({model:selectedShow, el:$("#sectionSelectorPlaceholder")}).render();
                self.ticketCategoriesView = new TicketCategoriesView({model:{}, el:$("#ticketCategoriesViewPlaceholder") });
                self.ticketSummaryView = new TicketSummaryView({model:self.model, el:$("#ticketSummaryView")});
                self.show = selectedShow;
                self.ticketCategoriesView.render();
                self.ticketSummaryView.render();
                $("#sectionSelector").change();
            });
        },
        refreshPrices:function (event) {
            var priceCategories = _.filter(this.show.priceCategories, function (item) {
                return item.section.id == event.currentTarget.value
            })
            var models = new Array()
            _.each(priceCategories, function (priceCategory) {
                var model = new Model.PriceCategoryQuantity()
                model.set('priceCategory', priceCategory)
                models.push(model)
            })
            this.ticketCategoriesView.model = new Collection.SectionQuantities(models);
            this.ticketCategoriesView.render();
        },
        save:function (event) {
            var bookingRequest = {ticketRequests:[]};
            var self = this;
            bookingRequest.ticketRequests = _.map(this.model.bookingRequest.tickets, function (ticket) {
                return {priceCategory:ticket.priceCategory.id, quantity:ticket.quantity}
            });
            bookingRequest.email = this.model.bookingRequest.email;
            bookingRequest.performance = this.model.performanceId
            $.ajax({url:"rest/bookings",
                data:JSON.stringify(bookingRequest),
                type:"POST",
                dataType:"json",
                contentType:"application/json",
                success:function (booking) {
                    this.model = {}
                    $.getJSON('rest/shows/performance/' + booking.performance.id, function (retrievedPerformance) {
                        utilities.applyTemplate($(self.el), $("#booking-confirmation"), {booking:booking, performance:retrievedPerformance })
                    });
                }}).error(function (error) {
                    if (error.status == 400 || error.status == 409) {
                        var errors = $.parseJSON(error.responseText).errors;
                        _.each(errors, function (errorMessage) {
                            $("#request-summary").append('<div class="alert alert-error"><a class="close" data-dismiss="alert">×</a><strong>Error!</strong> ' + errorMessage + '</div>')
                        });
                    } else {
                        $("#request-summary").append('<div class="alert alert-error"><a class="close" data-dismiss="alert">×</a><strong>Error! </strong>An error has occured</div>')
                    }

                })

        },
        addQuantities:function () {
            var self = this;

            _.each(this.ticketCategoriesView.model.models, function (model) {
                if (model.attributes.quantity != undefined) {
                    var found = false
                    _.each(self.model.bookingRequest.tickets, function (ticket) {
                        if (ticket.priceCategory.id == model.attributes.priceCategory.id) {
                            ticket.quantity += model.attributes.quantity
                            found = true;
                        }
                    });
                    if (!found) {
                        self.model.bookingRequest.tickets.push({priceCategory:model.attributes.priceCategory, quantity:model.attributes.quantity})
                    }
                }
            });
            this.ticketCategoriesView.model = null
            $('option:selected', 'select').removeAttr('selected')
            this.ticketCategoriesView.render()
            this.selectorView.render();
            this.updateQuantities();
        },
        updateQuantities:function () {
            // make sure that tickets are sorted by section and ticket category
            this.model.bookingRequest.tickets.sort(function (t1, t2) {
                if (t1.priceCategory.section.id != t2.priceCategory.section.id) {
                    return t1.priceCategory.section.id - t2.priceCategory.section.id;
                }
                else {
                    return t1.priceCategory.ticketCategory.id - t2.priceCategory.ticketCategory.id
                }
            });

            this.model.bookingRequest.totals = _.reduce(this.model.bookingRequest.tickets, function (totals, ticketRequest) {
                return {
                    tickets:totals.tickets + ticketRequest.quantity,
                    price:totals.price + ticketRequest.quantity * ticketRequest.priceCategory.price
                };
            }, {tickets:0, price:0.0});

            this.ticketSummaryView.render();
            this.setCheckoutStatus()
        },
        updateEmail:function (event) {
            if ($(event.currentTarget).is(':valid')) {
                this.model.bookingRequest.email = event.currentTarget.value

            } else {
                delete this.model.bookingRequest.email
            }
            this.setCheckoutStatus()
        },
        setCheckoutStatus:function () {
            if (this.model.bookingRequest.totals != undefined && this.model.bookingRequest.totals.tickets > 0 && this.model.bookingRequest.email != undefined && this.model.bookingRequest.email != '') {
                $('input[name="submit"]').removeAttr('disabled')
            }
            else {
                $('input[name="submit"]').attr('disabled', true)
            }
        }
    });
});