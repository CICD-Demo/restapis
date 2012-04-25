// Shortcut alias definitions - will come in handy when declaring dependencies
// Also, they allow us to keep the code free of any knowledge about library locations and versions
require.config({
    paths: {
        jquery:'libs/jquery-1.7.1',
        underscore:'libs/underscore',
        text:'libs/text',
        bootstrap: '../bootstrap/js/bootstrap',
        utilities: 'app/utilities'
    }
});

define("backbone", ['jquery','libs/backbone'], function($){
    return Backbone;
})

// Now we declare all the dependencies
require(['jquery','underscore','backbone', 'text', 'bootstrap', 'text!../templates/templates.html', 'app/desktop'],
       function($, _, backbone, text, bootstrap, templates){
    $('head').append(templates)
    console.log('all loaded')
})