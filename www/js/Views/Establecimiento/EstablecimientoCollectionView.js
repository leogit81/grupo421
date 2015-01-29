var EstablecimientoCollectionView = (function ($, common, renderer, BaseCollectionView, EstablecimientoNominalView) {
    "use strict";
    
    var establecimientoCollectionView = BaseCollectionView.extend({
        attributes: {
            'id': 'resultadoConsultaGeneralEstablecimiento',
            'data-nav': "consultas_nav"
        },
        
        itemTemplateString : "<li><a><span class='znombre'><%=nombre%></span></br><span class='codigoEstablecimiento'> <%=codigo%> </span> - <%=provincia%></a></li>",

        initialize: function (attributes, options) {
            options = options || {};
            options.renderer = renderer;

			BaseCollectionView.prototype.initialize.call(this, attributes, options);
            
            this.idImagen = 'imagenEstablecimientos';
		},
        
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
}(af, common, AppFrameworkRenderer, BaseCollectionView, EstablecimientoNominalView));