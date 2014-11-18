var Referentes = (function (common, Backbone, converter, Service) {
    "use strict";
    
    var referentes = BaseCollection.extend({
        initialize: function (attributes, options) {
            BaseCollection.prototype.initialize.call(this, attributes, options);
            this.service.loadConfig(this.getServiceConfig());
        }
    });
    
    //establecimientoCollection.prototype.converter = converter;

    referentes.prototype.parse = function (parsedData) {
        return parsedData.ReferenteSearchResponse.Referentes.Referente;
    };
    
    referentes.prototype.getServiceConfig = function () {
        return {
            url: 'referente/buscar'
        };
    };
    
    _.extend(referentes, Backbone.Singleton);
    
    return referentes;
}(common, Backbone, XmlToJSONConverter, AjaxRestService));