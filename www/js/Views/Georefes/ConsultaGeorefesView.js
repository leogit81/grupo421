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
            '<a id="submitBusquedaEstablecimientosCercanos" class="button">Búsqueda de establecimientos cercanos</a>' +
			'</br>' +
            '<a id="submitBusquedaFarmaciaCercana" class="button">Búsqueda de farmacias cercanas</a>' +
            '</br>' +
            '<a id="submitBusquedaDrogueriaCercana" class="button">Búsqueda de droguerías cercanas</a>' +
            '</div>'
        ),

        initialize: function(attributes, options) {
            options = options || {};
            options.renderer = renderer;
            BaseView.prototype.initialize.call(this, attributes, options);
        },
        
        ejecutarBusquedaEstablecimientoCercano: function(){
            var busquedaEstablecimientoCercanoView = new BusquedaEstablecimientosCercanosView();
            busquedaEstablecimientoCercanoView.render();
        },

        ejecutarBusquedaFarmaciaCercana: function(){
            var busquedaFarmaciasCercanasView = new BusquedaFarmaciasCercanasView();
            busquedaFarmaciasCercanasView.render();
        },
        
        ejecutarBusquedaDrogueriaCercana: function () {
            var busquedaDrogueriasCercanasView = new BusquedaDrogueriasCercanasView();
            busquedaDrogueriasCercanasView.render();
        },

        /**
         * Usado para bindear eventos a los controles del formulario.
         * Se ejecuta después del render cuando los controles se encuentran cargados en la página. 
         */
        attachEvents: function(){
            BaseView.prototype.attachEvents.call(this);
            $("#afui").delegate(this.getViewSelector() + " a#submitBusquedaEstablecimientosCercanos", "click", _.bind(this.ejecutarBusquedaEstablecimientoCercano, this));
            $("#afui").delegate(this.getViewSelector() + " a#submitBusquedaFarmaciaCercana", "click", _.bind(this.ejecutarBusquedaFarmaciaCercana, this));
            $("#afui").delegate(this.getViewSelector() + " a#submitBusquedaDrogueriaCercana", "click", _.bind(this.ejecutarBusquedaDrogueriaCercana, this));
        }
    });
    
    return consultaGeorefesView;
})(jQuery, af, AppFrameworkRenderer, BaseView);