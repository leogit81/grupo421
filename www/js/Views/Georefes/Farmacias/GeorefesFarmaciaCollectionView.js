var GeorefesFarmaciaCollectionView = (function ($, BaseCollectionView) {
    "use strict";
    
    var georefesFarmaciaCollectionView = BaseCollectionView.extend({
        tagName: 'div',
        className: 'panel consulta-detallada',
        
        attributes: {
            'id': 'resultadoGeorefesFarmaciaGeneral',
            'data-nav': "consultas_nav"
        },
        
        itemTemplateString : "<li>" +
            "<div class='georefesFarmaciaCercanaItem'>" +
                "<div><span class='nombreFarmaciaCercana'><%=nombre%></span></div>" +
                "<div><span><%=dependencia%></span></div>" +
                "<div><span><%=provincia%></span></div>" +
                "<div><span><%=tipologia%></span></div>" +
                "<div class='distanciaFarmaciaCercana'><label>Distancia:</label><span><%=distancia%></span></div>" +
            "</div>" +
        "</li>"
	});
	
	return georefesFarmaciaCollectionView;
}(af, BaseCollectionView));