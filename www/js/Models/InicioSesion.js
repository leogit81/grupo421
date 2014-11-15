var InicioSesion = (function (common, BaseModel) {
    "use strict";
    var inicioSesion = BaseModel.extend({
        defaults : {
            "usuario" : null,
            "clave" : null
        },

        initialize: function (attributes, options) {
            BaseModel.prototype.initialize.call(this, attributes, options);
            this.service.loadConfig(this.getServiceConfig());
        },
        /*
        ** Se sobreescribe el método sync para que ejecute un POST en vez de un GET
        */
//        sync: function (method, model, options) {
//            if (method === 'read') {
//                this.service.post(options);
//            }
//        }
    });

    inicioSesion.prototype.getServiceConfig = function () {
        return {
            baseUrl: 'https://qa.sisa.msal.gov.ar/sisaqa/services/rest',
            url: 'seguridad/autenticar'
        };
    };
    return inicioSesion;
}(common, BaseModel));