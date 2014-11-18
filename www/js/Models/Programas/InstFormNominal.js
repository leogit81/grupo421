var InstFormNominal = (function (common, BaseModel, CoordenadasMapa, Domicilio, Participaciones, Telefono) {
    "use strict";

    var instFormNominal = BaseModel.extend({
        nestedModels: {
            coordenadas : CoordenadasMapa,
            domicilio : Domicilio,
            telefono1 : Telefono,
            telefono2 : Telefono,
            telefono3 : Telefono,
            telefono4 : Telefono
        },

        defaults : function () {
            var myDefault = function () {
                return {
                    "resultado": null,
                    "codIndecProvincia": null,
                    "codigoSISA": null,
                    "fechaModificacion": null,
                    "fechaRegistro": null,
                    "nombre": null,
                    "provincia": null,
                    "auxiliarato": null,
                    "carreras": null,
                    "codIndecDepto": null,
                    "codIndecLocalidad": null,
                    "coordenadas": CoordenadasMapa, /**/
                    "depto": null,
                    "domicilio": Domicilio,              /**/
                    "especialidades": null,
                    "gradoUniversitario": null,
                    "localidad": null,
                    "regionPais": null,
                    "subtipoInstitucion": null,
                    "tecnicatura": null,
                    "telefono1": Telefono,          /**/
                    "telefono2": Telefono,          /**/
                    "telefono3": Telefono,          /**/
                    "telefono4": Telefono,          /**/
                    "tipoInstitucion": null
                };
            };

            return new myDefault();
        },

        initialize: function (attributes, options) {
            BaseModel.prototype.initialize.call(this, attributes, options);
            this.service.loadConfig(this.getServiceConfig());
        },

        setJsonData: function (jsonData) {
            var instFormData = this.parse(jsonData.InstitucionFormadora);
            this.set(instFormData);
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

    instFormNominal.prototype.getServiceConfig = function () {
        return {
            url: 'institucionFormadora'
        };
    };

    return instFormNominal;
}(common, BaseModel, CoordenadasMapa, Domicilio, Participaciones, Telefono));