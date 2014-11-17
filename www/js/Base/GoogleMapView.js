var GoogleMapView = (function ($, BaseView) {
    "use strict";

    var googleMapView = BaseView.extend({
        tagName: 'div',
        className: 'panel',

        attributes: {
            'id': 'googleMapView',
            'data-nav': "consultas_nav"
        },
        
        initialize: function (attributes, options) {
            options = options || {};
            options.renderer = this;
		    BaseView.prototype.initialize.call(this, attributes, options);
        },
        
        setModel: function (model) {
            BaseView.prototype.setModel.call(this, model);
            this.model.on("mapaFinalizado", _.bind(this.mapaFinalizadoHandler, this));
        },
        
        preRender: function () {            
            //Para poder funcionar necesita tener un DIV en el DOM donde insertar el mapa.
            // Así que cuando se contruye el objeto nos aseguramos que esté.
            if ($("#"+this.attributes.id).length == 0) {
                $.ui.addContentDiv(this.attributes.id, this.$el[0]);
            }
        },
        
        /*render: function () {            
            var latLong = {latitud: this.model.get("latitud"),
                           longitud: this.model.get("longitud")
                          };
            var establecimientos = [latLong];
            var nuevoMapa = new GoogleMap(establecimientos);
            var mapaHtmlElement = $(this.getViewSelector())[0];
            nuevoMapa.mostrarMapaEstablecimiento(this.model, mapaHtmlElement);
        },*/
        render: function () {
            BaseView.prototype.armarHtmlConData.call(this, {});
            
            var latLong = {
                latitud: this.model.get("latitud"),
                longitud: this.model.get("longitud")
            };
             var establecimientos = [latLong];
             var nuevoMapa = new GoogleMap(establecimientos);
            //this.parent.updateSubVistaConHTML(this.$el[0].outerHTML);
            //var mapaHtmlElement = $(this.getViewSelector())[0];
            var mapaCanvas = $(this.parent.getViewSelector() + " div#map_canvas");
            /*mapaCanvas.unbind();
            mapaCanvas.undelegate();*/
            //var mapaHtmlElement = $("#map_canvas_global")[0];
             //nuevoMapa.mostrarMapaEstablecimiento(this.model, mapaCanvas[0]);
            mapaCanvas.css("height", mapaCanvas.parent().height());
            var latLong2 = new google.maps.LatLng(latLong.latitud, latLong.longitud);
            var map = createMap(this.parent.getViewSelector() + " #map_canvas", latLong2);
            this.parent.selectedTab.googleMap = map;
            this.model.trigger("mapaFinalizado");
         },
         
        
        mapaFinalizadoHandler: function () {
            this.trigger("viewRendered", this);
        },
        
        getInstance: function () {
            return this;
        }
    });

    return googleMapView;
})(af, BaseView);

