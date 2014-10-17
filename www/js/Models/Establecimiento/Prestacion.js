var Prestacion = (function (BaseModel) {
    "use strict";
    
    var prestacion = BaseModel.extend({
        defaults : {
            "codigo" : null,
            "nombre" : null
        }
    });
    
    return prestacion;
}(BaseModel));