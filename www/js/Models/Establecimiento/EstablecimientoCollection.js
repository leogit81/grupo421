var EstablecimientoCollection = (function (common, Backbone, converter, Service) {
    "use strict";
    
    var establecimientoCollection = BaseCollection.extend({
        initialize: function (attributes, options) {
            BaseCollection.prototype.initialize.call(this, attributes, options);
            this.service.loadConfig(this.getServiceConfig());
        }
    });
    
    establecimientoCollection.prototype.parse = function (parsedData) {
        return parsedData.EstablecimientoSearchResponse.establecimientos.establecimientoReducido;
    };
    
    establecimientoCollection.prototype.getServiceConfig = function () {
        return {
            url: 'establecimiento/buscar'
        };
    };
    
    _.extend(establecimientoCollection, Backbone.Singleton);
    
    return establecimientoCollection;
}(common, Backbone, XmlToJSONConverter, AjaxRestService));