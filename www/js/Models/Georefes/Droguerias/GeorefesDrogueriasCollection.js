var GeorefesDrogueriasCollection = (function (BaseCollection) {
    "use strict";
    
    var georefesDrogueriasCollection = BaseCollection.extend({
        initialize: function (attributes, options) {
            BaseCollection.prototype.initialize.call(this, attributes, options);
            this.service.loadConfig(this.getServiceConfig());
        }
    });
    
    georefesDrogueriasCollection.prototype.parse = function (parsedData) {
        return parsedData.EstablecimientoLocalizadoSearchResponse.establecimientos.establecimientoLocalizado;
    };
    
    georefesDrogueriasCollection.prototype.getServiceConfig = function () {
        return {
            //baseUrl: 'https://qa.sisa.msal.gov.ar/sisaqa/services/rest',
            url: 'droguerias/buscarCercanos'
        };
    };
    
    _.extend(georefesDrogueriasCollection, Backbone.Singleton);
    
    return georefesDrogueriasCollection;
}(BaseCollection));