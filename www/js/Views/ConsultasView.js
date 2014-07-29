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

		/*initialize: function() {
            
        },*/
        
        render: function(){
<<<<<<< Updated upstream
            var contentEl = $("#afui div#content");
            var consultaElement = this.$el.append(this.template())[0];
            contentEl.append(consultaElement);
=======
            define(['Views/MenuConsultasView'], function(MenuConsultasView){
                this.asideMenu = new MenuConsultasView();
                
                var contentEl = $("#afui div#content");
                var consultaElement = this.$el.append(this.template())[0];
                contentEl.append(consultaElement);
            });
>>>>>>> Stashed changes
        }
	});
	
	return ConsultasView;
});