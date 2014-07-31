define(['app'], function (app) {
    "use strict";
    
    function initialize() {
       app.onDeviceReady();
    };
    
    return {
       initialize: initialize
    };
});