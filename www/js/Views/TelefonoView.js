var TelefonoView = (function(BaseView, Telefono){
	var telefonoView = BaseView.extend({
		template : _.template("<div><label>Número</label><span><%=numero%></span></div><br>" +
		                      "<div><label>Tipo</label><span><%=tipo%></span></div><br>"),
	});
	
	return telefonoView;
})(BaseView, Telefono);
