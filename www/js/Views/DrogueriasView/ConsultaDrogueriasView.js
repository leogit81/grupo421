var ConsultaDrogueriasView = (function (jquery, $, renderer, BaseView, ListadoDrogueriasView, BusquedaDrogueriaView) {
    "use strict";

    var consultaDrogueriasView = BaseView.extend({
        tagName: 'div',

        attributes: {
            'id': 'consultaDroguerias',
            'class': 'panel',
//            'data-title': 'REDRO',
            'data-nav':"consultas_nav",    
        },

        template : _.template(
            '<div class="formGroupHead">Registro Federal de Droguerias. Seleccione una opción.</div>' +
            '<form>' +
            '<div class="button-grouped vertical">' +
            '<a id="submitListadoDroguerias" class="button">Listado de Droguerias</a>' +
            '<a id="submitBuscarDrogueria" class="button">Buscar Drogueria</a>' +
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

        ejecutarBuscarDrogueria: function(){
            var busquedaDrogueriaView = new BusquedaDrogueriaView();
            busquedaDrogueriaView.render();
        },

        ejecutarListadoDroguerias: function(){
            var listadoDrogueriasView = new ListadoDrogueriasView();
            listadoDrogueriasView.render();
        },

        render: function(){
            //            $.ui.addContentDiv("consultaDroguerias", this.template());
            //            $.ui.loadContent("consultaDroguerias", false, false, "slide");

            if ($("#consultaDroguerias").length <= 0){
                $.ui.addContentDiv("consultaDroguerias", this.template());//div panel + contenido
            }else
            {
                $.ui.updatePanel("consultaDroguerias", this.template());//solo contenido para actualizar
            }
            $.ui.loadContent("consultaDroguerias", false, false, "slide");
            $("#consultaDroguerias").addClass("consulta-detallada"); //agrego esta clase para poder aplicar estilos CSS


            this.attachEvents();
            return this;
        },

        /**
         * Usado para bindear eventos a los controles del formulario.
         * Se ejecuta después del render cuando los controles se encuentran cargados en la página. 
         */
        attachEvents: function(){
            BaseView.prototype.attachEvents.call(this);
            jquery("#submitListadoDroguerias").on("click", _.bind(this.ejecutarListadoDroguerias, this));
            jquery("#submitBuscarDrogueria").on("click", _.bind(this.ejecutarBuscarDrogueria, this));
        }
    });

    return consultaDrogueriasView;
})(jQuery, af, AppFrameworkRenderer, BaseView, ListadoDrogueriasView, BusquedaDrogueriaView);