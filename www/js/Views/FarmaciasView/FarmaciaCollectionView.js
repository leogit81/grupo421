var FarmaciaCollectionView = (function ($, common, Backbone, _, renderer, BaseView, FarmaciaNominal, FarmaciaNominalView) {
    "use strict";
    
    var farmaciaCollectionView = BaseCollectionView.extend({
        tagName: 'div',
        className: 'panel consulta-detallada',
        
        attributes: {
            'id': 'resultadoConsultaGeneralFarmacia',
            'data-nav': "consultas_nav"
        },
        
        itemTemplateString : "<li><a><span class='znombre'><%=nombre%></span></br><span class='codigoFarmacia'> <%=codigo%> </span> - <%=provincia%></a></li>",
 
        busquedaNominalFarmacia: function (eventData) {
            var codigoFarmacia = this.getCodigoFarmaciaFromSelectedItem(eventData.currentTarget.outerHTML),
                farmaciaNominalView = new FarmaciaNominalView({codigo: codigoFarmacia});
                farmaciaNominalView.loadDefaultView();
        },
        
        getCodigoFarmaciaFromSelectedItem: function (selectedItem) {
            return common.trim($(selectedItem).find("span.codigoFarmacia").html());
        }
	});
    
    farmaciaCollectionView.prototype.busquedaNominalItem = function (eventData) {
        this.busquedaNominalFarmacia(eventData);
    };
	
	return farmaciaCollectionView;
}(af, common, Backbone, _, AppFrameworkRenderer, BaseView, FarmaciaNominal, FarmaciaNominalView));
