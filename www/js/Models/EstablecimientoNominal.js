var EstablecimientoNominal = ( 
function(common, BaseModel){
    "use strict";
    
    var establecimientoNominal = BaseModel.extend({
        self: null,
        
        nestedModels: {
            coordenadasDeMapa : CoordenadasMapa,
            domicilio : Domicilio,
            participaciones: Participaciones,
            telefono1 : Telefono,
            telefono2 : Telefono,
            telefono3 : Telefono,
            telefono4 : Telefono,
        },
        
        defaults : {
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
            "coordenadasDeMapa" : new CoordenadasMapa(),
            "depto": null,
            "domicilio" : new Domicilio(),
            "imagenes": null,
            "internacion" : null,
            "localidad" : null,
            "origenDelFinanciamiento" : null,
            "participaciones" : new Participaciones(),
            "telefono1" : new Telefono(),
            "telefono2" : new Telefono(),
            "telefono3" : new Telefono(),
            "telefono4" : new Telefono()
        },
        
        initialize: function(attributes, options){
            self = this;
				
            BaseModel.prototype.initialize.call(this, attributes, options);
            this.service.loadConfig({
                url: 'establecimiento',
            });
        },
            
        setJsonData: function(jsonData){
            var ministerioData = this.parse(jsonData.Establecimiento);
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
    
    return establecimientoNominal;
})(common, BaseModel);