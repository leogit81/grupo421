define(['require', 'appframework', 'Base/BaseView', 'Views/FiltroConsultaMinisterioView'], 
function(require, $, BaseView, FiltroConsultaMinisterioView){
    
    MenuConsultasView = BaseView.extend({
        events:{
            'click a#linkConsultaMinisterio': 'showConsultaMinisterio',
        },
        
        initialize: function(){
            //this.on("click #linkConsultaMinisterio", this.showConsultaMinisterio, this);
            var element = $("nav#consultas_nav");
            if (element.length > 0){
                this.setElement(element[0]);
            }
        },
        
        showConsultaMinisterio: function(e){
            require(['Views/FiltroConsultaMinisterioView']);
            var FiltroConsultaMinisterioView = require('Views/FiltroConsultaMinisterioView');
            var filtroConsultaMinisterioView = new FiltroConsultaMinisterioView();
            //filtroConsultaMinisterioView.render();
        }
	});
	
	return MenuConsultasView;
});