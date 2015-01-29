var AppVersion = (function (BaseModel) {
    "use strict";
    
    var appVersion = BaseModel.extend({
        defaults : {
            "nombreAplicacion" : null,
            "version" : null,
            "idImagen": null
        },
        
        initialize: function (attributes, options) {
            BaseModel.prototype.initialize.call(this, attributes, options);
            this.set("nombreAplicacion", "SISA Móvil");
            this.set("version", "0.92");
            this.set("urlImagen", "./img/sisaMobile.png");
            this.set("idImagen", "sisaMobileLogo2");
        }
    });
    
    return appVersion;
}(BaseModel));