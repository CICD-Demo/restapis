define([
    'backbone',
    'utilities',
    'text!../../../../templates/desktop/booking-table.html'
],function (Backbone,
            utilities,
            bookingTableTemplate) {

    var BookingsView = Backbone.View.extend({
        events:{
            "click i[data-tm-role='delete']":"deleteBooking",
            "click a[data-tm-role='page']":"loadPage"
        },
        render:function () {
            var paginator = {};
            paginator.totalPageCount = Math.floor(this.options.count/this.options.pageSize)
                                       + (this.options.count%this.options.pageSize == 0? 0 : 1);
            paginator.currentPage = this.options.page;
            utilities.applyTemplate($(this.el), bookingTableTemplate, {model:this.model.bookings, paginator:paginator});
            return this;
        },
        loadPage: function(event) {
            var page = $(event.currentTarget).data("tm-page");
            var options = {};
            options.first = (page-1)*this.options.pageSize + 1;
            options.maxResults = this.options.pageSize;
            this.options.page = page;
            var self = this;
            $.get(
                "rest/bookings/count",
                function (data) {
                    self.options.count = data.count;
                    if (self.options.count > 0 ) {
                    self.model.bookings.fetch({data:options,
                        processData:true, success:function () {
                            self.render();
                            $("a[data-tm-page='"+page+"']").addClass("active")
                        }});
                    }
                });

        },
        deleteBooking:function (event) {
            var id = $(event.currentTarget).data("tm-id");
            if (confirm("Are you sure you want to delete booking " + this.model.get(id).get('id'))) {
                this.model.get(id).destroy({wait:true});
            };
        }
    });

    return BookingsView;

});