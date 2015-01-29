var ConsultaRedosView = (function ($, renderer, BaseView, ProgramasCollection, EstablecimientoCollectionView) {
    "use strict";

    var consultaRedosView = BaseView.extend({
        tagName: 'div',

        attributes: {
            'id': 'consultaRedos',
            'class': 'panel',
            'data-nav': 'consultas_nav'
        },

        template : _.template(
            '<div class="formGroupHead">Complete uno o varios filtros para buscar establecimientos en el registro REDOS.</div>' +
            '<input id="nombreRedos" type="text" placeholder="Nombre de Establecimiento"/>' +
            '<select id="pciaRedos" name="pciaRedos" onchange="deptos.actualizar(pciaRedos, dptoRedos, locRedos)"></select>' +
            '<select id="dptoRedos" name="dptoRedos" onchange="localidades.actualizar(pciaRedos, dptoRedos, locRedos)"></select>' +
            '<select id="locRedos" name="locRedos"></select>' +
            '<a id="submitConsultaRedos" class="button">Buscar</a>'
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
            
            this.idImagen = 'imagenRedos';
        },

        setNombreEstablecimiento: function (e) {
            this.model.set("nombreRedos", e.target.value);
        },

        ejecutarConsultaRedos: function () {
            var nombreEstablecimiento = $(this.getViewSelector() + " input#nombreRedos").val();
            var provinciaEstablecimiento = $(this.getViewSelector() + " select#pciaRedos").val();
            var departamentoEstablecimiento = $(this.getViewSelector() + " select#dptoRedos").val();
            var localidadEstablecimiento = $(this.getViewSelector() + " select#locRedos").val();

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
            var redosColleccionView = new EstablecimientoCollectionView();
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
            $("#afui").delegate(this.getViewSelector() + " a#submitConsultaRedos", "click", _.bind(this.ejecutarConsultaRedos, this));
//            $("#afui").delegate(this.getViewSelector() + " select#pciaRedos", "change", _.bind(this.actualizarListaDepartamentos, this));
//            $("#afui").delegate(this.getViewSelector() +" select#dptoRedos", "change", _.bind(this.actualizarListaLocalidades, this));
        },
        
        actualizarListaDepartamentos: function () {
            deptos.actualizarDepartamentosDeLaVista(this);
        },
        
        actualizarListaLocalidades: function () {
            localidades.actualizarLocalidadesDeLaVista(this);
        }
    });

    return consultaRedosView;
})(af, AppFrameworkRenderer, BaseView, ProgramasCollection, EstablecimientoCollectionView);