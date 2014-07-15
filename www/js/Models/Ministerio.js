define(['Base/BaseModel', 'Models/Telefono', 'Models/CoordenadasMapa', 'Models/Domicilio', 'Services/MinisterioService'], 
function(BaseModel, Telefono, CoordenadasMapa, Domicilio, service){
    "use strict";
    
    var ministerio = BaseModel.extend({
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
            BaseModel.prototype.initialize.call(this, attributes, options);
            this.service.loadConfig({
                url: 'ministerio',
                success: this.processData,
            });
        },
        
        load: function(){
            this.sync('create');  
        },
        processData: function(data){
            var jsonData = this.converter.convertToJson(data);
            this.set(jsonData);
        },
    });
    
    return ministerio;
});