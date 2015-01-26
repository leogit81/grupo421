var MenuConsultasView = (function($, BaseView, jquery, renderer){
    /**
     * Menú de las consultas que se carga a la aplicación cuando la misma se lanza por primera vez, en vez de agregarlo en el HTML. 
     */
    menuConsultasView = BaseView.extend({
        tagName: 'nav',

        /**
        * HTML con las imágenes que se mostrarán por cada una de las opciones del menú en la barra de título de la aplicación.
        */
        imagesHtml: "<img id='sisaMobileLogo' src='./img/sisaMobile.png' class='zimagen_header'>" +
        "<img id='imagenEstablecimientos' src='./img/iconos/tab_2.png' class='zimagen_header' style='visibility: hidden;'>" +
        "<img id='imagenProfesionales' src='./img/iconos/tab_3.png' class='zimagen_header' style='visibility: hidden;'>" +
        "<img id='imagenNomivac' src='./img/iconos/tab_4.png' class='zimagen_header' style='visibility: hidden;'>" +
        "<img id='imagenFarmacias' src='./img/iconos/tab_5.png' class='zimagen_header' style='visibility: hidden;'>" +
        "<img id='imagenDroguerias' src='./img/iconos/tab_6.png' class='zimagen_header' style='visibility: hidden;'>" +
        "<img id='imagenRemediar' src='./img/iconos/tab_7.png' class='zimagen_header' style='visibility: hidden;'>" +
        "<img id='imagenRedos' src='./img/iconos/tab_8.png' class='zimagen_header' style='visibility: hidden;'>" +
        "<img id='imagenMinisterio' src='./img/iconos/tab_9.png' class='zimagen_header' style='visibility: hidden;'>" +
        "<img id='imagenInstFormadoras' src='./img/iconos/tab_10.png' class='zimagen_header' style='visibility: hidden;'>" +
        "<img id='imagenGeorefes' src='./img/iconos/tab_11.png' class='zimagen_header' style='visibility: hidden;'>" +
        "<img id='imagenContacto' src='./img/iconos/tab_12.png' class='zimagen_header' style='visibility: hidden;'>" +
        "<img id='imagenAcercaDe' src='./img/iconos/tab_13.png' class='zimagen_header' style='visibility: hidden;'>" +
        "<img id='imagenAyuda' src='./img/iconos/tab_14.png' class='zimagen_header' style='visibility: hidden;'>" +
        "<img id='imagenReferentes' src='./img/iconos/tab_17.png' class='zimagen_header' style='visibility: hidden;'>";
        
        attributes: {
            'id': 'consultas_nav'
        },

        initialize: function(attributes, options){
            options = options || {};
            options.renderer = renderer;
            BaseView.prototype.initialize.call(this, attributes, options);
            
            $.ui.setTitle(this.imagesHtml);
        },

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
            jquery("#linkAyuda").on("click", _.bind(this.showAyuda, this));
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
            jquery("#linkAyudaSideMenu").on("click", _.bind(this.showAyuda, this));
            jquery("#linkAcercaDeSideMenu").on("click", _.bind(this.showAcercaDe, this));
        },

        /**
        * Muestra la consulta correspondiente al programa del ministerio seleccionado del menú.
        * @param {BaseView} consultaView, la vista de la consulta que se quiere mostrar.
        * @param {string} pathImagen, el path de la imagen que se quiere mostrar en el title para
        * la consulta seleccionada.
        */
        showConsultaProgramaMinisterio: function (consultaView, pathImagen) {
            var consultaViewInstance = new consultaView();
            consultaViewInstance.render();
            /*app.cambiarImagenProgramaMinisterio(pathImagen);
            app.cambiarVisibilidadImagenProgramaMinisterio(true);*/
        },
        
        showConsultaMinisterio: function(e){
            /*var consultaMinisterioView = new ConsultaMinisterioView();
            consultaMinisterioView.render();
            $.ui.setTitle("<img src='./img/sisaMobile.png' class='zimagen_header'><img src='./img/iconos/tab_9.png' class='zimagen_header'>");*/
            this.showConsultaProgramaMinisterio(ConsultaMinisterioView, './img/iconos/tab_9.png');
        },
        showConsultaEstablecimiento: function(e){
            /*var consultaEstablecimientoView = new ConsultaEstablecimientoView();
            consultaEstablecimientoView.render();
            $.ui.setTitle("<img src='./img/sisaMobile.png' class='zimagen_header'><img src='./img/iconos/tab_2.png' class='zimagen_header'>");*/
            this.showConsultaProgramaMinisterio(ConsultaEstablecimientoView, './img/iconos/tab_2.png');
        },
        showConsultaProfesionales: function(e){
            /*var consultaProfesionalesView = new ConsultaProfesionalesView();
            consultaProfesionalesView.render();
            $.ui.setTitle("<img src='./img/sisaMobile.png' class='zimagen_header'><img src='./img/iconos/tab_3.png' class='zimagen_header'>");*/
            this.showConsultaProgramaMinisterio(ConsultaProfesionalesView, './img/iconos/tab_3.png');
        },
        showConsultaFarmacias: function(e){
            /*var consultaFarmaciasView = new ConsultaFarmaciasView();
            consultaFarmaciasView.render();
            $.ui.setTitle("<img src='./img/sisaMobile.png' class='zimagen_header'><img src='./img/iconos/tab_5.png' class='zimagen_header'>");*/
            this.showConsultaProgramaMinisterio(ConsultaFarmaciasView, './img/iconos/tab_5.png');
        },
        showConsultaDroguerias: function(e){
            /*var consultaDrogueriasView = new ConsultaDrogueriasView();
            consultaDrogueriasView.render();
            $.ui.setTitle("<img src='./img/sisaMobile.png' class='zimagen_header'><img src='./img/iconos/tab_6.png' class='zimagen_header'>");*/
            this.showConsultaProgramaMinisterio(ConsultaDrogueriasView, './img/iconos/tab_6.png');
        },
        showConsultaNomivac: function(e){
            /*var consultaNomivacView = new ConsultaNomivacView();
            consultaNomivacView.render();
            $.ui.setTitle("<img src='./img/sisaMobile.png' class='zimagen_header'><img src='./img/iconos/tab_4.png' class='zimagen_header'>");*/
            this.showConsultaProgramaMinisterio(ConsultaNomivacView, './img/iconos/tab_4.png');
        },
        showConsultaRedos: function(e){
            /*var consultaRedosView = new ConsultaRedosView();
            consultaRedosView.render();
            $.ui.setTitle("<img src='./img/sisaMobile.png' class='zimagen_header'><img src='./img/iconos/tab_8.png' class='zimagen_header'>");*/
            this.showConsultaProgramaMinisterio(ConsultaRedosView, './img/iconos/tab_8.png');
        },
        showConsultaRemediar: function(e){
            /*
            var consultaRemediarView = new ConsultaRemediarView();
            consultaRemediarView.render();
            $.ui.setTitle("<img src='./img/sisaMobile.png' class='zimagen_header'><img src='./img/iconos/tab_7.png' class='zimagen_header'>");*/
            this.showConsultaProgramaMinisterio(ConsultaRemediarView, './img/iconos/tab_7.png');
        },
        showConsultaReferentes: function(e){
            /*var consultaReferentesView = new ConsultaReferentesView();
            consultaReferentesView.render();
            $.ui.setTitle("<img src='./img/sisaMobile.png' class='zimagen_header'><img src='./img/iconos/tab_17.png' class='zimagen_header'>");*/
            this.showConsultaProgramaMinisterio(ConsultaReferentesView, './img/iconos/tab_17.png');
        },
        showConsultaInstForm: function(e){
            /*var consultaInstFormView = new ConsultaInstFormView();
            consultaInstFormView.render();
            $.ui.setTitle("<img src='./img/sisaMobile.png' class='zimagen_header'><img src='./img/iconos/tab_10.png' class='zimagen_header'>");*/
            this.showConsultaProgramaMinisterio(ConsultaInstFormView, './img/iconos/tab_10.png');
        },
        showConsultaGeorefes: function(e){
            /*var consultaGeorefesView = new ConsultaGeorefesView();
            consultaGeorefesView.render();
            $.ui.setTitle("<img src='./img/sisaMobile.png' class='zimagen_header'><img src='./img/iconos/tab_11.png' class='zimagen_header'>");*/
            this.showConsultaProgramaMinisterio(ConsultaGeorefesView, './img/iconos/tab_11.png');
        },
        showContacto: function(e){
            /*var contactoView = new ContactoView();
            contactoView.render();
            $.ui.setTitle("<img src='./img/sisaMobile.png' class='zimagen_header'><img src='./img/iconos/tab_12.png' class='zimagen_header'>");*/
            this.showConsultaProgramaMinisterio(ContactoView, './img/iconos/tab_12.png');
        },
        showAyuda: function(e){
            $.ui.showMask("Cargando...");
            setTimeout(function () {var ayudaView = new AyudaView(); ayudaView.render();},200);
            /*af.ui.setTitle("<img src='./img/sisaMobile.png' class='zimagen_header'><img src='./img/iconos/tab_14.png' class='zimagen_header'>");
            app.cambiarImagenProgramaMinisterio('./img/iconos/tab_14.png');
            app.cambiarVisibilidadImagenProgramaMinisterio(true);*/
        },
        showAcercaDe: function(e){
            var acercaDeView = new AcercaDeView({"model": new AppVersion()});
            acercaDeView.render();
            /*$.ui.setTitle("<img src='./img/sisaMobile.png' class='zimagen_header'><img src='./img/iconos/tab_13.png' class='zimagen_header'>");
            app.cambiarImagenProgramaMinisterio('./img/iconos/tab_13.png');
            app.cambiarVisibilidadImagenProgramaMinisterio(true);*/
        }
    });

    return menuConsultasView;
})(af, BaseView, jQuery, AppFrameworkRenderer);