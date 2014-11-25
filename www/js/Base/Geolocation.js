var Geolocation = (function (Logger) {
    "use strict";

    var geolocation = {},
        defaultOptions = {
            maximumAge: 3000,
            timeout: 60000,
            enableHighAccuracy: true
        };

    geolocation.posicion = null;

    function onSuccessPosicion(posicion) {
        geolocation.posicion = posicion;
    }

    function onErrorPosicion(error) {
        var message;
        switch (error.code) {
            case 1: 
                message = "Acceso denegado por usuario. Active GPS e intente nuevamente.";
                break;
            case 2:
                message = "Servicio de ubicación no disponible. Active GPS e intente nuevamente.";
                break;
            case 3:
                message = "Tiempo de espera agotado. Active GPS e intente nuevamente.";
                break;
        }
        var errorData = {
            codigoError: error.code,
            mensajeDeError: message || "Ocurrió un error. Intente nuevamente."
        };

        Logger.log(errorData);
    }

    /**
    * Obtiene la posición del dispositivo.
    * @param {Function} successCallback, obligatorio, callback que llamará cuando obtenga la posición.
    * Esta recibe un argumento posicion, donde se encuentran la latitud y la longitud.
    * @param {Function} errorCallback, opcional, callback para el manejo del error.
    * @param {Object} options, opcional, opciones que se pasan a la llamada que obtiene la posición
    * Si no se indican se le pasan los default que tiene configurado el objeto geolocation.
    */
    geolocation.obtenerPosicion = function (successCallback, errorCallback, options) {
        errorCallback = errorCallback || onErrorPosicion;
        successCallback = successCallback || onSuccessPosicion;
        options = options || defaultOptions;
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
    };

    return geolocation;
}(Logger));