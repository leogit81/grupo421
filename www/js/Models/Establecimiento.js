define(['common', 'Base/BaseModel', 'Services/AjaxRestService'], 
function(common, BaseModel, service){
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
        
        load: function(data){
            this.sync('read', this, data);  
        },
        
        setJsonData: function(jsonData){
            var establecimientoData = this.parse(jsonData.establecimiento);
            self.set(establecimientoData);
        },

        /*parse: function(response){
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
        }*/
    });
    
    return establecimiento;
});