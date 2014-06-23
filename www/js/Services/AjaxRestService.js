define(['require', 'common', 'Services/ServiceConfig'], function(require, common, ServiceConfig){
    "use strict";

    var url = null;
    var method = 'GET';
    var enableCors = null;
        
    /**
     * Constructor 
     * @param {Object} config, objeto literal
     * {
     *  url: url del servicio que se quiera invocar
     *  method: GET, POST, PUT, DELETE
     *  successCallback: funcion que será invocada al obtenerse la respuesta exitosa del servicio
     *  errorCallback: función que será invocada al obtenerser un error durante la invocación del servicio. 
     * }
     */
    function AjaxService(config){
        this.url = config.url || ServerConfig.baseUrl || this.url;
        enableCors = config.enableCors || ServiceConfig.enableCors || enableCors;
        
        if (!common.isEmpty(config)){
            this.method = config.method || this.method;
            this.successCallback = config.success || this.successCallback;
            this.errorCallback = config.error || this.errorCallback;
        }
        
        this.get = get;
        
        if (enableCors){
            enableProxy();
        }
    }
    
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
    
    AjaxService.prototype.successCallback = function(data){
        console.log(this.responseXML);
    };
    
    AjaxService.prototype.errorCallback = function(){
        console.log('error processing ajax request');
    };
    
    /**
     * Obtiene los datos del servicio mediante una llamada Ajax
     * @param {Object} newUrl, una url del servicio que reemplace a la que se seteo previamente
     * @param {Object} data, data que será enviada como parámetro del servicio
     */
    AjaxService.prototype.get = function(newUrl, data){
        if (!common.isEmpty(newUrl)){
            this.url = newUrl; 
        }
        
        var requestedUrl = this.url + "/" + data;
        var xhr = createCORSRequest(method, requestedUrl);
        xhr.onload = successCallback;
        xhr.onerror = errorCallback;
        xhr.send();
    };
    
    return AjaxService;
});