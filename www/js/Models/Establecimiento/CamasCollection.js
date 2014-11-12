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

	camasCollection.prototype.getServiceConfig = function () {
		return {
			url: 'establecimiento/camas'
		};
	};

	_.extend(camasCollection, Backbone.Singleton);

	return camasCollection;
}(common, Backbone, XmlToJSONConverter, AjaxRestService));