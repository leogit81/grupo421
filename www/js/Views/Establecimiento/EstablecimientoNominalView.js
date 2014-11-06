var EstablecimientoNominalView = (function ($, renderer, BaseView, EstablecimientoNominalGeneralView, GoogleMapView, PrestacionCollectionView) {
    "use strict";
    
    var establecimientoNominalView = TabPanelView.extend({
        tagName: 'div',
        className: 'panel consulta-detallada',
                                                         
        attributes: {
            'id': 'resultadoConsultaNominalEstablecimiento',
            'data-title': 'Consulta Nominal de Establecimiento',
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
            }
        ],
        
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
            TabPanelView.prototype.initialize.call(this, attributes, options);
            
            this.findTab("panelId", "establecimientoGeneral").filtroConsulta = _.bind(this.getCodigoEstablecimiento, this);
            this.findTab("panelId", "establecimientoPrestaciones").filtroConsulta = _.bind(this.getCodigoEstablecimiento, this);
            var mapaEstablecimientoTab = this.findTab("panelId", "establecimientoMapas");
            mapaEstablecimientoTab.onViewRenderedHandler = _.bind(this.onGoogleMapViewRendered, this);
            mapaEstablecimientoTab.modelClass = this.getCoordenadasMapaModel();
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
    
    establecimientoNominalView.prototype.onGoogleMapViewRendered = function () {
        //Si se hizo clic en el tab de mapas, se carga el mapa de forma diferente, no se muestra dentro del tab
        /*var selectedTabPanelId = null;
        
        if (!common.isEmpty(args) && !common.isEmpty(args.currentTarget)) {
            selectedTabPanelId = common.trimLeft(args.currentTarget.getAttribute("href"), "#");
        }*/

        if (this.selectedTab.panelId === "establecimientoMapas") {
            var tabMapa = this.findTab("panelId", "establecimientoMapas");
            $.ui.loadContent(tabMapa.view.getViewId(), false, false, "pop");
            return;
        }/* else if (selectedTabPanelId === "establecimientoPrestaciones") {
            var tabPrestaciones = this.findTab("panelId", selectedTabPanelId);
            if (common.isEmpty(tabPrestaciones.isLoaded) || !tabPrestaciones.isLoaded) {
                this.loadPrestacionesTab(selectedTabPanelId);
                tabPrestaciones.isLoaded = true;
            }
        }*/
        //Cuando se carga el tab panel view por primera vez, después de inicializar el mapa, viene por este load.
        //TabPanelView.prototype.onViewRendered.call(this);
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
    * Obtiene el modelo de coordenadas a partir del modelo de establecimiento nominal.
    */
    establecimientoNominalView.prototype.getCoordenadasMapaModel = function () {
        var tabGeneral = this.findTab("panelId", "establecimientoGeneral");
        return tabGeneral.view.model.get("coordenadasDeMapa");
    };
	
	return establecimientoNominalView;
}(af, AppFrameworkRenderer, BaseView, EstablecimientoNominalGeneralView, GoogleMapView, PrestacionCollectionView));