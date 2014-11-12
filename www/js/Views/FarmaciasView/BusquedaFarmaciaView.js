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
            '<form>' +
            '<input id="codigoFarmacia" type="number" name="codigoFarmacia" placeholder="Código de farmacia"></input></br>' +
            '<a id="submitConsultaBusquedaFarmacia" class="button">Consultar</a>' +
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

        //        renderVistaDeDatos: function (data) {
        //            var farmaciaCollection = new FarmaciaCollection();
        //            var farmaciaColleccionView = FarmaciaCollectionView.getInstance();
        //            farmaciaColleccionView.setModel({model: farmaciaCollection});
        //            farmaciaCollection.processData(data);
        //        },

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

        ejecutarBusquedaFarmacia: function(){
            var codigoFarmacia = $("#codigoFarmacia").val();
            var farmaciaNominalModel = new FarmaciaNominal();
            //EstablecimientoNominalView.getInstance().setModel(establecimientoNominalModel);
            var farmaciaView = new FarmaciaNominalView({codigo: codigoFarmacia});
            farmaciaView.loadDefaultView();
//            farmaciaView.setModel(farmaciaNominalModel);
//            farmaciaNominalModel.load(codigoFarmacia);

            //            this.modelDataSource.getModelData(FarmaciaCollection, {
            //                "dependencia": dependenciaFarmacia,
            //                "provincia": provinciaFarmacia
            //                //                "depto": departamentoEstablecimiento,
            //                //                "localidad": localidadEstablecimiento
            //            });
        },

        /*render: function(){
            //            $.ui.addContentDiv("busquedaFarmacia", this.template());
            //            $.ui.loadContent("busquedaFarmacia", false, false, "slide");


            if ($("#busquedaFarmacia").length <= 0){
                $.ui.addContentDiv("busquedaFarmacia", this.template());//div panel + contenido
            }else
            {
                $.ui.updatePanel("busquedaFarmacia", this.template());//solo contenido para actualizar
            }
            $.ui.loadContent("busquedaFarmacia", false, false, "slide");
            $("#busquedaFarmacia").addClass("consulta-detallada"); //agrego esta clase para poder aplicar estilos CSS




            this.attachEvents();
            return this;
        },*/

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