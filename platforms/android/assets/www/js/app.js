define(['require', 'cordova'], function (require, cordova) {
	"use strict";

	require('appui');
	
	// Application Constructor
	function initialize() {
	    this.bindEvents();
	};
    
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    function bindEvents(){
        document.addEventListener('deviceready', this.onDeviceReady, false);
    };
    
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    function onDeviceReady(){
        $.ui.splitview = true;
        $.ui.toggleLeftSideMenu(false);
        $.ui.isAjaxApp = true;
        $.ui.launch();
    };

	return {
		initialize: initialize
	};
});