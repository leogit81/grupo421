var EstablecimientoNominal = (function (common, BaseModel, CoordenadasMapa, Domicilio, Participaciones, Telefono) {
    "use strict";
    
    var establecimientoNominal = BaseModel.extend({
        nestedModels: {
            coordenadasDeMapa : CoordenadasMapa,
            domicilio : Domicilio,
            participaciones: Participaciones,
            telefono1 : Telefono,
            telefono2 : Telefono,
            telefono3 : Telefono,
            telefono4 : Telefono
        },
        
        defaults : function () {
            var myDefault = function () {
                return {
                    "codIndecProvincia" : null,
                    "codigo" : null,
                    "dependencia" : null,
                    "fechaModificacion" : null,
                    "fechaRegistro" : null,
                    "nombre" : null,
                    "provincia" : null,
                    "tipologia" : null,
                    "categoriaDeLaTipologia" : null,
                    "codIndecDepto" : null,
                    "codIndecLocalidad" : null,
                    "codigoSISA" : null,
                    "coordenadasDeMapa" : CoordenadasMapa,
                    "depto": null,
                    "domicilio" : Domicilio,
                    "imagenes": null,
                    "internacion" : null,
                    "localidad" : null,
                    "origenDelFinanciamiento" : null,
                    "participaciones" : Participaciones,
                    "telefono1" : Telefono,
                    "telefono2" : Telefono,
                    "telefono3" : Telefono,
                    "telefono4" : Telefono
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
    
    establecimientoNominal.prototype.getServiceConfig = function () {
        return {
            url: 'establecimiento'
        };
    };
    
    return establecimientoNominal;
}(common, BaseModel, CoordenadasMapa, Domicilio, Participaciones, Telefono));