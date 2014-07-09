define(['require', 'Base/MasterView', 'Views/CoordenadasMapaView', 'Views/DomicilioView', 'Views/TelefonoView'], 
function(require, MasterView, CoordenadasMapaView, DomicilioView, TelefonoView){
    
    MinisterioView = MasterView.extend({
		initialize: function() {
            this.listenTo(this.model, 'change', this.render);
          
            MinisterioView.addView(CoordenadasMapaView);
            MinisterioView.addView(DomicilioView);
            MinisterioView.addView(TelefonoView);
        },
        
        setIdMinisterio: function(e){
            
        }
	});
	
	return MinisterioView;
});