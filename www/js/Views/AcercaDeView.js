var AcercaDeView = (function ($, BaseView, renderer) {
    "use strict";
    
    var acercaDeView = BaseView.extend({
        tagName: 'div',

        attributes: {
            'id': 'acercaDe',
            'class': 'panel',
            'data-nav': 'consultas_nav'
        },
        
        template: _.template(
            '<div class="acercaDe">' +
            '<div class="logo"><img src="<%=urlImagen%>"></div>' +
            '<div><span class="nombreAplicacion"><%=nombreAplicacion%></span></div>' +
            '<div class="row"><label>Versión</label></div><div><span class="version"><%=version%></span>' +
            '</div></div>'),
        
        initialize: function (attributes, options) {
            options = options || {};
            options.renderer = renderer;
		    BaseView.prototype.initialize.call(this, attributes, options);
        }
    });
    
    /*Fix para WP8, porque no se mostraban correctamente las imágenes
    En lugar de armar la vista en forma dinámica, ya se encuentra creada en el index.html
    y lo que se hace es hacerla visible solamente*/
    acercaDeView.prototype.renderHtml = function () {
		$("#acercaDeView .nombreAplicacion").html(this.model.get('nombreAplicacion'));
        $("#acercaDeView .version").html(this.model.get('version'));
        
        $.ui.loadContent("acercaDeView", false, false, 'slide');
        
        //agrego esta clase para poder aplicar estilos CSS
        $("#acercaDeView").trigger("orientationchange");
	};
    
    return acercaDeView;
}(af, BaseView, AppFrameworkRenderer));