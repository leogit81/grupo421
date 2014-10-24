var ConsultaInstFormView = (function (jquery, $, renderer, BaseView, BusquedaInstFormView) { /*ListadoInstFormView,*/
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
            '<form>' +
            '<div class="button-grouped vertical">' +
            '<a id="submitListadoInstForm" class="button">Listado de Instituciones Formadoras</a>' +
            '<a id="submitBuscarInstForm" class="button">Buscar Institución Formadora</a>' +
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

        /**
        * Hace el render de la vista que muestra los datos del modelo que se obtuvieron a partir de la consulta
        * aplicando los filtros.
        * @param {Object} data, información del modelo obtenida del servicio.
        */
        /*    renderVistaDeDatos: function (data) {
            var ministerioModel = new Ministerio();
            var ministerioView = MinisterioView.getInstance();
            ministerioView.setModel({model: ministerioModel});
            ministerioModel.processData(data);
        },*/

        ejecutarBuscarInstForm: function(){
            var busquedaInstFormView = new BusquedaInstFormView();
            busquedaInstFormView.render();
        },

        ejecutarListadoInstForm: function(){
            var listadoInstFormView = new ListadoInstFormView();
            listadoInstFormView.render();
        },

        render: function(){
            //            $.ui.addContentDiv("consultaInstForm", this.template());
            //            $.ui.loadContent("consultaInstForm", false, false, "slide");

            if ($("#consultaInstForm").length <= 0){
                $.ui.addContentDiv("consultaInstForm", this.template());//div panel + contenido
            }else
            {
                $.ui.updatePanel("consultaInstForm", this.template());//solo contenido para actualizar
            }
            $.ui.loadContent("consultaInstForm", false, false, "slide");
            $("#consultaInstForm").addClass("consulta-detallada"); //agrego esta clase para poder aplicar estilos CSS


            this.attachEvents();
            FastClick.attach($("#submitListadoInstForm"));
            FastClick.attach($("#submitBuscarInstForm"));
            return this;
        },

        /**
         * Usado para bindear eventos a los controles del formulario.
         * Se ejecuta después del render cuando los controles se encuentran cargados en la página. 
         */
        attachEvents: function(){
            BaseView.prototype.attachEvents.call(this);
            jquery("#submitListadoInstForm").on("click", _.bind(this.ejecutarListadoInstForm, this));
            jquery("#submitBuscarInstForm").on("click", _.bind(this.ejecutarBuscarInstForm, this));
        }
    });

    return consultaInstFormView;
})(jQuery, af, AppFrameworkRenderer, BaseView, BusquedaInstFormView); /ListadoInstFormView, */