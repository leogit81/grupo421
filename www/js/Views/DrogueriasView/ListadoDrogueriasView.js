var ListadoDrogueriasView = (function (jquery, $, renderer, BaseView, DrogueriaCollection, DrogueriaCollectionView) {
    "use strict";

    var listadoDrogueriasView = BaseView.extend({
        tagName: 'div',

        attributes: {
            'id': 'listadoDroguerias',
            'class': 'panel',
            'data-title': 'REDRO',
            'data-nav':"consultas_nav",    
        },

        template : _.template(
            '<div class="formGroupHead">Seleccione el filtro por el que quiera buscar droguerias.</div>' +
            '<form>' +
            '<select id="dependenciaDrogueria" name="dependenciaDrogueria"></select>' +
            '<select id="provinciaDrogueria" name="provinciaDrogueria"></select>' +                
            '<a id="submitConsultaListadoDroguerias" class="button">Consultar</a>' +
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
            var drogueriaCollection = new DrogueriaCollection();
            var drogueriaColleccionView = DrogueriaCollectionView.getInstance();
            drogueriaColleccionView.setModel({model: drogueriaCollection});
            drogueriaCollection.processData(data);
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

        ejecutarListadoDroguerias: function(){
            var dependenciaDrogueria = $("#dependenciaDrogueria").val();
            var provinciaDrogueria = $("#provinciaDrogueria").val();

            this.modelDataSource.getModelData(DrogueriaCollection, {
                "dependencia": dependenciaDrogueria,
                "provincia": provinciaDrogueria
                //                "depto": departamentoEstablecimiento,
                //                "localidad": localidadEstablecimiento
            });
        },

        render: function(){
//            $.ui.addContentDiv("listadoDroguerias", this.template());
//            $.ui.loadContent("listadoDroguerias", false, false, "slide");
            
            
            if ($("#listadoDroguerias").length <= 0){
                $.ui.addContentDiv("listadoDroguerias", this.template());//div panel + contenido
            }else
            {
                $.ui.updatePanel("listadoDroguerias", this.template());//solo contenido para actualizar
            }
            $.ui.loadContent("listadoDroguerias", false, false, "slide");
            $("#listadoDroguerias").addClass("consulta-detallada"); //agrego esta clase para poder aplicar estilos CSS
            
            
            
            this.attachEvents();
            document.getElementById("provinciaDrogueria").innerHTML = listaCompletaProvincias;
            document.getElementById("dependenciaDrogueria").innerHTML = listaCompletaDependencias;

            return this;
        },

        /**
         * Usado para bindear eventos a los controles del formulario.
         * Se ejecuta después del render cuando los controles se encuentran cargados en la página. 
         */
        attachEvents: function(){
            BaseView.prototype.attachEvents.call(this);
            jquery("#submitConsultaListadoDroguerias").on("click", _.bind(this.ejecutarListadoDroguerias, this));
        }
    });

    return listadoDrogueriasView;
})(jQuery, af, AppFrameworkRenderer, BaseView, DrogueriaCollection, DrogueriaCollectionView);