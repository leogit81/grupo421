define(['require', 'Base/BaseView', 'Models/Domicilio'], function(require, BaseView, Domicilio){
    DomicilioView = BaseView.extend({
        template : _.template("<div><label>Código Postal</label><span><%=codigoPostal%></span></div><div><label>Dirección</label><span><%=direccion%></span></div>"),
    });
    
    return DomicilioView;
});