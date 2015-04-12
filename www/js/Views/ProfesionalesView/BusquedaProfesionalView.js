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
            
            this.idImagen = 'imagenProfesionales';
            
            BaseView.prototype.initialize.call(this, attributes, options);
        },

        ejecutarBusquedaProfesional: function(){
            var codigoProfesional = $("#codigoProfesional").val();
            
            /*Si el código es vacío muestra un mensaje de error y cancela la consulta*/
            if (codigoProfesional === "" || codigoProfesional === null || codigoProfesional === undefined) {
                $("#afui").popup(
					{
						title: "SISA Móvil",
						message: "Debe ingresar un código para realizar la búsqueda solicitada.",
						cancelText: "Aceptar",
						cancelCallback: function(){},						
						cancelOnly: true
					}
				);
                
                return;
            }
            
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