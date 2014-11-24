var CoordenadasMapa = (function (BaseModel) {
    "use strict";
    
    var coordenadasMapa = BaseModel.extend({
        defaults : {
            "latitud" : null,
            "longitud" : null,
            "nivelZoom" : null
        }
    });
    
    return coordenadasMapa;
}(BaseModel));