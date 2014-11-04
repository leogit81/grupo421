var DrogueriaCollectionView = (function ($, common, Backbone, _, renderer, BaseView, DrogueriaNominal, DrogueriaNominalView) {
    "use strict";

    var drogueriaCollectionView = BaseCollectionView.extend({
        tagName: 'div',
        className: 'panel consulta-detallada',

        attributes: {
            'id': 'resultadoConsultaGeneralDrogueria',
            'data-nav': "consultas_nav"
        },

        itemTemplateString: "<li><a><%=nombre%></br><span class='codigoDrogueria'> <%=codigo%> </span> - <%=provincia%></a></li>",

        busquedaNominalDrogueria: function (eventData) {
            var codigoDrogueria = this.getCodigoDrogueriaFromSelectedItem(eventData.currentTarget.outerHTML),
                drogueriaNominalView = new DrogueriaNominalView({codigo: codigoDrogueria});
            drogueriaNominalView.loadDefaultView();
        },

        getCodigoDrogueriaFromSelectedItem: function (selectedItem) {
            return common.trim($(selectedItem).find("span.codigoDrogueria").html());
        }
    });

    drogueriaCollectionView.prototype.busquedaNominalItem = function (eventData) {
        this.busquedaNominalDrogueria(eventData);
    };
    return drogueriaCollectionView;
}(af, common, Backbone, _, AppFrameworkRenderer, BaseView, DrogueriaNominal, DrogueriaNominalView));