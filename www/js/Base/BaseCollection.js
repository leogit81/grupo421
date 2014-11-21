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
    };

    baseCollection.prototype.sync = function (method, model, options) {
        BaseModel.prototype.sync.call(this, method, model, options);
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
                /*var coordenadas = {
                    "latitud": coordenadasDeMapaModel.latitud,
                    "longitud": coordenadasDeMapaModel.latitud
                };*/
                
//                listaDeCoordenadas.push(coordenadasDeMapa);
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

    _.extend(baseCollection, Backbone.Singleton);
    common.extendSinPisar(baseCollection.prototype , false, BaseModel.prototype);

    return baseCollection;
}(common, Backbone, XmlToJSONConverter, AjaxRestService, BaseModel));