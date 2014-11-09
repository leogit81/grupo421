var Logger = (function ($, common) {
    "use strict";
    
    var logger = {};
    
    logger.log = function (response) {
        var errorData = {};
        errorData.codigoError = this.obtenerCodigoError(response);
        errorData.titulo = this.obtenerTituloDelMensaje(response);
        errorData.mensajeDeError = this.obtenerMensajeError(errorData);
        console.log(errorData.mensajeDeError);
        $.trigger(logger, "showError", [errorData]);
    };
    
    logger.obtenerTituloDelMensaje = function (response) {
        if (response.status === 0)
            return "Atención";
        
        if (response.status === 200 && response.codigoResultadoWS.toUpperCase() === "ERROR_INESPERADO")
            return "Error del servicio";
        
        if (response.status === 200)
            return "Información";
        
        return "SIISA Móvil";
    };
    
    logger.obtenerCodigoError = function (response) {
        if (response.status === 0)
            return response.statusText;
        
        if (response.status === 200)
            return response.codigoResultadoWS;
        
        return response.status.toString();
    };
    
    logger.obtenerMensajeError = function (errorData) {
        errorData = errorData || {};
        
        if (!common.isEmpty(errorData.mensajeDeError)) {
            return errorData.mensajeDeError;
        }
        
        return this.obtenerMensajeDefaultPorCodigo(errorData.codigoError);
    };
        
    logger.obtenerMensajeDefaultPorCodigo = function (codigoDeError) {
        codigoDeError = codigoDeError || "";
        codigoDeError = codigoDeError.toUpperCase();
        
        if (this.errores.hasOwnProperty(codigoDeError)) {
            return this.errores[codigoDeError];
        }
        return "Error desconocido";
    };
    
    logger.errores = {
        ERROR_INESPERADO: "Se produjo un error inesperado durante la invocación del servicio Web.",
        LIMITE_EXCEDIDO: "Se ha excedido la cantidad máxima de registros que puede devolver la consulta. Por favor, pruebe nuevamente incluyendo otros filtros.",
        REGISTRO_NO_ENCONTRADO: "No se ha encontrado ningún registro para los filtros proporcionados. Por favor, verifique que los mismos sean correctos.",
        MULTIPLE_RESULTADO: "Se encontró más de un registro para la búsqueda realizada.",
        OFFLINE: "Se ha detectado que el dispositivo no tiene conexión a Internet. La misma es necesaria para el correcto funcionamiento de la aplicación.",
        ONLINE: "El dispositivo ha reestablecido la conexión a Internet. Ahora puede continuar utilizando la aplicación normalmente.",
        TIMEOUT: "Se ha agotado el tiempo de espera del servidor.",
        ERROR: "Se produjo un error al realizar la llamada al servicio web.",
        404: "No se encontró la dirección del servicio Web solicitado.",
        500: "Se produjo un error interno del servidor que ha impedido responder su solicitud. Por favor, reintente nuevamente más tarde"
    };
    
    return logger;
}(af, common));