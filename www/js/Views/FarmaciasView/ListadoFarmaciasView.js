var ListadoFarmaciasView = (function (jquery, $, renderer, BaseView, FarmaciaCollection, FarmaciaCollectionView) {
    "use strict";

    var listadoFarmaciasView = BaseView.extend({
        tagName: 'div',

        attributes: {
            'id': 'listadoFarmacias',
            'class': 'panel',
            'data-nav':"consultas_nav",    
        },

        template : _.template(
            '<div class="formGroupHead">Complete uno o varios filtros para buscar farmacias.</div>' +
            '<select id="dependenciaFarmacia" name="dependenciaFarmacia"></select>' +
            '<select id="provinciaFarmacia" name="provinciaFarmacia"></select>' +                
            '<a id="submitConsultaListadoFarmacias" class="button">Buscar</a>'
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

        renderVistaDeDatos: function (data) {
            var farmaciaCollection = new FarmaciaCollection();
            var farmaciaColleccionView = new FarmaciaCollectionView();
            farmaciaColleccionView.setModel({model: farmaciaCollection});
            farmaciaCollection.processData(data);
        },

        ejecutarListadoFarmacias: function(){
            var dependenciaFarmacia = $("#dependenciaFarmacia").val();
            var provinciaFarmacia = $("#provinciaFarmacia").val();

            this.modelDataSource.getModelData(FarmaciaCollection, {
                "dependencia": dependenciaFarmacia,
                "provincia": provinciaFarmacia
                //                "depto": departamentoEstablecimiento,
                //                "localidad": localidadEstablecimiento
            });
        },

        render: function(){
            BaseView.prototype.render.call(this);
            $(this.getViewSelector() + " select#provinciaFarmacia")[0].innerHTML = listaCompletaProvincias;
            $(this.getViewSelector() + " select#dependenciaFarmacia")[0].innerHTML = listaCompletaDependencias;

            return this;
        },

        /**
         * Usado para bindear eventos a los controles del formulario.
         * Se ejecuta después del render cuando los controles se encuentran cargados en la página. 
         */
        attachEvents: function(){
            BaseView.prototype.attachEvents.call(this);
            $("#afui").delegate(this.getViewSelector() + " a#submitConsultaListadoFarmacias", "click", _.bind(this.ejecutarListadoFarmacias, this));
        }
    });

    return listadoFarmaciasView;
})(jQuery, af, AppFrameworkRenderer, BaseView, FarmaciaCollection, FarmaciaCollectionView);