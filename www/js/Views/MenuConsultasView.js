var MenuConsultasView = (function(BaseView, jquery){
    /**
     * Menú de las consultas que se carga a la aplicación cuando la misma se lanza por primera vez, en vez de agregarlo en el HTML. 
     */
    menuConsultasView = BaseView.extend({
        tagName: 'nav',
        
        attributes: {
            'id': 'consultas_nav'
        },
        
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
            jquery("#linkConsultaFarmacias").on("click", _.bind(this.showConsultaFarmacias, this));
            //esto es para el menú lateral
            jquery("#linkConsultaMinisterio2").on("click", _.bind(this.showConsultaMinisterio, this));
            jquery("#linkConsultaEstablecimiento2").on("click", _.bind(this.showConsultaEstablecimiento, this));
            jquery("#linkConsultaProfSideMenu").on("click", _.bind(this.showConsultaProfesionales, this));
        },
        
        showConsultaMinisterio: function(e){
            //var consultaMinisterioView = ConsultaMinisterioView.getInstance();
            var consultaMinisterioView = new ConsultaMinisterioView();
            consultaMinisterioView.render();
        },
		showConsultaEstablecimiento: function(e){
            //var consultaEstablecimientoView = ConsultaEstablecimientoView.getInstance();
            var consultaEstablecimientoView = new ConsultaEstablecimientoView();
            consultaEstablecimientoView.render();
        },
        showConsultaProfesionales: function(e){
            //var consultaProfesionalesView = ConsultaProfesionalesView.getInstance();
            var consultaProfesionalesView = new ConsultaProfesionalesView();
            consultaProfesionalesView.render();
        },
        showConsultaFarmacias: function(e){
            //var consultaFarmaciasView = ConsultaFarmaciasView.getInstance();
            var consultaFarmaciasView = new ConsultaFarmaciasView();
            consultaFarmaciasView.render();
        },
	});
    
    return menuConsultasView;
})(BaseView, jQuery);