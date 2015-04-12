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
            '<div class="formGroupHead">Complete uno o varios campos para filtrar su búsqueda de instituciones formadoras.</div>' +
            '<input id="nombreInstForm" type="text" placeholder="Nombre de Institución Formadora"/>' +
            '<select id="dependenciaInstForm" name="dependenciaInstForm"></select>' +
            '<select id="pciaInstForm" name="pciaInstForm" onchange="deptos.actualizar(pciaInstForm, dptoInstForm, locInstForm)"></select>' +
            '<select id="dptoInstForm" name="dptoInstForm" onchange="localidades.actualizar(pciaInstForm, dptoInstForm, locInstForm)"></select>' +
            '<select id="locInstForm" name="locInstForm"></select>' +
            '<a id="submitConsultaListadoInstForm" class="button">Buscar</a>'
        ),

        initialize: function(attributes, options) {
            options = options || {};
            options.renderer = renderer;
            
            this.idImagen = 'imagenInstFormadoras';
            
            BaseView.prototype.initialize.call(this, attributes, options);

            this.initializeModelDataSource();
        },

        initializeModelDataSource: function () {
            this.modelDataSource = new ModelDataSource ({view: this});
            this.modelDataSource.on('dataFetched', this.renderVistaDeDatos, this);
        },

        renderVistaDeDatos: function (data) {
            var instFormCollection = new InstFormCollection();
            var instFormColleccionView = new InstFormCollectionView();
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
            BaseView.prototype.render.call(this);
            $(this.getViewSelector() + " select#pciaInstForm")[0].innerHTML = listaCompletaProvincias;
            $(this.getViewSelector() + " select#dptoInstForm")[0].innerHTML = "<option value =''>Seleccione un departamento...</option>";
            $(this.getViewSelector() + " select#locInstForm")[0].innerHTML = "<option value =''>Seleccione una localidad...</option>";
            $(this.getViewSelector() + " select#dependenciaInstForm")[0].innerHTML = listaCompletaDependencias;
            return this;
        },

        /**
         * Usado para bindear eventos a los controles del formulario.
         * Se ejecuta después del render cuando los controles se encuentran cargados en la página. 
         */
        attachEvents: function(){
            BaseView.prototype.attachEvents.call(this);
            $("#afui").delegate(this.getViewSelector() + " a#submitConsultaListadoInstForm", "click", _.bind(this.ejecutarListadoInstForm, this));
        }
    });

    return listadoInstFormView;
})(jQuery, af, AppFrameworkRenderer, BaseView, InstFormCollection, InstFormCollectionView);