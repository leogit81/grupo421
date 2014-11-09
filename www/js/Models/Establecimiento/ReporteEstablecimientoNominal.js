//var ReporteEstablecimientoNominal = (function (common, BaseModel) {
//    "use strict";
//
//    var reporteEstablecimientoNominal = BaseModel.extend({
//        defaults : {
//            "cantidadTotal" : null,
//            "porcentajeTotal" : null,
//            "ItemList" : null
//        },
//
//        initialize: function (attributes, options) {
//            BaseModel.prototype.initialize.call(this, attributes, options);
//            this.service.loadConfig({
//                url: 'establecimiento/cantidadEstablecimientos'
//            });
//        },
//
//        setJsonData: function (jsonData) {
//            var establecimientoData = this.parse(jsonData);
//            this.set(establecimientoData);
//        },
//
//        parse: function (response) {
//            return response.RegisterCounter;
//        }
//    });
//
//    return reporteEstablecimientoNominal;
//}(common, BaseModel));
//
//


var ReporteEstablecimientoNominal = (function (common, BaseModel) {
    "use strict";

    var reporteEstablecimientoNominal = BaseModel.extend({
        defaults : function () {
            var myDefault = function () {
                return {
                    "cantidadTotal" : null,
                    "porcentajeTotal" : null,
                    "ItemList" : null
                };
            };

            return new myDefault();
        },

        initialize: function (attributes, options) {
            BaseModel.prototype.initialize.call(this, attributes, options);
            this.service.loadConfig(this.getServiceConfig());
        },

        setJsonData: function (jsonData) {
            var reporteData = this.parse(jsonData.RegisterCounter);
            this.set(reporteData);
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

    reporteEstablecimientoNominal.prototype.getServiceConfig = function () {
        return {
            url: 'establecimiento/cantidadEstablecimientos'
        };
    };

    return reporteEstablecimientoNominal;
}(common, BaseModel));