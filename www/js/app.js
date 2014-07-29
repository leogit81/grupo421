/**
 * Aplicación PhoneGap. Cuando se inicializa la misma se bindean los eventos, el más importante de ellos es deviceready.
 * Una vez que se produjo este quiere decir que se puede llamar con seguridad a las funciones de la API de PhoneGap. 
 */
define(function () {
	"use strict";

    var consultasView = null;
    
	// Poll for Phonegap (Cordova) to avoid race conditions
    // with the deviceready event. For local development,
    // startup may need to be called directly.
    /*(function checkCordova() {
        // Check if Cordova exists
        if (window.cordova) {
            console.log("cordova exists");
            // Listen for the deviceready event
            document.addEventListener('deviceready', onDeviceReady, false);
        } else {
            console.log("cordova does not exists");
            // If Cordova does not exist, check again in 1/60th second
            //setTimeout(checkCordova, 16);
        }
    }());*/
        
	function initialize() {
	    console.log("app.initialize");
	    bindEvents();
	};
    
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    function bindEvents(){
        console.log("bind events");
        document.addEventListener('deviceready', onDeviceReady, false);
    };
    
    // deviceready Event Handler
    //
    // The scope of 'this' is the event.
    function onDeviceReady(){
        console.log("onDeviceReady");
        require(['appui', 'Views/ConsultasView'], function(appui, ConsultasView){
            consultasView = new ConsultasView();
            
            launchAppFramework();
            
            consultasView.render();
        });
    };

    function launchAppFramework(){
        $.ui.splitview = true;
        $.ui.toggleLeftSideMenu(false);
        $.ui.isAjaxApp = true;
        $.ui.launch();
    };
    
	return {
		initialize: initialize
	};
});