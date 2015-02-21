
/**
* Utilizado para obtener modelos para vistas que no tienen un modelo asociado, como las que muestran filtros
* y después ejecutan la consulta aplicando los mismos, para obtener uno o varios modelos.
*/
var ModelDataSource = (function (common, Backbone, _, Service) {
    "use strict";
    
    var modelDataSource = Backbone.Model.extend({
        initialize: function (attributes, options) {
            if (!common.isEmpty(attributes) && !common.isEmpty(attributes.view)) {
                this.view = attributes.view;
            }            
            this.service = new Service({
                success: _.bind(this.processData, this)
            });
        },
        
        /**
        * Cuando finaliza la llamada Ajax del servicio, se dispara el evento dataFetched, para que la vista que 
        * ejecutó la recuperación de los datos pueda procesarlos.
        * Cualquier vista que utilice el ModelDataSource debería bindear un handler para este evento y procesar la data obtenida.
        */
        processData: function (data) {
            this.trigger("dataFetched", data);
        },
        
        /**
        * Recibe el constructor del model del que se quieren recuperar los datos, y los filtros que se deben 
        * pasar a la consulta.
        * @param {Function} model, constructor del modelo del que se quieren obtener los datos.
        * @param {Object} filtros, un objeto con los filtros que se enviarán al web service para recuperar
        * la información del modelo.
        */
        getModelData: function (model, filtro) {
            if (_.isFunction(model)) {
                this.service.loadConfig(model.prototype.getServiceConfig());
                return this.service.get(filtro);
            } else {
                throw new "Argumento no válido, debe proporcionar el constructor del modelo.";
            }
        }
    });
    
    _.extend(modelDataSource, Backbone.Singleton);
    
    return modelDataSource;
}(common, Backbone, _, AjaxRestService));
