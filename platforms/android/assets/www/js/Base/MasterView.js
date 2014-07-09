/**
 * Representa una vista que tiene vistas anidadas 
 */
define(['require', 'common', 'Base/BaseView'], function(require, common){
    MasterView = BaseView.extend({

    });
    
    MasterView.nestedViews = [];
    
    /**
     * Agrega una vista a la colección de vistas.
     *  @param {BaseView} view 
     */
    MasterView.addView = function(view){
        view.setParent(this);
        this.nestedViews.push(view);
    };
    
    MasterView.render = function () {
        for(view in this.nestedViews){
            this.nestedViews[view].render();
        }
        return this;
    };
    
    return MasterView;
});