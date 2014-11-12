var BusquedaEstablecimientoView = (function (jquery, $, renderer, BaseView, EstablecimientoNominal, EstablecimientoNominalView) {
    "use strict";

    var busquedaEstablecimientoView = BaseView.extend({
        tagName: 'div',

        attributes: {
            'id': 'busquedaEstablecimiento',
            'class': 'panel',
            'data-nav':"consultas_nav",    
        },

        template : _.template(
            '<div class="formGroupHead">Ingrese el código de establecimiento que quiera buscar.</div>' +
            '<form>' +
            '<input id="codigoEstablecimiento" type="number" name="codigoEstablecimiento" placeholder="Código de establecimiento"></input></br>' +
            '<a id="submitConsultaBusquedaEstablecimiento" class="button">Consultar</a>' +
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

        ejecutarBusquedaEstablecimiento: function(){
            var codigoEstablecimiento = $("#codigoEstablecimiento").val();
            var establecimientoNominalModel = new EstablecimientoNominal();
            var establecimientoView = new EstablecimientoNominalView({codigo: codigoEstablecimiento});
            establecimientoView.loadDefaultView();
        },

        /**
         * Usado para bindear eventos a los controles del formulario.
         * Se ejecuta después del render cuando los controles se encuentran cargados en la página. 
         */
        attachEvents: function(){
            BaseView.prototype.attachEvents.call(this);
            $("#afui").delegate(this.getViewSelector() + " a#submitConsultaBusquedaEstablecimiento","click", _.bind(this.ejecutarBusquedaEstablecimiento, this));
        }
    });

    return busquedaEstablecimientoView;
})(jQuery, af, AppFrameworkRenderer, BaseView, EstablecimientoNominal, EstablecimientoNominalView);