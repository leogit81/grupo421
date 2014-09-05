/**
 * Vista base de la cual se pueden extender nuevas vistas. A su vez este extiende de la vista de Backbone.
 * Cuando se construye la misma (initialize()) si se pasa el model en los attributes, la misma guarda una referencia a este.
 * Además, se atacha la función render al evento 'change' del model, de forma que cada vez que cambie este se actualice la vista. 
 */
var BaseView = (function(Backbone){
    var baseView = Backbone.View.extend({
        tagName : "div",
        className: "panel",
        
        template : _.template("<div></div>"),
    
        initialize: function(attributes, options){
            Backbone.View.prototype.initialize.call(this, attributes, options);
            
            if(attributes !== undefined && attributes.model !== undefined){
                this.model = attributes.model;
                this.model.on('change', this.render, this);
            }
        }    
    });
    
    baseView.prototype.model = null;
    baseView.prototype.scroller = null;
    baseView.prototype.renderedHtml = null;
    
    baseView.prototype.render = function () {
        this.$el.empty();
        if(!common.isEmpty(this.parent)){
            this.renderedHtml = this.template(this.model.toJSON());
        }else
        {
            this.renderedHtml = this.$el.append(this.template(this.model.toJSON()))[0].outerHTML;   
        }
        return this;
    };
    
    baseView.prototype.parent = null;
    baseView.prototype.self = baseView;
    baseView.prototype.setModel = function(model){
        this.model = model;
    };
    
    /**
     * Set the parent for this view
     * @param {Backbone.View} the parent view
     */
    baseView.prototype.setParent = function(parent){
        this.parent = parent; 
    };
    
    _.extend(baseView, Backbone.Singleton);
    
    return baseView;
})(Backbone);