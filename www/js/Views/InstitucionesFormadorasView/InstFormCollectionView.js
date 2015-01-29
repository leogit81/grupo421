var InstFormCollectionView = (function ($, common, Backbone, _, renderer, BaseView, InstFormNominal, InstFormNominalView) {
    "use strict";

    var instFormCollectionView = BaseCollectionView.extend({
        tagName: 'div',
        className: 'panel consulta-detallada',

        attributes: {
            'id': 'resultadoConsultaGeneralInstForm',
            'data-nav': "consultas_nav"
        },

        itemTemplate: function (item) {
            item.provincia = item.provincia || null;
            BaseCollectionView.prototype.itemTemplate.call(this,item);            
        },

        itemTemplateString: "<li><a><span class='znombre'><%=nombre%></span></br><span class='codigoInstForm'><%=codigoSISA%></span> - <% if (provincia) { %><%=provincia%></a><% } %></li>",
        busquedaNominalInstForm: function (eventData) {
            var codigoInstForm = this.getCodigoInstFormFromSelectedItem(eventData.currentTarget.outerHTML),
                instFormNominalView = new InstFormNominalView({codigo: codigoInstForm});
            instFormNominalView.loadDefaultView();
        },

        initialize: function (attributes, options) {
            options = options || {};
            options.renderer = renderer;

            this.idImagen = 'imagenInstFormadoras';
            
			BaseCollectionView.prototype.initialize.call(this, attributes, options);
		},
        
        getCodigoInstFormFromSelectedItem: function (selectedItem) {
            return common.trim($(selectedItem).find("span.codigoInstForm").html());
        }
    });

    instFormCollectionView.prototype.busquedaNominalItem = function (eventData) {
        this.busquedaNominalInstForm(eventData);
    };
    return instFormCollectionView;
}(af, common, Backbone, _, AppFrameworkRenderer, BaseView, InstFormNominal, InstFormNominalView));
