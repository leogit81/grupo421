var InicioSesion = (function (common, BaseModel) {
    "use strict";
    var inicioSesion = BaseModel.extend({
        defaults : {
            "usuario" : null,
            "clave" : null,
            "permisos": null
        },

        initialize: function (attributes, options) {
            BaseModel.prototype.initialize.call(this, attributes, options);
            this.service.loadConfig(this.getServiceConfig());
        },

        processData: function (data) {
            //            var jsonData = this.converter.convert(data);
            //            this.setJsonData(jsonData);

            /*Parche para cancelar ejecución si el usuario no se autenticó correctamente*/
            if (!BaseModel.prototype.processData.call(this,data)) return;
            /*
            *Si llegó a este punto es porque el usuario autenticó correctamente.
            *Se actualiza el serviceConfig con usuario y contraseña.
            *Se actualiza el boton de inicio/cierre de sesión.
            *Se persisten los datos de loggeo en el localStorage.
            */

            ServiceConfig.usuario = this.get("usuario");
            ServiceConfig.clave = this.get("clave");
            
            /*
            *Si $.ui.history.length = 0, significa que estamos en el home. 
            *En cualquier otro caso, no se muestra el botón de inicio de sesión
            */
            if($.ui.history.length == 0)
            {
                common.showLogin();
            }

            if (typeof(localStorage) == 'undefined' ) {
                alert('Almacenamiento local no soportado.');
            } else {
                try {
                    localStorage.setItem('usuario', this.get("usuario"));
                    localStorage.setItem('clave', this.get("clave"));
                } catch (e) {
                    if (e == QUOTA_EXCEEDED_ERR) {
                        alert('Límite de almacenamiento excedido.');
                    }
                }
            }

        }
    });

    inicioSesion.prototype.getServiceConfig = function () {
        return {
            baseUrl: 'https://qa.sisa.msal.gov.ar/sisaqa/services/rest',
            url: 'seguridad/autenticar'
        };
    };
    return inicioSesion;
}(common, BaseModel));