define(function (require) {
	"use strict";

	require('appui');
	
	function initialize() {
		$.ui.splitview = true;
		$.ui.toggleLeftSideMenu(true);
		$.ui.isAjaxApp = true;
	}

	return {
		initialize: initialize
	};
});