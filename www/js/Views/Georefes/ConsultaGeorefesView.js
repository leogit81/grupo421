var ConsultaGeorefesView = (function (jquery, $, renderer, BaseView, ListadoEstablecimientoView, BusquedaEstablecimientoView, ReporteEstablecimientoView) {
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
            '<a id="submitListadoGeorefesFarmacia" class="button">Farmacias cercanas</a>' +
            '</br>' +
            '<a id="submitListadoGeorefesDrogueria" class="button">Droguerías cercanas</a>' +
            '</div>'
        ),

        initialize: function(attributes, options) {
            options = options || {};
            options.renderer = renderer;
            BaseView.prototype.initialize.call(this, attributes, options);

            //this.initializeModelDataSource();
        },

        /*initializeModelDataSource: function () {
            this.modelDataSource = new ModelDataSource ({view: this});
            this.modelDataSource.on('dataFetched', this.renderVistaDeDatos, this);
        },*/
        
        ejecutarBuscarEstablecimientoCercano: function(){
            var busquedaEstablecimientoView = new BusquedaEstablecimientoView();
            busquedaEstablecimientoView.render();
        },

        ejecutarBuscarFarmaciaCercana: function(){
            var listadoEstablecimientoView = new ListadoEstablecimientoView();
            listadoEstablecimientoView.render();
        },
        
        ejecutarDrogueriaCercana: function () {
            var reporteEstablecimientoView = new ReporteEstablecimientoView();
            reporteEstablecimientoView.render();
        },
        
        /*render: function(){
            BaseView.prototype.render.call(this);   
            return this;
        },*/

        /**
         * Usado para bindear eventos a los controles del formulario.
         * Se ejecuta después del render cuando los controles se encuentran cargados en la página. 
         */
        attachEvents: function(){
            BaseView.prototype.attachEvents.call(this);
            $("#afui").delegate(this.getViewSelector() + " a#submitListadoGeorefesEstablecimiento", "click", _.bind(this.ejecutarBuscarEstablecimientoCercano, this));
            $("#afui").delegate(this.getViewSelector() + " a#submitListadoGeorefesFarmacia", "click", _.bind(this.ejecutarBuscarFarmaciaCercana, this));
            $("#afui").delegate(this.getViewSelector() + " a#submitListadoGeorefesDrogueria", "click", _.bind(this.ejecutarDrogueriaCercana, this));
        }
    });
    
    return consultaGeorefesView;
})(jQuery, af, AppFrameworkRenderer, BaseView, ListadoEstablecimientoView, BusquedaEstablecimientoView, ReporteEstablecimientoView);