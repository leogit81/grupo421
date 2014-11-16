var ConsultaProfesionalesView = (function (jquery, $, renderer, BaseView, ListadoProfesionalesView, BusquedaProfesionalView) {
    "use strict";

    var consultaProfesionalesView = BaseView.extend({
        tagName: 'div',

        attributes: {
            'id': 'consultaProfesionales',
            'class': 'panel',
            'data-nav':"consultas_nav",    
        },

        template : _.template(
            '<div class="formGroupHead">Registro Federal de Profesionales. Seleccione una opción.</div>' +
            '<form>' +
            '<div>' +
            '<a id="submitListadoProfesionales" class="button">Listado de Profesionales</a>' +
            '<br>' +
            '<a id="submitBuscarProfesional" class="button">Buscar Profesional</a>' +
            '</div>' +
            '</form>'
        ),

        initialize: function(attributes, options) {
            options = options || {};
            options.renderer = renderer;
            BaseView.prototype.initialize.call(this, attributes, options);

            this.initializeModelDataSource();
        },

        initializeModelDataSource: function () {
            this.modelDataSource = new ModelDataSource ({view: this});
            this.modelDataSource.on('dataFetched', this.renderVistaDeDatos, this);
        },
        
        ejecutarBuscarProfesional: function(){
            var busquedaProfesionalView = new BusquedaProfesionalView();
            busquedaProfesionalView.render();
        },

        ejecutarListadoProfesionales: function(){
            var listadoProfesionalesView = new ListadoProfesionalesView();
            listadoProfesionalesView.render();
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
            $("#afui").delegate(this.getViewSelector() + " a#submitListadoProfesionales", "click", _.bind(this.ejecutarListadoProfesionales, this));
            $("#afui").delegate(this.getViewSelector() + " a#submitBuscarProfesional", "click", _.bind(this.ejecutarBuscarProfesional, this));
        }
    });
    return consultaProfesionalesView;
})(jQuery, af, AppFrameworkRenderer, BaseView, ListadoProfesionalesView, BusquedaProfesionalView);