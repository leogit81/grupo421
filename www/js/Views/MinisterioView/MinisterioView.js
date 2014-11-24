var MinisterioView = (function ($, common, MasterView, /*CoordenadasMapaView,*/ DomicilioView, TelefonoView, renderer) {
    "use strict";
    
    var ministerioView = MasterView.extend({
        tagName: 'div',
        className: 'panel consulta-detallada',
        
        attributes: {
            'id': 'resultadoConsultaMinisterio',
            'data-nav': "consultas_nav",
            'data-footer': 'none'
        },
        
        /**
        * Devuelve true cuando el ministerio no tiene ningún teléfono.
        */
        noHayNingunTelefono: function () {
            /*var telefono1 = this.getViewByName("telefono1"),
                telefono2 = this.getViewByName("telefono2"),
                telefono3 = this.getViewByName("telefono3"),
                telefono4 = this.getViewByName("telefono4");*/
            
            return !this.telefonoView1.hayTelefono() 
            && !this.telefonoView2.hayTelefono() 
            && !this.telefonoView3.hayTelefono()
            && !this.telefonoView4.hayTelefono();
        },
        
        telefonoView1: null,
        telefonoView2: null,
        telefonoView3: null,
        telefonoView4: null,
        
        template : _.template(
            "<div class='row'><span class='nombreMinisterio'><%=nombre%></span></div>" +
            "<div class='row'><label>Ministro de Salud</label></div>" + 
            "<div class='row'><span class='ministroSalud'><%=ministroDeSalud%></span></div>" +
            "<div class='row'><label class='direccion'>Dirección</label>" +
            "<div id='domicilioMinisterio'></div> - " +
            "<span class='localidad'><%=localidad%></span> - " +
            "<span class='provincia'><%=provincia%></span></div>" +
            "<% if (!this.noHayNingunTelefono()) { %><div class='row'><label class='labelTelefonos'>Telefonos</label><div><% } else {%>No hay información disponible de teléfonos.<% } %>" +
            "<% if (this.telefonoView1.hayTelefono()) {%><div class='row' id='telefono1Ministerio'></div><% } %>" +
            "<% if (this.telefonoView2.hayTelefono()) {%><div class='row' id='telefono2Ministerio'></div><% } %>" +
            "<% if (this.telefonoView3.hayTelefono()) {%><div class='row' id='telefono3Ministerio'></div><% } %>" +
            "<% if (this.telefonoView4.hayTelefono()) {%><div class='row' id='telefono4Ministerio'></div><% } %>" +
            "<% if (!common.isEmpty(this.model.get('mail1'))) {%><div class='row'><label>Contacto</label></div><% } %>" +
            "<% if (!common.isEmpty(this.model.get('mail1'))) {%><div class='row' class='row'><a href='mailto:<%=mail1%>'><%=mail1%></a></div><% } %>" +
            "<% if (!common.isEmpty(this.model.get('sitioWeb'))) {%><div class='row'><label>Sitio Web</label></div><% } %>" +
            "<% if (!common.isEmpty(this.model.get('sitioWeb'))) {%><div class='row'><a href='<%=sitioWeb%>'><%=sitioWeb%></a></div><% } %>"),
                              
		initialize: function (attributes, options) {
            options = options || {};
            options.renderer = renderer;
            
            this.createNestedViewsDictionary(this);
            
		    MasterView.prototype.initialize.call(this, attributes, options);
		    var coordenadaView, domicilioView, telefonoView1, telefonoView2, telefonoView3, telefonoView4;
            
            /*coordenadaView = new CoordenadasMapaView(this.getModelOrDefault("coordenadasDeMapa"));
            this.addView(coordenadaView, "coordenadasDeMapa", "coordenadasDeMapaMinisterio");*/
            
            domicilioView = new DomicilioView(this.getModelOrDefault("domicilio"));
            this.addView(domicilioView, "domicilio", "domicilioMinisterio");
            domicilioView.template = domicilioView.template2;
            
            this.telefonoView1 = new TelefonoView(this.getModelOrDefault("telefono1"));
            this.addView(this.telefonoView1, "telefono1", "telefono1Ministerio");
            this.telefonoView1.template = this.telefonoView1.template2;
            
            this.telefonoView2 = new TelefonoView(this.getModelOrDefault("telefono2"));
            this.addView(this.telefonoView2, "telefono2", "telefono2Ministerio");
            this.telefonoView2.template = this.telefonoView2.template2;
            
            this.telefonoView3 = new TelefonoView(this.getModelOrDefault("telefono3"));
            this.addView(this.telefonoView3, "telefono3", "telefono3Ministerio");
            this.telefonoView3.template = this.telefonoView3.template2;
            
            this.telefonoView4 = new TelefonoView(this.getModelOrDefault("telefono4"));
            this.addView(this.telefonoView4, "telefono4", "telefono4Ministerio");
            this.telefonoView4.template = this.telefonoView4.template2;
        },
        
        /**
        * Setea el modelo para la vista y también actualiza los submodelos de las vistas anidadas.
        */
        setModel: function (model) {
            MasterView.prototype.setModel.call(this, model);
            var coordenadasModel, domicilioModel, telefonoModel1, telefonoModel2, telefonoModel3, telefonoModel4;
            
            /*coordenadasModel = this.getModelOrDefault("coordenadasDeMapa");
            this.getViewByName("coordenadasDeMapa").setModel(coordenadasModel);*/
            
            domicilioModel = this.getModelOrDefault("domicilio");
            this.getViewByName("domicilio").setModel(domicilioModel);
            
            telefonoModel1 = this.getModelOrDefault("telefono1");
            this.getViewByName("telefono1").setModel(telefonoModel1);
            
            telefonoModel2 = this.getModelOrDefault("telefono2");
            this.getViewByName("telefono2").setModel(telefonoModel2);
            
            telefonoModel3 = this.getModelOrDefault("telefono3");
            this.getViewByName("telefono3").setModel(telefonoModel3);
            
            telefonoModel4 = this.getModelOrDefault("telefono4");
            this.getViewByName("telefono4").setModel(telefonoModel4);
        },
        
        armarHtmlConData: function (data) {
            MasterView.prototype.armarHtmlConData.call(this, data);
            var contentHtml = this.$el.html();
            this.renderedHtml = this.$el.html("<div class='ministerio'>" + contentHtml + "</div>");
        }
	});
    
    ministerioView.prototype.renderHtml = function () {
        BaseView.prototype.renderHtml.call(this);
        //agrego esta clase para poder aplicar estilos CSS
        $("#resultadoConsultaMinisterio").addClass("consulta-detallada");
        $("#resultadoConsultaMinisterio").addClass("ministerio");
        return this;
    };
	
	return ministerioView;
}(af, common, MasterView, /*CoordenadasMapaView, */DomicilioView, TelefonoView, AppFrameworkRenderer));