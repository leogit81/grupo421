/**
 * Aplicación PhoneGap. Cuando se inicializa la misma se bindean los eventos, el más importante de ellos es deviceready.
 * Una vez que se produjo este quiere decir que se puede llamar con seguridad a las funciones de la API de PhoneGap. 
 */
var app = (function ($, jquery) {
	"use strict";

    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    function bindEvents(){
        document.addEventListener('deviceready', onDeviceReady, false);
    };
    
	function initialize() {
	    bindEvents();
	};
    
    // deviceready Event Handler
    //
    // The scope of 'this' is the event.
    function onDeviceReady(){
        launchAppFramework();
        jquery("div#header").on("click", "a#menubadge", onClickMenuBadge);
        var consultasView = ConsultasView.getInstance();
        consultasView.render();
    };
    
    /**
     * Se ejecuta al hacer click en el icono de las tres rayitas que muestra el menú lateral.  
     */ 
    function onClickMenuBadge(){
        af.ui.toggleSideMenu();
    };

    function launchAppFramework(){
        resolverConflictos();
        $.ui.splitview = false;
        $.ui.isAjaxApp = false;
        $.ui.launch();
        $.ui.removeFooterMenu();
        //esto cambia el texto del backbutton para todos los paneles de la aplicación
        $.ui.backButtonText = "Atrás"
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