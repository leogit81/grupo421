var BaseModel = (function(Backbone, _, converter, Service){
    "use strict";
    
    var baseModel = Backbone.Model.extend({
        initialize: function(attributes, options){
            this.service = new Service({
                success: _.bind(this.processData, this),
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
    });
    
    baseModel.prototype.converter = converter;
    
    baseModel.prototype.setJsonData = function(jsonData){
        //template method para que sobreescriban los que heredan de BaseModel
    };
    
    baseModel.prototype.load = function(data){
        this.sync('read', this, data);  
    };
    
    _.extend(baseModel, Backbone.Singleton);
    
    return baseModel;
})(Backbone, _, XmlToJSONConverter, AjaxRestService);
