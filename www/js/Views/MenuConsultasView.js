var MenuConsultasView = (function($, BaseView, jquery, renderer){
    /**
     * Menú de las consultas que se carga a la aplicación cuando la misma se lanza por primera vez, en vez de agregarlo en el HTML. 
     */
    menuConsultasView = BaseView.extend({
        tagName: 'nav',
        
        attributes: {
            'id': 'consultas_nav'
        },

        initialize: function(attributes, options){
            options = options || {};
            options.renderer = renderer;
            BaseView.prototype.initialize.call(this, attributes, options);
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
        */
        showConsultaProgramaMinisterio: function (consultaView) {
            var consultaViewInstance = new consultaView();
            consultaViewInstance.render();
        },
        
        showConsultaMinisterio: function(e){
            this.showConsultaProgramaMinisterio(ConsultaMinisterioView);
        },
        showConsultaEstablecimiento: function(e){
            this.showConsultaProgramaMinisterio(ConsultaEstablecimientoView);
        },
        showConsultaProfesionales: function(e){
            this.showConsultaProgramaMinisterio(ConsultaProfesionalesView);
        },
        showConsultaFarmacias: function(e){
            this.showConsultaProgramaMinisterio(ConsultaFarmaciasView);
        },
        showConsultaDroguerias: function(e){
            this.showConsultaProgramaMinisterio(ConsultaDrogueriasView);
        },
        showConsultaNomivac: function(e){
            this.showConsultaProgramaMinisterio(ConsultaNomivacView);
        },
        showConsultaRedos: function(e){
            this.showConsultaProgramaMinisterio(ConsultaRedosView);
        },
        showConsultaRemediar: function(e){
            this.showConsultaProgramaMinisterio(ConsultaRemediarView);
        },
        showConsultaReferentes: function(e){
            this.showConsultaProgramaMinisterio(ConsultaReferentesView);
        },
        showConsultaInstForm: function(e){
            this.showConsultaProgramaMinisterio(ConsultaInstFormView);
        },
        showConsultaGeorefes: function(e){
            this.showConsultaProgramaMinisterio(ConsultaGeorefesView);
        },
        showContacto: function(e){
            this.showConsultaProgramaMinisterio(ContactoView);
        },
        showAyuda: function(e){
            $.ui.showMask("Cargando...");
            setTimeout(function () {var ayudaView = new AyudaView(); ayudaView.render();},200);
        },
        showAcercaDe: function(e){
            var acercaDeView = new AcercaDeView({"model": new AppVersion()});
            acercaDeView.render();
        }
    });

    return menuConsultasView;
})(af, BaseView, jQuery, AppFrameworkRenderer);