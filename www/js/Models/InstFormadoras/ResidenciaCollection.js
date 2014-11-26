var ResidenciaCollection = (function (common, Backbone, converter, Service) {
    "use strict";

    var residenciaCollection = BaseCollection.extend({


        initialize: function (attributes, options) {
            BaseCollection.prototype.initialize.call(this, attributes, options);
            this.service.loadConfig(this.getServiceConfig());
        }
    });

    residenciaCollection.prototype.parse = function (parsedData) {
        return parsedData.ResidenciaSearchResponse.residencias.residencia;
    };

    residenciaCollection.prototype.getServiceConfig = function () {
        return {
            url: 'institucionFormadora/buscarResidencia'
        };
    };

    _.extend(residenciaCollection, Backbone.Singleton);

    return residenciaCollection;
}(common, Backbone, XmlToJSONConverter, AjaxRestService));