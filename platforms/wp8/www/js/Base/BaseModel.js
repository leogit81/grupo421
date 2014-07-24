define(['backbone', 'underscore', 'xmlToJsonConverter', 'Services/AjaxRestService'], function(Backbone, _, converter, Service){
    "use strict";
    
    var BaseModel = Backbone.Model.extend({
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
    
    BaseModel.prototype.converter = converter;
    
    BaseModel.prototype.setJsonData = function(jsonData){
        //template method para que sobreescriban los que heredan de BaseModel
    };
    
    return BaseModel;
});
