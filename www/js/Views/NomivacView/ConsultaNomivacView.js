var ConsultaNomivacView = (function ($, renderer, BaseView, ProgramasCollection, EstablecimientoCollectionView) {
    "use strict";

    var consultaNomivacView = BaseView.extend({
        tagName: 'div',

        attributes: {
            'id': 'consultaNomivac',
            'class': 'panel',
//            'data-title': 'Filtros',
            'data-nav': 'consultas_nav'
        },

        template : _.template(
            '<div class="formGroupHead">Filtros</div>' +
            '<form>' +
            '<input id="nombreEstablecimiento" type="text" placeholder="Nombre de Establecimiento"/>' +
            '<select id="provinciaNomivac" name="provinciaEstablecimiento" onchange="deptos.actualizar()"></select>' +
            '<select id="departamentoEstablecimiento" name="departamentoEstablecimiento" onchange="localidades.actualizar()"></select>' +
            '<select id="localidadEstablecimiento" name="localidadEstablecimiento"></select>' +
            '<a id="submitConsultaNomivac" class="button">Enviar</a>' +
            '</form>'
        ),


        render: function() {
            BaseView.prototype.render.call(this);            
            document.getElementById("provinciaNomivac").innerHTML = listaCompletaProvincias;
            document.getElementById("departamentoEstablecimiento").innerHTML = "<option value =''>Seleccione un departamento...</option>";
            document.getElementById("localidadEstablecimiento").innerHTML = "<option value =''>Seleccione una localidad...</option>";
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

        ejecutarConsultaNomivac: function () {
            var nombreEstablecimiento = $("#nombreEstablecimiento").val();
            var provinciaEstablecimiento = $("#provinciaNomivac").val();
            var departamentoEstablecimiento = $("#departamentoEstablecimiento").val();
            var localidadEstablecimiento = $("#localidadEstablecimiento").val();

            this.modelDataSource.getModelData(ProgramasCollection, {
                "longitud": 0,
                "latitud": 0,
                "redNOMIVAC": 'SI',
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
            var programasCollection = new ProgramasCollection();
            var nomivacColleccionView = EstablecimientoCollectionView.getInstance();
            nomivacColleccionView.setModel({model: programasCollection});
            programasCollection.processData(data);
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
            $("#afui").delegate("#submitConsultaNomivac", "click", _.bind(this.ejecutarConsultaNomivac, this));
        }
    });

    return consultaNomivacView;
})(af, AppFrameworkRenderer, BaseView, ProgramasCollection, EstablecimientoCollectionView);