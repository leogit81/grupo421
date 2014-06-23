define(['require', 'Base/BaseView', 'underscore', 'Models/Telefono'], function(require, BaseView, _, Telefono){
	TelefonoView = BaseView.extend({
		template : _.template("<div><label>Número</label><span><%=numero%></span></div><div><label>Tipo</label><span><%=tipo%></span></div>"),

		render : function () {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},
		
		model: Telefono,
	});
	
	return TelefonoView;
});
