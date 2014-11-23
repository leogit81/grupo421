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
                //                tabName: "General",
                tabName: "<img src='./img/pestanas/accesosA_general-24-px.png'>",
                panelId: "establecimientoGeneral",
                viewClass: EstablecimientoNominalGeneralView,
                modelClass: EstablecimientoNominal
            },
            {
                //                tabName: "Prestaciones",
                tabName: "<img src='./img/pestanas/accesosA_prestaciones-24-px.png'>",
                panelId: "establecimientoPrestaciones",
                viewClass: PrestacionCollectionView,
                modelClass: PrestacionCollection,
                titleCSSClass: "prestacionesTabViewClass"
            },
            {
                //                tabName: "Imágenes",
                tabName: "<img src='./img/pestanas/accesosA_imagenes-24-px.png'>",
                panelId: "establecimientoImagenes",
                viewClass: ImagenesView,
                customLoadView: function () { this.view.render(); }
            },
            {
                //                tabName: "Mapa",
                tabName: "<img src='./img/pestanas/accesosA_mapa-24-px.png'>",
                panelId: "establecimientoMapas",
                viewClass: GoogleMapView,
                esMapa: true
            },
            {
                //                tabName: "Camas",
                tabName: "<img src='./img/pestanas/accesosA_camas-24-px.png'>",
                panelId: "establecimientoCamas",
                viewClass: CamasCollectionView,

                modelClass: CamasCollection,
                titleCSSClass: "camasTabViewClass"

            }
        ],

        /*ejecutarConsultaNominalEstablecimiento: function (codigoEstablecimiento) {
            this.codigoEstablecimiento = codigoEstablecimiento;
            var tabGeneral = this.findTab("panelId", "establecimientoGeneral");
            tabGeneral.view.model.load(this.codigoEstablecimiento);
        },*/

        initialize: function (attributes, options) {
            options = options || {};
            options.renderer = renderer;
            this.setCodigoEstablecimiento(attributes.codigo);

            //            if (attributes.codigo.toString().charAt(0) !== "1") {
            //                this.tabsConfig.splice(this.tabsConfig.length - 1, 1);
            //            };

            TabPanelView.prototype.initialize.call(this, attributes, options);

            this.findTab("panelId", "establecimientoGeneral").filtroConsulta = _.bind(this.getCodigoEstablecimiento, this);
            this.findTab("panelId", "establecimientoPrestaciones").filtroConsulta = _.bind(this.getCodigoEstablecimiento, this);

            //            if(this.findTab("panelId", "establecimientoCamas")){
            this.findTab("panelId", "establecimientoCamas").filtroConsulta = _.bind(this.getCodigoEstablecimiento, this);
            //            }
            //this.findTab("panelId", "establecimientoMapas").miPosicion = this.getCoordenadasEstablecimiento();
        },

        /**
        * Devuelve el model asociado a la vista, que se muestra en uno de los tabs.
        * @param {String} tabName, nombre del tab, a partir de este se obtiene el modelo
        */
        getModelOrDefault: function (tabName) {
            var tab = this.findTab("tabName", tabName);
            return tab.view.model;
        }
    });

    /**
     * Devuelve una vista por nombre.
     *  @param {String} , el nombre de la vista, si se quiere poder acceder a la misma mediante nombre. 
     */
    /*establecimientoNominalView.prototype.getViewByName = function (viewName) {
        var tab = this.findTab("tabName", viewName);
        return tab.view;
    };*/

    /**
    * Carga la data del tab de prestaciones cuando el usuario hace clic sobre el mismo.
    * Lo hace una vez y el resto de las veces que se seleccione el tab muestra la data que ya tiene cargada.
    */
    //    establecimientoNominalView.prototype.loadPrestacionesTab = function (selectedTabPanelId) {
    //        var tabPrestaciones = this.findTab("panelId", selectedTabPanelId);
    //        if (common.isEmpty(tabPrestaciones.isLoaded) || !tabPrestaciones.isLoaded) {
    //            tabPrestaciones.view.model.load(this.codigoEstablecimiento);
    //            tabPrestaciones.isLoaded = true;
    //        }
    //        $(this.getViewSelector()).addClass("consultaNominalEstablecimiento");
    //    };

    /**
    * Carga la data del tab de camas de un establecimiento cuando el usuario hace clic sobre el mismo.
    * Lo hace una vez y el resto de las veces que se seleccione el tab muestra la data que ya tiene cargada.
    */
    /*establecimientoNominalView.prototype.loadCamasTab = function (selectedTabPanelId) {
        var tabCamas = this.findTab("panelId", selectedTabPanelId);
        if (common.isEmpty(tabCamas.isLoaded) || !tabCamas.isLoaded) {
			tabCamas.view.model.load(this.codigoEstablecimiento);
            tabCamas.isLoaded = true;
        }else{
			tabCamas.view.render();
		}
		//Clase para agregarle los CCS. Por ahi estaria bueno hacer una sola class para todos los tabs.
        $(this.getViewSelector()).addClass("consultaNominalEstablecimiento");
    };*/

    /**
    * Obtiene el modelo de coordenadas a partir del modelo de establecimiento nominal.
    */
    /*establecimientoNominalView.prototype.getCoordenadasMapaModel = function () {
        var tabGeneral = this.findTab("panelId", "establecimientoGeneral");
        return tabGeneral.view.model.get("coordenadasDeMapa");
    };*/

    return establecimientoNominalView;
}(af, AppFrameworkRenderer, TabPanelView, EstablecimientoNominalGeneralView, GoogleMapView, PrestacionCollectionView, CamasCollectionView));