/*Variable global para el slider de noticias*/
var owl;

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

    $.ui.useOSThemes = false; /*False para que App Framework no utilice el theme por defecto del dispositivo. Se fuerza un theme en index.html*/

    $.ui.autoLaunch = false; /*Deshabilitar el inicio automático de intel app framework*/

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
    function onDeviceOffline() {
        logger.log({status: 0, statusText: "offline"});
        appStatus = "offline";
    }

    function onDeviceOnline() {
        logger.log({status: 0, statusText: "online"});
        appStatus = "online";
    }

    function onDeviceReady(){
        loadApp();
    };

    function loadApp () {
        launchAppFramework();
        launchNoticiasSlider();
        $("div#header").on("click", "a#menubadge", onClickMenuBadge);
        var consultasView = ConsultasView.getInstance();
        consultasView.render();

        //es para ocultar la máscara de Cargando... cuando se hace click en el botón "Atrás"
        $("#afui").delegate("a.backButton", "click", onClickBackButtonHandler);
        $("#afui").delegate("a.button.icon.close", "click", onClickCloseButtonHandler);
        $("#afui").delegate("#loginButton", "click", onClickLoginButtonHandler);
    };

    function wp8DesktopBrowser () {
        if (!((window.DocumentTouch && document instanceof DocumentTouch) || 'ontouchstart' in window)) {
            var script = document.createElement("script");
            script.src = "plugins/af.desktopBrowsers.js";
            var tag = $("head").append(script);
        }
    };

    /*
     * POPUP para iniciar sesión
     */
    function onClickLoginButtonHandler () {
        var iniciarSesion = new InicioSesionView();
    };

    /**
     * Se ejecuta al hacer click en el icono de las tres rayitas que muestra el menú lateral.  
     */
    function onClickBackButtonHandler (e) {
        af.ui.hideMask();
        var activeDiv = af.ui.activeDiv;
        setTimeout( function () {activeDiv.remove()} , 250);
    }

    function onClickCloseButtonHandler (e) {
        af.ui.hideModal();
    }

    function onClickMenuBadge() {
        af.ui.toggleSideMenu();
    }


    function launchAppFramework() {
        resolverConflictos();
        //        $.ui.scrollingDivs.menu_scroller.disable();
        //$.ui.disableNativeScrolling();

        $.ui.launch();
        $.ui.ready( function () {
            $.ui.slideMenuXThreshold = 50; /*Umbral en px para hacer abrir/cerrar el menú lateral*/
            $.ui.disableSplitView();
            $.ui.updateBadge("#afui","3","tr");
            $("footer#defaultNav").css("display", "none");
            $.ui.backButtonText = "Atrás"; /*esto cambia el texto del backbutton para todos los paneles de la aplicación*/
        });
    };

    function launchNoticiasSlider () {
        var noticiasView = ListadoNoticiasView.getInstance();
        noticiasView.render();
        owl = jquery("#owl-demo").owlCarousel({
            navigation : false, // Show next and prev buttons
            autoPlay: 5000,
            rewindSpeed: 500,
            pagination: false,
            slideSpeed : 300,
            paginationSpeed : 400,
            singleItem:true
        });        
    };

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