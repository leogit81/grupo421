/**
* Encapsula lógica relacionada al rendering de los paneles para el Intel App Framework, porque se repite en varias vistas.
*/
var AppFrameworkRenderer = (function (_, $, BaseView) {
    "use strict";
    
    var animation = "slide";
    
    /**
    * Constructor
    */
    var afRenderer = function (config) {
        config = config || {};
        animation = config.animation;
    };
    
    afRenderer.render = function (view) {
        //la primera vez agrega el panel con el resultado de la consulta, las siguientes veces actualiza el contenido del panel
        if ($("#"+view.attributes.id).length == 0) {
            //div panel + contenido
            $.ui.addContentDiv(view.attributes.id, view.$el[0].outerHTML);
        } else {
            //solo contenido para actualizar
            $.ui.updatePanel(view.attributes.id, view.$el.html());
        }
        
        $.ui.loadContent(view.attributes.id, false, false, animation);
        return this;
    };
    
    _.extend(afRenderer, Backbone.Singleton);
    
    return afRenderer;
}(_, af, BaseView));