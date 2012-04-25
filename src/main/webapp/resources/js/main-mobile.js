// Shortcut alias definitions - will come in handy when declaring dependencies
// Also, they allow us to keep the code free of any knowledge about library locations and versions
require.config({
    paths: {
        jquery:'libs/jquery-1.7.1',
        jQueryMobile:'libs/jquery.mobile-1.1.0',
        text:'libs/text',
        order: 'libs/order',
        app:'app/tm-utils-mobile'
    }
});

define('underscore',['libs/underscore'], function(){
    return _;
});

define("backbone", ['order!jquery', 'order!underscore','order!libs/backbone'], function($, _){
    return Backbone;
});


// Now we declare all the dependencies
require(['app'],
       function(app){
    app.preparePage()
    console.log('all loaded')
})
