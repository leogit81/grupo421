var MenuConsultasView = (function(BaseView, jquery){
    /**
     * Menú de las consultas que se carga a la aplicación cuando la misma se lanza por primera vez, en vez de agregarlo en el HTML. 
     */
    menuConsultasView = BaseView.extend({
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
            BaseView.prototype.render.call(this);
        },
        
        /**
         * Usado para bindear eventos a los controles del formulario. Se ejecuta después del render cuando los controles se encuentran cargados en la página. 
         */
        attachEvents: function(){
            BaseView.prototype.attachEvents.call(this);
            jquery("#linkConsultaMinisterio").on("click", _.bind(this.showConsultaMinisterio, this));
            jquery("#linkConsultaEstablecimiento").on("click", _.bind(this.showConsultaEstablecimiento, this));
            jquery("#linkConsultaProfHome").on("click", _.bind(this.showConsultaProfesionales, this));
            //esto es para el menú lateral
            jquery("#linkConsultaMinisterio2").on("click", _.bind(this.showConsultaMinisterio, this));
            jquery("#linkConsultaEstablecimiento2").on("click", _.bind(this.showConsultaEstablecimiento, this));
            jquery("#linkConsultaProfSideMenu").on("click", _.bind(this.showConsultaProfesionales, this));
        },
        
        showConsultaMinisterio: function(e){
            var consultaMinisterioView = ConsultaMinisterioView.getInstance();
            consultaMinisterioView.render();
        },
		showConsultaEstablecimiento: function(e){
            var consultaEstablecimientoView = ConsultaEstablecimientoView.getInstance();
            consultaEstablecimientoView.render();
        },
        showConsultaProfesionales: function(e){
            var consultaProfesionalesView = ConsultaProfesionalesView.getInstance();
            consultaProfesionalesView.render();
        }
	});
    
    return menuConsultasView;
})(BaseView, jQuery);