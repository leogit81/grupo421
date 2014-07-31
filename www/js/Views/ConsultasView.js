define(['appframework', 'Base/BaseView'], 
function($, BaseView){
    
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
            self = this;
        },
        
        render: function(){
            require(['Views/MenuConsultasView'], function(MenuConsultasView){
                var contentEl = $("#afui div#content");
                var consultaElement = self.$el.append(self.template())[0];
                contentEl.append(consultaElement);
                
                self.asideMenu = new MenuConsultasView();
                self.asideMenu.render();
            });
        }
	});
	
	return ConsultasView;
});