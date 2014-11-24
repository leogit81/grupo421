var DrogueriasCercanasView = (function ($, renderer, TabPanelView, GeorefesDrogueriasCollectionView, GeorefesDrogueriasCollection, GoogleMapView) {
    "use strict";
    
    var drogueriasCercanasView = TabPanelView.extend({
        tagName: 'div',
        className: 'panel consulta-detallada',
                                                         
        attributes: {
            'id': 'resultadoConsultaDrogueriasCercanas',
            'data-nav': 'consultas_nav'
        },
        
        tabsConfig: [
            {
                //tabName: "Droguerias",
                tabName: "<img src='./img/pestanas/accesosA_general-24-px.png'>",
                panelId: "drogueriasCercanas",
                viewClass: GeorefesDrogueriasCollectionView,
                modelClass: GeorefesDrogueriasCollection
            },
            {
                //tabName: "Mapa",
                tabName: "<img src='./img/pestanas/accesosA_mapa-24-px.png'>",
                panelId: "drogueriasCercanasMapa",
                viewClass: GoogleMapView,
                esMapa: true,
            }
        ],
        
        filtrosServicio: null,
        
        getFiltrosServicio: function () {
            return this.filtrosServicio;
        },
        
        setFiltrosServicio: function (filtrosServicio) {
             this.filtrosServicio = filtrosServicio;
        },
        
		initialize: function (attributes, options) {
            options = options || {};
            options.renderer = renderer;
            this.setFiltrosServicio(attributes.filtrosServicio);
            TabPanelView.prototype.initialize.call(this, attributes, options);
            
            this.findTab("panelId", "drogueriasCercanas").filtroConsulta = _.bind(this.getFiltrosServicio, this);
            this.setCoordenadasModel(attributes.filtrosServicio.latitud, attributes.filtrosServicio.longitud);
        },
        
        /**
        * Setea en un modelo la latitud y la longitud del dispositivo.
        */
        setCoordenadasModel: function (latitud, longitud) {
            var coordenadasModel = this.getCoordenadasMapaModel();
            coordenadasModel.latitud = latitud;
            coordenadasModel.longitud = longitud;
            coordenadasModel.nivelZoom = 14;
        },
        
        /**
        * Devuelve el model asociado a la vista, que se muestra en uno de los tabs.
        * @param {String} tabName, nombre del tab, a partir de este se obtiene el modelo
        */
        getModelOrDefault: function (tabName) {
            var tab = this.findTab("tabName", tabName);
            return tab.view.model;
        },
        
        /**
        * Obtiene el modelo de coordenadas de mapa que tiene la información de posición
        * de los establecimientos y del dispositivo.
        */
        getCoordenadasMapaModel: function () {
            var tabDrogueriasCercanas = this.findTab("panelId", "drogueriasCercanas");
            return tabDrogueriasCercanas.view.model;
        },
        
        loadMapaView: function () {
            TabPanelView.prototype.loadMapaView.call(this, true);
        },
	});
	
	return drogueriasCercanasView;
}(af, AppFrameworkRenderer, TabPanelView, GeorefesDrogueriasCollectionView, GeorefesDrogueriasCollection, GoogleMapView));