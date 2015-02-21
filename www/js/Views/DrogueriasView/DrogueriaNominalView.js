var DrogueriaNominalView = (function ($, renderer, BaseView, DrogueriaNominalGeneralView, GoogleMapView) {
    "use strict";
    
    var drogueriaNominalView = TabPanelView.extend({
        tagName: 'div',
        className: 'panel consulta-detallada',
        
        attributes: {
            'id': 'resultadoConsultaNominalDrogueria',
            'data-nav': 'consultas_nav'
        },
        
        codigoDrogueria: null,

        setCodigoDrogueria: function (codigoDrogueria) {
            this.codigoDrogueria = codigoDrogueria;
        },
        
        getCodigoDrogueria: function (codigoDrogueria) {
            return this.codigoDrogueria;
        },

        tabsConfig: [
            {
                tabName: "<img src='./img/pestanas/accesosA_general-24-px.png'>",
                panelId: "drogueriaGeneral",
                viewClass: DrogueriaNominalGeneralView,
                modelClass: DrogueriaNominal
            },
            {
                tabName: "<img src='./img/pestanas/accesosA_mapa-24-px.png'>",
                panelId: "drogueriaMapas",
                viewClass: GoogleMapView,
                esMapa: true
            }
        ],
        
        ejecutarConsultaNominalDrogueria: function (codigoDrogueria) {
            this.codigoDrogueria = codigoDrogueria;
            var tabGeneral = this.findTab("panelId", "drogueriaGeneral");
            tabGeneral.view.model.load(this.codigoDrogueria);
        },
        
		initialize: function (attributes, options) {
            options = options || {};
            options.renderer = renderer;
            this.setCodigoDrogueria(attributes.codigo);
            TabPanelView.prototype.initialize.call(this, attributes, options);
            
            this.findTab("panelId", "drogueriaGeneral").filtroConsulta = _.bind(this.getCodigoDrogueria, this);
            var mapaDrogueriaTab = this.findTab("panelId", "drogueriaMapas");
            mapaDrogueriaTab.onViewRenderedHandler = _.bind(this.onGoogleMapViewRendered, this);
            mapaDrogueriaTab.modelClass = this.getCoordenadasMapaModel();
            
            this.idImagen = 'imagenDroguerias';
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
    drogueriaNominalView.prototype.getViewByName = function (viewName) {
        var tab = this.findTab("tabName", viewName);
        return tab.view;
    };
    
    drogueriaNominalView.prototype.renderSelectedTab = function (args) {
        //Si se hizo clic en el tab de mapas, se carga el mapa
        if (!common.isEmpty(args)) {
            var selectedTabPanelId = common.trimLeft(args.currentTarget.getAttribute("href"), "#");
            if (selectedTabPanelId === "drogueriaMapas") {
                var tabMapa = this.findTab("panelId", selectedTabPanelId);
                $.ui.loadContent(tabMapa.view.attributes.id, false, false, "pop");
            }
        } else {
            //Cuando se carga el tab panel view por primera vez, después de inicializar el mapa, viene por este laod.
            TabPanelView.prototype.renderSelectedTab.call(this, args);
        }
        $("#" + this.attributes.id).addClass("consultaNominalDrogueria");
    };
    
    /**
    * Obtiene el modelo de coordenadas a partir del modelo de drogueria nominal.
    */
    drogueriaNominalView.prototype.getCoordenadasMapaModel = function () {
        var tabGeneral = this.findTab("panelId", "drogueriaGeneral");
        return tabGeneral.view.model.get("coordenadasDeMapa");
    };
    
    drogueriaNominalView.prototype.onGoogleMapViewRendered = function () {

        if (this.selectedTab.panelId === "drogueriaMapas") {
            var tabMapa = this.findTab("panelId", "drogueriaMapas");
            $.ui.loadContent(tabMapa.view.getViewId(), false, false, "pop");
            return;
        }
    };
	
	return drogueriaNominalView;
}(af, AppFrameworkRenderer, BaseView, DrogueriaNominalGeneralView, GoogleMapView));
