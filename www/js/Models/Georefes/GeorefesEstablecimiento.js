var GeorefesEstablecimiento = (function (common, BaseModel, CoordenadasMapa) {
    "use strict";
    
    var georefesEstablecimiento = BaseModel.extend({
        nestedModels: {
            coordenadasDeMapa : CoordenadasMapa
        },
        
        defaults : function () {
            var myDefault = function () {
                return {
                    "codIndecProvincia" : null,
                    "codigo" : null,
                    "dependencia" : null,
                    "fechaRegistro" : null,
                    "nombre" : null,
                    "provincia" : null,
                    "tipologia" : null,
                    "coordenadasDeMapa" : CoordenadasMapa,
                    "distancia": null
                };
            };
            
            return new myDefault();
        },
        
        initialize: function (attributes, options) {
            BaseModel.prototype.initialize.call(this, attributes, options);
            this.service.loadConfig(this.getServiceConfig());
        },
            
        setJsonData: function (jsonData) {
            var establecimientoData = this.parse(jsonData.Establecimiento);
            this.set(establecimientoData);
        },

        parse: function (response) {
            for (var key in this.nestedModels)
            {
                var nestedModel = this.nestedModels[key];
                var modelData = response[key];
                
                var modelExistente = this.get(key); 
                if (common.isEmpty(modelExistente)) {
                    response[key] = new nestedModel(modelData);
                } else {
                    response[key] = modelExistente.set(modelData);
                }
            }
            return response;
        }
    });
    
    georefesEstablecimiento.prototype.getServiceConfig = function () {
        return {
            url: 'establecimiento/buscarCercanos'
        };
    };
    
    return georefesEstablecimiento;
}(common, BaseModel, CoordenadasMapa));