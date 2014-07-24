define(['Base/BaseModel'], function(BaseModel){
    "use strict";
    
    var coordenadasMapa = BaseModel.extend({
        defaults : {
            "latitud" : null,
            "longitud" : null,
            "nivelZoom" : null
        }
    });
    
    return coordenadasMapa;
});
