var ConsultaRemediarView = (function ($, renderer, BaseView, ProgramasCollection, EstablecimientoCollectionView) {
    "use strict";

    var consultaRemediarView = BaseView.extend({
        tagName: 'div',

        attributes: {
            'id': 'consultaRemediar',
            'class': 'panel',
//            'data-title': 'Filtros',
            'data-nav': 'consultas_nav'
        },

        template : _.template(
            '<div class="formGroupHead">Filtros</div>' +
            '<form>' +
            '<input id="nombreRemediar" type="text" placeholder="Nombre de Establecimiento"/>' +
            '<select id="pciaRemediar" name="pciaRemediar" onchange="deptos.actualizar(pciaRemediar, dptoRemediar, locRemediar)"></select>' +
            '<select id="dptoRemediar" name="dptoRemediar" onchange="localidades.actualizar(pciaRemediar, dptoRemediar, locRemediar)"></select>' +
            '<select id="locRemediar" name="locRemediar"></select>' +
            '<a id="submitConsultaRemediar" class="button">Enviar</a>' +
            '</form>'
        ),


        render: function() {
            BaseView.prototype.render.call(this);            
            document.getElementById("pciaRemediar").innerHTML = listaCompletaProvincias;
            document.getElementById("dptoRemediar").innerHTML = "<option value =''>Seleccione un departamento...</option>";
            document.getElementById("locRemediar").innerHTML = "<option value =''>Seleccione una localidad...</option>";
        },

        initialize: function (attributes, options) {
            options = options || {};
            options.renderer = renderer;
            BaseView.prototype.initialize.call(this, attributes, options);

            this.initializeModelDataSource();
        },

        setNombreEstablecimiento: function (e) {
            this.model.set("nombreRemediar", e.target.value);
        },

        ejecutarConsultaRemediar: function () {
            var nombreEstablecimiento = $("#nombreRemediar").val();
            var provinciaEstablecimiento = $("#pciaRemediar").val();
            var departamentoEstablecimiento = $("#dptoRemediar").val();
            var localidadEstablecimiento = $("#locRemediar").val();

            this.modelDataSource.getModelData(ProgramasCollection, {
                "longitud": 0,
                "latitud": 0,
                "programaRemediar": 'SI',
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
            var remediarColleccionView = EstablecimientoCollectionView.getInstance();
            remediarColleccionView.setModel({model: programasCollection});
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
            $("#afui").delegate("#submitConsultaRemediar", "click", _.bind(this.ejecutarConsultaRemediar, this));
        }
    });

    return consultaRemediarView;
})(af, AppFrameworkRenderer, BaseView, ProgramasCollection, EstablecimientoCollectionView);