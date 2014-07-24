define(['require', 'appui', 'Views/ConsultasView'], function (require, appui, ConsultasView) {
    "use strict";
    
    /*vod = function(atributo){
        return common.obtenerValorODefault(atributo);
    };*/
    
    var consultasView = null;
    
    function initialize() {
        consultasView = new ConsultasView();
        
        $.ui.splitview = true;
        $.ui.toggleLeftSideMenu(false);
        $.ui.isAjaxApp = true;
        $.ui.launch();
        
        consultasView.render();
    };
    
    return {
       consultasView: consultasView, 
       initialize: initialize
    };
});