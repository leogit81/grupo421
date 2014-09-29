var EstablecimientoCollection = (function (common, Backbone, converter, Service) {
    "use strict";
    
    var establecimientoCollection = BaseCollection.extend({
        initialize: function (attributes, options) {
            /*this.service = new Service({
                success: _.bind(this.processData, this),
                url: 'establecimiento/buscar'
            });*/
            BaseCollection.prototype.initialize.call(this, attributes, options);
            this.service.loadConfig(this.getServiceConfig());
        },
        
        /**
         * Call to synchronize the model with the server.
         * @param {Object} method: 'create', 'read', 'delete', 'update'
         * @param {Object} model
         * @param {Object} options
         */
        /*sync: function (method, model, options) {
            if (method === 'read') {
                this.service.get(options);
            }
        },
        
        processData: function (data) {
            var jsonData = this.converter.convert(data);
            this.trigger('beforeChange');
            this.setJsonData(jsonData);
        },
        
        load: function (data) {
            this.sync('read', this, data);
        },
        
        setJsonData: function (jsonData) {
            var establecimientoData = this.parse(jsonData);
            this.set(establecimientoData);
        },

        parse: function (response) {
            return response.EstablecimientoSearchResponse.establecimientos.establecimientoReducido;
        }*/
    });
    
    //establecimientoCollection.prototype.converter = converter;

    establecimientoCollection.prototype.parse = function (parsedData) {
        return parsedData.EstablecimientoSearchResponse.establecimientos.establecimientoReducido;
    };
    
    establecimientoCollection.prototype.getServiceConfig = function () {
        return {
            url: 'establecimiento/buscar'
        };
    };
    
    _.extend(establecimientoCollection, Backbone.Singleton);
    
    return establecimientoCollection;
}(common, Backbone, XmlToJSONConverter, AjaxRestService));