define(['require', 'jquery', 'appframework', 'Base/BaseView', 'Views/ConsultaMinisterioView', 'Views/ConsultaEstablecimientoView'], 
function(require, jquery, $, BaseView, ConsultaMinisterioView, ConsultaEstablecimientoView){
    
    /**
     * Menú de las consultas que se carga a la aplicación cuando la misma se lanza por primera vez, en vez de agregarlo en el HTML. 
     */
    MenuConsultasView = BaseView.extend({
        tagName: 'nav',
        id: 'consultas_nav',
        
        template: _.template('<ul class="list">' +
                                '<li>' + 
                                    '<a id="linkConsultaMinisterio" class="icon" href="">Ministerio</a>' +
                                '</li>' +
								'<li>' + 
                                    '<a id="linkConsultaEstablecimiento" class="icon" href="">Establecimiento</a>' +
                                '</li>' +
                            '</ul>'),
        
        events:{
            'click a#linkConsultaMinisterio': 'showConsultaMinisterio',
			'click a#linkConsultaEstablecimiento': 'showConsultaEstablecimiento',
        },
        
        initialize: function(){
            var appEl = $("#afui");
            this.$el.removeAttr("class");
            var menuConsultaElement = this.$el.append(this.template())[0];
            appEl.append(menuConsultaElement);
        },
        
        showConsultaMinisterio: function(e){
            var consultaMinisterioView = new ConsultaMinisterioView();
            consultaMinisterioView.render();
        },
		showConsultaEstablecimiento: function(e){
            var consultaEstablecimientoView = new ConsultaEstablecimientoView();
            consultaEstablecimientoView.render();
        },
	});
	
	return MenuConsultasView;
});