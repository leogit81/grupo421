var EstablecimientoCollectionView = (function ($, common, Backbone, _, renderer, BaseView, EstablecimientoNominal, EstablecimientoNominalView) {
    "use strict";
    
    var establecimientoCollectionView = BaseView.extend({
        tagName: 'div',
        className: 'panel consulta-detallada',
        
        attributes: {
            'id': 'resultadoConsultaGeneralEstablecimiento',
            'data-title': 'Consulta General de Establecimientos',
            'data-nav': "consultas_nav"
        },
        
        template : _.template("<ul class='list'><%= renderedHtml %></ul>"),

        renderedHtml: null,
        
        armarHtml: function (establecimientos) {
            this.renderedHtml = "";
            _.each(establecimientos, this.itemTemplate, this);
        },
                                   
        itemTemplate: function (establecimiento) {
            var temp = "<li><a><%=nombre%></br><span class='codigoEstablecimiento'> <%=codigo%> </span> - <%=provincia%></a></li>";
            this.renderedHtml += _.template(temp, establecimiento);
        },
        
        self: this,
        
		initialize: function (attributes, options) {
            options = options || {};
            options.renderer = renderer;
            BaseView.prototype.initialize.call(this, attributes, options);
            this.setModel(attributes);
        },
        
        cantidadDeEstablecimientos: 0,
        
        render: function (model, collection, options) {
            //TODO: esto hay que corregirlo, es un parche para evitar que me haga un render para cada establecimiento que se agrega a la colección.
            this.cantidadDeEstablecimientos++;
            if (this.cantidadDeEstablecimientos < collection.length) {
                return;
            } else {
                this.cantidadDeEstablecimientos = 0;
            }
            //fin del parche
            
            this.$el.empty();
            this.armarHtml(this.model.toJSON());
            this.$el.append(this.template({"renderedHtml": this.renderedHtml}));
            
            if (!common.isEmpty(this.renderer)) {
                this.renderer.render(this);
            }
            
            //agrego esta clase para poder aplicar estilos CSS
            $("#resultadoConsultaGeneralEstablecimiento").addClass("consulta-detallada");
            
            return this;
        },
        
        busquedaNominalEstablecimiento: function (eventData) {
            var codigoEstablecimiento = this.getCodigoEstablecimientoFromSelectedItem(eventData.currentTarget.outerHTML);
            
            var establecimientoNominalModel = new EstablecimientoNominal();
            EstablecimientoNominalView.getInstance().renderEmptyView();
            EstablecimientoNominalView.getInstance().setModel(establecimientoNominalModel);
            establecimientoNominalModel.load(codigoEstablecimiento);
        },
        
        getCodigoEstablecimientoFromSelectedItem: function (selectedItem) {
            return common.trim($(selectedItem).find("span.codigoEstablecimiento").html());
        },
        
        attachEvents: function() {
            $("#afui").delegate("#resultadoConsultaGeneralEstablecimiento ul li a", "click", _.bind(this.busquedaNominalEstablecimiento, this));
        }
        
	});
    
    establecimientoCollectionView.prototype.setModel = function (attributes) {
        if (attributes !== undefined && attributes.model !== undefined) {
            this.model = attributes.model;
        } else {
            return;
        }
        
        //this.model.on('change', this.render, this);
        this.model.on('remove', this.render, this);
        this.model.on('add', this.render, this);
    };
	
	return establecimientoCollectionView;
}(af, common, Backbone, _, AppFrameworkRenderer, BaseView, EstablecimientoNominal, EstablecimientoNominalView2));