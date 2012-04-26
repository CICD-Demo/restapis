define(['backbone'], function (Backbone) {

    return Backbone.Model.extend({

        initialize:function () {
            this.bind("change", this.onChange)
        },
        onChange:function () {
            if (!this.hasChanged('quantity'))
                return;
        }
    });

});