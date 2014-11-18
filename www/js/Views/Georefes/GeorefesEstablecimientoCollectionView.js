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
            "<span><%=dependencia%></span>" +
            "<span><%=nombre%></span>" +
            "<span><%=provincia%></span>" +
            "<span><%=tipologia%></span>" +
            "<span><%=distancia%></span>" +
        "</li>"
	});
	
	return georefesEstablecimientoCollectionView;
}(af, BaseCollectionView));