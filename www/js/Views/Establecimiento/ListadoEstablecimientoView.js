var ListadoEstablecimientoView = (function ($, renderer, BaseView, EstablecimientoCollection, EstablecimientoCollectionView) {
    "use strict";

    var listadoEstablecimientoView = BaseView.extend({
        tagName: 'div',

        attributes: {
            'id': 'listadoEstablecimiento',
            'class': 'panel',
            'data-nav': 'consultas_nav'
        },

        template : _.template(
            '<div class="formGroupHead">Complete uno o varios filtros para buscar establecimientos.</div>' +
            '<input id="nombreEstablecimiento" type="text" placeholder="Nombre de Establecimiento"/>' +
            '<select id="provinciaEstablecimiento" name="provinciaEstablecimiento"></select>' +
            '<select id="departamentoEstablecimiento" name="departamentoEstablecimiento"></select>' +
            '<select id="localidadEstablecimiento" name="localidadEstablecimiento"></select>' +
            '<a id="submitConsultaEstablecimiento" class="button">Buscar</a>'
        ),
        
        render: function() {
            BaseView.prototype.render.call(this);            
            $(this.getViewSelector() + " select#provinciaEstablecimiento")[0].innerHTML = listaCompletaProvincias;
            $(this.getViewSelector() + " select#departamentoEstablecimiento")[0].innerHTML = "<option value =''>Seleccione un departamento...</option>";
            $(this.getViewSelector() + " select#localidadEstablecimiento")[0].innerHTML = "<option value =''>Seleccione una localidad...</option>";
        },

        initialize: function (attributes, options) {
            options = options || {};
            options.renderer = renderer;
            BaseView.prototype.initialize.call(this, attributes, options);

            this.initializeModelDataSource();
        },

        setNombreEstablecimiento: function (e) {
            this.model.set("nombreEstablecimiento", e.target.value);
        },

        ejecutarConsultaEstablecimiento: function () {
            var nombreEstablecimiento = $(this.getViewSelector() + " input#nombreEstablecimiento").val();
            var provinciaEstablecimiento = $(this.getViewSelector() + " select#provinciaEstablecimiento").val();
            var departamentoEstablecimiento = $(this.getViewSelector() + " select#departamentoEstablecimiento").val();
            var localidadEstablecimiento = $(this.getViewSelector() + " select#localidadEstablecimiento").val();

            this.modelDataSource.getModelData(EstablecimientoCollection, {
                "provincia": provinciaEstablecimiento,
                "nombre": nombreEstablecimiento,
                "depto": departamentoEstablecimiento,
                "localidad": localidadEstablecimiento
            });
        },

        /**
        * Hace el render de la vista que muestra los datos del modelo que se obtuvieron a partir de la consulta
        * aplicando los filtros.
        * @param {Object} data, información del modelo obtenida del servicio.
        */
        renderVistaDeDatos: function (data) {
            var establecimientoCollection = new EstablecimientoCollection();
            //var establecimientoColleccionView = EstablecimientoCollectionView.getInstance();
            var establecimientoColleccionView = new EstablecimientoCollectionView();
            establecimientoColleccionView.setModel({model: establecimientoCollection});
            establecimientoCollection.processData(data);
        },

        initializeModelDataSource: function () {
            this.modelDataSource = new ModelDataSource ({view: this});
            this.modelDataSource.on('dataFetched', this.renderVistaDeDatos, this);
        },

        /**
         * Usado para bindear eventos a los controles del formulario. Se ejecuta después del render cuando los controles 
         * se encuentran cargados en la página. 
         */
        attachEvents: function() {
            BaseView.prototype.attachEvents.call(this);
            $("#afui").delegate(this.getViewSelector() + " a#submitConsultaEstablecimiento", "click", _.bind(this.ejecutarConsultaEstablecimiento, this));
            $("#afui").delegate(this.getViewSelector() + " select#provinciaEstablecimiento", "change", _.bind(this.actualizarListaDepartamentos, this));
            $("#afui").delegate(this.getViewSelector() +" select#departamentoEstablecimiento", "change", _.bind(this.actualizarListaLocalidades, this));
        },
        
        actualizarListaDepartamentos: function () {
            deptos.actualizarDepartamentosDeLaVista(this, "provinciaEstablecimiento", "departamentoEstablecimiento", "localidadEstablecimiento");
        },
        
        actualizarListaLocalidades: function () {
            localidades.actualizarLocalidadesDeLaVista(this, "provinciaEstablecimiento", "departamentoEstablecimiento", "localidadEstablecimiento");
        }
    });

    return listadoEstablecimientoView;
})(af, AppFrameworkRenderer, BaseView, EstablecimientoCollection, EstablecimientoCollectionView);