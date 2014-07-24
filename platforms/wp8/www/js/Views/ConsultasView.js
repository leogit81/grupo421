define(['require', 'jquery', 'appframework', 'Base/BaseView', 'Views/MenuConsultasView'], 
function(require, jquery, $, BaseView, MenuConsultasView){
    
    ConsultasView = BaseView.extend({
        tagName: 'div',
        asideMenu: null,
        
        attributes: {
            'id': 'consultas',
            'class': 'panel',
            'data-title':'Consultas',
            'data-nav':"consultas_nav",    
        },

		initialize: function() {
            this.asideMenu = new MenuConsultasView();
        },
        
        render: function(){
            var contentEl = $("#afui div#content");
            var consultaElement = this.getEl().append(this.template())[0];
            contentEl.append(consultaElement);
        }
	});
	
	return ConsultasView;
});