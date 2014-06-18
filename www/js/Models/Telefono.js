define(function(require){
	"use strict";
	
	var Backbone = require('backbone');
		
	var telefono = Backbone.Model.extend({
		defaults : {
			"numero" : null,
			"tipo" : null
		}
	});
	
	return{
		Telefono: telefono
	};
});
