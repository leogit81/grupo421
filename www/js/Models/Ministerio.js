define(['Base/BaseModel', 'Models/Telefono', 'Models/CoordenadasMapa', 'Models/Domicilio', 'Services/AjaxRestService'], 
function(BaseModel, Telefono, CoordenadasMapa, Domicilio, service){
    "use strict";
    
    var ministerio = BaseModel.extend({
        self: null,
        
        defaults : {
            "coordenadasDeMapa" : new CoordenadasMapa(),
            "domicilio" : new Domicilio(),
            "localidad" : null,
            "mail1" : null,
            "ministroDeSalud" : null,
            "nombre" : null,
            "provincia" : null,
            "sitioWeb" : null,
            "telefono1" : new Telefono(),
            "telefono2" : new Telefono(),
            "telefono3" : new Telefono(),
            "telefono4" : new Telefono()
        },
        
        initialize: function(attributes, options){
            self = this;
            
            BaseModel.prototype.initialize.call(this, attributes, options);
            this.service.loadConfig({
                url: 'ministerio',
            });
        },
        
        load: function(){
            this.sync('read');  
        },
        
        setJsonData: function(jsonData){
            self.set(jsonData.ministerio);
        }
    });
    
    return ministerio;
});