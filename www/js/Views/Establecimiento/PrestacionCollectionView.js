var PrestacionCollectionView = (function ($, common, Backbone, _, renderer, BaseView) {
    "use strict";
    
    var prestacionCollectionView = BaseView.extend({
        tagName: 'div',
        className: 'panel consulta-detallada',
        
        attributes: {
            'id': 'resultadoConsultaNominalPrestacionesEstablecimiento',
            'data-title': 'Consulta Nominal de Prestaciones de Establecimientos',
            'data-nav': "consultas_nav"
        },
        
        template : _.template("<ul class='list'><%= renderedHtml %></ul>"),

        renderedHtml: null,
        
        armarHtmlConData: function (prestaciones) {
            this.renderedHtml = "";
            _.each(prestaciones, this.itemTemplate, this);
            this.$el.html(this.renderedHtml);
        },
                                   
        itemTemplate: function (prestacion) {
            var temp = "<li><a><span><%=nombre%></span></a></li>";
            this.renderedHtml += _.template(temp, prestacion);
        },
        
        self: this,
        
		initialize: function (attributes, options) {
            options = options || {};
            options.renderer = renderer;
            BaseView.prototype.initialize.call(this, attributes, options);
        },
        
        cantidadDePrestaciones: 0,
        
        render: function (model, collection, options) {
            //TODO: esto hay que corregirlo, es un parche para evitar que me haga un render para cada prestacion que se agrega a la colección.
            this.cantidadDePrestaciones++;
            if (this.cantidadDePrestaciones < collection.length) {
                return;
            } else {
                this.cantidadDePrestaciones = 0;
            }
            //fin del parche
            
            /*this.$el.empty();
            this.armarHtml(this.model.toJSON());
            this.$el.append(this.template({"renderedHtml": this.renderedHtml}));
            
            if (!common.isEmpty(this.renderer)) {
                this.renderer.render(this);
            }*/
            
            //agrego esta clase para poder aplicar estilos CSS
            $("#resultadoConsultaNominalPrestacionesEstablecimiento").addClass("consulta-detallada");
            
            BaseView.prototype.render.call(this);
            return this;
        }
	});
    
    prestacionCollectionView.prototype.setModel = function (attributes, options) {
        BaseView.prototype.setModel.call(this, attributes, options);
        
        this.model.off("change");
        //this.model.on('remove', this.render, this);
        //this.model.on('add', this.render, this);
    };
	
	return prestacionCollectionView;
}(af, common, Backbone, _, AppFrameworkRenderer, BaseView));