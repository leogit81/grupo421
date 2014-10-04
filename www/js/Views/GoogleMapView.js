var GoogleMapView = (function ($, BaseView) {
    "use strict";

    var googleMapView = BaseView.extend({
        tagName: 'div',
        className: 'panel consulta-detallada',

        attributes: {
            'id': 'googleMapView',
            'data-title': 'MAPA',
            'data-nav': "consultas_nav"
        },
        
        initialize: function (attributes, options) {
            jQuery.on("mapa_listo", _.bind(this.setHtml, this));
            options = options || {};
            options.renderer = this;
		    BaseView.prototype.initialize.call(this, attributes, options);
        },
        
        render: function () {
            //$.ui.addContentDiv("map_canvas", "<div id='map_canvas'></div>");
            //$.ui.loadContent("map_canvas", false, false, "slide");
            var listaEstablecimientos = [{latitud: '-33.890542', longitud: '151.274856'},
                                         {latitud: '57.7782823', longitud: '14.1720029'}];
            var nuevoMapa = new GoogleMap(listaEstablecimientos),
                mapa = nuevoMapa.initialize();
            
        },
        
        setHtml: function () {
            this.renderedHtml = $("#map_canvas").html();
        }
    });

    return googleMapView;
})(af, BaseView);

