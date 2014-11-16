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
            '<div class="formGroupHead">Seleccione el filtro por el que quiera buscar farmacias.</div>' +
            '<form>' +
            '<select id="dependenciaFarmacia" name="dependenciaFarmacia"></select>' +
            '<select id="provinciaFarmacia" name="provinciaFarmacia"></select>' +                
            '<a id="submitConsultaListadoFarmacias" class="button">Consultar</a>' +
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

        renderVistaDeDatos: function (data) {
            var farmaciaCollection = new FarmaciaCollection();
            var farmaciaColleccionView = new FarmaciaCollectionView();
            farmaciaColleccionView.setModel({model: farmaciaCollection});
            farmaciaCollection.processData(data);
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
            //            $.ui.addContentDiv("listadoFarmacias", this.template());
            //            $.ui.loadContent("listadoFarmacias", false, false, "slide");


            /*if ($("#listadoFarmacias").length <= 0){
                $.ui.addContentDiv("listadoFarmacias", this.template());//div panel + contenido
            }else
            {
                $.ui.updatePanel("listadoFarmacias", this.template());//solo contenido para actualizar
            }
            $.ui.loadContent("listadoFarmacias", false, false, "slide");
            $("#listadoFarmacias").addClass("consulta-detallada"); //agrego esta clase para poder aplicar estilos CSS



            this.attachEvents();*/
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