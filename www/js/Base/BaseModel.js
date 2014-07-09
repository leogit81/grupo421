define(['backbone', 'xmltojson', 'Services/AjaxRestService'], function(Backbone, converter, service){
    "use strict";
    
    var BaseModel = Backbone.Model.extend({
    });
    
    BaseModel.sync = function(method, model, options){
        if (method === 'GET'){
            service.get(options);
        }  
    };
    
    return BaseModel;
});
