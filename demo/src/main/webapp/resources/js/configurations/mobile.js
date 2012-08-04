var BASE_URL = "";

/**
 * Shortcut alias definitions - will come in handy when declaring dependencies
 * Also, they allow you to keep the code free of any knowledge about library
 * locations and versions
 */
require.config({
    baseUrl:"resources/js",
    paths: {
        jquery:'libs/jquery-1.7.1',
        jquerymobile:'libs/jquery.mobile-1.1.0',
        text:'libs/text',
        order: 'libs/order',
        utilities: 'app/utilities',
        router:'app/router/mobile/router'
    }
});

define("configuration", {
        baseUrl : BASE_URL
});

define('underscore',[
    'libs/underscore'
], function(){
    return _;
});

define("backbone", [
    'order!jquery',
    'order!underscore',
    'order!libs/backbone'
], function(){
    return Backbone;
});

define("initializer", [
    'jquery',
    'utilities',
    'text!../templates/mobile/main.html'
], function ($,
             utilities,
             MainTemplate) {
    $('head').append('<link rel="stylesheet" href="resources/css/jquery.mobile-1.1.0.css"/>');
    $('head').append('<link rel="stylesheet" href="resources/css/m.screen.css"/>');
    $(document).bind("mobileinit", function () {
        utilities.applyTemplate($('body'), MainTemplate)
    });
});


// Now we declare all the dependencies
require(['order!initializer', 'order!router'],
    function(){
        console.log('all loaded')
    });
