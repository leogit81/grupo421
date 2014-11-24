var DomicilioView = (function(BaseView, Domicilio){
    var domicilioView = BaseView.extend({
        template : _.template("<div><label>Código Postal</label><span><%=codigoPostal%></span></div><br>" +
                               "<div><label>Dirección</label><span><%=direccion%></span></div><br>"),
        
        template2: _.template("<span class='direccion'><%=direccion%></span><span class='codigoPostal'> (<%=codigoPostal%>)</span>")
    });
    
    return domicilioView;
})(BaseView, Domicilio);