var EstablecimientoNominalView = (function ($, renderer, TabPanelView, EstablecimientoNominalGeneralView, GoogleMapView, PrestacionCollectionView, CamasCollectionView) {
    "use strict";

    var establecimientoNominalView = TabPanelView.extend({
        tagName: 'div',
        className: 'panel consulta-detallada',

        attributes: {
            'id': 'resultadoConsultaNominalEstablecimiento',
            'data-nav': 'consultas_nav'
        },

        codigoEstablecimiento: null,

        setCodigoEstablecimiento: function (codigoEstablecimiento) {
            this.codigoEstablecimiento = codigoEstablecimiento;
        },

        getCodigoEstablecimiento: function (codigoEstablecimiento) {
            return this.codigoEstablecimiento;
        },

        tabsConfig: [
            {
                tabName: "<img src='./img/pestanas/accesosA_general-24-px.png'>",
                panelId: "establecimientoGeneral",
                viewClass: EstablecimientoNominalGeneralView,
                modelClass: EstablecimientoNominal,
                tieneCoordenadasDeMapa: true,
                nombreAtributoCoordenadasDeMapaModel: "coordenadasDeMapa"
            },
            {
                tabName: "<img src='./img/pestanas/accesosA_prestaciones-24-px.png'>",
                panelId: "establecimientoPrestaciones",
                viewClass: PrestacionCollectionView,
                modelClass: PrestacionCollection,
                titleCSSClass: "prestacionesTabViewClass"
            },
            {
                tabName: "<img src='./img/pestanas/accesosA_imagenes-24-px.png'>",
                panelId: "establecimientoImagenes",
                viewClass: ImagenesView,
                customLoadView: function () { this.view.render(); }
            },
            {
                tabName: "<img src='./img/pestanas/accesosA_mapa-24-px.png'>",
                panelId: "establecimientoMapas",
                viewClass: GoogleMapView,
                esMapa: true
            },
            {
                tabName: "<img src='./img/pestanas/accesosA_camas-24-px.png'>",
                panelId: "establecimientoCamas",
                viewClass: CamasCollectionView,

                modelClass: CamasCollection,
                titleCSSClass: "camasTabViewClass"

            }
        ],

        initialize: function (attributes, options) {
            var tabCamas;
            
            options = options || {};
            options.renderer = renderer;
            this.setCodigoEstablecimiento(attributes.codigo);
            this.idImagen = 'imagenEstablecimientos';
            
            TabPanelView.prototype.initialize.call(this, attributes, options);
            
            this.findTab("panelId", "establecimientoGeneral").filtroConsulta = _.bind(this.getCodigoEstablecimiento, this);
            this.findTab("panelId", "establecimientoPrestaciones").filtroConsulta = _.bind(this.getCodigoEstablecimiento, this);
            tabCamas = this.findTab("panelId", "establecimientoCamas");
            tabCamas.filtroConsulta = _.bind(this.getCodigoEstablecimiento, this);
            //oculta el tab de camas según el primer dígito del código de establecimiento
            tabCamas.isHidden = (this.getCodigoEstablecimiento().toString().charAt(0) !== "1");
        }
    });

    return establecimientoNominalView;
}(af, AppFrameworkRenderer, TabPanelView, EstablecimientoNominalGeneralView, GoogleMapView, PrestacionCollectionView, CamasCollectionView));