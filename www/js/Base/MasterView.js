/**
 * Representa una vista que tiene subvistas contenidas en ella. 
 */
var MasterView = (function ($, common, BaseView) {
    "use strict";
    
    var masterView = BaseView.extend({
    });
    
    //masterView.prototype.nestedViews = [];
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
        //this.nestedViews.push(view);
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
        
        var i;
        
        /*for (i = 0; i < this.nestedViews.length; i++) {
            this.insertHTMLSubVista(this.nestedViews[i]);
        }*/
        
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
        var insertElement = $(this.$el[0]).find("#" + viewObject.insertElID);
        
        if (insertElement.length > 0) {
            insertElement.empty();
            insertElement.append(common.isEmpty(viewObject.view.renderedHtml)?"":viewObject.view.renderedHtml);
        } else {
            this.$el.append(viewObject.view.renderedHtml);
        }
    };
    
    return masterView;
}(af, common, BaseView));