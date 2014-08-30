define(['require', 'jquery', 'appframework', 'Base/BaseView', 'Models/Ministerio', 'Views/MinisterioView'], 
function(require, jquery, $, BaseView, Ministerio, MinisterioView){
    
    ConsultaMinisterioView = BaseView.extend({
        tagName: 'div',
        
        attributes: {
            'id': 'consultaMinisterio',
            'class': 'panel',
            'data-title':'Consulta nominal de Ministerio',
            'data-nav':"consultas_nav",    
        },
        
        template : _.template(
            '<div class="formGroupHead">Filtros</div>' +
            '<form>' +
                '<input id="numeroMinisterio" type="text" placeholder="Número de Ministerio"/>' +
                '<a id="submitConsultaMinisterio" class="button">Enviar</a>' +
            '</form>'
        ),
  
		initialize: function() {
            this.model = new Ministerio();
        },
        
        setNumeroMinisterio: function(e){
            this.model.set("id", e.target.value);
        },
        
        ejecutarConsultaMinisterio: function(){
            var ministerioView = new MinisterioView({
                model: this.model,
            });
            var numeroMinisterio = $("#numeroMinisterio").val();
            this.model.load(numeroMinisterio);
        },
        render: function(){
            $.ui.addContentDiv("consultaMinisterio", this.template());
            $.ui.loadContent("consultaMinisterio", false, false, "slide");
            this.attachEvents();
            return this;
        },
        
        /**
         * Usado para bindear eventos a los controles del formulario. Se ejecuta después del render cuando los controles se encuentran cargados en la página. 
         */
        attachEvents: function(){
            jquery("#submitConsultaMinisterio").on("click", _.bind(this.ejecutarConsultaMinisterio, this));
        }
	});
	
	return ConsultaMinisterioView;
});