/*Variable global para el slider de noticias*/
var owl;

/**
 * Aplicación PhoneGap. Cuando se inicializa la misma se bindean los eventos, el más importante de ellos es deviceready.
 * Una vez que se produjo este quiere decir que se puede llamar con seguridad a las funciones de la API de PhoneGap. 
 */

var app = (function ($, jquery) {
    "use strict";
    //False para que App Framework no utilice el theme por defecto del dispositivo. Se fuerza un theme en index.html
    $.ui.useOSThemes = false;

    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    function bindEvents() {
        document.addEventListener('deviceready', onDeviceReady, false);
    };

    function initialize () {
        bindEvents();
    };

    // deviceready Event Handler
    //
    // The scope of 'this' is the event.
    function onDeviceReady(){
        //        Se incluye fastclick para evitar que se dispare dos veces el evento "click" cuando se hace un click
        FastClick.attach(document.body);
        loadApp();
    };

    function loadApp () {
        launchAppFramework();
        launchNoticiasSlider();
        $("div#header").on("click", "a#menubadge", onClickMenuBadge);
        var consultasView = ConsultasView.getInstance();
        consultasView.render();

        //es para ocultar la máscara de Cargando... cuando se hace click en el botón "Atrás"
        $("#afui").delegate("a.backButton", "click", function(e) { af.ui.hideMask();});
    };

    /**
     * Se ejecuta al hacer click en el icono de las tres rayitas que muestra el menú lateral.  
     */ 
    function onClickMenuBadge(){
        af.ui.toggleSideMenu();
    };

    function launchAppFramework(){
        resolverConflictos();
        //        $.ui.scrollingDivs.menu_scroller.disable();
        $.ui.disableNativeScrolling();

        $.ui.launch();
        $.ui.disableSplitView();
//        $.ui.removeFooterMenu();
        $.ui.updateBadge("#afui","3","tr");
        //Esta línea es para ocultar un div footer que contiene al menu, y que a pesar de moverlo
        //con el método removeFooterMenu, seguía mostrandose.
//        $("div#navbar.footer").css("display", "none");
        $("footer#defaultNav").css("display", "none");
        //esto cambia el texto del backbutton para todos los paneles de la aplicación
        $.ui.backButtonText = "Atrás";
        //$.touchLayer($("#afui").get(0));
    };
    
    function launchNoticiasSlider () {
        
        var noticiasView = ListadoNoticiasView.getInstance();
        noticiasView.render();
        owl = jquery("#owl-demo").owlCarousel({
            navigation : false, // Show next and prev buttons
            autoPlay: 2000,
            rewindSpeed: 500,
            pagination: true,
            slideSpeed : 300,
            paginationSpeed : 400,
            singleItem:true

            // "singleItem:true" is a shortcut for:
            // items : 1, 
            // itemsDesktop : false,
            // itemsDesktopSmall : false,
            // itemsTablet: false,
            // itemsMobile : false

        });        
    };

    /**
     * Resuelve conflictos que pudiera haber entre el appframework y jQuery con la variable $ en el espacio de nombres global. 
     */
    function resolverConflictos(){
        if (jQuery != undefined){
            jQuery.noConflict();

            if ($ != af){
                $ = af;
            }
        }
    };

    return {
        onDeviceReady: onDeviceReady,
        initialize: initialize,
    };
})(af, jQuery);