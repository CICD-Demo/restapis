// override configuration for RESTful services
var TicketMonster = {
    config:{
        baseRESTUrl:"http://ticketmonster-jdf.rhcloud.com/"
    }
};

(function checkCordova(){
    // Detect if Cordova is loaded, else repeat
    if(window.cordova) {
        // Detect if iOS 7 or higher and disable overlaying the status bar
        if(window.device.platform.toLowerCase() == "ios" &&
            parseFloat(window.device.version) >= 7.0) {
            StatusBar.overlaysWebView(false);
            StatusBar.backgroundColorByHexString("#3C3C3C");
        }
        // Load the mobile module
        require (["mobile"]);
    } else {
        setTimeout(checkCordova, 10);
    }
})();

