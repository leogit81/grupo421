var ListadoProfesionalesView = (function (jquery, $, renderer, BaseView, ProfesionalCollection, ProfesionalCollectionView) {
    "use strict";

    var listadoProfesionalesView = BaseView.extend({
        tagName: 'div',

        attributes: {
            'id': 'listadoProfesionales',
            'class': 'panel',
            'data-nav':"consultas_nav",    
        },

        template : _.template(
            '<div class="formGroupHead">Seleccione el filtro por el que quiera buscar profesionales.</div>' +
            '<form>' +
            '<input id="matriculaProfesional" type="number" name="matriculaProfesional" placeholder="Matricula del profesional"></input></br>' +
            '<input id="nombreProfesional" type="text" name="nombreProfesional" placeholder="Nombre del profesional"></input></br>' +
            '<input id="apellidoProfesional" type="text" name="apellidoProfesional" placeholder="Apellido del profesional"></input></br>' +
            '<input id="dniProfesional" type="number" name="dniProfesional" placeholder="Numero de documento del profesional"></input></br>' +
            '<select id="provinciaProfesional" name="provinciaProfesional"></select>' +
            '<select id="profesionProfesional" name="profesionProfesional"></select>' +
            '<a id="submitConsultaListadoProfesionales" class="button">Consultar</a>' +
            '</form>'
        ),

        initialize: function(attributes, options) {
            options = options || {};
            options.renderer = renderer;
            BaseView.prototype.initialize.call(this, attributes, options);

            this.initializeModelDataSource();
        },

        initializeModelDataSource: function () {
            this.modelDataSource = new ModelDataSource ({view: this});
            this.modelDataSource.on('dataFetched', this.renderVistaDeDatos, this);
        },

        renderVistaDeDatos: function (data) {
            var profesionalCollection = new ProfesionalCollection();
            var profesionalColleccionView = ProfesionalCollectionView.getInstance();
            profesionalColleccionView.setModel({model: profesionalCollection});
            profesionalCollection.processData(data);
        },

        ejecutarListadoProfesionales: function(){
            var matriculaProfesional = $("#matriculaProfesional").val();
            var nombreProfesional = $("#nombreProfesional").val().toUpperCase();
            var apellidoProfesional = $("#apellidoProfesional").val().toUpperCase();
            var dniProfesional = $("#dniProfesional").val().toUpperCase();
            var provinciaProfesional = $("#provinciaProfesional").val();
            var profesionProfesional = $("#profesionProfesional").val();

            var dataWS = {
                "usuario": ServiceConfig.usuario,
                "clave": ServiceConfig.clave,
                "provinciaMatriculacion": provinciaProfesional,
                "profesion": profesionProfesional,
                "nombre": nombreProfesional,
                "numeroDocumento": dniProfesional
            };
            //Solo se incluye si la matricula no esta vacia. Porque sino busca por matricula vacia y no encuentra a nadie.
            if (matriculaProfesional) {
                dataWS.matricula = matriculaProfesional;
            }

            //Solo se incluye si el apellido no esta vacío. Buscando por apellido vacío, no devuelve resultados.
            if (apellidoProfesional) {
                dataWS.apellido = apellidoProfesional;
            }

            this.modelDataSource.getModelData(ProfesionalCollection, dataWS);
        },

        render: function(){
            BaseView.prototype.render.call(this);
            $(this.getViewSelector() + " select#provinciaProfesional")[0].innerHTML = listaCompletaProvincias;
            $(this.getViewSelector() + " select#profesionProfesional")[0].innerHTML = listaCompletaProfesiones;
            return this;
        },

        /**
         * Usado para bindear eventos a los controles del formulario.
         * Se ejecuta después del render cuando los controles se encuentran cargados en la página. 
         */
        attachEvents: function(){
            BaseView.prototype.attachEvents.call(this);
            $("#afui").delegate(this.getViewSelector() + " a#submitConsultaListadoProfesionales", "click", _.bind(this.ejecutarListadoProfesionales, this));
        }
    });

    return listadoProfesionalesView;
})(jQuery, af, AppFrameworkRenderer, BaseView, ProfesionalCollection, ProfesionalCollectionView);