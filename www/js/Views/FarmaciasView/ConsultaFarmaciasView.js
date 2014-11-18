var ConsultaFarmaciasView = (function (jquery, $, renderer, BaseView, ListadoFarmaciasView, BusquedaFarmaciaView) {
    "use strict";

    var consultaFarmaciasView = BaseView.extend({
        tagName: 'div',

        attributes: {
            'id': 'consultaFarmacias',
            'class': 'panel',
            'data-nav':"consultas_nav",    
        },

        template : _.template(
            '<div class="formGroupHead">Registro Federal de Farmacias.<br>Seleccione una opción.</div>' +
            '<div>' +
            '<a id="submitListadoFarmacias" class="button">Búsqueda de farmacias</a>' +
            '<br>' +
            '<a id="submitBuscarFarmacia" class="button">Buscar farmacia por código</a>' +
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

        ejecutarBuscarFarmacia: function(){
            var busquedaFarmaciaView = new BusquedaFarmaciaView();
            busquedaFarmaciaView.render();
        },

        ejecutarListadoFarmacias: function(){
            var listadoFarmaciasView = new ListadoFarmaciasView();
            listadoFarmaciasView.render();
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
            $("#afui").delegate(this.getViewSelector() + " a#submitListadoFarmacias", "click", _.bind(this.ejecutarListadoFarmacias, this));
            $("#afui").delegate(this.getViewSelector() + " a#submitBuscarFarmacia", "click", _.bind(this.ejecutarBuscarFarmacia, this));
        }
    });

    return consultaFarmaciasView;
})(jQuery, af, AppFrameworkRenderer, BaseView, ListadoFarmaciasView, BusquedaFarmaciaView);