var ConsultaDrogueriasView = (function (jquery, $, renderer, BaseView, ListadoDrogueriasView, BusquedaDrogueriaView) {
    "use strict";

    var consultaDrogueriasView = BaseView.extend({
        tagName: 'div',

        attributes: {
            'id': 'consultaDroguerias',
            'class': 'panel',
            'data-nav':"consultas_nav",
        },

        template : _.template(
            '<div class="formGroupHead">Registro Federal de Droguerías.<br>Seleccione una opción.</div>' +
            '<div>' +
            '<a id="submitListadoDroguerias" class="button">Búsqueda de droguerías</a>' +
            '<br>' +
            '<a id="submitBuscarDrogueria" class="button">Buscar droguería por código</a>' +
            '</div>'
        ),

        initialize: function(attributes, options) {
            options = options || {};
            options.renderer = renderer;
            BaseView.prototype.initialize.call(this, attributes, options);

            this.pathImagen = './img/iconos/tab_6.png';
            
            /*this.initializeModelDataSource();*/
        },

        /*initializeModelDataSource: function () {
            this.modelDataSource = new ModelDataSource ({view: this});
            this.modelDataSource.on('dataFetched', this.renderVistaDeDatos, this);
        },*/
        
        ejecutarBuscarDrogueria: function(){
            var busquedaDrogueriaView = new BusquedaDrogueriaView();
            busquedaDrogueriaView.render();
        },

        ejecutarListadoDroguerias: function(){
            var listadoDrogueriasView = new ListadoDrogueriasView();
            listadoDrogueriasView.render();
        },

        render: function(){
            BaseView.prototype.render.call(this);
            return this;
        },

        /**
         * Usado para bindear eventos a los controles del formulario.
         * Se ejecuta después del render cuando los controles se encuentran cargados en la página. 
         */
        attachEvents: function(){
            BaseView.prototype.attachEvents.call(this);
            $("#afui").delegate(this.getViewSelector() + " a#submitListadoDroguerias", "click", _.bind(this.ejecutarListadoDroguerias, this));
            $("#afui").delegate(this.getViewSelector() + " a#submitBuscarDrogueria", "click", _.bind(this.ejecutarBuscarDrogueria, this));
        }
    });
    
    return consultaDrogueriasView;
})(jQuery, af, AppFrameworkRenderer, BaseView, ListadoDrogueriasView, BusquedaDrogueriaView);