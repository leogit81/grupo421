var EstablecimientoNominalView = (function ($, renderer, BaseView, EstablecimientoNominalGeneralView, GoogleMapView, PrestacionCollectionView, CamasCollectionView) {
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
                tabName: "General",
                panelId: "establecimientoGeneral",
                viewClass: EstablecimientoNominalGeneralView,
                modelClass: EstablecimientoNominal
            },
            {
                tabName: "Prestaciones",
                panelId: "establecimientoPrestaciones",
                viewClass: PrestacionCollectionView,
                modelClass: PrestacionCollection,
                titleCSSClass: "prestacionesTabViewClass"
            },
            {
                tabName: "Imágenes",
                panelId: "establecimientoImagenes",
                viewClass: ImagenesView,
                customLoadView: function () { this.view.render(); }
            },
            {
                tabName: "Mapas",
                panelId: "establecimientoMapas",
                viewClass: GoogleMapView
            },
			{
                tabName: "Camas",
                panelId: "establecimientoCamas",
                viewClass: CamasCollectionView,
				modelClass: CamasCollection
				//titleCSSClass: "camasTabViewClass"
            }
        ],
        
        loadSelectedTab: function () {
            //parche, hace el clic de la vista general para que se actualice la ubicacion
            TabPanelView.prototype.loadSelectedTab.call(this);
            /*if (this.selectedTab.panelId === "establecimientoGeneral"){
                var self = this;
                setTimeout( function () {
                    var tabHtml = self.getTabHtmlPorHref("establecimientoGeneral");
                    tabHtml[0].click();
                }, 300)
            }*/
        },
        
        loadMapaEstablecimiento: function () {
            var coordenadasEstablecimientoModel = this.tabPanelView.getCoordenadasMapaModel();
            this.view.setModel(coordenadasEstablecimientoModel);
            this.view.render();
        },
        
        ejecutarConsultaNominalEstablecimiento: function (codigoEstablecimiento) {
            this.codigoEstablecimiento = codigoEstablecimiento;
            var tabGeneral = this.findTab("panelId", "establecimientoGeneral");
            tabGeneral.view.model.load(this.codigoEstablecimiento);
        },
        
		initialize: function (attributes, options) {
            options = options || {};
            options.renderer = renderer;
            this.setCodigoEstablecimiento(attributes.codigo);
			
            //llama al constructor base para que se carguen los tabs de panel
            this.tabsConfig[3].onViewRenderedHandler = this.onGoogleMapViewRendered;
            TabPanelView.prototype.initialize.call(this, attributes, options);
            
            this.findTab("panelId", "establecimientoGeneral").filtroConsulta = _.bind(this.getCodigoEstablecimiento, this);
            this.findTab("panelId", "establecimientoPrestaciones").filtroConsulta = _.bind(this.getCodigoEstablecimiento, this);
            this.findTab("panelId", "establecimientoCamas").filtroConsulta = _.bind(this.getCodigoEstablecimiento, this);
			var mapaEstablecimientoTab = this.findTab("panelId", "establecimientoMapas");
            /*mapaEstablecimientoTab.onViewRenderedHandler = _.bind(this.onGoogleMapViewRendered, this);
            mapaEstablecimientoTab.modelClass = this.getCoordenadasMapaModel();*/
            mapaEstablecimientoTab.customLoadView = this.loadMapaEstablecimiento;
        },
        
        /**
        * Setea el modelo para la vista y también actualiza los modelos de las vistas de los tabs.
        */
        /*setModel: function (model) {
            this.getViewByName("General").setModel(model);
            
            this.getViewByName("Mapas").setModel(model.get("coordenadasDeMapa"));
        },*/
        
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
    establecimientoNominalView.prototype.getViewByName = function (viewName) {
        var tab = this.findTab("tabName", viewName);
        return tab.view;
    };
    
    /*establecimientoNominalView.prototype.render = function (viewName) {
        TabPanelView.prototype.render.call(this);
        $("#" + this.attributes.id).addClass("consultaNominalEstablecimiento");
    };*/
    
    establecimientoNominalView.prototype.onGoogleMapViewRendered = function (googleMapView) {
        this.selectedTab.isLoaded = true;
        //$.ui.loadContent(googleMapView.getViewId(), false, false, "pop");
        $.ui.loadContent("#map_canvas", false, false, "pop");
        //$(googleMapView.getViewSelector()).css("display", "block");
     };
    
    /**
    * Carga la data del tab de prestaciones cuando el usuario hace clic sobre el mismo.
    * Lo hace una vez y el resto de las veces que se seleccione el tab muestra la data que ya tiene cargada.
    */
    establecimientoNominalView.prototype.loadPrestacionesTab = function (selectedTabPanelId) {
        var tabPrestaciones = this.findTab("panelId", selectedTabPanelId);
        if (common.isEmpty(tabPrestaciones.isLoaded) || !tabPrestaciones.isLoaded) {
            tabPrestaciones.view.model.load(this.codigoEstablecimiento);
            tabPrestaciones.isLoaded = true;
        }
        $(this.getViewSelector()).addClass("consultaNominalEstablecimiento");
    };
	
    /**
    * Carga la data del tab de camas de un establecimiento cuando el usuario hace clic sobre el mismo.
    * Lo hace una vez y el resto de las veces que se seleccione el tab muestra la data que ya tiene cargada.
    */
    establecimientoNominalView.prototype.loadCamasTab = function (selectedTabPanelId) {
        var tabCamas = this.findTab("panelId", selectedTabPanelId);
        if (common.isEmpty(tabCamas.isLoaded) || !tabCamas.isLoaded) {
            tabCamas.view.model.load(this.codigoEstablecimiento);
            tabCamas.isLoaded = true;
        }
        $(this.getViewSelector()).addClass("consultaNominalEstablecimiento");
    };
	
    /**
    * Obtiene el modelo de coordenadas a partir del modelo de establecimiento nominal.
    */
    establecimientoNominalView.prototype.getCoordenadasMapaModel = function () {
        var tabGeneral = this.findTab("panelId", "establecimientoGeneral");
        return tabGeneral.view.model.get("coordenadasDeMapa");
    };
	
	return establecimientoNominalView;
}(af, AppFrameworkRenderer, BaseView, EstablecimientoNominalGeneralView, GoogleMapView, PrestacionCollectionView, CamasCollectionView));