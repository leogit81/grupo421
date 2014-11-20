/**
* Encapsula lógica relacionada al rendering de los paneles para el Intel App Framework, porque se repite en varias vistas.
*/
var AppFrameworkRenderer = (function (_, $, logger) {
    "use strict";
    
    var animation = "slide";
    
    /**
    * Constructor
    */
    function AfRenderer (config) {
        config = config || {};
        animation = config.animation;
        
        $.bind(logger, "showError", _.bind(this.showError,this));
    };
    
    /*AfRenderer.prototype.preRender = function (view) {
        //la primera vez agrega el panel con el resultado de la consulta, las siguientes veces actualiza el contenido del panel
        if ($(view.getViewSelector()).length == 0) {
            //div panel + contenido
            $.ui.addContentDiv(view.getViewId(), view.$el[0].outerHTML);
        }
        //$(view.getViewSelector()).addClass("consulta-detallada");
        return this;
    };*/
    
    AfRenderer.prototype.render = function (view) {
        //la primera vez agrega el panel con el resultado de la consulta, las siguientes veces actualiza el contenido del panel
        if ($(view.getViewSelector()).length == 0) {
            //div panel + contenido
            $.ui.addContentDiv(view.getViewId(), view.$el[0].outerHTML);
        } else {
            //solo contenido para actualizar
            $.ui.updatePanel(view.getViewId(), view.$el.html());
        }
        
        $.ui.loadContent(view.getViewId(), false, false, animation);
        
        //agrego esta clase para poder aplicar estilos CSS
        //$("#" + view.attributes.id).addClass("consulta-detallada");
        $(view.getViewSelector()).trigger("orientationchange");
        return this;
    };    
    
    AfRenderer.prototype.showError = function (eventData) {
        eventData = eventData || {};
        var titulo = eventData.titulo || "Error de la aplicación";
        var mensajeDeError = eventData.mensajeDeError;
        this.showPopup(titulo, mensajeDeError)
    };
    
    AfRenderer.prototype.showPopup = function (title, message) {
        $.ui.hideMask();
        
        $.ui.popup({
            title: title,
            message: message,
            cancelText: "Aceptar",
            cancelOnly: true
        });
    };
    
    _.extend(AfRenderer, Backbone.Singleton);
    
    return AfRenderer;
}(_, af, Logger));