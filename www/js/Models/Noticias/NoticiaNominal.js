var NoticiaNominal = (function (common, BaseModel) {
    "use strict";

    var noticiaNominal = BaseModel.extend({
        defaults : function () {
            var myDefault = function () {
                return {
                    "titulo": null,
                    "detalle": null,
                    "fecha": null,
                    "links": null,
                    "idNoticia": null
                };
            };

            return new myDefault();
        },

        initialize: function (attributes, options) {
            BaseModel.prototype.initialize.call(this, attributes, options);
            this.service.loadConfig(this.getServiceConfig());
        },

        setJsonData: function (jsonData) {
            var noticiaData = this.parse(jsonData.Noticia);
            this.set(noticiaData);
        },

        parse: function (response) {
            for (var key in this.nestedModels)
            {
                var nestedModel = this.nestedModels[key];
                var modelData = response[key];

                var modelExistente = this.get(key); 
                if (common.isEmpty(modelExistente)) {
                    response[key] = new nestedModel(modelData);
                } else {
                    response[key] = modelExistente.set(modelData);
                }
            }
            return response;
        }
    });

    noticiaNominal.prototype.getServiceConfig = function () {
        return {
            url: 'noticia'
        };
    };

    return noticiaNominal;
}(common, BaseModel));