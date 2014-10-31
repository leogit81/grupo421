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
            '<input id="nombreNomivac" type="text" placeholder="Nombre de Establecimiento"/>' +
            '<select id="pciaNomivac" name="pciaNomivac" onchange="deptos.actualizar(pciaNomivac, dptoNomivac, locNomivac)"></select>' +
            '<select id="dptoNomivac" name="dptoNomivac" onchange="localidades.actualizar(pciaNomivac, dptoNomivac, locNomivac)"></select>' +
            '<select id="locNomivac" name="locNomivac"></select>' +
            '<a id="submitConsultaNomivac" class="button">Enviar</a>' +
            '</form>'
        ),


        render: function() {
            BaseView.prototype.render.call(this);            
            document.getElementById("pciaNomivac").innerHTML = listaCompletaProvincias;
            document.getElementById("dptoNomivac").innerHTML = "<option value =''>Seleccione un departamento...</option>";
            document.getElementById("locNomivac").innerHTML = "<option value =''>Seleccione una localidad...</option>";
        },

        initialize: function (attributes, options) {
            options = options || {};
            options.renderer = renderer;
            BaseView.prototype.initialize.call(this, attributes, options);

            this.initializeModelDataSource();
        },

        setNombreEstablecimiento: function (e) {
            this.model.set("nombreNomivac", e.target.value);
        },

        ejecutarConsultaNomivac: function () {
            var nombreEstablecimiento = $("#nombreNomivac").val();
            var provinciaEstablecimiento = $("#pciaNomivac").val();
            var departamentoEstablecimiento = $("#dptoNomivac").val();
            var localidadEstablecimiento = $("#locNomivac").val();

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