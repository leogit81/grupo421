var Establecimiento = ( 
function(common, BaseModel){
    "use strict";
    
    var establecimiento = BaseModel.extend({
        self: null,
        
        defaults : {
            "codIndecProvincia" : null,
            "codigo" : null,
            "dependencia" : null,
            "fechaModificacion" : null,
            "fechaRegistro" : null,
            "nombre" : null,
            "provincia" : null,
            "tipologia" : null,          
        },
        
        initialize: function(attributes, options){
            self = this;
				
            BaseModel.prototype.initialize.call(this, attributes, options);
            this.service.loadConfig({
                url: 'establecimiento/buscar',
            });
        },
        
        setJsonData: function(jsonData){
            var establecimientoData = this.parse(jsonData);
            self.set(establecimientoData);
        },

        parse: function(response){
            return response.EstablecimientoSearchResponse.establecimientos.establecimientoReducido;
        }
    });
    
    return establecimiento;
})(common, BaseModel);