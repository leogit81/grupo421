var FarmaciaCollection = (function (common, Backbone, converter, Service) {
    "use strict";
    
    var farmaciaCollection = BaseCollection.extend({
        initialize: function (attributes, options) {
            BaseCollection.prototype.initialize.call(this, attributes, options);
            this.service.loadConfig(this.getServiceConfig());
        }
    });
    
    farmaciaCollection.prototype.parse = function (parsedData) {
        return parsedData.FarmaciaSearchResponse.farmacias.farmaciaReducida;
    };
    
    farmaciaCollection.prototype.getServiceConfig = function () {
        return {
            url: 'farmacia/buscar'
        };
    };
    
    _.extend(farmaciaCollection, Backbone.Singleton);
    
    return farmaciaCollection;
}(common, Backbone, XmlToJSONConverter, AjaxRestService));