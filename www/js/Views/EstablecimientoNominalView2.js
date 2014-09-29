var EstablecimientoNominalView2 = (function($, BaseView, EstablecimientoNominalGeneralView){
    
    var establecimientoNominalView = TabPanelView.extend({
        tagName: 'div',
        className: 'panel consulta-detallada',
        
        attributes: {
            'id': 'resultadoConsultaNominalEstablecimiento',
            'data-title':'Consulta Nominal de Establecimiento',
            'data-nav':"consultas_nav",    
        },
        
        tabs: [
            {
                tabName: "General",
                panelId: "establecimientoGeneral",
                view: EstablecimientoNominalGeneralView
            },
            {
                tabName: "Prestaciones",
                panelId: "establecimientoPrestaciones",
                view: new BaseView()
            },
            {
                tabName: "Imágenes",
                panelId: "establecimientoImagenes",
                view: new BaseView()
            },
            {
                tabName: "Mapas",
                panelId: "establecimientoMapas",
                view: new BaseView()
            }
        ],
                              
		initialize: function(attributes, options) {
            TabPanelView.prototype.initialize.call(this, attributes, options);
            
            var tabGeneral = this.findTab("General");
            tabGeneral.view = tabGeneral.view.getInstance({
                model: this.model
            });
        },
        
        render: function(){
            TabPanelView.prototype.render.call(this);

            //la primera vez agrega el panel con el resultado de la consulta, las siguientes veces actualiza el contenido del panel
            if ($("#resultadoConsultaNominalEstablecimiento").length <= 0){
                $.ui.addContentDiv("resultadoConsultaNominalEstablecimiento", this.$el[0].outerHTML);//div panel + contenido
            }else
            {
                $.ui.updatePanel("resultadoConsultaNominalEstablecimiento", this.$el.html());//solo contenido para actualizar
            }
            $.ui.loadContent("resultadoConsultaNominalEstablecimiento", false, false, "slide");
            $("#resultadoConsultaNominalEstablecimiento").addClass("consulta-detallada"); //agrego esta clase para poder aplicar estilos CSS
            return this;
        },
	});
	
	return establecimientoNominalView;
})(af, BaseView, EstablecimientoNominalGeneralView);