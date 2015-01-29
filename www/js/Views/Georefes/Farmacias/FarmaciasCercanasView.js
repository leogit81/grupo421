var FarmaciasCercanasView = (function ($, renderer, TabPanelView, GeorefesFarmaciaCollectionView, GeorefesFarmaciaCollection, GoogleMapView) {
    "use strict";
    
    var farmaciasCercanaView = TabPanelView.extend({
        tagName: 'div',
        className: 'panel consulta-detallada',
                                                         
        attributes: {
            'id': 'resultadoConsultaFarmaciasCercanas',
            'data-nav': 'consultas_nav'
        },
        
        tabsConfig: [
            {
                //tabName: "Farmacias",
                tabName: "<img src='./img/pestanas/accesosA_general-24-px.png'>",
                panelId: "farmaciasCercanas",
                viewClass: GeorefesFarmaciaCollectionView,
                modelClass: GeorefesFarmaciaCollection
            },
            {
                //tabName: "Mapa",
                tabName: "<img src='./img/pestanas/accesosA_mapa-24-px.png'>",
                panelId: "farmaciasCercanasMapa",
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
            
            this.idImagen = 'imagenGeorefes';
            
            TabPanelView.prototype.initialize.call(this, attributes, options);
            
            this.findTab("panelId", "farmaciasCercanas").filtroConsulta = _.bind(this.getFiltrosServicio, this);
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
            var tabFarmciasCercanas = this.findTab("panelId", "farmaciasCercanas");
            return tabFarmciasCercanas.view.model;
        },
        
        loadMapaView: function () {
            TabPanelView.prototype.loadMapaView.call(this, true);
        },
	});
	
	return farmaciasCercanaView;
}(af, AppFrameworkRenderer, TabPanelView, GeorefesFarmaciaCollectionView, GeorefesFarmaciaCollection, GoogleMapView));