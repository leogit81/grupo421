define(['require', 'common', 'Base/BaseModel'], function(require, common, BaseModel){
    BaseView = Backbone.View.extend({
        tagName : "div",
        className: "panel",
        
        model: BaseModel,
        
    });
    
    BaseView.render = function () {
        this.getEl().html(this.template(this.model.toJSON()));
        return this;
    };
    
    BaseView.getEl = function(){
        if(!common.isEmpty(this.parent)){
            return this.parent.$el;
        }
        
        return this.$el;
    };
    
    BaseView.parent = null;
    
    /**
     * Set the parent for this view
     * @param {Backbone.View} the parent view
     */
    BaseView.setParent = function(parent){
        this.parent = parent;    
    };
    
    return BaseView;
});