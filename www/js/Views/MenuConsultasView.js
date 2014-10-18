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
            jquery("#linkConsultaFarmacias").on("click", _.bind(this.showConsultaFarmacias, this));
            jquery("#linkConsultaDroguerias").on("click", _.bind(this.showConsultaDroguerias, this));
            //esto es para el menú lateral
            jquery("#linkConsultaMinisterio2").on("click", _.bind(this.showConsultaMinisterio, this));
            jquery("#linkConsultaEstablecimiento2").on("click", _.bind(this.showConsultaEstablecimiento, this));
            jquery("#linkConsultaProfSideMenu").on("click", _.bind(this.showConsultaProfesionales, this));
            jquery("#linkConsultaFarmaciasSideMenu").on("click", _.bind(this.showConsultaFarmacias, this));
            jquery("#linkConsultaDrogueriasSideMenu").on("click", _.bind(this.showConsultaDroguerias, this));
        },
        
        showConsultaMinisterio: function(e){
            var consultaMinisterioView = ConsultaMinisterioView.getInstance();
            consultaMinisterioView.render();
            af.ui.setTitle("<img src='./img/sisaMobile.png' class='zimagen_header'><img src='./img/iconos/tab_9.png' class='zimagen_header'>");
        },
		showConsultaEstablecimiento: function(e){
            var consultaEstablecimientoView = ConsultaEstablecimientoView.getInstance();
            consultaEstablecimientoView.render();
            af.ui.setTitle("<img src='./img/sisaMobile.png' class='zimagen_header'><img src='./img/iconos/tab_2.png' class='zimagen_header'>");
        },
        showConsultaProfesionales: function(e){
            var consultaProfesionalesView = ConsultaProfesionalesView.getInstance();
            consultaProfesionalesView.render();
            af.ui.setTitle("<img src='./img/sisaMobile.png' class='zimagen_header'><img src='./img/iconos/tab_3.png' class='zimagen_header'>");
        },
        showConsultaFarmacias: function(e){
            var consultaFarmaciasView = ConsultaFarmaciasView.getInstance();
            consultaFarmaciasView.render();
            af.ui.setTitle("<img src='./img/sisaMobile.png' class='zimagen_header'><img src='./img/iconos/tab_5.png' class='zimagen_header'>");
        },
        showConsultaDroguerias: function(e){
            var consultaDrogueriasView = ConsultaDrogueriasView.getInstance();
            consultaDrogueriasView.render();
            af.ui.setTitle("<img src='./img/sisaMobile.png' class='zimagen_header'><img src='./img/iconos/tab_6.png' class='zimagen_header'>");
        },
	});
    
    return menuConsultasView;
})(BaseView, jQuery);