define(['require', 'appframework', 'Base/MasterView', 'Views/CoordenadasMapaView', 'Views/DomicilioView', 'Views/TelefonoView'], 
function(require, $, MasterView, CoordenadasMapaView, DomicilioView, TelefonoView){
    
    MinisterioView = MasterView.extend({
        tagName: 'div',
        className: 'panel consulta-detallada',
        
        attributes: {
            'id': 'resultadoConsultaMinisterio',
            'data-title':'Consulta nominal de Ministerio',
            'data-nav':"consultas_nav",    
        },
        
        template : _.template("<div><label>Localidad</label><span><%=localidad%></span></div></br>" +
                      "<div><label>EMail</label><span><%=mail1%></span></div></br>" +
                      "<div><label>Ministro de Salud</label><span><%=ministroDeSalud%></span></div></br>" +
                      "<div><label>Nombre</label><span><%=nombre%></span></div></br>" +
                      "<div><label>Provincia</label><span><%=provincia%></span></div></br>" +
                      "<div><label>Sitio Web</label><span><%=sitioWeb%></span></div></br>"),
                              
		initialize: function(attributes, options) {
		    MasterView.prototype.initialize.call(this, attributes, options);
		    
            var coordenadaView = new CoordenadasMapaView({
                model: this.model.get("coordenadasDeMapa"), 
            });
            
            this.addView(coordenadaView);
            
            var domicilioView = new DomicilioView({
                model: this.model.get("domicilio"), 
            });
            
            this.addView(domicilioView);
            
            var telefonoView1 = new TelefonoView({
                model: this.model.get("telefono1"), 
            });
            
            this.addView(telefonoView1);
            
            var telefonoView2 = new TelefonoView({
                model: this.model.get("telefono2"), 
            });
            
            this.addView(telefonoView2);
            
            var telefonoView3 = new TelefonoView({
                model: this.model.get("telefono3"), 
            });
            
            this.addView(telefonoView3);
            
            var telefonoView4 = new TelefonoView({
                model: this.model.get("telefono4"), 
            });
            
            this.addView(telefonoView4);
        },
        
        render: function(){
            MasterView.prototype.render.call(this);
            $.ui.addContentDiv("resultadoConsultaMinisterio", this.$el[0].outerHTML);
            $.ui.loadContent("resultadoConsultaMinisterio", false, false, "slide");
            $("#resultadoConsultaMinisterio").addClass("consulta-detallada"); //agrego esta clase para poder aplicar estilos CSS
            return this;
        },
        
        createScroller: function(){
            this.scroller = $("#resultadoConsultaMinisterio").scroller({
               verticalScroll:true,
               horizontalScroll:false,
               autoEnable:true
            });
        }
	});
	
	return MinisterioView;
});