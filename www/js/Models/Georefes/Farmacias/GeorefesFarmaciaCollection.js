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
            //baseUrl: 'https://qa.sisa.msal.gov.ar/sisaqa/services/rest',
            url: 'farmacias/buscarCercanos'
        };
    };
    
    _.extend(georefesFarmaciaCollection, Backbone.Singleton);
    
    return georefesFarmaciaCollection;
}(BaseCollection));