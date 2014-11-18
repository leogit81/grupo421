var ProfesionalCollectionView = (function ($, common, Backbone, _, renderer, BaseView, ProfesionalNominal, ProfesionalNominalView) {
    "use strict";

    var profesionalCollectionView = BaseCollectionView.extend({
        tagName: 'div',
        className: 'panel consulta-detallada',

        attributes: {
            'id': 'resultadoConsultaGeneralProfesional',
            'data-nav': "consultas_nav"
        },

        itemTemplateString: "<li><a><span class='znombre'><%=nombre%> <%=apellido%></span></br><span class='codigoProfesional'><%=codigo%></span></a></li>",

        busquedaNominalProfesional: function (eventData) {
            var codigoProfesional = this.getCodigoProfesionalFromSelectedItem(eventData.currentTarget.outerHTML),
                profesionalNominalView = new ProfesionalNominalView({usuario: ServiceConfig.usuario, 
                                                                     clave: ServiceConfig.clave, 
                                                                     codigo: codigoProfesional});
            profesionalNominalView.loadDefaultView();
        },

        getCodigoProfesionalFromSelectedItem: function (selectedItem) {
            return common.trim($(selectedItem).find("span.codigoProfesional").html());
        }
    });

    profesionalCollectionView.prototype.busquedaNominalItem = function (eventData) {
        this.busquedaNominalProfesional(eventData);
    };
    return profesionalCollectionView;
}(af, common, Backbone, _, AppFrameworkRenderer, BaseView, ProfesionalNominal, ProfesionalNominalView));