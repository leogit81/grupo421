var ConsultaEstablecimientoView = (function (jquery, $, renderer, BaseView, ListadoEstablecimientoView, BusquedaEstablecimientoView, ReporteEstablecimientoView) {
    "use strict";

    var consultaEstablecimientoView = BaseView.extend({
        tagName: 'div',

        attributes: {
            'id': 'consultaEstableicimiento',
            'class': 'panel',
            'data-nav':"consultas_nav",    
        },

        template : _.template(
            '<div class="formGroupHead">Registro Federal de Establecimientos.<br>Seleccione una opción.</div>' +
            '<div>' +
            '<a id="submitListadoEstablecimiento" class="button">Búsqueda de establecimientos</a>' +
			'</br>' +
            '<a id="submitBuscarEstablecimiento" class="button">Buscar establecimiento por código</a>' +
            '</br>' +
            '<a id="submitReporteEstablecimiento" class="button">Reporte de establecimientos</a>' +
            '</br>' +
            '<a id="submitReporteCamas" class="button">Reporte de camas de establecimientos</a>' +
            '</div>'
        ),

        initialize: function(attributes, options) {
            options = options || {};
            options.renderer = renderer;
            BaseView.prototype.initialize.call(this, attributes, options);
            
            this.idImagen = 'imagenEstablecimientos';
        },
        
        ejecutarBuscarEstablecimiento: function(){
            var busquedaEstablecimientoView = new BusquedaEstablecimientoView();
            busquedaEstablecimientoView.render();
        },

        ejecutarListadoEstablecimiento: function(){
            var listadoEstablecimientoView = new ListadoEstablecimientoView();
            listadoEstablecimientoView.render();
        },
        
        ejecutarReporteEstablecimiento: function () {
            var reporteEstablecimientoView = new ReporteEstablecimientoView();
            reporteEstablecimientoView.render();
        },
        
        ejecutarReporteCamas: function () {
            var reporteEstablecimientoCamasView = new ReporteEstablecimientoCamasView();
            reporteEstablecimientoCamasView.render();
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
            $("#afui").delegate(this.getViewSelector() + " a#submitListadoEstablecimiento", "click", _.bind(this.ejecutarListadoEstablecimiento, this));
            $("#afui").delegate(this.getViewSelector() + " a#submitBuscarEstablecimiento", "click", _.bind(this.ejecutarBuscarEstablecimiento, this));
            $("#afui").delegate(this.getViewSelector() + " a#submitReporteEstablecimiento", "click", _.bind(this.ejecutarReporteEstablecimiento, this));
            $("#afui").delegate(this.getViewSelector() + " a#submitReporteCamas", "click", _.bind(this.ejecutarReporteCamas, this));
        }
    });
    
    return consultaEstablecimientoView;
})(jQuery, af, AppFrameworkRenderer, BaseView, ListadoEstablecimientoView, BusquedaEstablecimientoView, ReporteEstablecimientoView);