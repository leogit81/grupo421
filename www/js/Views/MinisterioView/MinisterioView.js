var MinisterioView = (function ($, MasterView, CoordenadasMapaView, DomicilioView, TelefonoView, renderer) {
    "use strict";
    
    var ministerioView = MasterView.extend({
        tagName: 'div',
        className: 'panel consulta-detallada',
        
        attributes: {
            'id': 'resultadoConsultaMinisterio',
//            'data-title': 'Consulta nominal de Ministerio',
            'data-nav': "consultas_nav"
        },
        
        template : _.template("<div><label>Localidad</label><span><%=localidad%></span></div></br>" +
                                "<div><label>EMail</label><span><%=mail1%></span></div></br>" +
                                "<div><label>Ministro de Salud</label><span><%=ministroDeSalud%></span></div></br>" +
                                "<div><label>Nombre</label><span><%=nombre%></span></div></br>" +
                                "<div><label>Provincia</label><span><%=provincia%></span></div></br>" +
                                "<div><label>Sitio Web</label><span><%=sitioWeb%></span></div></br>" +
                                "<h3>Coordenadas:</h3><div id='coordenadasDeMapaMinisterio'></div></br>" +
                                "<h3>Domicilio:</h3><div id='domicilioMinisterio'></div></br>" +
                                "<h3>Telefonos:</h3>" +
                                "<div id='telefono1Ministerio'></div></br>" +
                                "<div id='telefono2Ministerio'></div></br>" +
                                "<div id='telefono3Ministerio'></div></br>" +
                                "<div id='telefono4Ministerio'></div></br>"),
                              
		initialize: function (attributes, options) {
            options = options || {};
            options.renderer = renderer;
            
            this.createNestedViewsDictionary(this);
            
		    MasterView.prototype.initialize.call(this, attributes, options);
		    var coordenadaView, domicilioView, telefonoView1, telefonoView2, telefonoView3, telefonoView4;
            
            coordenadaView = new CoordenadasMapaView(this.getModelOrDefault("coordenadasDeMapa"));
            this.addView(coordenadaView, "coordenadasDeMapa", "coordenadasDeMapaMinisterio");
            
            domicilioView = new DomicilioView(this.getModelOrDefault("domicilio"));
            this.addView(domicilioView, "domicilio", "domicilioMinisterio");
            
            telefonoView1 = new TelefonoView(this.getModelOrDefault("telefono1"));
            this.addView(telefonoView1, "telefono1", "telefono1Ministerio");
            
            telefonoView2 = new TelefonoView(this.getModelOrDefault("telefono2"));
            this.addView(telefonoView2, "telefono2", "telefono2Ministerio");
            
            telefonoView3 = new TelefonoView(this.getModelOrDefault("telefono3"));
            this.addView(telefonoView3, "telefono3", "telefono3Ministerio");
            
            telefonoView4 = new TelefonoView(this.getModelOrDefault("telefono4"));
            this.addView(telefonoView4, "telefono4", "telefono4Ministerio");
        },
        
        /**
        * Setea el modelo para la vista y también actualiza los submodelos de las vistas anidadas.
        */
        setModel: function (model) {
            MasterView.prototype.setModel.call(this, model);
            var coordenadasModel, domicilioModel, telefonoModel1, telefonoModel2, telefonoModel3, telefonoModel4;
            
            coordenadasModel = this.getModelOrDefault("coordenadasDeMapa");
            this.getViewByName("coordenadasDeMapa").setModel(coordenadasModel);
            
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
        }
	});
    
    ministerioView.prototype.renderHtml = function () {
        BaseView.prototype.renderHtml.call(this);
        $("#resultadoConsultaMinisterio").addClass("consulta-detallada"); //agrego esta clase para poder aplicar estilos CSS
        return this;
    };
	
	return ministerioView;
}(af, MasterView, CoordenadasMapaView, DomicilioView, TelefonoView, AppFrameworkRenderer));