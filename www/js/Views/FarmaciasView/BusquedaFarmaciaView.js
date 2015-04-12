var BusquedaFarmaciaView = (function (jquery, $, renderer, BaseView, FarmaciaNominal, FarmaciaNominalView) {
    "use strict";

    var busquedaFarmaciaView = BaseView.extend({
        tagName: 'div',

        attributes: {
            'id': 'busquedaFarmacia',
            'class': 'panel',
            'data-nav':"consultas_nav",    
        },

        template : _.template(
            '<div class="formGroupHead">Ingrese el código de la farmacia que quiere buscar.</div>' +
            '<input id="codigoFarmacia" type="tel" name="codigoFarmacia" placeholder="Código de farmacia"></input></br>' +
            '<a id="submitConsultaBusquedaFarmacia" class="button">Buscar</a>'
        ),

        initialize: function(attributes, options) {
            options = options || {};
            options.renderer = renderer;
            
            this.idImagen = 'imagenFarmacias';
            
            BaseView.prototype.initialize.call(this, attributes, options);
        },

        ejecutarBusquedaFarmacia: function(){
            var codigoFarmacia = $("#codigoFarmacia").val();
            
            /*Si el código es vacío muestra un mensaje de error y cancela la consulta*/
            if (codigoFarmacia === "" || codigoFarmacia === null || codigoFarmacia === undefined) {
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
            
            var farmaciaNominalModel = new FarmaciaNominal();
            var farmaciaView = new FarmaciaNominalView({codigo: codigoFarmacia});
            farmaciaView.loadDefaultView();
        },

        /**
         * Usado para bindear eventos a los controles del formulario.
         * Se ejecuta después del render cuando los controles se encuentran cargados en la página. 
         */
        attachEvents: function(){
            BaseView.prototype.attachEvents.call(this);
            $("#afui").delegate(this.getViewSelector() + " a#submitConsultaBusquedaFarmacia","click", _.bind(this.ejecutarBusquedaFarmacia, this));
        }
    });

    return busquedaFarmaciaView;
})(jQuery, af, AppFrameworkRenderer, BaseView, FarmaciaNominal, FarmaciaNominalView);