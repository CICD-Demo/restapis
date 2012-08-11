/**
 * Shortcut alias definitions - will come in handy when declaring dependencies
 * Also, they allow you to keep the code free of any knowledge about library
 * locations and versions
 */
require.config({
    baseUrl: "resources/js",
    paths: {
        jquery:'libs/jquery-1.7.1',
        underscore:'libs/underscore',
        text:'libs/text',
        order:'libs/order',
        bootstrap: 'libs/bootstrap',
        utilities: 'app/utilities',
        router:'app/router/desktop/router'
    }
});

// Backbone is not AMD-ready, so a individual module is declared
define("backbone", [
    // the order plugin is used to ensure that the modules are loaded in the right order
    'order!jquery',
    'order!underscore',
    'order!libs/backbone'], function(){
    return Backbone;
});

define("configuration", {
    baseUrl : ""
});

define("initializer", [
    'configuration',
    'jquery',
    'utilities',
    'text!../templates/mobile/main.html'
], function (config,
             $,
             utilities,
             MainTemplate) {
    $('head').append('<link type="text/css" rel="stylesheet" href="resources/css/screen.css"/>');
    $('head').append('<link rel="stylesheet" href="resources/css/bootstrap.css" type="text/css" media="all"/>');
    $('head').append('<link rel="stylesheet" href="resources/css/custom.css" type="text/css" media="all">');
    $('head').append('<link href="http://fonts.googleapis.com/css?family=Rokkitt" rel="stylesheet" type="text/css">');
    $('head').append('<link href="http://fonts.googleapis.com/css?family=Rokkitt" rel="stylesheet" type="text/css">');
});


// Now we declare all the dependencies
require([
    'order!jquery',
    'text',
    'order!initializer',
    'order!underscore',
    'order!backbone',
    'order!bootstrap',
    'order!router'
], function(){
    console.log('all loaded');
});