var InicioSesionView = (function ($, common, _, InicioSesion) {
    "use strict";

    var inicioSesionview = function () {
        /*Se invierte el orden de las funciones de cancelar y de aceptar
        para que queden los positivos a la izquiera y los negativos a la derecha*/
        $("#afui").popup(
            {
                title: "Iniciar sesión",
                message: "Usuario: <input id='login_user' type='text' class='af-ui-forms'><br>" + 
                "Contraseña: <input id='login_pass' type='password' class='af-ui-forms' style='webkit-text-security:disc'><br>",
                cancelText: "Iniciar sesión",
                cancelCallback: function () {
                    var user = $("#login_user").val();
                    var pass = $("#login_pass").val();
                    var dataWS = {credenciales: {usuario: user, clave: pass}};
                    var iniciarSesion = new InicioSesion();
                    iniciarSesion.set("usuario", user);
                    iniciarSesion.set("clave", pass);
                    iniciarSesion.post(dataWS);
                },
                doneText: "Cancelar",
                doneCallback: function () {},
                cancelOnly: false
            }
        );
    };
    return inicioSesionview;
}(af, common, _, InicioSesion));

var CierreSesionView = (function ($, common, _) {
    "use strict";

    var cierreSesionview = function () {
        /*Se invierte el orden de las funciones de cancelar y de aceptar
        para que queden los positivos a la izquiera y los negativos a la derecha*/
        $("#afui").popup(
            {
                title: "Cerrar sesión",
                message: "¿Desde cerrar sesión?",
                cancelText: "Aceptar",
                cancelCallback: function () {
                    /*
                    *Se borran los datos del usuario tanto del serviceconfig como del local storage
                    *y se actualiza en el header el botón de inicio/cierre de sesión.
                    */
                    localStorage.clear();
                    ServiceConfig.usuario = null;
                    ServiceConfig.clave = null;
                    common.showLogin();
                },
                doneText: "Cancelar",
                doneCallback: function () {},
                cancelOnly: false
            }
        );
    };
    return cierreSesionview;
}(af, common, _));