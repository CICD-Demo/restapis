define(['backbone'], function (Backbone) {
    return Backbone.Collection.extend({
        initialize:function () {
            this.on("change", function () {
                var sectionAggregate = _.reduce(this.models, function (aggregate, model) {
                    if (model.get('quantity') != null) {
                        return {tickets:(aggregate.tickets + model.get('quantity')),
                            price:(aggregate.price + model.get('priceCategory').price * model.get('quantity'))}
                    }
                    return aggregate;
                }, {tickets:0, price:0});
            })

        }
    });
});