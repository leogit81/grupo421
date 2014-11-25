var ImagenesView = (function(BaseView){
	var imagenesView = BaseView.extend({
		template : _.template("<div><span>No hay imágenes disponibles.</span></div>")
	});
	
	return imagenesView;
})(BaseView);