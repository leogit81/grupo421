var app_debug = (function (app) {
    "use strict";
    
    function initialize() {
       app.onDeviceReady();
    };
    
    return {
       initialize: initialize
    };
})(app);