var AcercaDeView = (function ($, BaseView, renderer) {
    "use strict";
    
    var acercaDeView = BaseView.extend({
        tagName: 'div',

        attributes: {
            'id': 'acercaDe',
            'class': 'panel',
            'data-nav': 'consultas_nav'
        },
        
        initialize: function (attributes, options) {
            options = options || {};
            options.renderer = renderer;
		    BaseView.prototype.initialize.call(this, attributes, options);
        },
        
        template: _.template(
            '<div class="acercaDe">' +
            '<div class="logo"><img src="<%=urlImagen%>"></div>' +
            '<div><span class="nombreAplicacion"><%=nombreAplicacion%></span></div>' +
            '<div class="row"><label>Versión</label></div><div><span class="version"><%=version%></span>' +
            '</div></div>')
    });
    
    return acercaDeView;
}(af, BaseView, AppFrameworkRenderer));