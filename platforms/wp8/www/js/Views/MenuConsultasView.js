define(['require', 'jquery', 'appframework', 'Base/BaseView', 'Views/ConsultaMinisterioView'], 
function(require, jquery, $, BaseView, ConsultaMinisterioView){
    
    MenuConsultasView = BaseView.extend({
        tagName: 'nav',
        id: 'consultas_nav',
        
        template: _.template('<ul class="list">' +
                                '<li>' + 
                                    '<a id="linkConsultaMinisterio" class="icon" href="">Ministerio</a>' +
                                '</li>' +
                            '</ul>'),
        
        events:{
            'click a#linkConsultaMinisterio': 'showConsultaMinisterio',
        },
        
        initialize: function(){
            var appEl = $("#afui");
            this.$el.removeAttr("class");
            var menuConsultaElement = this.getEl().append(this.template())[0];
            appEl.append(menuConsultaElement);
            
            /*if (element.length > 0){
                this.setElement(element[0]);
            }*/
        },
        
        showConsultaMinisterio: function(e){
            /*require(['Views/ConsultaMinisterioView']);
            var ConsultaMinisterioView = require('Views/ConsultaMinisterioView');*/
            var consultaMinisterioView = new ConsultaMinisterioView();
            consultaMinisterioView.render();
        },
	});
	
	return MenuConsultasView;
});