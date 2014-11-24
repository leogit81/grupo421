var ReporteEstablecimientoView = (function ($, renderer, BaseView, ReporteEstablecimientoNominal, ReporteEstablecimientoNominalView) {
    "use strict";

    var reporteEstablecimientoView = BaseView.extend({
        tagName: 'div',

        attributes: {
            'id': 'reporteEstablecimiento',
            'class': 'panel',
            'data-nav': 'consultas_nav'
        },

        template : _.template(
            '<div class="formGroupHead">Complete uno o varios filtros para crear el reporte de establecimientos.</div>' +
            '<select id="catTipologiaEstablecimiento" name="catTipologiaEstablecimiento"></select>' +
            '<select id="tipologiaEstablecimiento" name="tipologiaEstablecimiento"></select>' +
            '<select id="dependenciaEstablecimiento" name="dependenciaEstablecimiento"></select>' +
            '<select id="provinciaEstablecimiento" name="provinciaEstablecimiento"></select>' +
            '<select id="departamentoEstablecimiento" name="departamentoEstablecimiento"></select>' +
            '<select id="localidadEstablecimiento" name="localidadEstablecimiento"></select>' +
            '<a id="submitReporteEstablecimiento" class="button">Crear reporte</a>'
        ),
        render: function() {
            BaseView.prototype.render.call(this);            
            $(this.getViewSelector() + " select#catTipologiaEstablecimiento")[0].innerHTML = listaCompletaCatTipologias;
            $(this.getViewSelector() + " select#tipologiaEstablecimiento")[0].innerHTML = listaCompletaTipologias;
            $(this.getViewSelector() + " select#dependenciaEstablecimiento")[0].innerHTML = listaCompletaDependencias;
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

        ejecutarReporteEstablecimiento: function () {
            var catTipologiaEstablecimiento = $(this.getViewSelector() + " select#catTipologiaEstablecimiento").val();
            var tipologiaEstablecimiento = $(this.getViewSelector() + " select#tipologiaEstablecimiento").val();
            var dependenciaEstablecimiento = $(this.getViewSelector() + " select#dependenciaEstablecimiento").val();
            var provinciaEstablecimiento = $(this.getViewSelector() + " select#provinciaEstablecimiento").val();
            var departamentoEstablecimiento = $(this.getViewSelector() + " select#departamentoEstablecimiento").val();
            var localidadEstablecimiento = $(this.getViewSelector() + " select#localidadEstablecimiento").val();

            this.modelDataSource.getModelData(ReporteEstablecimientoNominal, {
                "categoriaTipologia": catTipologiaEstablecimiento,
                "tipologia": tipologiaEstablecimiento,
                "dependencia": dependenciaEstablecimiento,
                "provincia": provinciaEstablecimiento,
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
            var reporteEstablecimientoNominal = new ReporteEstablecimientoNominal();
            var repoteEstablecimientoNominalView = new ReporteEstablecimientoNominalView();
            repoteEstablecimientoNominalView.setModel({model: reporteEstablecimientoNominal});
            reporteEstablecimientoNominal.processData(data);
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
            $("#afui").delegate(this.getViewSelector() + " a#submitReporteEstablecimiento", "click", _.bind(this.ejecutarReporteEstablecimiento, this));
            $("#afui").delegate(this.getViewSelector() + " select#provinciaEstablecimiento", "change", _.bind(this.actualizarListaDepartamentos, this));
            $("#afui").delegate(this.getViewSelector() +" select#departamentoEstablecimiento", "change", _.bind(this.actualizarListaLocalidades, this));
        },

        actualizarListaDepartamentos: function () {
            deptos.actualizarDepartamentosDeLaVista(this);
        },

        actualizarListaLocalidades: function () {
            localidades.actualizarLocalidadesDeLaVista(this);
        }
    });

    return reporteEstablecimientoView;
})(af, AppFrameworkRenderer, BaseView, ReporteEstablecimientoNominal, ReporteEstablecimientoNominalView);