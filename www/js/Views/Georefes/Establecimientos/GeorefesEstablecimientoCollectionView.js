var GeorefesEstablecimientoCollectionView = (function ($, BaseCollectionView) {
    "use strict";
    
    var georefesEstablecimientoCollectionView = BaseCollectionView.extend({
        tagName: 'div',
        className: 'panel consulta-detallada',
        
        attributes: {
            'id': 'resultadoGeorefesEstablecimientoGeneral',
            'data-nav': "consultas_nav"
        },
        
        itemTemplateString : "<li>" +
            "<div class='georefesEstablecimientoCercanoItem'>" +
                "<div><span class='znombre'><%=nombre%></span></div>" +
                "<div><span><%=dependencia%></span></div>" +
                "<div><span><%=provincia%></span></div>" +
                "<div><span><%=tipologia%></span></div>" +
                "<div class='distanciaEstablecimientoCercano'><label>Distancia:</label><span><%=distancia%></span></div>" +
            "</div>" +
        "</li>"
	});
	
	return georefesEstablecimientoCollectionView;
}(af, BaseCollectionView));