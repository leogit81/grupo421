var ConsultaFarmaciasView = (function (jquery, $, renderer, BaseView, ListadoFarmaciasView, BusquedaFarmaciaView) {
    "use strict";

    var consultaFarmaciasView = BaseView.extend({
        tagName: 'div',

        attributes: {
            'id': 'consultaFarmacias',
            'class': 'panel',
            'data-title': 'REFAR',
            'data-nav':"consultas_nav",    
        },

        template : _.template(
            '<div class="formGroupHead">Registro Federal de Farmacias. Seleccione una opción.</div>' +
            '<form>' +
            '<div class="button-grouped vertical">' +
            '<a id="submitListadoFarmacias" class="button">Listado de Farmacias</a>' +
            '<a id="submitBuscarFarmacia" class="button">Buscar Farmacia</a>' +
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

        ejecutarBuscarFarmacia: function(){
                        var busquedaFarmaciaView = new BusquedaFarmaciaView();
                        busquedaFarmaciaView.render();
        },

        ejecutarListadoFarmacias: function(){
            var listadoFarmaciasView = new ListadoFarmaciasView();
            listadoFarmaciasView.render();
        },

        render: function(){
            $.ui.addContentDiv("consultaFarmacias", this.template());
            $.ui.loadContent("consultaFarmacias", false, false, "slide");
            this.attachEvents();
            return this;
        },

        /**
         * Usado para bindear eventos a los controles del formulario.
         * Se ejecuta después del render cuando los controles se encuentran cargados en la página. 
         */
        attachEvents: function(){
            BaseView.prototype.attachEvents.call(this);
            jquery("#submitListadoFarmacias").on("click", _.bind(this.ejecutarListadoFarmacias, this));
            jquery("#submitBuscarFarmacia").on("click", _.bind(this.ejecutarBuscarFarmacia, this));
        }
    });

    return consultaFarmaciasView;
})(jQuery, af, AppFrameworkRenderer, BaseView, ListadoFarmaciasView, BusquedaFarmaciaView);