var ConsultaRedosView = (function ($, renderer, BaseView, ProgramasCollection, EstablecimientoCollectionView) {
    "use strict";

    var consultaRedosView = BaseView.extend({
        tagName: 'div',

        attributes: {
            'id': 'consultaRedos',
            'class': 'panel',
//            'data-title': 'Filtros',
            'data-nav': 'consultas_nav'
        },

        template : _.template(
            '<div class="formGroupHead">Filtros</div>' +
            '<form>' +
            '<input id="nombreRedos" type="text" placeholder="Nombre de Establecimiento"/>' +
            '<select id="pciaRedos" name="pciaRedos" onchange="deptos.actualizar(pciaRedos, dptoRedos, locRedos)"></select>' +
            '<select id="dptoRedos" name="dptoRedos" onchange="localidades.actualizar(pciaRedos, dptoRedos, locRedos)"></select>' +
            '<select id="locRedos" name="locRedos"></select>' +
            '<a id="submitConsultaRedos" class="button">Enviar</a>' +
            '</form>'
        ),


        render: function() {
            BaseView.prototype.render.call(this);            
            document.getElementById("pciaRedos").innerHTML = listaCompletaProvincias;
            document.getElementById("dptoRedos").innerHTML = "<option value =''>Seleccione un departamento...</option>";
            document.getElementById("locRedos").innerHTML = "<option value =''>Seleccione una localidad...</option>";
        },

        initialize: function (attributes, options) {
            options = options || {};
            options.renderer = renderer;
            BaseView.prototype.initialize.call(this, attributes, options);

            this.initializeModelDataSource();
        },

        setNombreEstablecimiento: function (e) {
            this.model.set("nombreRedos", e.target.value);
        },

        ejecutarConsultaRedos: function () {
            var nombreEstablecimiento = $("#nombreRedos").val();
            var provinciaEstablecimiento = $("#pciaRedos").val();
            var departamentoEstablecimiento = $("#dptoRedos").val();
            var localidadEstablecimiento = $("#locRedos").val();

            this.modelDataSource.getModelData(ProgramasCollection, {
                "longitud": 0,
                "latitud": 0,
                "sistemaNacionalSangre": 'SI',
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
            var redosColleccionView = EstablecimientoCollectionView.getInstance();
            redosColleccionView.setModel({model: programasCollection});
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
            $("#afui").delegate("#submitConsultaRedos", "click", _.bind(this.ejecutarConsultaRedos, this));
        }
    });

    return consultaRedosView;
})(af, AppFrameworkRenderer, BaseView, ProgramasCollection, EstablecimientoCollectionView);