var DrogueriaNominal = (function (common, BaseModel, CoordenadasMapa, Domicilio, Participaciones, Telefono) {
    "use strict";
    
    var drogueriaNominal = BaseModel.extend({
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
                    "categoriaTipologia": null,
                    "codIndecLocalidad": null,
                    "codIndecProvincia": null,
                    "codigo": null,
                    "dependencia": null,
                    "fechaRegistro": null,
                    "localidad": null,
                    "nombre": null,
                    "provincia": null,
                    "tipologia": null,
                    "codIndecDepto": null,
                    "coordenadasDeMapa" : CoordenadasMapa,
                    "depto": null,
                    "domicilio" : Domicilio,
                    "origenDelFinanciamiento": null,
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
            var drogueriaData = this.parse(jsonData.Drogueria);
            this.set(drogueriaData);
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
    
    drogueriaNominal.prototype.getServiceConfig = function () {
        return {
            url: 'drogueria'
        };
    };
    
    return drogueriaNominal;
}(common, BaseModel, CoordenadasMapa, Domicilio, Participaciones, Telefono));