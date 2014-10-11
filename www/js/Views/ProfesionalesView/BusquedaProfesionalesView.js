var BusquedaProfesionalesView = (function (jquery, $, renderer, BaseView) {
    "use strict";
    
    var busquedaProfesionalesView = BaseView.extend({
        tagName: 'div',
        
        attributes: {
            'id': 'busquedaProfesionales',
            'class': 'panel',
            'data-title': 'REFEPS',
            'data-nav':"consultas_nav",    
        },
        
        template : _.template(
            '<input id="radio_apellido" class="radioBtnProfesional" type="radio" name="radio_apellido" value="1"><label for="radio_apellido">Apellido</label>' +
            '<input id="radio_codigo" class="radioBtnProfesional" type="radio" name="radio_codigo" value="2"><label for="radio_codigo">Codigo</label>' +
            '<input id="radio_dni" class="radioBtnProfesional" type="radio" name="radio_dni" value="3"><label for="radio_dni">DNI</label>' +
            '<input id="radio_matricula" class="radioBtnProfesional" type="radio" name="radio_matricula" value="4"><label for="radio_matricula">Matrícula</label>' +
            '<input id="inputProfesional" type="text" placeholder=""/>' +
            '<a id="submitBusquedaProfesional" class="button">Consultar</a>'
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
            $.ui.addContentDiv("busquedaProfesionales", this.template());
            $.ui.loadContent("busquedaProfesionales", false, false, "slide");
            this.attachEvents();
            return this;
        },
        
        onChangeRadioButtonProfesionales: function (e) {
            var placeHolder = "saraza";
            
            $("#inputProfesional").attr("placeholder", placeHolder);
        },
        
        /**
         * Usado para bindear eventos a los controles del formulario.
         * Se ejecuta después del render cuando los controles se encuentran cargados en la página. 
         */
        attachEvents: function(){
            BaseView.prototype.attachEvents.call(this);
            $("#afui").delegate("#busquedaProfesionales input.radioBtnProfesional", "click", _.bind(this.onChangeRadioButtonProfesionales, this));
        }
	});
	
	return busquedaProfesionalesView;
})(jQuery, af, AppFrameworkRenderer, BaseView);