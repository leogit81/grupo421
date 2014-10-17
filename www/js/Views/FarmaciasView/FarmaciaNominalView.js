var FarmaciaNominalView = (function ($, renderer, BaseView, FarmaciaNominalGeneralView, GoogleMapView) {
    "use strict";
    
    var farmaciaNominalView = TabPanelView.extend({
        tagName: 'div',
        className: 'panel consulta-detallada',
        
        attributes: {
            'id': 'resultadoConsultaNominalFarmacia',
            'data-title': 'REFAR',
            'data-nav': 'consultas_nav'
        },
        
        codigoFarmacia: null,
        
        tabs: [
            {
                tabName: "General",
                panelId: "farmaciaGeneral",
                viewClass: FarmaciaNominalGeneralView,
                modelClass: FarmaciaNominal
            },
//            {
//                tabName: "Prestaciones",
//                panelId: "establecimientoPrestaciones",
//                viewClass: BaseView,
//                modelClass: BaseModel
//            },
//            {
//                tabName: "Imágenes",
//                panelId: "establecimientoImagenes",
//                viewClass: BaseView,
//                modelClass: BaseModel
//            },
            {
                tabName: "Mapas",
                panelId: "farmaciaMapas",
                viewClass: GoogleMapView,
                modelClass: function (scope) {
                    var tabGeneral = scope.findTab("panelId", "farmaciaGeneral");
                    return tabGeneral.view.model.get("coordenadasDeMapa");
                }
            }
        ],
        
        ejecutarConsultaNominalFarmacia: function (codigoFarmacia) {
            this.codigoFarmacia = codigoFarmacia;
            var tabGeneral = this.findTab("panelId", "farmaciaGeneral");
            tabGeneral.view.model.load(this.codigoFarmacia);
        },
        
		initialize: function (attributes, options) {
            options = options || {};
            options.renderer = renderer;
            TabPanelView.prototype.initialize.call(this, attributes, options);
        },
        
        /*mostrarTabEstablecimientoGeneral: function () {
            var tabGeneral = this.findTab("panelId", "establecimientoGeneral");
            tabGeneral.view.model.load(this.codigoEstablecimiento);
        },*/
        
        /**
        * Setea el modelo para la vista y también actualiza los modelos de las vistas de los tabs.
        */
        setModel: function (model) {
            //TabPanelView.prototype.setModel.call(this, model);
            
            //var establecimientoModel = this.getModelOrDefault("General");
            this.getViewByName("General").setModel(model);
            
            this.getViewByName("Mapas").setModel(model.get("coordenadasDeMapa"));
            
            /*var coordenadasModel = this.getModelOrDefault("coordenadasDeMapa");
            this.getViewByName("coordenadasDeMapa").setModel(coordenadasModel);
            
            var domicilioModel = this.getModelOrDefault("domicilio");
            this.getViewByName("domicilio").setModel(domicilioModel);
            
            var participacionesModel = this.getModelOrDefault("participaciones");
            this.getViewByName("participaciones").setModel(participacionesModel);
            
            var telefonoModel1 = this.getModelOrDefault("telefono1");
            this.getViewByName("telefono1").setModel(telefonoModel1);
            
            var telefonoModel2 = this.getModelOrDefault("telefono2");
            this.getViewByName("telefono2").setModel(telefonoModel2);
            
            var telefonoModel3 = this.getModelOrDefault("telefono3");
            this.getViewByName("telefono3").setModel(telefonoModel3);
            
            var telefonoModel4 = this.getModelOrDefault("telefono4");
            this.getViewByName("telefono4").setModel(telefonoModel4);*/
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
    farmaciaNominalView.prototype.getViewByName = function (viewName) {
        var tab = this.findTab("tabName", viewName);
        return tab.view;
    };
    
    /*establecimientoNominalView.prototype.render = function (viewName) {
        TabPanelView.prototype.render.call(this);
        $("#" + this.attributes.id).addClass("consultaNominalEstablecimiento");
    };*/
    
    farmaciaNominalView.prototype.renderSelectedTab = function (args) {
        //Si se hizo clic en el tab de mapas, se carga el mapa
        if (!common.isEmpty(args)) {
            var selectedTabPanelId = common.trimLeft(args.currentTarget.getAttribute("href"), "#");
            if (selectedTabPanelId === "farmaciaMapas") {
                var tabMapa = this.findTab("panelId", selectedTabPanelId);
                $.ui.loadContent(tabMapa.view.attributes.id, false, false, "pop");
            }
        } else {
            //Cuando se carga el tab panel view por primera vez, después de inicializar el mapa, viene por este laod.
            TabPanelView.prototype.renderSelectedTab.call(this, args);
        }
        $("#" + this.attributes.id).addClass("consultaNominalFarmacia");
    };
	
	return farmaciaNominalView;
}(af, AppFrameworkRenderer, BaseView, FarmaciaNominalGeneralView, GoogleMapView));