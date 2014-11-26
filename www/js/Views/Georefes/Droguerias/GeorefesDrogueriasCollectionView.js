var GeorefesDrogueriasCollectionView = (function ($, BaseCollectionView) {
    "use strict";
    
    var georefesEstablecimientoCollectionView = BaseCollectionView.extend({
        tagName: 'div',
        className: 'panel consulta-detallada',
        
        attributes: {
            'id': 'resultadoGeorefesDrogueriasGeneral',
            'data-nav': "consultas_nav"
        },
        
        itemTemplateString : "<li>" +
            "<div class='georefesDrogueriasCercanasItem'>" +
                "<div><span class='nombreDrogueriaCercana'><%=nombre%></span></div>" +
                "<div><span><%=dependencia%></span></div>" +
                "<div><span><%=provincia%></span></div>" +
                "<div><span><%=tipologia%></span></div>" +
                "<div class='distanciaDrogueriaCercana'><label>Distancia:</label><span><%=distancia%></span> KM</div>" +
            "</div>" +
        "</li>"
	});
	
	return georefesEstablecimientoCollectionView;
}(af, BaseCollectionView));