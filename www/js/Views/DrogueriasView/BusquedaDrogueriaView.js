var BusquedaDrogueriaView = (function (jquery, $, renderer, BaseView, DrogueriaNominal, DrogueriaNominalView) {
    "use strict";

    var busquedaDrogueriaView = BaseView.extend({
        tagName: 'div',

        attributes: {
            'id': 'busquedaDrogueria',
            'class': 'panel',
            'data-nav':"consultas_nav",
        },

        template : _.template(
            '<div class="formGroupHead">Ingrese el código de la droguería que quiere buscar.</div>' +
            '<input id="codigoDrogueria" type="tel" name="codigoDrogueria" placeholder="Código de droguería"></input></br>' +
            '<a id="submitConsultaBusquedaDrogueria" class="button">Buscar</a>'
        ),

        initialize: function(attributes, options) {
            options = options || {};
            options.renderer = renderer;
            BaseView.prototype.initialize.call(this, attributes, options);
            this.idImagen = 'imagenDroguerias';
        },

        ejecutarBusquedaDrogueria: function(){
            var codigoDrogueria = $("#codigoDrogueria").val();
            
            /*Si el código es vacío muestra un mensaje de error y cancela la consulta*/
            if (codigoDrogueria === "" || codigoDrogueria === null || codigoDrogueria === undefined) {
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
            
            var drogueriaNominalModel = new DrogueriaNominal();
            var drogueriaView = new DrogueriaNominalView({codigo: codigoDrogueria});
            drogueriaView.loadDefaultView();
        },

        /**
         * Usado para bindear eventos a los controles del formulario.
         * Se ejecuta después del render cuando los controles se encuentran cargados en la página. 
         */
        attachEvents: function(){
            BaseView.prototype.attachEvents.call(this);
            $("#afui").delegate(this.getViewSelector() + " a#submitConsultaBusquedaDrogueria", "click", _.bind(this.ejecutarBusquedaDrogueria, this));
        }
    });
    return busquedaDrogueriaView;
})(jQuery, af, AppFrameworkRenderer, BaseView, DrogueriaNominal, DrogueriaNominalView);