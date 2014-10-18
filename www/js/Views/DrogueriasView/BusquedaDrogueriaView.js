var BusquedaDrogueriaView = (function (jquery, $, renderer, BaseView, DrogueriaNominal, DrogueriaNominalView) {
    "use strict";

    var busquedaDrogueriaView = BaseView.extend({
        tagName: 'div',

        attributes: {
            'id': 'busquedaDrogueria',
            'class': 'panel',
//            'data-title': 'REDRO',
            'data-nav':"consultas_nav",
        },

        template : _.template(
            '<div class="formGroupHead">Ingrese el código de la drogueria que quiere buscar.</div>' +
            '<form>' +
            '<input id="codigoDrogueria" type="text" name="codigoDrogueria" placeholder="Código de drogueria"></input></br>' +
            '<a id="submitConsultaBusquedaDrogueria" class="button">Consultar</a>' +
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
        //            var drogueriaCollection = new DrogueriaCollection();
        //            var drogueriaColleccionView = DrogueriaCollectionView.getInstance();
        //            drogueriaColleccionView.setModel({model: drogueriaCollection});
        //            drogueriaCollection.processData(data);
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

        ejecutarBusquedaDrogueria: function(){
            var codigoDrogueria = $("#codigoDrogueria").val();
            var drogueriaNominalModel = new DrogueriaNominal();
            //EstablecimientoNominalView.getInstance().setModel(establecimientoNominalModel);
            var drogueriaView = new DrogueriaNominalView();
            drogueriaView.setModel(drogueriaNominalModel);
            drogueriaNominalModel.load(codigoDrogueria);

            //            this.modelDataSource.getModelData(DrogueriaCollection, {
            //                "dependencia": dependenciaDrogueria,
            //                "provincia": provinciaDrogueria
            //                //                "depto": departamentoEstablecimiento,
            //                //                "localidad": localidadEstablecimiento
            //            });
        },

        render: function(){
            //            $.ui.addContentDiv("busquedaDrogueria", this.template());
            //            $.ui.loadContent("busquedaDrogueria", false, false, "slide");


            if ($("#busquedaDrogueria").length <= 0){
                $.ui.addContentDiv("busquedaDrogueria", this.template());//div panel + contenido
            }else
            {
                $.ui.updatePanel("busquedaDrogueria", this.template());//solo contenido para actualizar
            }
            $.ui.loadContent("busquedaDrogueria", false, false, "slide");
            $("#busquedaDrogueria").addClass("consulta-detallada"); //agrego esta clase para poder aplicar estilos CSS




            this.attachEvents();
            return this;
        },

        /**
         * Usado para bindear eventos a los controles del formulario.
         * Se ejecuta después del render cuando los controles se encuentran cargados en la página. 
         */
        attachEvents: function(){
            BaseView.prototype.attachEvents.call(this);
            jquery("#submitConsultaBusquedaDrogueria").on("click", _.bind(this.ejecutarBusquedaDrogueria, this));
        }
    });

    return busquedaDrogueriaView;
})(jQuery, af, AppFrameworkRenderer, BaseView, DrogueriaNominal, DrogueriaNominalView);