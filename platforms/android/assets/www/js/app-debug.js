define(function (require) {
	"use strict";

	require('appui');
	
	function initialize() {
	    $.ui.splitview = true;
        $.ui.toggleLeftSideMenu(false);
        $.ui.isAjaxApp = true;
        $.ui.launch();
	};

	return {
		initialize: initialize
	};
});