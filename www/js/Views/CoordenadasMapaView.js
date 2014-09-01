var CoordenadasMapaView = (function(BaseView, CoordenadasMapa){
    var coordenadasMapaView = BaseView.extend({
        template : _.template("<div><label>Latitud</label><span><%=latitud%></span><br>" +
                              "</div><div><label>Longitud</label><span><%=longitud%></span></div><br>" +
                              "<div><label>Nivel Zoom</label><span><%=nivelZoom%></span></div><br>"),
    });
    
    return coordenadasMapaView;
})(BaseView, CoordenadasMapa);