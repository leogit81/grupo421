var InstFormCollection = (function (common, Backbone, converter, Service) {
    "use strict";

    var instFormCollection = BaseCollection.extend({


        initialize: function (attributes, options) {
            BaseCollection.prototype.initialize.call(this, attributes, options);
            this.service.loadConfig(this.getServiceConfig());
        }
    });

    instFormCollection.prototype.parse = function (parsedData) {
        return parsedData.InstitucionFormadoraSearchResponse.institucionesFormadoras.institucionFormadoraReducida;
    };

    instFormCollection.prototype.getServiceConfig = function () {
        return {
            url: 'institucionFormadora/buscar'
        };
    };

    _.extend(instFormCollection, Backbone.Singleton);

    return instFormCollection;
}(common, Backbone, XmlToJSONConverter, AjaxRestService));