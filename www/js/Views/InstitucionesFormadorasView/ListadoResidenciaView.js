var ListadoResidenciaView = (function (jquery, $, renderer, BaseView, ResidenciaCollection, ResidenciaCollectionView) {
    "use strict";

    var listadoResidenciaView = BaseView.extend({
        tagName: 'div',

        attributes: {
            'id': 'listadoResidencia',
            'class': 'panel',
            'data-nav':"consultas_nav"
        },

        template : _.template(
            '<div class="formGroupHead">Complete uno o varios campos para filtrar su búsqueda de residencias.</div>' +
            '<input id="nombreResidencia" type="text" placeholder="Nombre de Institución Formadora"/>' +
            '<select id="especialidadResidencia" name="especialidadResidencia"></select>' +
            '<select id="pciaResidencia" name="pciaResidencia" onchange="deptos.actualizar(pciaResidencia, dptoResidencia, locResidencia)"></select>' +
            '<select id="dptoResidencia" name="dptoResidencia" onchange="localidades.actualizar(pciaResidencia, dptoResidencia, locResidencia)"></select>' +
            '<select id="locResidencia" name="locResidencia"></select>' +
            '<div><label id="lbl1" for="acredResidencia">Sólo residencias acreditadas</label><input id="acredResidencia" type="checkbox" name="acredResidencia" value="1" class="checkbox"><label id="lbl2" for="acredResidencia" data-on="Si" data-off="No"></label></div>' +
            '<a id="submitConsultaListadoResidencia" class="button">Buscar</a>'
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
            var residenciaCollection = new ResidenciaCollection();
            var residenciaColleccionView = new ResidenciaCollectionView();
            residenciaColleccionView.setModel({model: residenciaCollection});
            residenciaCollection.processData(data);
        },

        /**
        * Hace el render de la vista que muestra los datos del modelo que se obtuvieron a partir de la consulta
        * aplicando los filtros.
        * @param {Object} data, información del modelo obtenida del servicio.
        */
        ejecutarListadoResidencia: function(){
            var nombreResidencia = $("#nombreResidencia").val();
            var especialidadResidencia = $("#especialidadResidencia").val();
            var provinciaResidencia = $("#pciaResidencia").val();
            var departamentoResidencia = $("#dptoResidencia").val();
            var localidadResidencia = $("#locResidencia").val();

            var acredResidencia = $(this.getViewSelector() + " #acredResidencia")[0].checked ? "SI" : "NO";

            this.modelDataSource.getModelData(ResidenciaCollection, {
                "nombre": nombreResidencia,
                "especialidad": especialidadResidencia,
                "provincia": provinciaResidencia,
//                "depto": departamentoResidencia,   No se envía el departamento a propósito, ya que no es filtro del WS
                "localidad": localidadResidencia,
                "acreditada": acredResidencia
            });
        },

        render: function(){
            BaseView.prototype.render.call(this);
            $(this.getViewSelector() + " select#pciaResidencia")[0].innerHTML = listaCompletaProvincias;
            $(this.getViewSelector() + " select#dptoResidencia")[0].innerHTML = "<option value =''>Seleccione un departamento...</option>";
            $(this.getViewSelector() + " select#locResidencia")[0].innerHTML = "<option value =''>Seleccione una localidad...</option>";
            $(this.getViewSelector() + " select#especialidadResidencia")[0].innerHTML = listaCompletaEspecialidades;
            return this;
        },

        /**
         * Usado para bindear eventos a los controles del formulario.
         * Se ejecuta después del render cuando los controles se encuentran cargados en la página. 
         */
        attachEvents: function(){
            BaseView.prototype.attachEvents.call(this);
            $("#afui").delegate(this.getViewSelector() + " a#submitConsultaListadoResidencia", "click", _.bind(this.ejecutarListadoResidencia, this));
        }
    });

    return listadoResidenciaView;
})(jQuery, af, AppFrameworkRenderer, BaseView, ResidenciaCollection, ResidenciaCollectionView);