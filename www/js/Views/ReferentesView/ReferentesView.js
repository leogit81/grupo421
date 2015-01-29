var ReferentesView = (function ($, common, Backbone, _, renderer, BaseView) {
    "use strict";

    var referentesView = BaseCollectionView.extend({
        tagName: 'div',
        className: 'panel consulta-detallada',

        attributes: {
            'id': 'resultadoConsultaReferentes',
            'data-nav': "consultas_nav"
        },

        itemTemplateString : "<li>" +
            "<div style='text-align: center;'><h3><span class='znombre'><%=nombre%></span> - (<span><%=provincia%></span>)</div></h3></br>" +
            "<div><h4><span><%=lugar%></span></h4></div></br>" +
            "<div><h5><span><%=tipo%></span></h5></div></br>" +
            "<div><label>Mail: </label><a href='mailto:<%=email%>'><%=email%></a></div></br>" +
            "<div><label>Teléfono: </label><span><%=telefono%></span></div></br>" +
            "<div><label>Registro: </label><span><%=registro%></span></div></br>" +
            "</li>",
        
        initialize: function (attributes, options) {
            options = options || {};
            options.renderer = renderer;

            this.idImagen = 'imagenReferentes';

            BaseCollectionView.prototype.initialize.call(this, attributes, options);
        }
    });
    return referentesView;
}(af, common, Backbone, _, AppFrameworkRenderer, BaseView));