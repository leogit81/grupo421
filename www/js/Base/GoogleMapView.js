var GoogleMapView = (function ($, BaseView) {
    "use strict";

    var googleMapView = BaseView.extend({
        tagName: 'div',
        className: 'panel',

        attributes: {
            'id': 'googleMapView',
            'data-title': 'MAPA',
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
            var latLong = {latitud: this.model.get("latitud"),
                           longitud: this.model.get("longitud")
                          };
            var establecimientos = [latLong];
            var nuevoMapa = new GoogleMap(establecimientos);
            var mapaHtmlElement = $("#" + this.attributes.id)[0];
            nuevoMapa.mostrarMapaEstablecimiento(this.model, mapaHtmlElement);
        },
        
        mapaFinalizadoHandler: function () {
            this.trigger("viewRendered");
        }
    });

    return googleMapView;
})(af, BaseView);

