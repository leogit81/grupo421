var ProgramasCollection = (function (common, Backbone, converter, Service) {
    "use strict";
    
    var programasCollection = BaseCollection.extend({
        initialize: function (attributes, options) {
            BaseCollection.prototype.initialize.call(this, attributes, options);
            this.service.loadConfig(this.getServiceConfig());
        }
    });
    
    //establecimientoCollection.prototype.converter = converter;

    programasCollection.prototype.parse = function (parsedData) {
        return parsedData.EstablecimientoLocalizadoSearchResponse.establecimientos.establecimientoLocalizado;
    };
    
    programasCollection.prototype.getServiceConfig = function () {
        return {
            url: 'establecimiento/buscarCercanos'
        };
    };
    
    _.extend(programasCollection, Backbone.Singleton);
    
    return programasCollection;
}(common, Backbone, XmlToJSONConverter, AjaxRestService));