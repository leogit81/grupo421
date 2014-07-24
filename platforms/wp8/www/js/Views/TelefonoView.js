define(['require', 'Base/BaseView', 'underscore', 'Models/Telefono'], function(require, BaseView, _, Telefono){
	TelefonoView = BaseView.extend({
		template : _.template("<div><label>Número</label><span><%=numero%></span></div><br>" +
		                      "<div><label>Tipo</label><span><%=tipo%></span></div><br>"),
	});
	
	return TelefonoView;
});
