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
        
        initialize: function (attributes, options) {
            options = options || {};
            options.renderer = renderer;
		    BaseView.prototype.initialize.call(this, attributes, options);
        },
        
        /*setModel: function (model) {
            BaseView.prototype.setModel.call(this, model);
            //this.model.on("mapaFinalizado", _.bind(this.mapaFinalizadoHandler, this));
        },*/
        
        /*preRender: function () {            
            //Para poder funcionar necesita tener un DIV en el DOM donde insertar el mapa.
            // Así que cuando se contruye el objeto nos aseguramos que esté.
            if ($("#"+this.attributes.id).length == 0) {
                $.ui.addContentDiv(this.attributes.id, this.$el[0]);
            }
        },*/
        
        render: function () {
            /*var latLong = {
                latitud: this.model.get("latitud"),
                longitud: this.model.get("longitud")
            };*/
            
            var latLong = this.getCenterPosicion();
            
            //Cuando no hay información de coordenadas muestra una vista por defecto sin mapa.
            if ((common.isEmpty(latLong.latitud) || latLong.latitud == "null")
                && (common.isEmpty(latLong.longitud) || latLong.longitud == "null")) {
                BaseView.prototype.render.call(this);
                this.parent.updateHTMLSubVista(this);
            } else {
                /*if (common.isEmpty(this.model.get("nivelZoom")))
                {
                    this.model.set("nivelZoom", 14);
                }*/
                var listaDeCoordenadas = this.getModelData();
                this.mostrarMapa(latLong, listaDeCoordenadas);
            }
         },
        
        mostrarMapa: function (centerPosition, listaDeCoordenadas) {
            //BaseView.prototype.armarHtmlConData.call(this);
            //var nuevoMapa = new GoogleMap([latLong]);
            var nuevoMapa = new GoogleMap(listaDeCoordenadas);
            var mapaCanvas = $(this.parent.getViewSelector() + " div#map_canvas");
            //nuevoMapa.mostrarMapaEstablecimiento(this.model, mapaCanvas[0]);
            nuevoMapa.loadMap(centerPosition, mapaCanvas[0]);
            mapaCanvas.css("height", mapaCanvas.parent().height());
            this.parent.selectedTab.googleMap = nuevoMapa;
            this.trigger("viewRendered", this);
        },
        
        /*mapaFinalizadoHandler: function () {
            this.trigger("viewRendered", this);
        },*/
        
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