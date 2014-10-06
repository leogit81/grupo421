/**
 * Vista base de la cual se pueden extender nuevas vistas. A su vez este extiende de la vista de Backbone.
 * Cuando se construye la misma (initialize()) si se pasa el model en los attributes, la misma guarda una referencia a este.
 * Además, se atacha la función render al evento 'change' del model, de forma que cada vez que cambie este se actualice la vista. 
 */
var BaseView = (function ($, common, Backbone) {
    "use strict";
    
    var baseView = Backbone.View.extend({
        tagName : "div",
        className: "panel",
        
        template : _.template("<div></div>"),
    
        initialize: function (attributes, options) {
            if (attributes !== undefined && !common.isEmpty(attributes.model)) {
                this.setModel(attributes.model);
            }
            
            options = options || {};
            if (!common.isEmpty(options.renderer)) {
               this.renderer = options.renderer;
            }
            
            this.attachEvents();
        },
        
        setModel: function (model) {
            if (common.isEmpty(model.model) || _.isFunction(model.model)) {
                this.model = model;
            } else {
                this.model = model.model;
            }
            
            this.model.on('change', this.render, this);
        }
    });
    
    baseView.prototype.model = null;
    baseView.prototype.scroller = null;
    baseView.prototype.renderedHtml = null;
    
    /**
    * Muestra los controles y la información del modelo en la página.
    */
    baseView.prototype.render = function () {
        var jsonData = this.getModelData();
        
        return this.renderFromData(jsonData);
    };
    
    /**
    * Encapsula la lógica del render de la vista en la página.
    */
    baseView.prototype.renderFromData = function (data) {
        this.clearView();
        
        this.armarHtmlConData(data);
        
        this.trigger("viewRendered");
        return this.renderHtml();
    };
    
    baseView.prototype.clearView = function () {
        this.$el.empty();
    };
    
    /**
    * Devuelve la data del modelo. Esta para que puedan sobreescribir las subclases de base view
    */
    baseView.prototype.getModelData = function () {
        var jsonData = {};
        if (!common.isEmpty(this.model)) {
            jsonData = this.model.toJSON();
        }
        
        return jsonData;
    };
    
    /**
    * Arma el html con la información del modelo, para después hacer el render de la vista.
    */
    baseView.prototype.armarHtmlConData = function (data) {
        if (!common.isEmpty(this.parent)) {
            this.renderedHtml = this.$el.append(this.replaceTemplateWithData(data))[0].innerHTML;
        } else {
            this.renderedHtml = this.$el.append(this.replaceTemplateWithData(data))[0].outerHTML;
        }
    };
    
    /**
    * Delega el render de la vista al renderer. El renderer agrega el panel en el DOM.
    * La implementación del renderer tiene lógica particular del framework de UI usado.
    * Este método se utiliza en el render() y renderEmptyView()
    */
    baseView.prototype.renderHtml = function () {
        if (!common.isEmpty(this.renderer)) {
            this.renderer.render(this);
        }

        return this;
    };
    
    /**
    * Muestra los controles y limpia toda la información que pudieran tener.
    */
    baseView.prototype.renderEmptyView = function () {
        var jsonData = {};
        if (!common.isEmpty(this.model)) {
            jsonData = this.model.getDefaults();
        }
        
        return this.renderFromData(jsonData);
    };
    
    baseView.prototype.parent = null;
    
    /**
    * Bindea los handlers para los eventos de la vista.
    */
    baseView.prototype.attachEvents = function () {
    };
    
    /**
     * Set the parent for this view
     * @param {Backbone.View} the parent view
     */
    baseView.prototype.setParent = function (parent) {
        this.parent = parent;
    };
    
    /**
     * Devuelve un string con el template de la vista reemplazando las variables por los valores pasados en el JSON
     * Utiliza el default del modelo para rellenar el objeto JSON con las propiedades faltantes necesarias para reemplazar
     * en el template.
     * @param {JSON} jsonData, un objeto JSON con la data que se reemplazará en el template.
     */
    baseView.prototype.replaceTemplateWithData = function (jsonData) {
        if (common.isEmpty(jsonData)) {
            jsonData = {};
        }
        
        jsonData = _.extend(this.getModelDefault(), jsonData);
        
        return this.template(jsonData);
    };
    
    /**
    * Devuelve el default del modelo.
    */
    baseView.prototype.getModelDefault = function () {
        if (!common.isEmpty(this.model)) {
            return this.model.defaults;
        }
        
        return {};
    };
    
    _.extend(baseView, Backbone.Singleton);
    
    return baseView;
}(af, common, Backbone));