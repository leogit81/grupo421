var EstablecimientoCollectionView = (function ($, common, EstablecimientoNominalView) {
    "use strict";
    
    var establecimientoCollectionView = BaseCollectionView.extend({
        attributes: {
            'id': 'resultadoConsultaGeneralEstablecimiento',
            'data-nav': "consultas_nav"
        },
        
        itemTemplateString : "<li><a><%=nombre%></br><span class='codigoEstablecimiento'> <%=codigo%> </span> - <%=provincia%></a></li>",

        busquedaNominalEstablecimiento: function (eventData) {
            var codigoEstablecimiento = this.getCodigoEstablecimientoFromSelectedItem(eventData.currentTarget.outerHTML),
                establecimientoView = new EstablecimientoNominalView({codigo: codigoEstablecimiento});
            establecimientoView.loadDefaultView();
        },
        
        getCodigoEstablecimientoFromSelectedItem: function (selectedItem) {
            return common.trim($(selectedItem).find("span.codigoEstablecimiento").html());
        }
    });
    
    establecimientoCollectionView.prototype.busquedaNominalItem = function (eventData) {
        this.busquedaNominalEstablecimiento(eventData);
    };
	
	return establecimientoCollectionView;
}(af, common, EstablecimientoNominalView));