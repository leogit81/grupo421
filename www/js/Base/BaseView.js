define(['require', 'common', 'backbone'], function(require, common, Backbone){
    BaseView = Backbone.View.extend({
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
    
    BaseView.prototype.model = null;
    BaseView.prototype.scroller = null;
    
    BaseView.prototype.render = function () {
        this.getEl().append(this.template(this.model.toJSON()));
        return this;
    };
    
    BaseView.prototype.getEl = function(){
        if(!common.isEmpty(this.parent)){
            return this.parent.$el;
        }
        
        return this.$el;
    };
    
    BaseView.prototype.parent = null;
    
    /**
     * Set the parent for this view
     * @param {Backbone.View} the parent view
     */
    BaseView.prototype.setParent = function(parent){
        this.parent = parent;    
    };
    
    return BaseView;
});