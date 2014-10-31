var ListadoInstFormView = (function (jquery, $, renderer, BaseView, InstFormCollection, InstFormCollectionView) {
    "use strict";

    var listadoInstFormView = BaseView.extend({
        tagName: 'div',

        attributes: {
            'id': 'listadoInstForm',
            'class': 'panel',
            'data-nav':"consultas_nav",    
        },

        template : _.template(
            '<div class="formGroupHead">Seleccione el filtro por el que quiera buscar Instituciones Formadoras.</div>' +
            '<form>' +
            '<input id="nombreInstForm" type="text" placeholder="Nombre de Institución Formadora"/>' +
            '<select id="dependenciaInstForm" name="dependenciaInstForm"></select>' +
            '<select id="pciaInstForm" name="pciaInstForm" onchange="deptos.actualizar(pciaInstForm, dptoInstForm, locInstForm)"></select>' +
            '<select id="dptoInstForm" name="dptoInstForm" onchange="localidades.actualizar(pciaInstForm, dptoInstForm, locInstForm)"></select>' +
            '<select id="locInstForm" name="locInstForm"></select>' +
            '<a id="submitConsultaListadoInstForm" class="button">Consultar</a>' +
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
            var instFormCollection = new InstFormCollection();
            var instFormColleccionView = InstFormCollectionView.getInstance();
            instFormColleccionView.setModel({model: instFormCollection});
            instFormCollection.processData(data);
        },

        /**
        * Hace el render de la vista que muestra los datos del modelo que se obtuvieron a partir de la consulta
        * aplicando los filtros.
        * @param {Object} data, información del modelo obtenida del servicio.
        */
        ejecutarListadoInstForm: function(){
            var nombreInstForm = $("#nombreInstForm").val();
            var dependenciaInstForm = $("#dependenciaInstForm").val();
            var provinciaInstForm = $("#pciaInstForm").val();
            var departamentoInstForm = $("#dptoInstForm").val();
            var localidadInstForm = $("#locInstForm").val();

            this.modelDataSource.getModelData(InstFormCollection, {
                "nombre": nombreInstForm,
                "dependencia": dependenciaInstForm,
                "provincia": provinciaInstForm,
                "depto": departamentoInstForm,
                "localidad": localidadInstForm
            });
        },

        render: function(){
            if ($("#listadoInstForm").length <= 0){
                $.ui.addContentDiv("listadoInstForm", this.template());//div panel + contenido
            }else
            {
                $.ui.updatePanel("listadoInstForm", this.template());//solo contenido para actualizar
            }
            $.ui.loadContent("listadoInstForm", false, false, "slide");
            $("#listadoInstForm").addClass("consulta-detallada"); //agrego esta clase para poder aplicar estilos CSS
            
            this.attachEvents();
            document.getElementById("pciaInstForm").innerHTML = listaCompletaProvincias;
            document.getElementById("dptoInstForm").innerHTML = "<option value =''>Seleccione un departamento...</option>";
            document.getElementById("locInstForm").innerHTML = "<option value =''>Seleccione una localidad...</option>";
            document.getElementById("dependenciaInstForm").innerHTML = listaCompletaDependencias;

            return this;
        },

        /**
         * Usado para bindear eventos a los controles del formulario.
         * Se ejecuta después del render cuando los controles se encuentran cargados en la página. 
         */
        attachEvents: function(){
            BaseView.prototype.attachEvents.call(this);
            jquery("#submitConsultaListadoInstForm").on("click", _.bind(this.ejecutarListadoInstForm, this));
        }
    });

    return listadoInstFormView;
})(jQuery, af, AppFrameworkRenderer, BaseView, InstFormCollection, InstFormCollectionView);