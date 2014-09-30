var Ministerio = (function (common, BaseModel, Telefono, CoordenadasMapa, Domicilio) {
    "use strict";
    
    var ministerio = BaseModel.extend({
        nestedModels: {
            coordenadasDeMapa : CoordenadasMapa,
            domicilio : Domicilio,
            telefono1 : Telefono,
            telefono2 : Telefono,
            telefono3 : Telefono,
            telefono4 : Telefono
        },
            
        defaults: {
            "localidad" : null,
            "mail1" : null,
            "ministroDeSalud" : null,
            "nombre" : null,
            "provincia" : null,
            "sitioWeb" : null,
            "coordenadasDeMapa" : CoordenadasMapa,
            "domicilio" : Domicilio,
            "telefono1" : Telefono,
            "telefono2" : Telefono,
            "telefono3" : Telefono,
            "telefono4" : Telefono
        },
        
        initialize: function (attributes, options) {
            BaseModel.prototype.initialize.call(this, attributes, options);
            this.service.loadConfig(this.getServiceConfig());
        },
        
        setJsonData: function (jsonData) {
            var ministerioData = this.parse(jsonData.ministerio);
            this.set(ministerioData);
        },

        parse: function (response) {
            for (var key in this.nestedModels) {
                var nestedModel = this.nestedModels[key];
                var modelData = response[key];
                
                var modelExistente = this.get(key); 
                if(common.isEmpty(modelExistente))
                {
                    response[key] = new nestedModel(modelData);
                }
                else{
                    response[key] = modelExistente.set(modelData);
                }
            }
            return response;
        }
    });
    
    ministerio.prototype.getServiceConfig = function() {
        return {
            url: 'ministerio'
        };
    };
    
    return ministerio;
})(common, BaseModel, Telefono, CoordenadasMapa, Domicilio);