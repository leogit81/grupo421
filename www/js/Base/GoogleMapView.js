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
        
        render: function () {
            BaseView.prototype.armarHtmlConData.call(this, {});
            
            var latLong = {
                latitud: this.model.get("latitud"),
                longitud: this.model.get("longitud")
            };
            var establecimientos = [latLong];
            var nuevoMapa = new GoogleMap(establecimientos);
            var mapaCanvas = $(this.parent.getViewSelector() + " div#map_canvas");
            nuevoMapa.mostrarMapaEstablecimiento(this.model, mapaCanvas[0]);
            mapaCanvas.css("height", mapaCanvas.parent().height());
            this.parent.selectedTab.googleMap = nuevoMapa;
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

