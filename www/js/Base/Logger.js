var Logger = (function ($, common) {
    "use strict";
    
    var logger = {};
    
    logger.logServiceError = function (response) {
        var errorData = {};
        errorData.codigoError = obtenerCodigoError(response);
        errorData.titulo = obtenerTituloDelMensaje(response);
        errorData.mensajeDeError = obtenerMensajeError(errorData);
        console.log(errorData.mensajeDeError);
        $.trigger(logger, "showError", [errorData]);
    };
    
    /**
    * Para logue en general, se le pasa un objeto con la data del error
    * @param {Object} errorData, tiene el código de error, el título del pop up y el mensaje de error
    * que se muestran por pantalla al usuario.
    * ejemplo: {codigoError: 1, titulo: "SISA Móvil", mensajeDeError: "..."}
    */
    logger.log = function (errorData) {
        errorData = errorData || {};
        errorData.titulo = errorData.titulo || "SISA Móvil";
        errorData.mensajeDeError = errorData.mensajeDeError || "Error desconocido";
        console.log(errorData.mensajeDeError);
        $.trigger(logger, "showError", [errorData]);
    };
    
    function obtenerTituloDelMensaje(response) {
        if (response.status === 0) {
            return "Atención";
        }
        
        if (response.status === 200 && response.codigoResultadoWS.toUpperCase() === "ERROR_INESPERADO") {
            return "Error del servicio";
        }
        
        if (response.status === 200) {
            return "Información";
        }
        
        return "SISA Móvil";
    }
    
    function obtenerCodigoError(response) {
        if (response.status === 0) {
            return response.statusText;
        }
        
        if (response.status === 200) {
            return response.codigoResultadoWS;
        }
        
        return response.status.toString();
    }
    
    function obtenerMensajeError(errorData) {
        errorData = errorData || {};
        
        if (!common.isEmpty(errorData.mensajeDeError)) {
            return errorData.mensajeDeError;
        }
        
        return obtenerMensajeDefaultPorCodigo(errorData.codigoError);
    }
        
    function obtenerMensajeDefaultPorCodigo(codigoDeError) {
        codigoDeError = codigoDeError || "";
        codigoDeError = codigoDeError.toUpperCase();
        
        if (logger.errores.hasOwnProperty(codigoDeError)) {
            return logger.errores[codigoDeError];
        }
        return "Error desconocido";
    }
    
    logger.errores = {
        ERROR_INESPERADO: "Se produjo un error inesperado durante la invocación del servicio Web.",
        LIMITE_EXCEDIDO: "Se ha excedido la cantidad máxima de registros que puede devolver la consulta. Por favor, pruebe nuevamente incluyendo otros filtros.",
        REGISTRO_NO_ENCONTRADO: "No se ha encontrado ningún registro para los filtros proporcionados. Por favor, verifique que los mismos sean correctos.",
        MULTIPLE_RESULTADO: "Se encontró más de un registro para la búsqueda realizada.",
        "ERROR_AUTENTICACION : ERROR DE AUTENTICACION!": "Usuario y/o contraseña inválidos",
        "ERROR_AUTENTICACION": "Usuario y/o contraseña inválidos",
        OFFLINE: "Se ha detectado que el dispositivo no tiene conexión a Internet. La misma es necesaria para el correcto funcionamiento de la aplicación.",
        ONLINE: "El dispositivo ha reestablecido la conexión a Internet. Ahora puede continuar utilizando la aplicación normalmente.",
        TIMEOUT: "Se ha agotado el tiempo de espera del servidor.",
        ERROR: "Se produjo un error al realizar la llamada al servicio web.",
        404: "No se encontró la dirección del servicio Web solicitado.",
        500: "Se produjo un error interno del servidor que ha impedido responder su solicitud. Por favor, reintente nuevamente más tarde"
    };
    
    return logger;
}(af, common));