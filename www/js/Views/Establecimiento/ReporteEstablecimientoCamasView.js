var ReporteEstablecimientoCamasView = (function ($, renderer, BaseView, ReporteEstablecimientoCamasGeneral, ReporteEstablecimientoNominalView) {
    "use strict";

    var reporteEstablecimientoCamasView = BaseView.extend({
        tagName: 'div',

        attributes: {
            'id': 'reporteEstablecimientoCamas',
            'class': 'panel',
            'data-nav': 'consultas_nav'
        },

        template : _.template(
            '<div class="formGroupHead">Complete uno o varios filtros para crear el reporte de camas de establecimientos.</div>' +
            '<select id="catTipologiaEstablecimiento" name="catTipologiaEstablecimiento"></select>' +
            '<select id="tipologiaEstablecimiento" name="tipologiaEstablecimiento"></select>' +
            '<select id="especialidadEstablecimiento" name="especialidadEstablecimiento"></select>' +
            '<select id="dependenciaEstablecimiento" name="dependenciaEstablecimiento"></select>' +
            '<select id="regionPaisEstablecimiento" name="regionPaisEstablecimiento"></select>' +
            '<select id="provinciaEstablecimiento" name="provinciaEstablecimiento"></select>' +
            '<select id="departamentoEstablecimiento" name="departamentoEstablecimiento"></select>' +
            '<select id="localidadEstablecimiento" name="localidadEstablecimiento"></select>' +
            '<a id="submitReporteEstablecimiento" class="button">Crear reporte</a>'
        ),
        render: function() {
            BaseView.prototype.render.call(this);
            $(this.getViewSelector() + " select#catTipologiaEstablecimiento")[0].innerHTML = listaCompletaCatTipologias;
            $(this.getViewSelector() + " select#tipologiaEstablecimiento")[0].innerHTML = listaCompletaTipologias;
            $(this.getViewSelector() + " select#especialidadEstablecimiento")[0].innerHTML = listaCompletaEspecialidades;
            $(this.getViewSelector() + " select#dependenciaEstablecimiento")[0].innerHTML = listaCompletaDependencias;
            $(this.getViewSelector() + " select#regionPaisEstablecimiento")[0].innerHTML = listaCompletaRegionPais;
            $(this.getViewSelector() + " select#provinciaEstablecimiento")[0].innerHTML = listaCompletaProvincias;
            $(this.getViewSelector() + " select#departamentoEstablecimiento")[0].innerHTML = "<option value =''>Seleccione un departamento...</option>";
            $(this.getViewSelector() + " select#localidadEstablecimiento")[0].innerHTML = "<option value =''>Seleccione una localidad...</option>";
        },

        initialize: function (attributes, options) {
            options = options || {};
            options.renderer = renderer;
            
            this.idImagen = 'imagenEstablecimientos';
            
            BaseView.prototype.initialize.call(this, attributes, options);

            this.initializeModelDataSource();
        },

        ejecutarReporteEstablecimiento: function () {
            var catTipologiaEstablecimiento = $(this.getViewSelector() + " select#catTipologiaEstablecimiento").val();
            var tipologiaEstablecimiento = $(this.getViewSelector() + " select#tipologiaEstablecimiento").val();
            var especialidadEstablecimiento = $(this.getViewSelector() + " select#especialidadEstablecimiento").val();
            var dependenciaEstablecimiento = $(this.getViewSelector() + " select#dependenciaEstablecimiento").val();
            var regionPaisEstablecimiento = $(this.getViewSelector() + " select#regionPaisEstablecimiento").val();
            var provinciaEstablecimiento = $(this.getViewSelector() + " select#provinciaEstablecimiento").val();
            var departamentoEstablecimiento = $(this.getViewSelector() + " select#departamentoEstablecimiento").val();
            var localidadEstablecimiento = $(this.getViewSelector() + " select#localidadEstablecimiento").val();

            this.modelDataSource.getModelData(ReporteEstablecimientoCamasGeneral, {
                "categoriaTipologia": catTipologiaEstablecimiento,
                "tipologia": tipologiaEstablecimiento,
                "especialidad": especialidadEstablecimiento,
                "dependencia": dependenciaEstablecimiento,
                "regionPais": regionPaisEstablecimiento,
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
            var reporteEstablecimientoCamasGeneral = new ReporteEstablecimientoCamasGeneral();
            var repoteEstablecimientoNominalView = new ReporteEstablecimientoNominalView();
            repoteEstablecimientoNominalView.setModel({model: reporteEstablecimientoCamasGeneral});
            reporteEstablecimientoCamasGeneral.processData(data);
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

    return reporteEstablecimientoCamasView;
})(af, AppFrameworkRenderer, BaseView, ReporteEstablecimientoCamasGeneral, ReporteEstablecimientoNominalView);