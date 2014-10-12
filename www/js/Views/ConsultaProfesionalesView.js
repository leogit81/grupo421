var ConsultaProfesionalesView = (function (jquery, $, renderer, BaseView) {
    "use strict";
    
    var consultaProfesionalesView = BaseView.extend({
        tagName: 'div',
        
        attributes: {
            'id': 'consultaProfesionales',
            'class': 'panel',
            'data-title': 'REFEPS',
            'data-nav':"consultas_nav",    
        },
        
        template : _.template(
            '<div class="formGroupHead">Registro Federal de Profesionales de Salud. Por favor, seleccione una opcion.</div>' +
            '<form>' +
                '<div class="button-grouped vertical">' +
                    '<a id="submitReportesProfesionales" class="button">Listado & Reportes</a>' +
                    '<a id="submitBusquedaProfesionales" class="button">Búsqueda de Profesionales</a>' +
                '</div>' +
            '</form>'
        ),
  
		initialize: function(attributes, options) {
            options = options || {};
            options.renderer = renderer;
            BaseView.prototype.initialize.call(this, attributes, options);
            
            this.initializeModelDataSource();
        },
        
        initializeModelDataSource: function () {
            this.modelDataSource = new ModelDataSource ({view: this});
            this.modelDataSource.on('dataFetched', this.renderVistaDeDatos, this);
        },
        
        /**
        * Hace el render de la vista que muestra los datos del modelo que se obtuvieron a partir de la consulta
        * aplicando los filtros.
        * @param {Object} data, información del modelo obtenida del servicio.
        */
    /*    renderVistaDeDatos: function (data) {
            var ministerioModel = new Ministerio();
            var ministerioView = MinisterioView.getInstance();
            ministerioView.setModel({model: ministerioModel});
            ministerioModel.processData(data);
        },*/
        
        ejecutarConsultaMinisterio: function(){
            var numeroMinisterio = $("#numeroMinisterio").val();
            this.modelDataSource.getModelData(Ministerio, numeroMinisterio);
        },
        
        render: function(){
            $.ui.addContentDiv("consultaProfesionales", this.template());
            $.ui.loadContent("consultaProfesionales", false, false, "slide");
            this.attachEvents();
            setTimeout( function () {document.getElementById("numeroMinisterio").innerHTML = prov.listaProvinciasHTML();}, 300);
            return this;
        },
        
        /**
         * Usado para bindear eventos a los controles del formulario.
         * Se ejecuta después del render cuando los controles se encuentran cargados en la página. 
         */
        attachEvents: function(){
            BaseView.prototype.attachEvents.call(this);
            //jquery("#submitConsultaMinisterio").on("click", _.bind(this.ejecutarConsultaMinisterio, this));
        }
	});
	
	return consultaProfesionalesView;
})(jQuery, af, AppFrameworkRenderer, BaseView);