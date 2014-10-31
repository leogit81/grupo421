var DrogueriaCollection = (function (common, Backbone, converter, Service) {
    "use strict";
    
    var drogueriaCollection = BaseCollection.extend({
        initialize: function (attributes, options) {
            BaseCollection.prototype.initialize.call(this, attributes, options);
            this.service.loadConfig(this.getServiceConfig());
        }
    });
    
    //establecimientoCollection.prototype.converter = converter;

    drogueriaCollection.prototype.parse = function (parsedData) {
        return parsedData.DrogueriaSearchResponse.droguerias.drogueriaReducida;
    };
    
    drogueriaCollection.prototype.getServiceConfig = function () {
        return {
            url: 'drogueria/buscar'
        };
    };
    
    _.extend(drogueriaCollection, Backbone.Singleton);
    
    return drogueriaCollection;
}(common, Backbone, XmlToJSONConverter, AjaxRestService));