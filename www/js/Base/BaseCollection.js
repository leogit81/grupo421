/**
* Modelo para una colección de objetos. Extiende la colección de Backbone.
*/
var BaseCollection = (function (common, Backbone, converter, Service, BaseModel) {
	"use strict";

	var baseCollection = Backbone.Collection.extend({
		initialize: function (attributes, options) {
			this.service = new Service({
				success: _.bind(this.processData, this)
			});
			options = options || {};
			this.setConverter(options.converter || converter);
		}
	});

	baseCollection.prototype.setJsonData = function (jsonData) {
		var modelData = this.parse(jsonData);
		this.setParsedData(modelData);
        //si la colección se encuentra vacía actualmente, y además, luego de ejecutar
        //el servicio tampoco se obtienen registros, se dispara un evento para indicar que no hay datos.
        if (this.length == 0 && modelData.length == 0) {
            this.trigger("registrosNoEncontrados");
        }
	};

	baseCollection.prototype.sync = function (method, model, options, otraUrl) {
		BaseModel.prototype.sync.call(this, method, model, options, otraUrl);
	};

	/**
    * Parsea los datos que vienen del objeto JSON para poder setearlos en el modelo
    */
	baseCollection.prototype.parse = function (jsonData) {
		//sobreescribir en las clases derivadas.
	};

	baseCollection.prototype.setParsedData = function (parsedData) {
		this.set(parsedData);
	};

	baseCollection.prototype.processData = function (data) {
		BaseModel.prototype.processData.call(this, data);
	};

	baseCollection.prototype.obtenerCoordenadasMarcadoresMapa = function () {
		var listaDeCoordenadas = [];

		_.each(this.models, function (item, index, list) {
			var coordenadasDeMapa = item.get("coordenadasDeMapa");

			if (!common.isEmpty(coordenadasDeMapa)) {
				listaDeCoordenadas.push(item.attributes);
			}

		});

		return listaDeCoordenadas;
	};

	/**
    * Obtiene la posición en la cual se centrará el mapa.
    */
	baseCollection.prototype.getCenterPosition = function () {
		var coordenadas = {
			"latitud": this.latitud,
			"longitud": this.longitud
		};

		return coordenadas;
	};

	baseCollection.prototype.update = function (data, otraUrl) {
		this.sync('update', this, data, otraUrl);
	};

	_.extend(baseCollection, Backbone.Singleton);
	common.extendSinPisar(baseCollection.prototype , false, BaseModel.prototype);

	return baseCollection;
}(common, Backbone, XmlToJSONConverter, AjaxRestService, BaseModel));