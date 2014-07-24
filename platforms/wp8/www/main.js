requirejs.config({  
	enforceDefine: false,
	baseUrl: './js',
	paths : {
		underscore: '../libraries/underscore',
		jquery : '../libraries/jquery',
		backbone: '../libraries/backbone',
		appframework: '../libraries/appframework',
		appui: '../libraries/ui/appframework.ui',
		'jquery-private': '../libraries/jquery-private',
		xmltojson: '../libraries/xmltojson',
		xmlToJsonConverter: '../libraries/XmlToJsonConverter',
		cordova: '../libraries/cordova',
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
		},
		'xmltojson': {
            deps: [],
            exports: 'xmlToJSON',
        },
        'cordova': {
            deps: [],
        }
	}
});

define(function(require){
	
	//var app = require('app');
	
	//solamente para debug
	var app = require('app-debug');
	
	app.initialize();
});
