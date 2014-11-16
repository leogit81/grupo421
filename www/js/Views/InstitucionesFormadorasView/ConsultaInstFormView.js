var ConsultaInstFormView = (function (jquery, $, renderer, BaseView, BusquedaInstFormView, ListadoInstFormView) { 
    "use strict";

    var consultaInstFormView = BaseView.extend({
        tagName: 'div',

        attributes: {
            'id': 'consultaInstForm',
            'class': 'panel',
            'data-nav':"consultas_nav",
        },

        template : _.template(
            '<div class="formGroupHead">Registro Federal de Instituciones Formadoras. Seleccione una opción.</div>' +
            '<div>' +
            '<a id="submitListadoInstForm" class="button">Listado de Instituciones Formadoras</a>' +
            '<br>' +
            '<a id="submitBuscarInstForm" class="button">Buscar Institución Formadora</a>' +
            '</div>'
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

        ejecutarBuscarInstForm: function(){
            var busquedaInstFormView = new BusquedaInstFormView();
            busquedaInstFormView.render();
        },

        ejecutarListadoInstForm: function(){
            var listadoInstFormView = new ListadoInstFormView();
            listadoInstFormView.render();
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
            $("#afui").delegate(this.getViewSelector() + " a#submitListadoInstForm", "click", _.bind(this.ejecutarListadoInstForm, this));
            $("#afui").delegate(this.getViewSelector() + " a#submitBuscarInstForm", "click", _.bind(this.ejecutarBuscarInstForm, this));
        }
    });
    return consultaInstFormView;
})(jQuery, af, AppFrameworkRenderer, BaseView, BusquedaInstFormView, ListadoInstFormView);