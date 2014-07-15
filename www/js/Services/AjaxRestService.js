define(['require', 'common', 'Services/ServiceConfig', 'jquery'], function(require, common, ServiceConfig, jQuery){
    "use strict";

    var baseUrl = null;
    var url = null;
    var method = 'GET';
    var enableCors = null;
    var serviceProvider = null;
    var timeout = 30000;
    var dataType = 'xml';
        
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
    function AjaxService(config){
        this.loadConfig(config);
    }
    
    AjaxService.prototype.loadConfig = function(config){
        //Configuración del servicio que se toma por default del archivo ServiceConfig, puede ser modificado pasando el parámetro config
        baseUrl = ServiceConfig.baseUrl;
        config = config || {};
        url = config.url;
        enableCors = config.enableCors || ServiceConfig.enableCors || enableCors;
        serviceProvider = config.serviceProvider || ServiceConfig.serviceProvider || serviceProvider;
        timeout = config.timeout || ServiceConfig.timeout || timeout;
        
        //Configuración que NO se encuentra en el archivo ServiceConfig, que se configura con el parámetro config
        if (!common.isEmpty(config)){
            this.method = config.method || this.method;
            this.successCallback = config.success || this.successCallback;
            this.errorCallback = config.error || this.errorCallback;
            this.beforeSendCallback = config.beforeSend || this.beforeSendCallback;
            this.dataType = config.dataType || this.dataType;
        }
        
        if (enableCors){
            this.enableProxy();
        }
    };
    
    AjaxService.prototype.constructor = AjaxService;
    
    /**
     * Habilita el proxy para soportar CORS en los casos que el servidor al que se quiere acceder no lo implemente.
     */
    AjaxService.prototype.enableProxy = function(){
        var cors_api_host = 'cors-anywhere.herokuapp.com';
        var cors_api_url = (window.location.protocol === 'http:' ? 'http://' : 'https://') + cors_api_host + '/';
        var slice = [].slice;
        var origin = window.location.protocol + '//' + window.location.host;
        var open = XMLHttpRequest.prototype.open;
        
        XMLHttpRequest.prototype.open = function() {
            var args = slice.call(arguments);
            var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
            if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
                targetOrigin[1] !== cors_api_host) {
                args[1] = cors_api_url + args[1];
            }
            return open.apply(this, args);
        };
        
        if (typeof XDomainRequest != "undefined") {
            // XDomainRequest for IE.
            //TODO: CONFIGURE PROXY FOR XDomainRequest object
        }
        
    };
    
    /**
     * Create the XHR object.
     * @param {string} método HTTP
     * @param {url} url a la que se quiere acceder
     */ 
    AjaxService.prototype.createCORSRequest =  function(method, url) {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {
            // XHR for Chrome/Firefox/Opera/Safari.
            xhr.open(method, url, true);
        } else if (typeof XDomainRequest != "undefined") {
            // XDomainRequest for IE.
            xhr = new XDomainRequest();
            xhr.open(method, url);
        } else {
            // CORS not supported.
            xhr = null;
        }
        return xhr;
    };
    
    AjaxService.prototype.beforeSendCallback = function(data){
        //TODO: MOSTRAR UNA VENTANA MODAL CON UNA MÁSCARA DE CARGANDO
    };
    
    AjaxService.prototype.successCallback = function(data){
        console.log(data.target.responseText);
    };
    
    AjaxService.prototype.errorCallback = function(response){
        //TODO: PENDIENTE HACER MANEJO DE ERRORES DE LAS LLAMADAS A LOS WEB SERVICES.
        if (response.statusText === 'timeout')
        {
            console.log('Se ha agotado el tiempo de espera del servidor.');
            return;
        }
        console.log('error processing ajax request');
    };
    
    /**
     * Obtiene los datos del servicio mediante una llamada Ajax
     * @param {Object} newUrl, una url del servicio que reemplace a la que se seteo previamente
     * @param {Object} data, data que será enviada como parámetro del servicio
     */
    AjaxService.prototype.get = function(data, otraUrl){
        var requestedUrl = '';
        
        if (!common.isEmpty(otraUrl)){
            requestedUrl = common.combineUrl(otraUrl, data);
        }
        else{
            requestedUrl = common.combineUrl(baseUrl, url, data);
        }
      
        if (serviceProvider === 'jquery'){
            jQuery.ajax({
                url: requestedUrl,
                dataType: this.dataType,
                timeout: this.timeout,
                beforeSend: this.beforeSendCallback,
                success: this.successCallback,
                error:this.errorCallback,
            });
        }else if (serviceProvider === 'custom'){
            var xhr = this.createCORSRequest(method, requestedUrl);
            xhr.onload = this.successCallback;
            xhr.onerror = this.errorCallback;
            xhr.send();
        }
    };
    
    return AjaxService;
});