var GoogleMapView = (function ($, BaseView, renderer) {
    "use strict";

    var googleMapView = BaseView.extend({
        tagName: 'div',
        className: 'panel',

        attributes: {
            'id': 'googleMapView',
            'data-nav': "consultas_nav"
        },
        
        template : _.template(
            "<div><span class='mapaDefaultMessage'>Lo sentimos, no se puede visualizar el mapa porque no hay información disponible de las coordenadas.</div>"),
        
        /**
        * Una instancia de google.maps.Map
        */
        googleMap: null,
        
        initialize: function (attributes, options) {
            options = options || {};
            options.renderer = renderer;
		    BaseView.prototype.initialize.call(this, attributes, options);
        },
        
        render: function () {
            var latLong = this.getCenterPosicion();
            
            //Cuando no hay información de coordenadas muestra una vista por defecto sin mapa.
            if ((common.isEmpty(latLong.latitud) || latLong.latitud == "null")
                && (common.isEmpty(latLong.longitud) || latLong.longitud == "null")) {
                BaseView.prototype.render.call(this);
                this.parent.updateHTMLSubVista(this);
            } else {
                var listaDeCoordenadas = this.getModelData();
                this.mostrarMapa(latLong, listaDeCoordenadas, this.model.esUbicacionDispositivo);
            }
         },
        
        /**
        * Muestra el mapa centrado en la centerPosition. Agrega marcadores para c/u
        * de las coordenadas pasadas en el array listaDeCoordenadas.
        * El 3° parámetro es un flag que indica si la centerPosicion es la ubicación
        * del dispositivo. En caso de ser true, se pinta el marcador para la ubicación
        * actual con un color azul, para diferencialo del resto.
        */
        mostrarMapa: function (centerPosition, listaDeCoordenadas, esUbicacionDispositivo) {
            var nuevoMapa = new GoogleMap(listaDeCoordenadas);
            var mapaCanvas = $(this.parent.getViewSelector() + " div#map_canvas");
            mapaCanvas.on('resize', _.bind(this.onMapaResize, this));
            
            /*
            *Se restan 35px de la altura de los tabs 
            *para evitar overflow de scrolling
            */
            mapaCanvas.css("height", (mapaCanvas.parent().height() - 39)); 
            this.googleMap = nuevoMapa.loadMap(centerPosition, mapaCanvas[0], esUbicacionDispositivo);
        },
        
        onMapaResize: function () {
            google.maps.event.trigger(this.googleMap, 'resize');
        },
        
        /**
        * Devuelve la lista de coordenadas para la cual se agregarán marcadores en el mapa.
        */
        getModelData: function () {
            var listaDeCoordenadas = [];
            if (!common.isEmpty(this.model)) {
                listaDeCoordenadas = this.model.obtenerCoordenadasMarcadoresMapa();
            }

            return listaDeCoordenadas;
        },
        
        getCenterPosicion: function () {
            return this.model.getCenterPosition();
        }
    });

    return googleMapView;
}(af, BaseView, AppFrameworkRenderer));