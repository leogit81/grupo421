var ProfesionalNominal = (function (common, BaseModel) {
    "use strict";
    
    var profesionalNominal = BaseModel.extend({
        
        defaults : function () {
            var myDefault = function () {
                return {
                    "apellido": null,
                    "codigo": null,
                    "fechaModificacion": null,
                    "fechaRegistro": null,
                    "matriculas": null,
                    "nombre": null,
                    "numeroDocumento": null,
                    "tipoDocumento": null
                };
            };
            
            return new myDefault();
        },
        
        initialize: function (attributes, options) {
            BaseModel.prototype.initialize.call(this, attributes, options);
            this.service.loadConfig(this.getServiceConfig());
        },
            
        setJsonData: function (jsonData) {
            var profesionalData = this.parse(jsonData.Profesional);
            this.set(profesionalData);
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
    
    profesionalNominal.prototype.getServiceConfig = function () {
        return {
            baseUrl: 'https://qa.sisa.msal.gov.ar/sisaqa/services/rest',
            url: 'profesional/obtener'
        };
    };
    
    return profesionalNominal;
}(common, BaseModel));