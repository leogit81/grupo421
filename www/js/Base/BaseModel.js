define(['backbone', 'xmlToJsonConverter', 'Services/AjaxRestService'], function(Backbone, converter, Service){
    "use strict";
    
    var BaseModel = Backbone.Model.extend({
        initialize: function(attributes, options){
            this.service = new Service({
                success: this.processData,
            });
        },
        
        /**
         * Call to synchronize the model with the server.
         * @param {Object} method: 'create', 'read', 'delete', 'update'
         * @param {Object} model
         * @param {Object} options
         */
        sync: function(method, model, options){
            if (method === 'create'){
                this.service.get(this.id);
            }  
        },
        
        processData: function(data){
            var jsonData = converter.convertToJson(data.target.responseText);
            console.log(JSON.stringify(jsonData));
        }
    });
    
    return BaseModel;
});
