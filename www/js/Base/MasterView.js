/**
 * Representa una vista que tiene subvistas contenidas en ella. 
 */
var MasterView = (function ($, common, BaseView) {
    "use strict";
    
    var masterView = BaseView.extend({
    });
    
    masterView.prototype.nestedViewsDictionary = {};
    
    /**
     * Agrega una vista a la colección de vistas.
     * @param {BaseView} view 
     * @param {String} viewName, el nombre de la vista, si se quiere poder acceder a la misma mediante nombre. 
     * @param {String} insertionElementId, opcional, es el id del elemento HTML donde se insertará la subvista, por ejemplo, un div.
     * Este elemento tiene que existir dentro del HTML que se renderiza con la vista maestra.
     */
    masterView.prototype.addView = function (view, viewName, insertionElementId) {
        view.setParent(this);
        if (!common.isEmpty(viewName)) {
            this.nestedViewsDictionary[viewName] = {    view: view,
                                                        insertElID: insertionElementId
                                                    };
        }
    };
    
    /**
     * Devuelve una vista por nombre.
     *  @param {String} , el nombre de la vista, si se quiere poder acceder a la misma mediante nombre. 
     */
    masterView.prototype.getViewByName = function (viewName) {
        return this.nestedViewsDictionary[viewName].view;
    };
    
    /**
     * Cada una de las vistas anidadas cuando se renderiza guarda el resultado en la propiedad renderedHTML
     */
    masterView.prototype.armarHtmlConData = function (data) {
        BaseView.prototype.armarHtmlConData.call(this, data);
        
        for (var nestedView in this.nestedViewsDictionary) {
            if (this.nestedViewsDictionary.hasOwnProperty(nestedView)) {
                this.insertHTMLSubVista(this.nestedViewsDictionary[nestedView]);
            }
        }
    };
    
    /**
    * Inserta el HTML de la subvista en el elemento de la vista maestra que tiene el mismo insertionElementId
    * @param {Object} viewObject, es un objeto que tiene la subvista y el ID del elemento de la vista maestra
    * donde se tiene que insertar.
    */
    masterView.prototype.insertHTMLSubVista = function (viewObject) {
        var insertElement = $(this.$el[0]).find("#" + viewObject.insertElID),
            htmlSubvista = viewObject.view.$el[0].innerHTML;
        
        if (insertElement.length > 0) {
            insertElement.empty();
            insertElement.append(common.isEmpty(htmlSubvista)?"":htmlSubvista);
        } else {
            this.$el.append(htmlSubvista);
        }
    };
    
    /**
    * En la master view el render se hace solamente para la vista maestra, no para cada una 
    */
    masterView.prototype.renderHtml = function () {        
        if (common.isEmpty(this.parent)) {
            BaseView.prototype.renderHtml.call(this);
        }

        return this;
    };
    
    /**
    * Devuelve un objeto literal con el sub model o un objeto literal vacío.
    * @param {String} submodelName, nombre que tiene la propiedad que contiene el sub model
    */
    masterView.prototype.getModelOrDefault = function (submodelName) {
        if (!common.isEmpty(this.model)) {
            var submodel = this.model.get(submodelName);
            if (!common.isEmpty(submodel)) {
                if (_.isFunction(submodel)) {
                    return {model: new submodel()};
                }

                return {model: submodel};
            }
        }

        return {};
    };
    
    return masterView;
}(af, common, BaseView));