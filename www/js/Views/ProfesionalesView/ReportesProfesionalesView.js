var ReportesProfesionalesView = (function (jquery, $, renderer, BaseView) {
    "use strict";
    
    var reportesProfesionalesView = BaseView.extend({
        tagName: 'div',
        
        attributes: {
            'id': 'reportesProfesionales',
            'class': 'panel',
            'data-title': 'REFEPS',
            'data-nav':"consultas_nav",    
        },
        
        template : _.template(
            '<div class="formGroupHead">Por favor, seleccione el filtro deseado.</div>' +
            '<form>' +
                '<select id="tipoFormacionProfesional" name="tipoFormacionProfesional" onchange="fProfesional.actualizar()"></select>' +
                '<select id="formacionProfesional" name="formacionProfesional"></select>' +
                '<select id="provinciaEstablecimiento" name="provinciaEstablecimiento"></select>' +
                '<a id="submitBusquedaProfesionales" class="button">Consultar</a>' +
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
            $.ui.addContentDiv("reportesProfesionales", this.template());
            $.ui.loadContent("reportesProfesionales", false, false, "slide");
            this.attachEvents();
            document.getElementById("tipoFormacionProfesional").innerHTML = listaCompletaTipoFormacionProfesional;
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
	
	return reportesProfesionalesView;
})(jQuery, af, AppFrameworkRenderer, BaseView);