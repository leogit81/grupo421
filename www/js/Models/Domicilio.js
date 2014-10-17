var Domicilio = (function (BaseModel) {
    "use strict";
    
    var domicilio = BaseModel.extend({
        defaults : {
            "codigoPostal" : null,
            "direccion" : null
        }
    });
    
    return domicilio;
}(BaseModel));
