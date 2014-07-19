define(['require', 'Base/BaseView', 'Models/CoordenadasMapa'], function(require, BaseView, CoordenadasMapa){
    CoordenadasMapaView = BaseView.extend({
        template : _.template("<div><label>Latitud</label><span><%=latitud%></span>" +
                              "</div><div><label>Longitud</label><span><%=longitud%></span></div>" +
                              "<div><label>Nivel Zoom</label><span><%=nivelZoom%></span></div>"),
    });
    
    return CoordenadasMapaView;
});