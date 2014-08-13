define(['appframework', 'Base/BaseView'], 
function($, BaseView){
    
    EstablecimientoView = BaseView.extend({
        tagName: 'div',
        className: 'panel consulta-detallada',
        
        attributes: {
            'id': 'resultadoConsultaEstablecimiento',
            'data-title':'Consulta general de Establecimiento',
            'data-nav':"consultas_nav",    
        },
        
        template : _.template("<div><label>codIndecProvincia</label><span><%=codIndecProvincia%></span></div></br>" +
                      "<div><label>Codigo</label><span><%=codigo%></span></div></br>" +
                      "<div><label>Dependencia</label><span><%=dependencia%></span></div></br>" +
                      "<div><label>fechaModificacion</label><span><%=fechaModificacion%></span></div></br>" +
                      "<div><label>fechaRegistro</label><span><%=fechaRegistro%></span></div></br>" +
                      "<div><label>Nombre</label><span><%=nombre%></span></div></br>" +
					  "<div><label>Provincia</label><span><%=provincia%></span></div></br>" +
					  "<div><label>Tipologia</label><span><%=tipologia%></span></div></br>" ),
                              
		initialize: function(attributes, options) {
		    BaseView.prototype.initialize.call(this, attributes, options);
        },
        
        render: function(){
            BaseView.prototype.render.call(this);
            //la primera vez agrega el panel con el resultado de la consulta, las siguientes veces actualiza el contenido del panel
            if ($("#resultadoConsultaEstablecimiento").length <= 0){
                $.ui.addContentDiv("resultadoConsultaEstablecimiento", this.$el[0].outerHTML);//div panel + contenido
            }else
            {
                $.ui.updatePanel("resultadoConsultaEstablecimiento", this.$el.html());//solo contenido para actualizar
            }
            $.ui.loadContent("resultadoConsultaEstablecimiento", false, false, "slide");
            $("#resultadoConsultaEstablecimiento").addClass("consulta-detallada"); //agrego esta clase para poder aplicar estilos CSS
            return this;
        },
	});
	
	return EstablecimientoView;
});