define(['backbone', 'xmlToJsonConverter', 'Services/AjaxRestService'], function(Backbone, converter, Service){
    "use strict";
    
    var BaseModel = Backbone.Model.extend({
        self: null,
        
        initialize: function(attributes, options){
            this.service = new Service({
                success: this.processData,
            });
            
            self = this;
        },
        
        /**
         * Call to synchronize the model with the server.
         * @param {Object} method: 'create', 'read', 'delete', 'update'
         * @param {Object} model
         * @param {Object} options
         */
        sync: function(method, model, options){
            if (method === 'read'){
                this.service.get(this.id);
            }  
        },
        
        processData: function(data){
            var jsonData = self.converter.convert(data);
            self.setJsonData(jsonData);
        },
    });
    
    BaseModel.prototype.converter = converter;
    
    BaseModel.prototype.setJsonData = function(jsonData){
        //template method para que sobreescriban los que heredan de BaseModel
    };
    
    return BaseModel;
});
