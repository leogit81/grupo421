var GoogleMapView = (function ($, BaseView) {
    "use strict";

    var googleMapView = BaseView.extend({
        tagName: 'div',
        className: 'panel',

        attributes: {
            'id': 'googleMapView',
//            'data-title': 'MAPA',
            'data-nav': "consultas_nav"
        },
        
        initialize: function (attributes, options) {
            options = options || {};
            options.renderer = this;
		    BaseView.prototype.initialize.call(this, attributes, options);
            //para poder funcionar necesita tener un DIV en el DOM donde insertar el mapa, así que cuando se contruye el objeto
            //nos aseguramos que esté
            if ($("#"+this.attributes.id).length == 0) {
                $.ui.addContentDiv(this.attributes.id, this.$el[0]);
            }
        },
        
        setModel: function (model) {
            BaseView.prototype.setModel.call(this, model);
            this.model.on("mapaFinalizado", _.bind(this.mapaFinalizadoHandler, this));
        },
        
        render: function () {
            //$.ui.addContentDiv("map_canvas", "<div id='map_canvas'></div>");
            //$.ui.loadContent("map_canvas", false, false, "slide");
            //var listaEstablecimientos = [{latitud: '-33.890542', longitud: '151.274856'},
            //                           {latitud: '57.7782823', longitud: '14.1720029'}];}
            
            var latLong = {latitud: this.model.get("latitud"),
                           longitud: this.model.get("longitud")
                          };
            var establecimientos = [latLong];
            var nuevoMapa = new GoogleMap(establecimientos);
            var mapaHtmlElement = $("#" + this.attributes.id)[0];
            nuevoMapa.mostrarMapaEstablecimiento(this.model, mapaHtmlElement);
            //this.renderedHtml = mapaHtmlElement;
        },
        
        mapaFinalizadoHandler: function () {
            //this.renderedHtml = $("#map_canvas").html();
            this.trigger("viewRendered");
        }
    });
    
    /**
    * Con la coordenadas proporcionadas por el model, obtiene el mapa de la API de Google Maps y lo inserta
    * en el elemento DIV que tenga configurada la vista de mapas.
    * @param {Object} data, la información del modelo asociado.
    */
    /*googleMapView.prototype.armarHtmlConData = function (data) {
        var latLong = {latitud: this.model.get("latitud"),
                       longitud: this.model.get("longitud")
                      };
        var establecimientos = [latLong];
        var nuevoMapa = new GoogleMap(establecimientos);
        var mapaHtmlElement = $("#" + this.attributes.id)[0];
        nuevoMapa.mostrarMapaEstablecimiento(mapaHtmlElement);
        this.renderedHtml = mapaHtmlElement;
        //BaseView.prototype.armarHtmlConData.call(this, data);
    };*/

    return googleMapView;
})(af, BaseView);

