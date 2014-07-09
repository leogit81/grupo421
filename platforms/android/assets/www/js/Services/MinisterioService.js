define(['require', 'common', 'Services/AjaxRestService'], function(require, common, AjaxRestService){
    "use strict";
    
    /**
     * Constructor
     * @param {Object} config: un objeto literal con la configuración del servicio (ver AjaxRestService)
     */
    function MinisterioService(config){
        config = config || {};
        config.url = config.url || "/ministerio";
        AjaxRestService.call(this, config);
    }
    
    //Crea un objeto MinisterioService.prototype que hereda de AjaxRestService.prototype
    MinisterioService.prototype = Object.create(AjaxRestService.prototype);
    
    //Setea la propiedad constructor para que se refiera a la función MinisterioService  
    MinisterioService.prototype.constructor = MinisterioService;
    
    return MinisterioService;
});