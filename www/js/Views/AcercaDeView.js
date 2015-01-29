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
            '<div class="logo"></div>' +
            '<div><span class="nombreAplicacion"><%=nombreAplicacion%></span></div>' +
            '<div class="row"><label>Versión</label></div><div><span class="version"><%=version%></span>' +
            '</div></div>'),
        
        initialize: function (attributes, options) {
            options = options || {};
            options.renderer = renderer;
		    BaseView.prototype.initialize.call(this, attributes, options);
        },
        
        render: function () {
            BaseView.prototype.render.call(this);
            
            var idImagen = this.model.get("idImagen");
            var imagenHtmlEl = document.getElementById(idImagen);
            if (imagenHtmlEl !== undefined || imagenHtmlEl !== null) {
                var imagenHtmlElCloned = imagenHtmlEl.cloneNode();
                $(this.getViewSelector()).find(".logo")[0].appendChild(imagenHtmlElCloned);
                $(this.getViewSelector()).find(".logo img").css("visibility", "visible")
            }
            
            return this;
        }
    });
    
    return acercaDeView;
}(af, BaseView, AppFrameworkRenderer));