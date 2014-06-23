define(['require', 'Base/MasterView', 'Views/CoordenadasMapaView', 'Views/DomicilioView', 'Views/TelefonoView'], 
function(require, MasterView, CoordenadasMapaView, DomicilioView, TelefonoView){
    
    Ministerio = MasterView.extend({
		
	});
	
	Ministerio.addView(CoordenadasMapaView);
	Ministerio.addView(DomicilioView);
	Ministerio.addView(TelefonoView);
	
	return Ministerio;
});