var InstFormCollectionView = (function ($, common, Backbone, _, renderer, BaseView, InstFormNominal, InstFormNominalView) {
    "use strict";

    var instFormCollectionView = BaseCollectionView.extend({
        tagName: 'div',
        className: 'panel consulta-detallada',

        attributes: {
            'id': 'resultadoConsultaGeneralInstForm',
            'data-nav': "consultas_nav"
        },
        
        itemTemplateString: "<li><a><%=nombre%></br><span class='codigoInstForm'> <%=codigoSISA%> </span> - <%=provincia%></a></li>",

        busquedaNominalInstForm: function (eventData) {
            var codigoInstForm = this.getCodigoInstFormFromSelectedItem(eventData.currentTarget.outerHTML),
                instFormNominalView = new InstFormNominalView({codigo: codigoInstForm});
            instFormNominalView.loadDefaultView();
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
