define(['appframework', 'Base/BaseView'], 
function($, BaseView){
    
    /**
     * Menú de las consultas que se carga a la aplicación cuando la misma se lanza por primera vez, en vez de agregarlo en el HTML. 
     */
    MenuConsultasView = BaseView.extend({
        tagName: 'nav',
        id: 'consultas_nav',
        
        template: _.template('<ul class="list">' +
                                '<li>' + 
                                    '<a id="linkConsultaMinisterio" class="icon" href="#">Ministerio</a>' +
                                '</li>' +
								'<li>' + 
                                    '<a id="linkConsultaEstablecimiento" class="icon" href="#">Establecimiento</a>' +
                                '</li>' +
                            '</ul>'),
        
        events:{
            'click a#linkConsultaMinisterio': 'showConsultaMinisterio',
			'click a#linkConsultaEstablecimiento': 'showConsultaEstablecimiento',
        },
        
        render: function(){
            $.ui.enableSideMenu();
            /*var appEl = $("#afui");
            this.$el.removeAttr("class");
            var menuConsultaElement = this.$el.append(this.template())[0];
            appEl.append(menuConsultaElement);*/
            //$.ui.updateSideMenu(this.$el.append(this.template()).html());
            this.$el.removeAttr("class");
            var menuConsulta = $(this.$el.append(this.template())[0]);
            $.ui.updateSideMenuElements(menuConsulta);
        },
        
        showConsultaMinisterio: function(e){
            require(['Views/ConsultaMinisterioView'], function(ConsultaMinisterioView){
                var consultaMinisterioView = new ConsultaMinisterioView();
                consultaMinisterioView.render();
            });
        },
		showConsultaEstablecimiento: function(e){
            require(['Views/ConsultaEstablecimientoView'], function(ConsultaEstablecimientoView){
                var consultaEstablecimientoView = new ConsultaEstablecimientoView();
                consultaEstablecimientoView.render();
            });
        },
	});
	
	return MenuConsultasView;
});