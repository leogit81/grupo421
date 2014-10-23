/**
 * Aplicación PhoneGap. Cuando se inicializa la misma se bindean los eventos, el más importante de ellos es deviceready.
 * Una vez que se produjo este quiere decir que se puede llamar con seguridad a las funciones de la API de PhoneGap. 
 */
var app = (function ($, jquery, logger) {
    "use strict";
    
    /**
    * Indica si la aplicación tiene disponible conexión a Internet o no.
    */
    var appStatus = null;
    
    //False para que App Framework no utilice el theme por defecto del dispositivo. Se fuerza un theme en index.html
    $.ui.useOSThemes = false;

    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    function bindEvents() {
        document.addEventListener('deviceready', onDeviceReady, false);
        document.addEventListener('offline', onDeviceOffline, false);
        document.addEventListener('online', onDeviceOnline, false);
    }

    function initialize() {
        bindEvents();
    }

    // deviceready Event Handler
    //
    // The scope of 'this' is the event.
    function onDeviceReady() {
        loadApp();
    }
    
    function onDeviceOffline() {
        logger.log({status: 0, statusText: "offline"});
        appStatus = "offline";
    }
    
    function onDeviceOnline() {
        logger.log({status: 0, statusText: "online"});
        appStatus = "online";
    }
    
    function loadApp() {
        launchAppFramework();
        $("div#header").on("click", "a#menubadge", onClickMenuBadge);
        var consultasView = ConsultasView.getInstance();
        consultasView.render();
        
        //es para ocultar la máscara de Cargando... cuando se hace click en el botón "Atrás"
        $("#afui").delegate("a.backButton", "click", function (e) { af.ui.hideMask(); });
        
        //Se agrega este "parche" para evitar que se duplique el evento click/tap al hacer un click.
        var last_click_time = new Date().getTime();
        var click_time;
        document.addEventListener('click', function (e) {
            click_time = e['timeStamp'];
            if (click_time && (click_time - last_click_time) < 550) {
                e.stopImmediatePropagation();
                e.preventDefault();
                return false;
            }
            last_click_time = click_time;
        }, true);
    }

    /**
     * Se ejecuta al hacer click en el icono de las tres rayitas que muestra el menú lateral.  
     */
    function onClickMenuBadge() {
        af.ui.toggleSideMenu();
    }

    function launchAppFramework() {
        resolverConflictos();
//        $.ui.scrollingDivs.menu_scroller.disable();
        $.ui.disableNativeScrolling();
        
        $.ui.launch();
        $.ui.disableSplitView();
        $.ui.removeFooterMenu();
        $.ui.updateBadge("#afui", "3", "tr");
        //Esta línea es para ocultar un div footer que contiene al menu, y que a pesar de moverlo
        //con el método removeFooterMenu, seguía mostrandose.
        $("div#navbar.footer").css("display", "none");
        //esto cambia el texto del backbutton para todos los paneles de la aplicación
        $.ui.backButtonText = "Atrás";
        //$.touchLayer($("#afui").get(0));
    }

    /**
     * Resuelve conflictos que pudiera haber entre el appframework y jQuery con la variable $ en el espacio de nombres global. 
     */
    function resolverConflictos() {
        if (jQuery != undefined){
            jQuery.noConflict();

            if ($ != af) {
                $ = af;
            }
        }
    }

    return {
        onDeviceReady: onDeviceReady,
        initialize: initialize
    };
})(af, jQuery, Logger);