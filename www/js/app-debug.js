define(['require', 'appui', 'Views/MenuConsultasView'], function (require, appui, MenuConsultasView) {
	"use strict";

	//require('appui');
	
	function initialize() {
	    $.ui.splitview = true;
        $.ui.toggleLeftSideMenu(false);
        $.ui.isAjaxApp = true;
        $.ui.launch();
	};

    var menuConsultasView = new MenuConsultasView();
    
	return {
	   menuConsultasView: menuConsultasView, 
	   initialize: initialize
	};
});