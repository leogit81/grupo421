var CamasCollection = (function (common, Backbone, converter, Service) {
	"use strict";

	var camasCollection = BaseCollection.extend({

		initialize: function (attributes, options) {
			BaseCollection.prototype.initialize.call(this, attributes, options);
			this.service.loadConfig(this.getServiceConfig());
		}
	});

	camasCollection.prototype.parse = function (parsedData) {
		var camasDisponibles = _.each(parsedData.camasEstablecimiento, function(item){

			return _.keys(item);
		}, this);
		return camasDisponibles;
	};

	camasCollection.prototype.setParsedData = function(parsedData) {
		//Si entra la primera vez, carga el model con la data. Si entra por segunda vez,
		//pisa el model con la nueva data. Habria que haber usado, BaseModel en vez de BaseCollection.
		if(this.models.length > 0){	
			this.models[0].set(parsedData);
		}else{
			this.set(parsedData);
		}
	};

	camasCollection.prototype.getServiceConfig = function () {
		return {
			url: 'establecimiento/camas',
			postUrl: 'establecimiento/modificarCamas',
			updateCallback: _.bind(function(data){
				this.trigger('updateOk');
			},this)
		};
	};

	_.extend(camasCollection, Backbone.Singleton);

	return camasCollection;
}(common, Backbone, XmlToJSONConverter, AjaxRestService));