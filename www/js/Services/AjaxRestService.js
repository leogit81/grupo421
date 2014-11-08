var AjaxRestService = (function (logger, common, _, ServiceConfig, jQuery) {
    "use strict";

    /**
     * Constructor 
     * @param {Object} config, objeto literal
     * {
     *  url: url del servicio que se quiera invocar. Puede ser una url relativa si se configuro una url base en ServiceConfig.js
     *  method: GET, POST, PUT, DELETE
     *  successCallback: funcion que será invocada al obtenerse la respuesta exitosa del servicio
     *  errorCallback: función que será invocada al obtenerser un error durante la invocación del servicio. 
     * }
     */
    function AjaxService(config) {
        this.baseUrl = null;
        this.url = null;
        this.method = 'GET';
        this.enableCors = null;
        this.serviceProvider = null;
        this.timeout = 30000;
        this.dataType = 'xml';
        
        this.loadConfig(config);
    }
    
    AjaxService.prototype.loadConfig = function (config) {
        //Configuración del servicio que se toma por default del archivo ServiceConfig, puede ser modificado pasando el parámetro config
        this.baseUrl = config.baseUrl || ServiceConfig.baseUrl;
        this.config = config || {};
        this.url = config.url;
        this.enableCors = config.enableCors || ServiceConfig.enableCors || this.enableCors;
        this.serviceProvider = config.serviceProvider || ServiceConfig.serviceProvider || this.serviceProvider;
        this.timeout = config.timeout || ServiceConfig.timeout || this.timeout;
        
        //Configuración que NO se encuentra en el archivo ServiceConfig, que se configura con el parámetro config
        if (!common.isEmpty(config)) {
            this.method = config.method || this.method;
            this.successCallback = config.success || this.successCallback;
            this.errorCallback = config.error || this.errorCallback;
            this.beforeSendCallback = config.beforeSend || this.beforeSendCallback;
            this.dataType = config.dataType || this.dataType;
        }
        
        if (this.enableCors) {
            this.enableProxy();
        }
    };
    
    AjaxService.prototype.constructor = AjaxService;
    
    /**
     * Habilita el proxy para soportar CORS en los casos que el servidor al que se quiere acceder no lo implemente.
     */
    AjaxService.prototype.enableProxy = function () {
        var cors_api_host = 'cors-anywhere.herokuapp.com';
        var cors_api_url = (window.location.protocol === 'http:' ? 'http://' : 'https://') + cors_api_host + '/';
        var slice = [].slice;
        var origin = window.location.protocol + '//' + window.location.host;
        var open = XMLHttpRequest.prototype.open;
        
        XMLHttpRequest.prototype.open = function () {
            var args = slice.call(arguments);
            var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
            if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
                targetOrigin[1] !== cors_api_host) {
                args[1] = cors_api_url + args[1];
            }
            return open.apply(this, args);
        };
        
        if (typeof XDomainRequest !== "undefined") {
            // XDomainRequest for IE.
            //TODO: CONFIGURE PROXY FOR XDomainRequest object
            return;
        }
    };
    
    /**
     * Create the XHR object.
     * @param {string} método HTTP
     * @param {url} url a la que se quiere acceder
     */
    AjaxService.prototype.createCORSRequest =  function (method, url) {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {
            // XHR for Chrome/Firefox/Opera/Safari.
            xhr.open(method, url, true);
        } else if (typeof XDomainRequest !== "undefined") {
            // XDomainRequest for IE.
            xhr = new XDomainRequest();
            xhr.open(method, url);
        } else {
            // CORS not supported.
            xhr = null;
        }
        return xhr;
    };
    
    AjaxService.prototype.beforeSendCallback = function (data) {
        //jQuery(this).trigger("beforeCallRestService");
        //TODO: ESTO HAY QUE MODIFICARLOS POR UN EVENTO, O BUSCAR UNA MANERA DE NO INVOCAR COSAS DE LA VISTA EN EL SERVICIO
        af.ui.showMask("Cargando...");
    };
    
    AjaxService.prototype.internalSuccessCallback = function (data) {
        var codigoResultadoWS = this.getCodigoResultadoWebService(data).toUpperCase();
        
        if (codigoResultadoWS === "OK") {
            if (!common.isEmpty(this.successCallback)) {
                this.successCallback(data);
            }
        } else {
            var jQuery_XHR = arguments[2];
            this.processServiceError(jQuery_XHR, codigoResultadoWS);
        }
    };
    
    AjaxService.prototype.getCodigoResultadoWebService = function (resultadoWS) {
        var resultado = resultadoWS.getElementsByTagName("resultado").item();
        
        return resultado.textContent || resultado.innerHTML;
        
//        return resultadoWS.getElementsByTagName("resultado").item().textContent;
//        return resultadoWS.getElementsByTagName("resultado").item().innerHTML;
    };
    
    AjaxService.prototype.internalErrorCallback = function (response) {
        this.processServiceError(response);
        
        if (!common.isEmpty(this.errorCallback)) {
            this.errorCallback(response);
        }
    };
    
    AjaxService.prototype.processServiceError = function (response) {
        if (arguments.length > 1) {
            var codigoResultadoWS = arguments[1];
            response.codigoResultadoWS = codigoResultadoWS;
        }
        logger.log(response);
    };
    
    /**
     * Obtiene los datos del servicio mediante una llamada Ajax
     * @param {Object} newUrl, una url del servicio que reemplace a la que se seteo previamente
     * @param {Object} data, data que será enviada como parámetro del servicio
     */
    AjaxService.prototype.get = function (data, otraUrl) {
        var requestedUrl = '';
        
        if (!common.isEmpty(otraUrl)) {
            requestedUrl = common.combineUrl(otraUrl, data);
        } else {
            requestedUrl = common.combineUrl(this.baseUrl, this.url, data);
        }
      
        if (this.serviceProvider === 'jquery') {
            jQuery.ajax({
                url: requestedUrl,
                dataType: this.dataType,
                timeout: this.timeout,
                beforeSend: _.bind(this.beforeSendCallback, this),
                success: _.bind(this.internalSuccessCallback, this),
                error: _.bind(this.internalErrorCallback, this),
                headers: {'X-Requested-With': 'XMLHttpRequest'}
            });
        } else if (serviceProvider === 'custom') {
            var xhr = this.createCORSRequest(method, requestedUrl);
            xhr.onload = this.successCallback;
            xhr.onerror = this.errorCallback;
            xhr.send();
        }
    };
    
    return AjaxService;
}(Logger, common, _, ServiceConfig, jQuery));