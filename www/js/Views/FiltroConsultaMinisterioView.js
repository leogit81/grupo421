define(['require', 'appframework', 'Base/BaseView', 'Models/Ministerio'], 
function(require, $, BaseView, Ministerio){
    
    FiltroConsultaMinisterioView = BaseView.extend({
        events: {
            "click #submitConsultaMinisterio": "ejecutarConsultaMinisterio",
            "change #numeroMinisterio": "setNumeroMinisterio",
        },
  
		initialize: function() {
            var element = $("div.panel#consultaMinisterio");
            if (element.length > 0){
                this.setElement(element[0]);
            }
            
            this.model = new Ministerio();
        },
        
        setNumeroMinisterio: function(e){
            this.model.set("id", e.target.value);
        },
        
        ejecutarConsultaMinisterio: function(){
            this.model.load();
        },
	});
	
	return FiltroConsultaMinisterioView;
});