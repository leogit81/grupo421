var NoticiaNominalView = (function ($, MasterView, renderer) {
    "use strict";

    var noticiaNominalView = MasterView.extend({
        tagName: 'div',
        className: 'panel consulta-detallada',

        attributes: {
            'id': 'resultadoConsultaNoticia',
            'data-nav': "consultas_nav",
            'data-modal': true
        },

        template : _.template("<div><h1><%=titulo%></h1></br>" +
                              "<h6><i><%=fecha%></i></h6></br>" +
                              "<p><%=detalle%></p></div></br>"
                             ),

        initialize: function (attributes, options) {
            options = options || {};
            options.renderer = renderer;
            MasterView.prototype.initialize.call(this, attributes, options);
        },

        setModel: function (model) {
            MasterView.prototype.setModel.call(this, model);
        }
    });

    noticiaNominalView.prototype.renderHtml = function () {
        BaseView.prototype.renderHtml.call(this);
        document.getElementsByClassName('button icon close')[0].onclick = function() {af.ui.hideModal();};
        return this;
    };
    return noticiaNominalView;
}(af, MasterView, AppFrameworkRenderer));