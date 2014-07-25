/**
 * Representa una vista que tiene subvistas contenidas en ella. 
 */
define(['require', 'common', 'Base/BaseView'], function(require, common){
    //TODO: refactor del nombre, podría llamarse vista compuesta
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
    
    /**
     * Cada una de las vistas anidadas cuando se renderiza guarda el resultado en la propiedad renderedHTML
     * La vista compuesta obtiene su valor de cada una de sus subvistas y lo agrega a su contenido.  
     */
    MasterView.prototype.render = function () {
        //vacía el elemento HTML donde se muestra el contenido, antes de volver a renderizarlo.
        this.$el.empty();
        BaseView.prototype.render.call(this);
        for(view in this.nestedViews){
            this.$el.append(this.nestedViews[view].renderedHtml);
        }
        return this;
    };
    
    return MasterView;
});