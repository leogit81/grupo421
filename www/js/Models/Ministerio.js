var Ministerio = ( 
function(common, BaseModel, Telefono, CoordenadasMapa, Domicilio){
    "use strict";
    
    var ministerio = BaseModel.extend({
        self: null,

        nestedModels: {
            coordenadasDeMapa : CoordenadasMapa,
            domicilio : Domicilio,
            telefono1 : Telefono,
            telefono2 : Telefono,
            telefono3 : Telefono,
            telefono4 : Telefono,
        },
            
        defaults : {
            "localidad" : null,
            "mail1" : null,
            "ministroDeSalud" : null,
            "nombre" : null,
            "provincia" : null,
            "sitioWeb" : null,
            "coordenadasDeMapa" : new CoordenadasMapa(),
            "domicilio" : new Domicilio(),
            "telefono1" : new Telefono(),
            "telefono2" : new Telefono(),
            "telefono3" : new Telefono(),
            "telefono4" : new Telefono(),
        },
        
        initialize: function(attributes, options){
            self = this;
            
            BaseModel.prototype.initialize.call(this, attributes, options);
            this.service.loadConfig({
                url: 'ministerio',
            });
        },
        
        setJsonData: function(jsonData){
            var ministerioData = this.parse(jsonData.ministerio);
            self.set(ministerioData);
        },

        parse: function(response){
            for(var key in this.nestedModels)
            {
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
    
    return ministerio;
})(common, BaseModel, Telefono, CoordenadasMapa, Domicilio);