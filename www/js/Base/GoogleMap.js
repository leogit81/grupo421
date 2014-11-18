function GoogleMap(listaEstablecimiento) {
    'use strict';
    
    this.listaEstablecimientos = listaEstablecimiento;
    
    /**
    * Obtiene la posición del dispositivo y muestra un mapa centrado en esta.
    * Además le agrega los marcados para las coordenadas de la lista de establecimientos,
    * que se pasó como argumento al constructo del GoogleMap.
    */
    this.obtenerPosicionYMostrarMapa = function () {
        var options =  { maximumAge: 3000, timeout: 3000, enableHighAccuracy: true };
        this.getPosicion(onSuccessPosicion, onErrorPosicion, options);
    };

    this.getPosicion = function (successCallback, errorCallback, options) {
        errorCallback = errorCallback || onErrorPosicion;
        successCallback = successCallback || onSuccessPosicion;
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
    };

    function onSuccessPosicion (position) {
        var mapBounds = new google.maps.LatLngBounds(),
            longitud = position.coords.longitude,
            latitud = position.coords.latitude,
            latLong = new google.maps.LatLng(latitud, longitud),
            miPosicion = latLong,
            map = showMap(latLong);
        mapBounds.extend(latLong);
        this.addMarkersToMap(map, latLong);
        var i;
        for (i = 0; i < listaEstablecimiento.length; i++) {
            latLong = new google.maps.LatLng(listaEstablecimiento[i].latitud, listaEstablecimiento[i].longitud);
            this.addMarkersToMap(map, latLong);
            mapBounds.extend(latLong);
        }
        //map.fitBounds(mapBounds);
        //map.center(miPosicion.B, miPosicion.k);
        var listener = google.maps.event.addListenerOnce(map, "idle", function () {
            if (map.getZoom() > 16) {
                map.setZoom(16);
            };
        });
        //af.trigger(this,"mapa_listo");
    };

    function onErrorPosicion (error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    };

    this.addMarkersToMap = function (map, latLong) {


        //var latitudeAndLongitudeOne = new google.maps.LatLng('-33.890542','151.274856');
        var icono = '../img/iconos/tab_2.png';
        var markerOne = new google.maps.Marker({
            //position: latitudeAndLongitudeOne,
            position: latLong,
            map: map,
            animation: google.maps.Animation.DROP,
            title: 'HOLA',
            //icon: icono,
            //draggable: true,
        });
        var infowindow = new google.maps.InfoWindow({
            content: "<a id='linkConsultaMinisterio' class='item_menu' href='linkConsultaMinisterio'><img src='./img/iconos/tab_9.png'><div class='ztexto-lista'>Ministerio</div></a>" //contentString
        });
        google.maps.event.addListener(markerOne, 'click', function () {
            infowindow.open(map, markerOne);
        });

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
    this.mostrarMapaEstablecimiento = function (model, htmlElement) {
        if ((listaEstablecimiento !== undefined || listaEstablecimiento !== null) && listaEstablecimiento.length > 0) {
            var establecimiento = listaEstablecimiento[0],
                latLong = new google.maps.LatLng(establecimiento.latitud, establecimiento.longitud),
                mapBounds = new google.maps.LatLngBounds();

            var nivelZoom = model.get("nivelZoom");
            var map = this.showMap(latLong, htmlElement, nivelZoom);
            mapBounds.extend(latLong);
            this.addMarkersToMap(map, latLong);

            //map.fitBounds(mapBounds);
            //map.center(miPosicion.B, miPosicion.k);
            var listener = google.maps.event.addListenerOnce(map, "idle", function () {
                if (map.getZoom() > 16) {
                    map.setZoom(16);
                };
            });
        }

        //model.trigger("mapaFinalizado");
        setTimeout( function () { 
            google.maps.event.trigger(map, 'resize');
            map.setCenter(latLong);
            map.setZoom(nivelZoom);
        }, 2500 );
    };
}