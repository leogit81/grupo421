var ConsultaProfesionalesView = (function (jquery, $, renderer, BaseView, ListadoProfesionalesView, BusquedaProfesionalView) {
    "use strict";

    var consultaProfesionalesView = BaseView.extend({
        tagName: 'div',

        attributes: {
            'id': 'consultaProfesionales',
            'class': 'panel',
            'data-nav':"consultas_nav",    
        },

        template : _.template(
            '<div class="formGroupHead">Registro Federal de Profesionales.<br>Seleccione una opción.</div>' +
            '<div>' +
            '<a id="submitListadoProfesionales" class="button">Búsqueda de profesionales</a>' +
            '<br>' +
            '<a id="submitBuscarProfesional" class="button">Buscar profesional por código</a>' +
            '</div>'
        ),

        initialize: function(attributes, options) {
            options = options || {};
            options.renderer = renderer;
            
            this.idImagen = 'imagenProfesionales';
            
            BaseView.prototype.initialize.call(this, attributes, options);
        },
        
        ejecutarBuscarProfesional: function(){
            if(ServiceConfig.usuario === null ){
				//La persona no esta inicializada
				$("#afui").popup(
					{
						title: "Error de Autenticación",
						message: "Para realizar esta operación debe iniciar sesión en el sistema",
						cancelText: "Aceptar",
						cancelCallback: function(){new InicioSesionView();},						
						cancelOnly: true
					}
				);
                
                return;
			}
            
            var busquedaProfesionalView = new BusquedaProfesionalView();
            busquedaProfesionalView.render();
        },

        ejecutarListadoProfesionales: function(){
            if(ServiceConfig.usuario === null ){
				//La persona no esta inicializada
				$("#afui").popup(
					{
						title: "Error de Autenticación",
						message: "Para realizar esta operación debe iniciar sesión en el sistema",
						cancelText: "Aceptar",
						cancelCallback: function(){new InicioSesionView();},						
						cancelOnly: true
					}
				);
                
                return;
			}
            
            var listadoProfesionalesView = new ListadoProfesionalesView();
            listadoProfesionalesView.render();
        },

        render: function(){
            BaseView.prototype.render.call(this);   
            return this;
        },

        /**
         * Usado para bindear eventos a los controles del formulario.
         * Se ejecuta después del render cuando los controles se encuentran cargados en la página. 
         */
        attachEvents: function(){
            BaseView.prototype.attachEvents.call(this);
            $("#afui").delegate(this.getViewSelector() + " a#submitListadoProfesionales", "click", _.bind(this.ejecutarListadoProfesionales, this));
            $("#afui").delegate(this.getViewSelector() + " a#submitBuscarProfesional", "click", _.bind(this.ejecutarBuscarProfesional, this));
        }
    });
    return consultaProfesionalesView;
})(jQuery, af, AppFrameworkRenderer, BaseView, ListadoProfesionalesView, BusquedaProfesionalView);