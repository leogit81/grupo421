var NoticiaCollection = (function (common, Backbone, converter, Service) {
    "use strict";
    
    var noticiaCollection = BaseCollection.extend({
        initialize: function (attributes, options) {
            BaseCollection.prototype.initialize.call(this, attributes, options);
            this.service.loadConfig(this.getServiceConfig());
        }
    });

    noticiaCollection.prototype.parse = function (parsedData) {
        return parsedData.NoticiaSearchResponse.Noticias.Noticia;
    };
    
    noticiaCollection.prototype.getServiceConfig = function () {
        return {
            url: 'noticia/buscar'
        };
    };
    
    _.extend(noticiaCollection, Backbone.Singleton);
    
    return noticiaCollection;
}(common, Backbone, XmlToJSONConverter, AjaxRestService));