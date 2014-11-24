var TelefonoView = (function(common, BaseView, Telefono){
	var telefonoView = BaseView.extend({
		template : _.template("<div><label>Número</label><span><%=numero%></span></div><br>" +
		                      "<div><label>Tipo</label><span><%=tipo%></span></div><br>"),
        
        template2 : _.template("<% if (this.hayTelefono()) { %><label class='tipo'><%=tipo%></label><span class='numero'><%=numero%></span><% } %>"),
        
        hayTelefono: function () {
            var numero = this.model.get("numero"),
                tipo = this.model.get("tipo");
            
            return ((!common.isEmpty(numero) && numero !== 'null') 
                    && (!common.isEmpty(tipo) && tipo !== 'null'));
        }
	});
	
	return telefonoView;
})(common, BaseView, Telefono);
