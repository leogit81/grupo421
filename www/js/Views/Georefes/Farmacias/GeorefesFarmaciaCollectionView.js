var GeorefesFarmaciaCollectionView = (function ($, renderer, BaseCollectionView) {
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
                "<div class='distanciaFarmaciaCercana'><label>Distancia:</label><span><%=distancia%></span> KM</div>" +
            "</div>" +
        "</li>",
        
        initialize: function (attributes, options) {
            options = options || {};
            options.renderer = renderer;

			BaseCollectionView.prototype.initialize.call(this, attributes, options);
            
            this.idImagen = 'imagenGeorefes';
		}
	});
	
	return georefesFarmaciaCollectionView;
}(af, AppFrameworkRenderer, BaseCollectionView));