var MenuConsultasView = (function($, BaseView, jquery){
    /**
     * Menú de las consultas que se carga a la aplicación cuando la misma se lanza por primera vez, en vez de agregarlo en el HTML. 
     */
    menuConsultasView = BaseView.extend({
        tagName: 'nav',
        
        attributes: {
            'id': 'consultas_nav'
        },
        
        /*template: _.template('<ul class="list">' +
                                '<li>' + 
                                    '<a id="linkConsultaMinisterio" class="icon" href="#">Ministerio</a>' +
                                '</li>' +
								'<li>' + 
                                    '<a id="linkConsultaEstablecimiento" class="icon" href="#">Establecimiento</a>' +
                                '</li>' +
                            '</ul>'),
        
        render: function(){
            BaseView.prototype.render.call(this);
        },*/
        
        /**
         * Usado para bindear eventos a los controles del formulario. Se ejecuta después del render cuando los controles se encuentran cargados en la página. 
         */
        attachEvents: function(){
            BaseView.prototype.attachEvents.call(this);
            jquery("#linkConsultaMinisterio").on("click", _.bind(this.showConsultaMinisterio, this));
            jquery("#linkConsultaEstablecimiento").on("click", _.bind(this.showConsultaEstablecimiento, this));
            jquery("#linkConsultaProfesionales").on("click", _.bind(this.showConsultaProfesionales, this));
            jquery("#linkConsultaFarmacias").on("click", _.bind(this.showConsultaFarmacias, this));
            jquery("#linkConsultaDroguerias").on("click", _.bind(this.showConsultaDroguerias, this));
            jquery("#linkConsultaNomivac").on("click", _.bind(this.showConsultaNomivac, this));
            jquery("#linkConsultaRedos").on("click", _.bind(this.showConsultaRedos, this));
            jquery("#linkConsultaRemediar").on("click", _.bind(this.showConsultaRemediar, this));
            jquery("#linkConsultaReferentes").on("click", _.bind(this.showConsultaReferentes, this));
            jquery("#linkConsultaInstForm").on("click", _.bind(this.showConsultaInstForm, this));
            jquery("#linkConsultaGeorefes").on("click", _.bind(this.showConsultaGeorefes, this));
            jquery("#linkContacto").on("click", _.bind(this.showContacto, this));
            jquery("#linkAcercaDe").on("click", _.bind(this.showAcercaDe, this));
            
            /**
            * ESTO ES PARA EL MENÚ LATERAL
            */
            jquery("#linkConsultaMinisterio2").on("click", _.bind(this.showConsultaMinisterio, this));
            jquery("#linkConsultaEstablecimiento2").on("click", _.bind(this.showConsultaEstablecimiento, this));
            jquery("#linkConsultaProfesionalesSideMenu").on("click", _.bind(this.showConsultaProfesionales, this));
            jquery("#linkConsultaFarmaciasSideMenu").on("click", _.bind(this.showConsultaFarmacias, this));
            jquery("#linkConsultaDrogueriasSideMenu").on("click", _.bind(this.showConsultaDroguerias, this));
            jquery("#linkConsultaNomivacSideMenu").on("click", _.bind(this.showConsultaNomivac, this));
            jquery("#linkConsultaRedosSideMenu").on("click", _.bind(this.showConsultaRedos, this));
            jquery("#linkConsultaRemediarSideMenu").on("click", _.bind(this.showConsultaRemediar, this));
            jquery("#linkConsultaReferentesSideMenu").on("click", _.bind(this.showConsultaReferentes, this));
            jquery("#linkConsultaInstFormSideMenu").on("click", _.bind(this.showConsultaInstForm, this));
            jquery("#linkConsultaGeorefesSideMenu").on("click", _.bind(this.showConsultaGeorefes, this));
            jquery("#linkContactoSideMenu").on("click", _.bind(this.showContacto, this));
        },
        
        showConsultaMinisterio: function(e){
            var consultaMinisterioView = new ConsultaMinisterioView();
            consultaMinisterioView.render();
            $.ui.setTitle("<img src='./img/sisaMobile.png' class='zimagen_header'><img src='./img/iconos/tab_9.png' class='zimagen_header'>");
        },
		showConsultaEstablecimiento: function(e){
            //var consultaEstablecimientoView = ConsultaEstablecimientoView.getInstance();
            var consultaEstablecimientoView = new ConsultaEstablecimientoView();
            consultaEstablecimientoView.render();
            $.ui.setTitle("<img src='./img/sisaMobile.png' class='zimagen_header'><img src='./img/iconos/tab_2.png' class='zimagen_header'>");
        },
        showConsultaProfesionales: function(e){
            //var consultaProfesionalesView = ConsultaProfesionalesView.getInstance();
            var consultaProfesionalesView = new ConsultaProfesionalesView();
            consultaProfesionalesView.render();
            $.ui.setTitle("<img src='./img/sisaMobile.png' class='zimagen_header'><img src='./img/iconos/tab_3.png' class='zimagen_header'>");
        },
        showConsultaFarmacias: function(e){
            //var consultaFarmaciasView = ConsultaFarmaciasView.getInstance();
            var consultaFarmaciasView = new ConsultaFarmaciasView();
            consultaFarmaciasView.render();
            $.ui.setTitle("<img src='./img/sisaMobile.png' class='zimagen_header'><img src='./img/iconos/tab_5.png' class='zimagen_header'>");
        },
        showConsultaDroguerias: function(e){
            var consultaDrogueriasView = new ConsultaDrogueriasView();
            consultaDrogueriasView.render();
            $.ui.setTitle("<img src='./img/sisaMobile.png' class='zimagen_header'><img src='./img/iconos/tab_6.png' class='zimagen_header'>");
        },
        showConsultaNomivac: function(e){
            var consultaNomivacView = new ConsultaNomivacView();
            consultaNomivacView.render();
            $.ui.setTitle("<img src='./img/sisaMobile.png' class='zimagen_header'><img src='./img/iconos/tab_4.png' class='zimagen_header'>");
        },
        showConsultaRedos: function(e){
            var consultaRedosView = new ConsultaRedosView();
            consultaRedosView.render();
            $.ui.setTitle("<img src='./img/sisaMobile.png' class='zimagen_header'><img src='./img/iconos/tab_8.png' class='zimagen_header'>");
        },
        showConsultaRemediar: function(e){
            var consultaRemediarView = new ConsultaRemediarView();
            consultaRemediarView.render();
            $.ui.setTitle("<img src='./img/sisaMobile.png' class='zimagen_header'><img src='./img/iconos/tab_7.png' class='zimagen_header'>");
        },
        showConsultaReferentes: function(e){
            var consultaReferentesView = new ConsultaReferentesView();
            consultaReferentesView.render();
            $.ui.setTitle("<img src='./img/sisaMobile.png' class='zimagen_header'><img src='./img/iconos/tab_17.png' class='zimagen_header'>");
        },
        showConsultaInstForm: function(e){
            var consultaInstFormView = new ConsultaInstFormView();
            consultaInstFormView.render();
            $.ui.setTitle("<img src='./img/sisaMobile.png' class='zimagen_header'><img src='./img/iconos/tab_10.png' class='zimagen_header'>");
        },
        showConsultaGeorefes: function(e){
            var consultaGeorefesView = new ConsultaGeorefesView();
            consultaGeorefesView.render();
            $.ui.setTitle("<img src='./img/sisaMobile.png' class='zimagen_header'><img src='./img/iconos/tab_11.png' class='zimagen_header'>");
        },
        showContacto: function(e){
            var contactoView = new ContactoView();
            contactoView.render();
            $.ui.setTitle("<img src='./img/sisaMobile.png' class='zimagen_header'><img src='./img/iconos/tab_12.png' class='zimagen_header'>");
        },
        showAcercaDe: function(e){
            var acercaDeView = new AcercaDeView({"model": new AppVersion()});
            acercaDeView.render();
            $.ui.setTitle("<img src='./img/sisaMobile.png' class='zimagen_header'><img src='./img/iconos/tab_13.png' class='zimagen_header'>");
        }
	});
    
    return menuConsultasView;
})(af, BaseView, jQuery);