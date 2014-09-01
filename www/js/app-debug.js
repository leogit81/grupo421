var app_debug = (function (app, jQuery) {
    "use strict";
    
    function initialize() {
       jQuery(document).ready(function(){app.onDeviceReady()});
    };
    
    return {
       initialize: initialize
    };
})(app, jQuery);