define(['require', 'appframework', 'Base/MasterView', 'Models/Ministerio'], 
function(require, $, MasterView, Ministerio){
    
    FiltroConsultaMinisterioView = MasterView.extend({
        events: {
            "click #submitConsultaMinisterio": "ejecutarConsultaMinisterio",
            "change #numeroMinisterio": "setNumeroMinisterio",
        },
  
		initialize: function() {
            
        },
        
        setNumeroMinisterio: function(e){
            Ministerio.set("id", e.value);
        },
        
        ejecutarConsultaMinisterio: function(){
            Ministerio.sync();
        }
	});
	
	return FiltroConsultaMinisterioView;
});