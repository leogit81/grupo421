/**
* Encapsula la lógica para crear el mapa usando la api de Google maps.
* Recibe un argumento que es una lista de coordenadas, que se usaran para agregar marcadores al mapa.
* Utilizado en la consulta de georefes para pasarle un array con la lista de establecimientos cercanos
* y las coordenadas de cada una para ubicarlos alrededor de la posición del dispositivo.
*/
function GoogleMap(listaEstablecimiento) {
    'use strict';

    /**
    * Instancia de google.maps.LatLng con la latitud y longitud donde se centra el mapa.
    */
    var centerLatLong = null;
    /**
    * Instancia de google.maps.Map que utiliza en forma interna la clase GoogleMap
    */
    var googleMap = null;
    /**
    * Nivel de zoom que se aplicará sobre el mapa
    */
    var nivelZoom = 14;

    this.setNivelZoom = function (zoom) {
        nivelZoom = zoom;
    };

    this.getNivelZoom = function (zoom) {
        return nivelZoom;
    };
    /*
    * Instancia de google.maps.LatLngBounds. Fija los límites del mapa.
    */
    var mapBounds = null;
    /**
    * Templata para las infor window que se agregan a los marcadores del mapa.
    */
    var template = _.template("<a id='linkConsultaNominalEstablecimiento'><span class='codigoEstablecimiento' style='display:none;'><%=codigo%></span><span class='znombreMapa'><%=nombre%></span></a>");

    /**
    * Obtiene la posición del dispositivo y muestra un mapa centrado en esta.
    * Además le agrega los marcados para las coordenadas de la lista de establecimientos,
    * que se pasó como argumento al constructo del GoogleMap.
    */
    this.obtenerPosicionYMostrarMapa = function () {
        this.getPosicion(onSuccessPosition);
    };

    this.getPosicion = function (successCallback) {
        successCallback = successCallback || onSuccessPosition;
        Geolocation.obtenerPosicion(successCallback);
    };

    this.onSuccessPosition = function (position) {
        var htmlElement = jQuery("#map_canvas");
        this.loadMap(position, htmlElement, true);
    };

    this.addMarkersListaCoordenadasToMap = function () {
        var i;
        for (i = 0; i < listaEstablecimiento.length; i++) {
            this.addMarkerEstablecimientoToMap(listaEstablecimiento[i]);
        }

        googleMap.fitBounds(mapBounds);

        var listener = google.maps.event.addListenerOnce(googleMap, "idle", function () {
            if (googleMap.getZoom() > 16) {
                googleMap.setZoom(16);
            };
        });
    };

    /**
    * Agrega un marcador al mapa para la posición en la cual fue centrado cuando se lo creo.
    * @param {Boolean} esUbicacionDispositivo, true, agrega el marcador con un color diferente,
    * para diferenciarlo del resto de los marcadores.
    */
    this.addMarkerCenterPositionToMap = function (esUbicacionDispositivo) {
        //cambiar el ícono y color de marcador
        //http://stackoverflow.com/questions/7095574/google-maps-api-3-custom-marker-color-for-default-dot-marker
        var markerOptions = {
            position: centerLatLong,
            map: googleMap,
            animation: google.maps.Animation.DROP
        };

        if (esUbicacionDispositivo){
            var pinColor = "4169e1";
            var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
                                                       new google.maps.Size(21, 34),
                                                       new google.maps.Point(0,0),
                                                       new google.maps.Point(10, 34));
            markerOptions.icon = pinImage;
        }

        var markerOne = new google.maps.Marker(markerOptions);
    };

    this.addMarkerEstablecimientoToMap = function (establecimiento) {
        var latLong = new google.maps.LatLng(establecimiento.coordenadasDeMapa.latitud, establecimiento.coordenadasDeMapa.longitud);

        var markerOne = new google.maps.Marker({
            position: latLong,
            map: googleMap,
            animation: google.maps.Animation.DROP
        });

        mapBounds.extend(latLong);
        this.addInfoWindowToMarker(template(establecimiento), markerOne);
    };

    /**
    * Agrega una info window al marcador.
    * @param {string} content, html para el contenido de la info window
    * @param {google.maps.Marker} marker, es el marcador para el cual se quiere agregar la info. window.
    */
    this.addInfoWindowToMarker = function (content, marker) {
        var infowindow = new google.maps.InfoWindow({content: content});

        google.maps.event.addListener(marker, 'click', function () {
            infowindow.open(googleMap, marker);
        });
    };

    this.ejecutarNominal = function (eventData) {
        //Obtener el código para determinar si la consulta nominal es de establecimiento, farmacia o droguería
        var codigoEstablecimiento = common.trim($(eventData.currentTarget.outerHTML).find("span.codigoEstablecimiento").html());

        if (codigoEstablecimiento.substr(0,1) == '1' || codigoEstablecimiento.substr(0,1) == '5') {
            var establecimientoNominal = new EstablecimientoCollectionView();
            establecimientoNominal.busquedaNominalEstablecimiento(eventData);
        }
        else if (codigoEstablecimiento.substr(0,2) == '70') {
            var farmaciaNominal = new FarmaciaCollectionView();
            farmaciaNominal.busquedaNominalFarmaciaGeorefes(codigoEstablecimiento);
        }
        else if (codigoEstablecimiento.substr(0,2) == '71') {
            var drogueriaNominal = new DrogueriaCollectionView();
            drogueriaNominal.busquedaNominalDrogueriaGeorefes(codigoEstablecimiento);
        }
    };

    /**
    * Muestra el mapa en el elemento html proporcionado.
    * @param {Object} posicion, objeto con latitud y longitud donde se centrará el mapa.
    * @param {HTMLElement} htmlElement, elemento del DOM donde insertar el mapa.
    * @param {int} nivelZoom, el nivel de zoom que se hará sobre el mapa.
    */
    this.createGoogleMap = function (posicion, htmlElement) {
        centerLatLong  = new google.maps.LatLng(posicion.latitud, posicion.longitud);
        var mapOptions = {
            zoom: nivelZoom,
            center: centerLatLong,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: true,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
            }
        };
        googleMap = new google.maps.Map(htmlElement, mapOptions);
    };

    /**
    * El 3° parámetro es un flag que indica si la centerPosicion es la ubicación
    * del dispositivo. En caso de ser true, se pinta el marcador para la ubicación
    * actual con un color azul, para diferencialo del resto.
    */
    this.loadMap = function (position, htmlElement, esUbicacionDispositivo) {
        this.createGoogleMap(position, htmlElement);
        mapBounds = new google.maps.LatLngBounds();        
        mapBounds.extend(centerLatLong);
        this.addMarkerCenterPositionToMap(esUbicacionDispositivo);
        this.addMarkersListaCoordenadasToMap();
        $("#afui").undelegate("#linkConsultaNominalEstablecimiento", "click").delegate("#linkConsultaNominalEstablecimiento", "click", this.ejecutarNominal);
        return googleMap;
    };
}