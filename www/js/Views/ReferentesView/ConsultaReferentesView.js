var ConsultaReferentesView = (function(jquery, $, renderer, BaseView, Referentes, ReferentesView){

    var consultaReferentesView = BaseView.extend({
        tagName: 'div',

        attributes: {
            'id': 'consultaReferentes',
            'class': 'panel',
            'data-nav':"consultas_nav",    
        },

        template : _.template(
            '<div class="formGroupHead">Llene los filtros para buscar referentes.</div>' +
            '<form>' +
            '<input id="nombreReferentes" type="text" placeholder="Nombre referente"/>' +
            '<select id="pciaReferentes"></select>' +
            '<a id="submitConsultaReferentes" class="button">Consultar</a>' +
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
        renderVistaDeDatos: function (data) {
            var referentesModel = new Referentes();
            var referentesView = ReferentesView.getInstance();
            referentesView.setModel({model: referentesModel});
            referentesModel.processData(data);
        },

        ejecutarConsultaReferentes: function(){
            var nombreReferentes = $("#nombreReferentes").val();
            var pciaReferentes = $("#pciaReferentes").val();
            this.modelDataSource.getModelData(Referentes, {
                "nombre": nombreReferentes,
                "provincia": pciaReferentes
            });
        },

        render: function(){
            if ($("#consultaReferentes").length <= 0){
                $.ui.addContentDiv("consultaReferentes", this.template());//div panel + contenido
            }else
            {
                $.ui.updatePanel("consultaReferentes", this.template());//solo contenido para actualizar
            }
            $.ui.loadContent("consultaReferentes", false, false, "slide");
            this.attachEvents();
            document.getElementById("pciaReferentes").innerHTML = listaCompletaProvincias;
            return this;
        },

        /**
         * Usado para bindear eventos a los controles del formulario.
         * Se ejecuta después del render cuando los controles se encuentran cargados en la página. 
         */
        attachEvents: function(){
            BaseView.prototype.attachEvents.call(this);
            jquery("#submitConsultaReferentes").on("click", _.bind(this.ejecutarConsultaReferentes, this));
        }
    });

    return consultaReferentesView;
})(jQuery, af, AppFrameworkRenderer, BaseView, Referentes, ReferentesView);