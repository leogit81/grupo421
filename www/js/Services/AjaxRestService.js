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
        //valores por defecto que toma cuando se construye el objeto si no se pasa config.
        //Son configurables mediante el objeto config pasado por parámetro.
        this.baseUrl = "";
        this.url = "";
        this.method = 'GET';
        this.enableCors = false;
        this.serviceProvider = 'jquery';
        this.timeout = 30000;
        this.dataType = 'xml';
        this.successCallback = this.defaultSuccessCallback;
        this.errorCallback = this.defaultErrorCallback;
        
        this.loadConfig(config);
        
        //guarda el resultado de la ultima ejecución del servicio.
        this.resultadoUltimaEjecucion = {};
    }

    /**
    * Carga la configuración al servicio. Si se omiten propiedades en el objeto config,
    * Toma el valor del ServiceConfig para esa propiedad. Y si en el ServiceConfig no estuviera
    * definido se queda con lo que está configurado en la instancia del service.
    */
    AjaxService.prototype.loadConfig = function (config) {
        //Configuración del servicio que se toma por default del archivo ServiceConfig, puede ser modificado pasando el parámetro config
        this.config = config || {};
        this.baseUrl = config.baseUrl || ServiceConfig.baseUrl || this.baseUrl;
        this.url = config.url || this.url;
        this.enableCors = config.enableCors || ServiceConfig.enableCors || this.enableCors;
        this.serviceProvider = config.serviceProvider || ServiceConfig.serviceProvider || this.serviceProvider;
        this.timeout = config.timeout || ServiceConfig.timeout || this.timeout;

        //Configuración que NO se encuentra en el archivo ServiceConfig, que se configura con el parámetro config
        this.method = config.method || this.method;
        this.successCallback = config.success || this.successCallback;;
        this.errorCallback = config.error || this.errorCallback;
        this.beforeSendCallback = config.beforeSend || this.beforeSendCallback;
        this.dataType = config.dataType || this.dataType;

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
    
    AjaxService.prototype.defaultSuccessCallback =  function (data) {
        console.log("La llamada ajax se ejecutó correctamente.");
    };
    
    AjaxService.prototype.defaultErrorCallback =  function (data) {
        console.log("Se produjo un error al realizar la llamada ajax.");
    };

    AjaxService.prototype.beforeSendCallback = function (data) {
        //jQuery(this).trigger("beforeCallRestService");
        //TODO: ESTO HAY QUE MODIFICARLOS POR UN EVENTO, O BUSCAR UNA MANERA DE NO INVOCAR COSAS DE LA VISTA EN EL SERVICIO
        af.ui.showMask("Cargando...");
    };

    AjaxService.prototype.internalSuccessCallback = function (data) {
        if (common.isJSON(data)){
            var codigoResultadoWS = JSON.parse(data).estado;
        }
        else {
            var codigoResultadoWS = this.getCodigoResultadoWebService(data).toUpperCase();
        }
        this.resultadoUltimaEjecucion = codigoResultadoWS;

        if (codigoResultadoWS === "OK" || codigoResultadoWS === "LIMITE_EXCEDIDO") {
            if (!common.isEmpty(this.successCallback)) {
                this.successCallback(data);
        }
        } else {
            var jQuery_XHR = arguments[2];
            this.processServiceError(jQuery_XHR, codigoResultadoWS);
        }
    };

    AjaxService.prototype.internalPostSuccessCallback = function (data) {
        if (common.isJSON(data)){
            var codigoResultadoWS = JSON.parse(data).estado.toUpperCase();
        }
        else {
            var codigoResultadoWS = this.getCodigoResultadoWebService(data).toUpperCase();
        }
        this.resultadoUltimaEjecucion = codigoResultadoWS;

        if (codigoResultadoWS === "OK" || codigoResultadoWS === "LIMITE_EXCEDIDO") {
            if (!common.isEmpty(this.successCallback)) {
                this.successCallback(data);
            }
        } else {
            var jQuery_XHR = arguments[2];
            this.processServiceError(jQuery_XHR, codigoResultadoWS);
        }
    };

    AjaxService.prototype.getCodigoResultadoWebService = function (resultadoWS) {
        var resultado = resultadoWS.getElementsByTagName("resultado").item(0);

        return resultado.textContent || resultado.innerHTML;
    };

    AjaxService.prototype.internalErrorCallback = function (response) {
        this.processServiceError(response);

        if (!common.isEmpty(this.errorCallback)) {
            this.errorCallback(response);
        }
        this.resultadoUltimaEjecucion = "ERROR_AJAX";
        af.ui.hideMask();
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

    AjaxService.prototype.post = function (data, otraUrl) {
        var requestedUrl = '';

        if (!common.isEmpty(otraUrl)) {
            requestedUrl = common.combineUrl(otraUrl);
        } else {
            requestedUrl = common.combineUrl(this.baseUrl, this.url);
        }
        if (this.serviceProvider === 'jquery') {

            jQuery.ajax({
                url: requestedUrl,
                type: 'POST',
                timeout: this.timeout,
                contentType: 'application/json',
                headers: {'Access-Control-Allow-Origin': '*', 'X-Requested-With': 'XMLHttpRequest'},
                data: JSON.stringify(data),
                beforeSend: _.bind(this.beforeSendCallback, this),
                success: _.bind(this.internalPostSuccessCallback, this),
                error: _.bind(this.internalErrorCallback, this),
                complete: function (jqXHR, textStatus) { af.ui.hideMask(); }
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