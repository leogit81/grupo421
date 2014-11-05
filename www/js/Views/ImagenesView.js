var ImagenesView = (function(BaseView){
	var imagenesView = BaseView.extend({
		template : _.template("<div><span>No disponible.</span></div>")
	});
	
	return imagenesView;
})(BaseView);