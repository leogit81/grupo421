/**
 * Representa una vista que tiene vistas anidadas 
 */
define(['require', 'common', 'Base/BaseView'], function(require, common){
    MasterView = BaseView.extend({
    });
    
    MasterView.prototype.nestedViews = [];
    
    /**
     * Agrega una vista a la colección de vistas.
     *  @param {BaseView} view 
     */
    MasterView.prototype.addView = function(view){
        view.setParent(this);
        this.nestedViews.push(view);
    };
    
    MasterView.prototype.render = function () {
        BaseView.prototype.render.call(this);
        /*for(view in this.nestedViews){
            this.nestedViews[view].render();
        }*/
       this.getEl().append(this.elAux.html());
        return this;
    };
    
    return MasterView;
});