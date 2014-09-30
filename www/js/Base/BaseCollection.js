var BaseCollection = (function (common, Backbone, converter, Service, BaseModel) {
    "use strict";
    
    var baseCollection = Backbone.Collection.extend({
        initialize: function (attributes, options) {
            this.service = new Service({
                success: _.bind(this.processData, this)
            });
            options = options || {};
            this.setConverter(options.converter || converter);
        }
    });
    
    _.extend(baseCollection, Backbone.Singleton);
    common.extendSinPisar(baseCollection.prototype , false, BaseModel.prototype);
    
    baseCollection.prototype.setJsonData = function (jsonData) {
        var modelData = this.parse(jsonData);
        this.setParsedData(modelData);
    };
    
    /**
    * Parsea los datos que vienen del objeto JSON para poder setearlos en el modelo
    */
    baseCollection.prototype.parse = function (jsonData) {
        //sobreescribir en las clases derivadas.
    };
    
    baseCollection.prototype.setParsedData = function (parsedData) {
        this.set(parsedData);
    };
    
    baseCollection.prototype.processData = function (data) {
        BaseModel.prototype.processData.call(this, data);
    };
    
    return baseCollection;
}(common, Backbone, XmlToJSONConverter, AjaxRestService, BaseModel));