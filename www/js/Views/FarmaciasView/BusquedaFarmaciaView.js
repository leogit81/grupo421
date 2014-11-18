var BusquedaFarmaciaView = (function (jquery, $, renderer, BaseView, FarmaciaNominal, FarmaciaNominalView) {
    "use strict";

    var busquedaFarmaciaView = BaseView.extend({
        tagName: 'div',

        attributes: {
            'id': 'busquedaFarmacia',
            'class': 'panel',
            'data-nav':"consultas_nav",    
        },

        template : _.template(
            '<div class="formGroupHead">Ingrese el código de la farmacia que quiere buscar.</div>' +
            '<input id="codigoFarmacia" type="number" name="codigoFarmacia" placeholder="Código de farmacia"></input></br>' +
            '<a id="submitConsultaBusquedaFarmacia" class="button">Buscar</a>'
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

        ejecutarBusquedaFarmacia: function(){
            var codigoFarmacia = $("#codigoFarmacia").val();
            var farmaciaNominalModel = new FarmaciaNominal();
            var farmaciaView = new FarmaciaNominalView({codigo: codigoFarmacia});
            farmaciaView.loadDefaultView();
        },

        /**
         * Usado para bindear eventos a los controles del formulario.
         * Se ejecuta después del render cuando los controles se encuentran cargados en la página. 
         */
        attachEvents: function(){
            BaseView.prototype.attachEvents.call(this);
            $("#afui").delegate(this.getViewSelector() + " a#submitConsultaBusquedaFarmacia","click", _.bind(this.ejecutarBusquedaFarmacia, this));
        }
    });

    return busquedaFarmaciaView;
})(jQuery, af, AppFrameworkRenderer, BaseView, FarmaciaNominal, FarmaciaNominalView);