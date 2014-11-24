var ContactoView = (function ($, BaseView, renderer) {
    "use strict";
    
    var contactoView = BaseView.extend({
        tagName: 'div',
        asideMenu: null,

        attributes: {
            'id': 'contacto',
            'class': 'panel',
            'data-nav': 'consultas_nav'
        },
        
        initialize: function (attributes, options) {
            options = options || {};
            options.renderer = renderer;
		    BaseView.prototype.initialize.call(this, attributes, options);
        },
        
        template: _.template(
            '<div class="contacto">'+
            '<span class="nombreMinisterioSalud">Ministerio de Salud de la Nación</span>' +
            '<label>Tel</label><span class="telefonoMinisterioSalud">54-11-4379-9000</span>' +
            '<label>Dirección</label><span class="direccionMinisterioSalud">Av. 9 de Julio 1925 (C1073ABA) - Buenos Aires - República Argentina</span>' +
            '<label>Soporte técnico y asistencia</label>' +
            '<span>soporte@sisa.msal.gov.ar</span></div>')
    });
    
    return contactoView;
}(af, BaseView, AppFrameworkRenderer));