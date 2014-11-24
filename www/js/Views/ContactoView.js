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
            '<div><span class="nombreMinisterioSalud">Ministerio de Salud de la Nación</span></div>' +
            '<div class="row"><label>Teléfono</label></div><div><span class="telefonoMinisterioSalud">54-11-4379-9000</span></div>' +
            '<div class="row"><label>Dirección</label></div><div><span class="direccionMinisterioSalud">Av. 9 de Julio 1925 (C1073ABA) - Buenos Aires - República Argentina</span></div>' +
            '<div class="row"><label>Soporte técnico y asistencia</label></div>' +
            '<div><a href="mailto:soporte@sisa.msal.gov.ar">soporte@sisa.msal.gov.ar</a></div></div>')
    });
    
    return contactoView;
}(af, BaseView, AppFrameworkRenderer));