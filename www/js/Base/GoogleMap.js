function GoogleMap(listaEstablecimiento) {
    'use strict';

    /**
    * Obtiene la posición del dispositivo y muestra un mapa centrado en esta.
    * Además le agrega los marcados para las coordenadas de la lista de establecimientos,
    * que se pasó como argumento al constructo del GoogleMap.
    */
    this.obtenerPosicionYMostrarMapa = function () {
        this.getPosicion(onSuccessPosicion);
    };

    this.getPosicion = function (successCallback) {
        successCallback = successCallback || onSuccessPosicion;
        Geolocation.obtenerPosicion(successCallback);
    };

    this.onSuccessPosicion = function (position, htmlElement) {
        var mapBounds = new google.maps.LatLngBounds(),
            //longitud = position.coords.longitude,
            //latitud = position.coords.latitude,
            latLong = new google.maps.LatLng(position.latitud, position.longitud),
            miPosicion = latLong,
            map = this.showMap(latLong, htmlElement, 14);
        mapBounds.extend(miPosicion);
        this.addMarkersToMapMiPosicion(map, miPosicion);
        var i;
        for (i = 0; i < listaEstablecimiento.length; i++) {
            this.addMarkersToMapEstablecimiento(map, mapBounds, listaEstablecimiento[i]);
            //            mapBounds.extend(latLong);
        }
        map.fitBounds(mapBounds);
        //map.center(miPosicion.B, miPosicion.k);
        var listener = google.maps.event.addListenerOnce(map, "idle", function () {
            if (map.getZoom() > 16) {
                map.setZoom(16);
            };
        });
        //af.trigger(this,"mapa_listo");

        //        setTimeout( function () { 
        //            google.maps.event.trigger(map, 'resize');
        //            //            map.setCenter(latLong);
        //            //            map.setZoom(14);
        //        }, 2500 );
        $("#afui").undelegate("#linkConsultaNominalEstablecimiento", "click").delegate("#linkConsultaNominalEstablecimiento", "click", this.ejecutarNominal);
        return map;
    };

    this.addMarkersToMapMiPosicion = function (map, miPosicion) {
        var icono = '../img/iconos/tab_2.png';
        var markerOne = new google.maps.Marker({
            position: miPosicion,
            map: map,
            animation: google.maps.Animation.DROP
        });

    };

    this.addMarkersToMapEstablecimiento = function (map, mapBounds, establecimiento) {
        var latLong = new google.maps.LatLng(establecimiento.coordenadasDeMapa.latitud, establecimiento.coordenadasDeMapa.longitud);

        //var latitudeAndLongitudeOne = new google.maps.LatLng('-33.890542','151.274856');
        var icono = '../img/iconos/tab_2.png';
        var markerOne = new google.maps.Marker({
            //position: latitudeAndLongitudeOne,
            position: latLong,
            map: map,
            animation: google.maps.Animation.DROP
            //icon: icono,
            //draggable: true,
        });
        mapBounds.extend(latLong);
        var template = _.template("<a id='linkConsultaNominalEstablecimiento'><span class='codigoEstablecimiento' style='display:none;'><%=codigo%></span><span class='znombreMapa'><%=nombre%></span></a>");

        var infowindow = new google.maps.InfoWindow({content: template(establecimiento)});
        google.maps.event.addListener(markerOne, 'click', function () {
            infowindow.open(map, markerOne);
        });

    };

    this.ejecutarNominal = function (eventData) {
        var establecimientoNominal = new EstablecimientoCollectionView();
        establecimientoNominal.busquedaNominalEstablecimiento(eventData);
    };

    /**
    * Muestra el mapa en el elemento html proporcionado.
    * @param {google.maps.LatLng} posicion, posición donde se centrará el mapa.
    * @param {HTMLElement} htmlElement, elemento del DOM donde insertar el mapa.
    */
    this.showMap = function (posicion, htmlElement, nivelZoom) {
        var mapOptions = {
            zoom: nivelZoom,
            center: posicion,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: true,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
            }
        },
            //map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
            map = new google.maps.Map(htmlElement, mapOptions);

        return map;
    };

    /**
        * Muestra el mapa en el elemento html proporcionado.
        * @param {HTMLElement} htmlElement, elemento del DOM donde insertar el mapa.
        */
    //    this.mostrarMapaEstablecimiento = function (model, htmlElement) {
    //        if ((listaEstablecimiento !== undefined || listaEstablecimiento !== null) && listaEstablecimiento.length > 0) {
    //            var establecimiento = listaEstablecimiento[0],
    //                latLong = new google.maps.LatLng(establecimiento.latitud, establecimiento.longitud),
    //                mapBounds = new google.maps.LatLngBounds();
    //
    //            var nivelZoom = model.get("nivelZoom");
    //            var map = this.showMap(latLong, htmlElement, nivelZoom);
    //            mapBounds.extend(latLong);
    //            this.addMarkersToMap(map, latLong);
    //
    //            //map.fitBounds(mapBounds);
    //            //map.center(miPosicion.B, miPosicion.k);
    //            var listener = google.maps.event.addListenerOnce(map, "idle", function () {
    //                if (map.getZoom() > 16) {
    //                    map.setZoom(16);
    //                };
    //            });
    //        }
    //
    //        //model.trigger("mapaFinalizado");
    //        setTimeout( function () { 
    //            google.maps.event.trigger(map, 'resize');
    //            map.setCenter(latLong);
    //            map.setZoom(nivelZoom);
    //        }, 2500 );
    //    };

    this.loadMap = function (position, htmlElement) {
        this.onSuccessPosicion(position, htmlElement);
    };
}