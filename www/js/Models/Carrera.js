var Carrera = (function(BaseModel){
    "use strict";
    
    var carrera = BaseModel.extend({
        defaults : {
            "cantidadAnio" : null,
            "nivelFormacion" : null,
            "nombre" : null,
            "regulada" : null,
            "titulo" : null
        }
    });
    
    return carrera;
})(BaseModel);
