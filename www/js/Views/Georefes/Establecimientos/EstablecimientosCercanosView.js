var EstablecimientosCercanosView = (function ($, renderer, TabPanelView, GeorefesEstablecimientoCollectionView, GeorefesEstablecimientoCollection, GoogleMapView) {
    "use strict";
    
    var establecimientosCercanosView = TabPanelView.extend({
        tagName: 'div',
        className: 'panel consulta-detallada',
                                                         
        attributes: {
            'id': 'resultadoConsultaEstablecimientosCercanos',
            'data-nav': 'consultas_nav'
        },
        
        tabsConfig: [
            {
                tabName: "<img src='./img/pestanas/accesosA_general-24-px.png'>",
                panelId: "establecimientosCercanos",
                viewClass: GeorefesEstablecimientoCollectionView,
                modelClass: GeorefesEstablecimientoCollection
            },
            {
                tabName: "<img src='./img/pestanas/accesosA_mapa-24-px.png'>",
                panelId: "establecimientosCercanosMapa",
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
            
            this.findTab("panelId", "establecimientosCercanos").filtroConsulta = _.bind(this.getFiltrosServicio, this);
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
            var tabEstablecimientosCercanos = this.findTab("panelId", "establecimientosCercanos");
            return tabEstablecimientosCercanos.view.model;
        },
        
        loadMapaView: function () {
            TabPanelView.prototype.loadMapaView.call(this, true);
        },
	});
	
	return establecimientosCercanosView;
}(af, AppFrameworkRenderer, TabPanelView, GeorefesEstablecimientoCollectionView, GeorefesEstablecimientoCollection, GoogleMapView));