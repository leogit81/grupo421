var EstablecimientoCollectionView = (function($, BaseView){
    
    var establecimientoCollectionView = BaseView.extend({
        tagName: 'div',
        className: 'panel consulta-detallada',
        
        attributes: {
            'id': 'resultadoConsultaEstablecimiento',
            'data-title':'Consulta general de Establecimiento',
            'data-nav':"consultas_nav",    
        },
        
        template : _.template(
                        "<ul class='list'><%= renderedHtml %></ul>"
                      ),

        renderedHtml: null,
        
        armarHtml: function(establecimientos){
            this.renderedHtml = "";            
            _.each(establecimientos, this.itemTemplate, this);
        },
                                   
        itemTemplate: function(establecimiento){
            var temp = "<li><a><%=nombre%></br><%=codigo%> - <%=provincia%></a></li>";
            this.renderedHtml += _.template(temp, establecimiento);
        },
        
		initialize: function(attributes, options) {
		    Backbone.View.prototype.initialize.call(this, attributes, options);
            
            if(attributes !== undefined && attributes.model !== undefined){
                this.model = attributes.model;
                /*this.model.on('change', this.render, this);
                this.model.on('remove', this.render, this);*/
                this.model.on('add', this.render, this);
            }
        },
        
        cantidadDeEstablecimientos: 0,
        
        render: function(model, collection, options){
            //TODO: esto hay que corregirlo, es un parche para evitar que me haga un render para cada establecimiento que se agrega a la colección.
            this.cantidadDeEstablecimientos++;
            if (this.cantidadDeEstablecimientos < collection.length){
                return;
            }
            else{
                this.cantidadDeEstablecimientos = 0;
            }
            //fin del parche
            
            this.$el.empty();
            /*this.$el.append(this.template(
                {"establecimientos": this.model.toJSON(),
                "itemTemplate": this.itemTemplate}));*/
           this.armarHtml(this.model.toJSON());
           this.$el.append(this.template({"renderedHtml": this.renderedHtml}));
            
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
	
	return establecimientoCollectionView;
})(af, BaseView);