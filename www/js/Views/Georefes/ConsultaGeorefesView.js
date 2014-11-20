var ConsultaGeorefesView = (function (jquery, $, renderer, BaseView) {
    "use strict";

    var consultaGeorefesView = BaseView.extend({
        tagName: 'div',

        attributes: {
            'id': 'consultaGeorefes',
            'class': 'panel',
            'data-nav':"consultas_nav",    
        },

        template : _.template(
            '<div class="formGroupHead">Centros de salud cercanos. Seleccione la opción deseada.</div>' +
            '<div>' +
            '<a id="submitListadoGeorefesEstablecimiento" class="button">Establecimientos cercanos</a>' +
			'</br>' +
            '<a id="submitBusquedaEstablecimientosCercanos" class="button">Búsqueda establecimientos cercanos</a>' +
			'</br>' +
            '<a id="submitListadoGeorefesFarmacia" class="button">Farmacias cercanas</a>' +
            '</br>' +
            '<a id="submitListadoGeorefesDrogueria" class="button">Droguerías cercanas</a>' +
            '</div>'
        ),

        initialize: function(attributes, options) {
            options = options || {};
            options.renderer = renderer;
            BaseView.prototype.initialize.call(this, attributes, options);
        },
        
        ejecutarListadoEstablecimientoCercano: function(){
            var listadoGeorefesEstablecimientoView = new ListadoGeorefesEstablecimientoView();
            listadoGeorefesEstablecimientoView.render();
        },
        
        ejecutarBusquedaEstablecimientoCercano: function(){
            var busquedaEstablecimientoCercanoView = new BusquedaEstablecimientosCercanosView();
            busquedaEstablecimientoCercanoView.render();
        },

        ejecutarListadoFarmaciaCercana: function(){
            var listadoGeorefesFarmaciaView = new ListadoGeorefesFarmaciaView();
            listadoGeorefesFarmaciaView.render();
        },
        
        ejecutarListadoDrogueriaCercana: function () {
            var listadoGeorefesDrogueriaView = new ListadoGeorefesDrogueriaView();
            listadoGeorefesDrogueriaView.render();
        },

        /**
         * Usado para bindear eventos a los controles del formulario.
         * Se ejecuta después del render cuando los controles se encuentran cargados en la página. 
         */
        attachEvents: function(){
            BaseView.prototype.attachEvents.call(this);
            $("#afui").delegate(this.getViewSelector() + " a#submitListadoGeorefesEstablecimiento", "click", _.bind(this.ejecutarListadoEstablecimientoCercano, this));
            $("#afui").delegate(this.getViewSelector() + " a#submitBusquedaEstablecimientosCercanos", "click", _.bind(this.ejecutarBusquedaEstablecimientoCercano, this));
            $("#afui").delegate(this.getViewSelector() + " a#submitListadoGeorefesFarmacia", "click", _.bind(this.ejecutarListadoFarmaciaCercana, this));
            $("#afui").delegate(this.getViewSelector() + " a#submitListadoGeorefesDrogueria", "click", _.bind(this.ejecutarListadoDrogueriaCercana, this));
        }
    });
    
    return consultaGeorefesView;
})(jQuery, af, AppFrameworkRenderer, BaseView);