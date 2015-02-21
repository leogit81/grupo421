var GeorefesFarmaciaCollection = (function (BaseCollection) {
    "use strict";
    
    var georefesFarmaciaCollection = BaseCollection.extend({
        initialize: function (attributes, options) {
            BaseCollection.prototype.initialize.call(this, attributes, options);
            this.service.loadConfig(this.getServiceConfig());
        }
    });
    
    georefesFarmaciaCollection.prototype.parse = function (parsedData) {
        return parsedData.EstablecimientoLocalizadoSearchResponse.establecimientos.establecimientoLocalizado;
    };
    
    georefesFarmaciaCollection.prototype.getServiceConfig = function () {
        return {
            url: 'establecimiento/buscarFarmaciasCercanas'
        };
    };
    
    _.extend(georefesFarmaciaCollection, Backbone.Singleton);
    
    return georefesFarmaciaCollection;
}(BaseCollection));