var ConsultaMinisterioView = (function(jquery, $, renderer, BaseView, Ministerio, MinisterioView){
    
    var consultaMinisterioView = BaseView.extend({
        tagName: 'div',
        
        attributes: {
            'id': 'consultaMinisterio',
            'class': 'panel',
            'data-nav':"consultas_nav",
            'data-footer': 'none'
        },
        
        template : _.template(
            '<div class="formGroupHead">Filtros</div>' +
            '<form>' +
//                '<input id="numeroMinisterio" type="text" placeholder="Número de Ministerio"/>' +
                '<select id="numeroMinisterio" required="true"></select>' +
                '<a id="submitConsultaMinisterio" class="button">Enviar</a>' +
            '</form>'
        ),
  
		initialize: function(attributes, options) {
            //this.model = new Ministerio();
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
        renderVistaDeDatos: function (data) {
            var ministerioModel = new Ministerio();
            var ministerioView = MinisterioView.getInstance();
            ministerioView.setModel({model: ministerioModel});
            ministerioModel.processData(data);
        },
        
        ejecutarConsultaMinisterio: function(){
            var numeroMinisterio = $("#numeroMinisterio").val();
            this.modelDataSource.getModelData(Ministerio, numeroMinisterio);
        },
        
        render: function(){
            $.ui.addContentDiv("consultaMinisterio", this.template());
            $.ui.loadContent("consultaMinisterio", false, false, "slide");
            this.attachEvents();
            //var prov = new Provincias();
            setTimeout( function () {document.getElementById("numeroMinisterio").innerHTML = prov.listaProvinciasHTML();}, 300);
            return this;
        },
        
        /**
         * Usado para bindear eventos a los controles del formulario.
         * Se ejecuta después del render cuando los controles se encuentran cargados en la página. 
         */
        attachEvents: function(){
            BaseView.prototype.attachEvents.call(this);
            jquery("#submitConsultaMinisterio").on("click", _.bind(this.ejecutarConsultaMinisterio, this));
        }
	});
	
	return consultaMinisterioView;
})(jQuery, af, AppFrameworkRenderer, BaseView, Ministerio, MinisterioView);