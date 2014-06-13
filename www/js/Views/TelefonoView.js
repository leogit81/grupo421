/**
 * Created by Leo on 6/12/2014.
 */
var TelefonoView = Backbone.View.extend({
		tagName : "div",

		template : _.template("<div><label>Número</label><span><%=numero%></span></div><div><label>Tipo</label><span><%=tipo%></span></div>"),

		render : function () {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});
