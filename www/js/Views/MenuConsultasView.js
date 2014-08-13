define(['appframework', 'jquery', 'Base/BaseView'], 
function($, jquery, BaseView){
    
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
        
        render: function(){
            this.attachEvents();
        },
        
        /**
         * Usado para bindear eventos a los controles del formulario. Se ejecuta después del render cuando los controles se encuentran cargados en la página. 
         */
        attachEvents: function(){
            jquery("#linkConsultaMinisterio").on("click", _.bind(this.showConsultaMinisterio, this));
            jquery("#linkConsultaEstablecimiento").on("click", _.bind(this.showConsultaEstablecimiento, this));
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