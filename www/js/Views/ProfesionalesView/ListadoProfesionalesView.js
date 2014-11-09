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
            '<input id="matriculaProfesional" type="text" name="matriculaProfesional" placeholder="Matricula de profesional"></input></br>' +
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
            var provinciaProfesional = $("#provinciaProfesional").val();
            var profesionProfesional = $("#profesionProfesional").val();

            this.modelDataSource.getModelData(ProfesionalCollection, {
                "usuario": 'uutn',
                "clave": '11SC2NXHAI',
                "matricula": matriculaProfesional,
                "provinciaMatriculacion": provinciaProfesional,
                "profesion": profesionProfesional
            });
        },

        render: function(){
            BaseView.prototype.render.call(this);
            document.getElementById("provinciaProfesional").innerHTML = listaCompletaProvincias;
            document.getElementById("profesionProfesional").innerHTML = listaCompletaProfesiones;
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