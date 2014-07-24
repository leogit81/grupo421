define(['require', 'Base/BaseView', 'Models/CoordenadasMapa'], function(require, BaseView, CoordenadasMapa){
    CoordenadasMapaView = BaseView.extend({
        template : _.template("<div><label>Latitud</label><span><%=latitud%></span><br>" +
                              "</div><div><label>Longitud</label><span><%=longitud%></span></div><br>" +
                              "<div><label>Nivel Zoom</label><span><%=nivelZoom%></span></div><br>"),
    });
    
    return CoordenadasMapaView;
});