var BaseModel = (function (common, Backbone, _, converter, Service) {
    "use strict";

    var baseModel = Backbone.Model.extend({
        initialize: function (attributes, options) {
            this.wrapDefaultsInFunction();
            this.loadDefault(attributes, true);
            this.service = new Service({
                success: _.bind(this.processData, this)
            });
            options = options || {};
            this.setConverter(options.converter || converter);
        },
        
        posicion: null,

        /**
        * Si defaults tiene una referencia a un objeto, wrapea ese objeto en una función que cada vez que se ejecuta devuelve una
        * nueva instancia del objeto.
        */
        wrapDefaultsInFunction: function () {
            if (!_.isFunction(this.defaults)) {
                var currentDefaults = this.defaults;

                this.defaults = function () {
                    var myDefault = function () {
                        return currentDefaults;
                    };

                    return new myDefault();
                }
            }
        },

        /**
        * Inicializa un nuevo objeto con los defaults. Cuando alguna de las propiedades del defaults
        * es un función la ejecuta y retorna su valor.
        * @param {Object} attributes, atributos a setear en el modelo. Tienen precedencia sobre los defaults.
        * @param {boolean} force, fuerza que se pisen los atributos del modelo, con los attributes o los defaults.
        */
        loadDefault: function (attributes, force) {
            var attrs = attributes || {},
                defaultAux = this.getDefaults();
            force = force || true;
            this.forceDefaults(force, this.attributes, defaultAux, attrs);
        },

        /**
        * Obtiene un objeto con las propiedades por default para el modelo. Se utiliza porque el default del modelo puede
        * contener submodelos, y para obtener el default hay que llamar al constructor del submodelo.
        */
        getDefaults: function () {
            var defaultAux = {};
            _.each(_.result(this, 'defaults'), function (value, prop, defaultsList) {
                defaultAux[prop] = common.constructorResult(defaultsList, prop);
            }, this);

            return defaultAux;
        },

        /** Método tomado de underscore.defaults
        * Llena un objeto dado con las propiedades por default.
        * Recibe una lista variable de parámetros, con todas las propiedades que se quieran utilizar para llenar el objeto.
        * @param {boolean} force, true, pisa el valor del objeto cada vez que encuentra la propiedad en la lista de propiedades por
        * default. False, Llena las propiedades vacías con lo primero que encuentra y después ignora las demás.
        * @param {Object} obj, es el objeto que se quiere llenar con las propiedades por default.
        */
        forceDefaults: function (force, obj) {
            var argsAux = [],
                i;
            for (i = 2; i < arguments.length; i++) {
                argsAux[i - 2] = arguments[i];
            }

            _.each(argsAux, function (source) {
                if (source) {
                    for (var prop in source) {
                        if (force || obj[prop] === void 0) obj[prop] = source[prop];
                    }
                }
            });
            return obj;
        },

        /**
         * Call to synchronize the model with the server.
         * @param {Object} method: 'create', 'read', 'delete', 'update'
         * @param {Object} model
         * @param {Object} options
         */
        sync: function (method, model, options) {
            if (method === 'read') {
                this.service.get(options);
            }
            else if ( method === 'update') {
                this.service.post(options);
            }
        }
    });

    baseModel.prototype.setConverter = function (converter) {
        this.converter = converter;
    };

    baseModel.prototype.setJsonData = function (jsonData) {
        //template method para que sobreescriban los que heredan de BaseModel
    };

    baseModel.prototype.load = function (data) {
        this.sync('read', this, data);
    };

    baseModel.prototype.update = function (data) {
        this.sync('update', this, data);
    };
    /**
    * Devuelve un objeto con la configuración del servicio del model. Por ejemplo, URL del webservice.
    */
    baseModel.prototype.getServiceConfig = function () {
        return {};
    };

    baseModel.prototype.processData = function (data) {    
        /*Chequeo para las consultas privadas, si la consulta devuelve un error de autenticación, muestra el popup de login*/
        if (this.service.resultadoUltimaEjecucion === "ERROR_AUTENTICACION") {
            Logger.log({status:this.service.resultadoUltimaEjecucion});
            var iniciarSesion = new InicioSesionView();
            return false;
        }
        var jsonData = this.converter.convert(data);
        //this.trigger('beforeChange');
        this.setJsonData(jsonData);
        return true;
    };
    
    /**
    * Obtiene una lista de coordenadas de puntos que se pueden situar sobre el mapa.
    */
    baseModel.prototype.obtenerCoordenadasMarcadoresMapa = function () {
        return [];
    };
    
    /**
    * Obtiene la posición en la cual se centrará el mapa.
    */
    baseModel.prototype.getCenterPosition = function () {
        var coordenadas = {
                "latitud": this.get("latitud"),
                "longitud": this.get("longitud")
            };
        
        return coordenadas;
    };
    
    _.extend(baseModel, Backbone.Singleton);

    return baseModel;
}(common, Backbone, _, XmlToJSONConverter, AjaxRestService));
