var BusquedaEstablecimientoView = (function (jquery, $, renderer, BaseView, EstablecimientoNominalView) {
    "use strict";

    var busquedaEstablecimientoView = BaseView.extend({
        tagName: 'div',

        attributes: {
            'id': 'busquedaEstablecimientoNominal',
            'class': 'panel',
            'data-nav':"consultas_nav",    
        },

        template : _.template(
            '<div class="formGroupHead">Ingrese el código del establecimiento que desee buscar.</div>' +
            '<input id="codigoEstablecimiento" type="tel" name="codigoEstablecimiento" placeholder="Código de establecimiento"></input></br>' +
            '<a id="submitConsultaBusquedaEstablecimiento" class="button">Buscar</a>'
        ),

        initialize: function(attributes, options) {
            options = options || {};
            options.renderer = renderer;
            BaseView.prototype.initialize.call(this, attributes, options);
            this.idImagen = 'imagenEstablecimientos';
        },

       ejecutarBusquedaEstablecimiento: function(){
            var codigoEstablecimiento = $("#codigoEstablecimiento").val();
           
            /*Si el código es vacío muestra un mensaje de error y cancela la consulta*/
            if (codigoEstablecimiento === "" || codigoEstablecimiento === null || codigoEstablecimiento === undefined) {
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
           
            var establecimientoView = new EstablecimientoNominalView({codigo: codigoEstablecimiento});
            af.ui.showMask("Cargando...");
            establecimientoView.loadDefaultView();
        },

        /**
         * Usado para bindear eventos a los controles del formulario.
         * Se ejecuta después del render cuando los controles se encuentran cargados en la página. 
         */
        attachEvents: function(){
            BaseView.prototype.attachEvents.call(this);
            $("#afui").delegate(this.getViewSelector() + " a#submitConsultaBusquedaEstablecimiento","click", _.bind(this.ejecutarBusquedaEstablecimiento, this));
        }
    });

    return busquedaEstablecimientoView;
})(jQuery, af, AppFrameworkRenderer, BaseView, EstablecimientoNominalView);