var GeorefesEstablecimientoCollection = (function (BaseCollection) {
    "use strict";
    
    var georefesEstablecimientoCollection = BaseCollection.extend({
        initialize: function (attributes, options) {
            BaseCollection.prototype.initialize.call(this, attributes, options);
            this.service.loadConfig(this.getServiceConfig());
        }
    });
    
    georefesEstablecimientoCollection.prototype.parse = function (parsedData) {
        return parsedData.EstablecimientoLocalizadoSearchResponse.establecimientos.establecimientoLocalizado;
    };
    
    georefesEstablecimientoCollection.prototype.getServiceConfig = function () {
        return {
            //baseUrl: 'https://qa.sisa.msal.gov.ar/sisaqa/services/rest',
            url: 'establecimiento/buscarCercanos'
        };
    };
    
    _.extend(georefesEstablecimientoCollection, Backbone.Singleton);
    
    return georefesEstablecimientoCollection;
}(BaseCollection));