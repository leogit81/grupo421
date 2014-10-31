var BusquedaInstFormView = (function (jquery, $, renderer, BaseView, InstFormNominal, InstFormNominalView) {
    "use strict";

    var busquedaInstFormView = BaseView.extend({
        tagName: 'div',

        attributes: {
            'id': 'busquedaInstForm',
            'class': 'panel',
            'data-nav':"consultas_nav",    
        },

        template : _.template(
            '<div class="formGroupHead">Ingrese el código de la institución formadora que quiere buscar.</div>' +
            '<form>' +
            '<input id="codigoInstForm" type="text" name="codigoInstForm" placeholder="Código de Institución Formadora"></input></br>' +
            '<a id="submitConsultaBusquedaInstForm" class="button">Consultar</a>' +
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

        ejecutarBusquedaInstForm: function(){
            var codigoInstForm = $("#codigoInstForm").val();
            var instFormNominalModel = new InstFormNominal();
            var instFormView = new InstFormNominalView();
            instFormView.setModel(instFormNominalModel);
            instFormNominalModel.load(codigoInstForm);
        },

        render: function(){
            BaseView.prototype.render.call(this);
            if ($("#busquedaInstForm").length <= 0){
                $.ui.addContentDiv("busquedaInstForm", this.template());//div panel + contenido
            }else
            {
                $.ui.updatePanel("busquedaInstForm", this.template());//solo contenido para actualizar
            }
            $.ui.loadContent("busquedaInstForm", false, false, "slide");
            $("#busquedaInstForm").addClass("consulta-detallada"); //agrego esta clase para poder aplicar estilos CSS

            this.attachEvents();
            return this;
        },

        /**
         * Usado para bindear eventos a los controles del formulario.
         * Se ejecuta después del render cuando los controles se encuentran cargados en la página. 
         */
        attachEvents: function(){
            BaseView.prototype.attachEvents.call(this);
            jquery("#submitConsultaBusquedaInstForm").on("click", _.bind(this.ejecutarBusquedaInstForm, this));
        }
    });

    return busquedaInstFormView;
})(jQuery, af, AppFrameworkRenderer, BaseView, InstFormNominal, InstFormNominalView);