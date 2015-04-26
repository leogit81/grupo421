var ProfesionalCollection = (function (common, Backbone, converter, Service) {
    "use strict";
    
    var profesionalCollection = BaseCollection.extend({
        initialize: function (attributes, options) {
            BaseCollection.prototype.initialize.call(this, attributes, options);
            this.service.loadConfig(this.getServiceConfig());
        }
    });

    profesionalCollection.prototype.parse = function (parsedData) {
        return parsedData.ProfesionalSearchResponse.profesionales.profesional;
    };
    
    profesionalCollection.prototype.getServiceConfig = function () {
        return {
            /*baseUrl: 'https://qa.sisa.msal.gov.ar/sisaqa/services/rest',*/
            url: 'profesional/buscar'
        };
    };
    
    _.extend(profesionalCollection, Backbone.Singleton);
    
    return profesionalCollection;
}(common, Backbone, XmlToJSONConverter, AjaxRestService));