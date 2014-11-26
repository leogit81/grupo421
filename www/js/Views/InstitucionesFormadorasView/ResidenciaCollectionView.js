var ResidenciaCollectionView = (function ($, common, Backbone, _, renderer, BaseView) {
    "use strict";

    var residenciaView = BaseCollectionView.extend({
        tagName: 'div',
        className: 'panel consulta-detallada',

        attributes: {
            'id': 'resultadoConsultaResidencia',
            'data-nav': "consultas_nav"
        },

        itemTemplateString : "<li>" +
            "<div style='text-align: center;'><h2><span class='znombre'><%=especialidad%></span></h2></div></br>" +
            "<div><h4><span class='znombre'><%=nombre%></span> - (<span><%=provincia%></span>)</div></h4></br>" +
            "<div><label>Localidad: </label><span><%=localidad%></span></div></br>" +
            "<div><label>Dependencia: </label><span><%=dependenciaEstablecimiento%></span></div></br>" +
            "<div><label>Categoria: </label><span><%=categoria%></span></div></br>" +
            "</li>"
    });
    return residenciaView;
}(af, common, Backbone, _, AppFrameworkRenderer, BaseView));