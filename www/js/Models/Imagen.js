var Imagen = (function(BaseModel){
    "use strict";
    
    var imagen = BaseModel.extend({
        defaults : {
            "imagen" : null,
            "titulo" : null
        }
    });
    
    return imagen;
})(BaseModel);