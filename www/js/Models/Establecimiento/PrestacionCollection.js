var PrestacionCollection = (function (common, Backbone, converter, Service) {
    "use strict";
    
    var prestacionCollection = BaseCollection.extend({
        initialize: function (attributes, options) {
            BaseCollection.prototype.initialize.call(this, attributes, options);
            this.service.loadConfig(this.getServiceConfig());
        }
    });
    
    prestacionCollection.prototype.parse = function (parsedData) {
        var prestacionesDisponibles = _.filter(parsedData.prestacionesEstablecimiento.prestaciones.prestacion, function(item) {
            var prestacionDisponible = !common.isEmpty(item.disponible) && item.disponible.toLowerCase() === "si";
            return prestacionDisponible;
        }, this);
        
        return prestacionesDisponibles;
    };
    
    prestacionCollection.prototype.getServiceConfig = function () {
        return {
            url: 'establecimiento/prestaciones'
        };
    };
    
    _.extend(prestacionCollection, Backbone.Singleton);
    
    return prestacionCollection;
}(common, Backbone, XmlToJSONConverter, AjaxRestService));