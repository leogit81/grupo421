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
		xmltojson: '../libraries/xmltojson',
		xmlToJsonConverter: '../libraries/XmlToJsonConverter',
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
	}
});

//solamente para debug
//define(['app-debug'], function (app) {
define(['app'], function (app) {
    app.initialize();   
});
//define(['app']);