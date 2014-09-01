var EstablecimientoCollection = ( 
function(common, Backbone, converter, Service){
    "use strict";
    
    var establecimientoCollection = Backbone.Collection.extend({
        initialize: function(attributes, options){
            this.service = new Service({
                success: _.bind(this.processData, this),
                url: 'establecimiento/buscar',
            });
        },
        
        /**
         * Call to synchronize the model with the server.
         * @param {Object} method: 'create', 'read', 'delete', 'update'
         * @param {Object} model
         * @param {Object} options
         */
        sync: function(method, model, options){
            if (method === 'read'){
                this.service.get(options);
            }  
        },
        
        processData: function(data){
            var jsonData = this.converter.convert(data);
            this.trigger('beforeChange');
            this.setJsonData(jsonData);
        },
        
        load: function(data){
            this.sync('read', this, data);  
        },
        
        setJsonData: function(jsonData){
            var establecimientoData = this.parse(jsonData);
            this.set(establecimientoData);
        },

        parse: function(response){
            return response.EstablecimientoSearchResponse.establecimientos.establecimientoReducido;
        }
    });
    
    establecimientoCollection.prototype.converter = converter;
    
    /*establecimientoCollection.prototype.setJsonData = function(jsonData){
        //template method para que sobreescriban los que heredan
    };*/
    
    _.extend(establecimientoCollection, Backbone.Singleton);
    
    return establecimientoCollection;
})(common, Backbone, XmlToJSONConverter, AjaxRestService);