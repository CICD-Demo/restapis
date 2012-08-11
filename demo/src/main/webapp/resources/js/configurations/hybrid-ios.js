// override configuration for RESTful services
var TicketMonster = {
    config:{
        baseRESTUrl:"http://ticketmonster-jdf.rhcloud.com/"
    }
}

require (["resources/js/libs/cordova-io-2.0.0.js","mobile"], function(cordovaIO, mobile) {
    // override baseUrl for RESTful services
});
