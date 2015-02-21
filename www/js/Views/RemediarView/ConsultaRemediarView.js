var ConsultaRemediarView = (function ($, renderer, BaseView, ProgramasCollection, EstablecimientoCollectionView) {
    "use strict";

    var consultaRemediarView = BaseView.extend({
        tagName: 'div',

        attributes: {
            'id': 'consultaRemediar',
            'class': 'panel',
            'data-nav': 'consultas_nav'
        },

        template : _.template(
            '<div class="formGroupHead">Complete uno o varios filtros para buscar establecimientos en el programa REMEDIAR.</div>' +
            '<input id="nombreRemediar" type="text" placeholder="Nombre de Establecimiento"/>' +
            '<select id="pciaRemediar" name="pciaRemediar" onchange="deptos.actualizar(pciaRemediar, dptoRemediar, locRemediar)"></select>' +
            '<select id="dptoRemediar" name="dptoRemediar" onchange="localidades.actualizar(pciaRemediar, dptoRemediar, locRemediar)"></select>' +
            '<select id="locRemediar" name="locRemediar"></select>' +
            '<a id="submitConsultaRemediar" class="button">Buscar</a>'
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
            
            this.idImagen = 'imagenRemediar';
        },

        setNombreEstablecimiento: function (e) {
            this.model.set("nombreRemediar", e.target.value);
        },

        ejecutarConsultaRemediar: function () {
            var nombreEstablecimiento = $(this.getViewSelector() + " input#nombreRemediar").val();
            var provinciaEstablecimiento = $(this.getViewSelector() + " select#pciaRemediar").val();
            var departamentoEstablecimiento = $(this.getViewSelector() + " select#dptoRemediar").val();
            var localidadEstablecimiento = $(this.getViewSelector() + " select#locRemediar").val();

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
            var remediarColleccionView = new EstablecimientoCollectionView();
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
            $("#afui").delegate(this.getViewSelector() + " a#submitConsultaRemediar", "click", _.bind(this.ejecutarConsultaRemediar, this));
        },
        
        actualizarListaDepartamentos: function () {
            deptos.actualizarDepartamentosDeLaVista(this);
        },
        
        actualizarListaLocalidades: function () {
            localidades.actualizarLocalidadesDeLaVista(this);
        }
    });

    return consultaRemediarView;
})(af, AppFrameworkRenderer, BaseView, ProgramasCollection, EstablecimientoCollectionView);