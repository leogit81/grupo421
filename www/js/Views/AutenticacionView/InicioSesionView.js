var InicioSesionView = (function ($, common, _, InicioSesion) {
    "use strict";

    var inicioSesionview = function () {
        $("#afui").popup(
            {
                title: "Iniciar sesión",
                message: "Usuario: <input id='login_user' type='text' class='af-ui-forms'><br>" + 
                "Contraseña: <input id='login_pass' type='password' class='af-ui-forms' style='webkit-text-security:disc'><br>",
                cancelText: "Cancelar",
                cancelCallback: function () {},
                doneText: "Acceder",
                doneCallback: function () {
                    var user = $("#login_user").val();
                    var pass = $("#login_pass").val();
                    var dataWS = {credenciales: {usuario: user, clave: pass}};
                    var iniciarSesion = new InicioSesion();
                    iniciarSesion.set("usuario", user);
                    iniciarSesion.set("clave", pass);
                    iniciarSesion.post(dataWS);
                },
                cancelOnly: false
            }
        );
    };
    return inicioSesionview;
}(af, common, _, InicioSesion));

var CierreSesionView = (function ($, common, _) {
    "use strict";

    var cierreSesionview = function () {
        $("#afui").popup(
            {
                title: "Cerrar sesión",
                message: "¿Desde cerrar sesión?",
                cancelText: "Cancelar",
                cancelCallback: function () {},
                doneText: "Aceptar",
                doneCallback: function () {
                    /*
                    *Se borran los datos del usuario tanto del serviceconfig como del local storage
                    *y se actualiza en el header el botón de inicio/cierre de sesión.
                    */
                    localStorage.clear();
                    ServiceConfig.usuario = null;
                    ServiceConfig.clave = null;
                    common.showLogin();
                },
                cancelOnly: false
            }
        );
    };
    return cierreSesionview;
}(af, common, _));