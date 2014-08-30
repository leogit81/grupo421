define(['require', 'jquery', 'appframework', 'Base/BaseView', 'Models/EstablecimientoCollection', 'Views/EstablecimientoCollectionView'], 
function(require, jquery, $, BaseView, EstablecimientoCollection, EstablecimientoCollectionView){
    
    ConsultaEstablecimientoView = BaseView.extend({
        tagName: 'div',
        
        attributes: {
            'id': 'consultaEstablecimiento',
            'class': 'panel',
            'data-title':'Consulta general de Establecimiento',
            'data-nav':"consultas_nav",    
        },
        
        template : _.template(
            '<div class="formGroupHead">Filtros</div>' +
            '<form>' +
                '<input id="nombreEstablecimiento" type="text" placeholder="Nombre de Establecimiento"/>' +
                '<input id="provinciaEstablecimiento" type="text" placeholder="Provincia de Establecimiento"/>' +
                '<input id="departamentoEstablecimiento" type="text" placeholder="Departamento de Establecimiento"/>' +
                '<input id="localidadEstablecimiento" type="text" placeholder="Localidad de establecimiento"/>' +
                '<a id="submitConsultaEstablecimiento" class="button">Enviar</a>' +
            '</form>'
        ),

        events: {
            "click #submitConsultaEstablecimiento": "ejecutarConsultaEstablecimiento",
        },
  
		initialize: function() {
            //this.model = new Establecimiento();
            this.model = new EstablecimientoCollection();
        },
        
        setNombreEstablecimiento: function(e){
            this.model.set("nombreEstablecimiento", e.target.value);
        },
        
        ejecutarConsultaEstablecimiento: function(){
            /*var establecimientoView = new EstablecimientoView({
                
                model: this.model,
            });*/
           
           var establecimientoColleccionView = new EstablecimientoCollectionView({
                model: this.model,
            });
            
            var nombreEstablecimiento = $("#nombreEstablecimiento").val();
            var provinciaEstablecimiento = $("#provinciaEstablecimiento").val();
            var departamentoEstablecimiento = $("#departamentoEstablecimiento").val();
            var localidadEstablecimiento = $("#localidadEstablecimiento").val();
            
            this.model.load({
               "provincia": provinciaEstablecimiento,
               "nombre": nombreEstablecimiento,
               "departamento": departamentoEstablecimiento,
               "localidad": localidadEstablecimiento,
           });
        },
        render: function(){
            $.ui.addContentDiv("consultaEstablecimiento", this.template());
            $.ui.loadContent("consultaEstablecimiento", false, false, "slide");
            this.attachEvents();
            return this;
        },
        
        /**
         * Usado para bindear eventos a los controles del formulario. Se ejecuta despu�s del render cuando los controles se encuentran cargados en la p�gina. 
         */
        attachEvents: function(){
            jquery("#submitConsultaEstablecimiento").on("click", _.bind(this.ejecutarConsultaEstablecimiento, this));
        }
	});
	
	return ConsultaEstablecimientoView;
});