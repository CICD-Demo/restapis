// Shortcut alias definitions - will come in handy when declaring dependencies
// Also, they allow us to keep the code free of any knowledge about library locations and versions
require.config({
    paths: {
        jQuery:'libs/jquery-1.7.1',
        modernizr:'libs/modernizr-2.0.6',
        underscore:'libs/underscore',
        text:'libs/text',
        bootstrap: '../bootstrap/js/bootstrap'
    }
});

define("backbone", ['jQuery','libs/backbone'], function($){
    return Backbone;
})

// Now we declare all the dependencies
require(['jQuery','underscore','backbone', 'text', 'bootstrap', 'text!../templates/templates.html', 'app/tm-utils'],
       function(jQ, _, backbone, text, bootstrap, templates){
    $('head').append(templates)
    console.log('all loaded')
})