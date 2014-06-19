requirejs.config({
	enforceDefine: true,
	baseUrl: './js',
	paths : {
		underscore: '../libraries/underscore',
		jquery : '../libraries/jquery',
		backbone: '../libraries/backbone',
		appframework: '../libraries/appframework',
		appui: '../libraries/ui/appframework.ui',
		'jquery-private': '../libraries/jquery-private',
	},
	map: {
      // '*' means all modules will get 'jquery-private'
      // for their 'jquery' dependency.
      '*': { 'jquery': 'jquery-private' },

      // 'jquery-private' wants the real jQuery module
      // though. If this line was not here, there would
      // be an unresolvable cyclic dependency.
      'jquery-private': { 'jquery': 'jquery' }
    },
	shim : {
		'appui': {
			deps: ['appframework'],
			exports: 'af.ui'
		}
	}
});

//define(['appframework', 'underscore', 'backbone', 'jquery', 'appui'], function($,_,Backbone, jQuery, appui){
define(function(require){
	
	var app = require('app');
	app.initialize();
});
