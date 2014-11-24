var BusquedaProfesionalView = (function (jquery, $, renderer, BaseView, ProfesionalNominal, ProfesionalNominalView) {
    "use strict";

    var busquedaProfesionalView = BaseView.extend({
        tagName: 'div',

        attributes: {
            'id': 'busquedaProfesional',
            'class': 'panel',
            'data-nav':"consultas_nav",
        },

        template : _.template(
            '<div class="formGroupHead">Ingrese el código del profesional que quiere buscar.</div>' +
            '<input id="codigoProfesional" type="tel" name="codigoProfesional" placeholder="Código de profesional"></input></br>' +
            '<a id="submitConsultaBusquedaProfesional" class="button">Buscar</a>'
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

        ejecutarBusquedaProfesional: function(){
            var codigoProfesional = $("#codigoProfesional").val();
            var profesionalNominalModel = new ProfesionalNominal();
            var profesionalView = new ProfesionalNominalView({usuario: ServiceConfig.usuario, 
                                                              clave: ServiceConfig.clave, 
                                                              codigo: codigoProfesional});
            profesionalView.loadDefaultView();
        },

        attachEvents: function(){
            BaseView.prototype.attachEvents.call(this);
            $("#afui").delegate(this.getViewSelector() + " a#submitConsultaBusquedaProfesional", "click", _.bind(this.ejecutarBusquedaProfesional, this));
        }
    });
    return busquedaProfesionalView;
})(jQuery, af, AppFrameworkRenderer, BaseView, ProfesionalNominal, ProfesionalNominalView);