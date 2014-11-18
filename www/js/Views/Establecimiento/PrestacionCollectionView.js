var PrestacionCollectionView = (function ($, common, _, renderer, BaseCollectionView) {
    "use strict";
    
    var prestacionCollectionView = BaseCollectionView.extend({
        tagName: 'div',
        className: 'panel consulta-detallada',
        
        attributes: {
            'id': 'resultadoConsultaNominalPrestacionesEstablecimiento',
            'data-nav': "consultas_nav"
        },
        
        itemTemplateString : "<li><span><%=nombre%></span></li>"
	});
	
	return prestacionCollectionView;
}(af, common, _, AppFrameworkRenderer, BaseCollectionView));