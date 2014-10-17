var Telefono = (function (BaseModel) {
	"use strict";
	
	var telefono = BaseModel.extend({
		defaults : {
			"numero" : null,
			"tipo" : null
		}
	});
	
	return telefono;
}(BaseModel));
