var InicioSesionView = (function ($, common, _, InicioSesion) {
    "use strict";

    var inicioSesionview = function () {
        $("#afui").popup(
            {
                title: "Iniciar sesión",
                message: "Usuario: <input id='login_user' type='text' class='af-ui-forms'><br>" + 
                         "Contraseña: <input id='login_pass' type='password' class='af-ui-forms' style='webkit-text-security:disc'><br>" +
                         "<label style='padding: 0 0 !important;'>Recordar contraseña?</label><input type='checkbox' id='recordar'><label for='recordar' style='position: absolute;'></label><br>",
                cancelText: "Cancelar",
                cancelCallback: function () {},
                doneText: "Acceder",
                doneCallback: function () {
                    //alert("Iniciaste sesion capo")
                    var user = $("#login_user").val();
                    var pass = $("#login_pass").val();
                    var recordar = $("#recordar")[0].checked;
                    var dataWS = {credenciales: {usuario: user, clave: pass}};
                    var iniciarSesion = new InicioSesion();
                    iniciarSesion.sync("read", this, dataWS);
                    if (recordar) {
                    inicioSesionview.guardarLocalStorage(user, pass, recordar);
                    }
                },
                cancelOnly: false
            }
        );
    };

    inicioSesionview.guardarLocalStorage = function (user, pass, recordar) {
        if (typeof(localStorage) == 'undefined' ) {
            alert('Almacenamiento local no soportado.');
        } else {
            try {
                localStorage.setItem('usuario', user);
                localStorage.setItem('clave', pass);
                localStorage.setItem('recordar', recordar);
            } catch (e) {
                if (e == QUOTA_EXCEEDED_ERR) {
                    alert('Límite de almacenamiento excedido.');
                }
            }
        }
    };

    return inicioSesionview;
}(af, common, _, InicioSesion));