var MinisterioNominalView = (function ($, renderer, TabPanelView, MinisterioView, Ministerio) {
    "use strict";

    var ministerioNominalView = TabPanelView.extend({
        tagName: 'div',
        className: 'panel consulta-detallada',

        attributes: {
            'id': 'resultadoConsultaNominalMinisterio',
            'data-nav': 'consultas_nav'
        },

        codigoMinisterio: null,

        setCodigoMinisterio: function (codigoMinisterio) {
            this.codigoMinisterio = codigoMinisterio;
        },

        getCodigoMinisterio: function (codigoMinisterio) {
            return this.codigoMinisterio;
        },

        tabsConfig: [
            {
                tabName: "<img src='./img/pestanas/accesosA_general-24-px.png'>",
                panelId: "ministerioGeneral",
                viewClass: MinisterioView,
                modelClass: Ministerio,
                tieneCoordenadasDeMapa: true,
                nombreAtributoCoordenadasDeMapaModel: "coordenadasDeMapa"
            },
            {
                tabName: "<img src='./img/pestanas/accesosA_mapa-24-px.png'>",
                panelId: "ministerioMapas",
                viewClass: GoogleMapView,
                esMapa: true
            }
        ],

        initialize: function (attributes, options) {
            options = options || {};
            options.renderer = renderer;
            this.setCodigoMinisterio(attributes.codigo);

            TabPanelView.prototype.initialize.call(this, attributes, options);

            this.findTab("panelId", "ministerioGeneral").filtroConsulta = _.bind(this.getCodigoMinisterio, this);
        }
    });

    return ministerioNominalView;
}(af, AppFrameworkRenderer, TabPanelView, MinisterioView, Ministerio));