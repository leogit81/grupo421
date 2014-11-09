var FarmaciaCollectionView = (function ($, common, Backbone, _, renderer, BaseView, FarmaciaNominal, FarmaciaNominalView) {
    "use strict";
    
    var farmaciaCollectionView = BaseCollectionView.extend({
        tagName: 'div',
        className: 'panel consulta-detallada',
        
        attributes: {
            'id': 'resultadoConsultaGeneralFarmacia',
            'data-nav': "consultas_nav"
        },
        
        itemTemplateString : "<li><a><%=nombre%></br><span class='codigoFarmacia'> <%=codigo%> </span> - <%=provincia%></a></li>",
        
        //template : _.template("<ul class='list'><%= renderedHtml %></ul>"),
        
        /*armarHtml: function (farmacias) {
            this.renderedHtml = "";
            _.each(farmacias, this.itemTemplate, this);
        },
                                   
        itemTemplate: function (farmacia) {
            var temp = "<li><a><%=nombre%></br><span class='codigoFarmacia'> <%=codigo%> </span> - <%=provincia%></a></li>";
            this.renderedHtml += _.template(temp, farmacia);
        },
        
        self: this,
        
		initialize: function (attributes, options) {
            options = options || {};
            options.renderer = renderer;
            BaseView.prototype.initialize.call(this, attributes, options);
            this.setModel(attributes);
        },
        
        cantidadDeFarmacias: 0,
        
        render: function (model, collection, options) {
            //TODO: esto hay que corregirlo, es un parche para evitar que me haga un render para cada establecimiento que se agrega a la colección.
            this.cantidadDeFarmacias++;
            if (this.cantidadDeFarmacias < collection.length) {
                return;
            } else {
                this.cantidadDeFarmacias = 0;
            }
            //fin del parche
            
            this.$el.empty();
            this.armarHtml(this.model.toJSON());
            this.$el.append(this.template({"renderedHtml": this.renderedHtml}));
            
            if (!common.isEmpty(this.renderer)) {
                this.renderer.render(this);
            }
            
            //agrego esta clase para poder aplicar estilos CSS
            $("#resultadoConsultaGeneralFarmacia").addClass("consulta-detallada");
            
            //TODO: ESTO NO TIENE QUE ESTAR ACÁ PORQUE YA ESTÁ EN LA CLASE BaseView
            $.ui.hideMask();
            
            return this;
        },*/
        
        busquedaNominalFarmacia: function (eventData) {
            var codigoFarmacia = this.getCodigoFarmaciaFromSelectedItem(eventData.currentTarget.outerHTML),
                farmaciaNominalView = new FarmaciaNominalView({codigo: codigoFarmacia});
                farmaciaNominalView.loadDefaultView();
            
            /*var farmaciaNominalModel = new FarmaciaNominal();
            var farmaciaView = new FarmaciaNominalView();
            farmaciaView.setModel(farmaciaNominalModel);
            farmaciaNominalModel.load(codigoFarmacia);*/
        },
        
        getCodigoFarmaciaFromSelectedItem: function (selectedItem) {
            return common.trim($(selectedItem).find("span.codigoFarmacia").html());
        },
        
        /*attachEvents: function() {
            BaseView.prototype.attachEvents.call(this);
            $("#afui").delegate("#resultadoConsultaGeneralFarmacia ul li a", "click", _.bind(this.busquedaNominalFarmacia, this));
        }*/
	});
    
    /*farmaciaCollectionView.prototype.setModel = function (attributes) {
        if (attributes !== undefined && attributes.model !== undefined) {
            this.model = attributes.model;
        } else {
            return;
        }
        
        //this.model.on('change', this.render, this);
        this.model.on('remove', this.render, this);
        this.model.on('add', this.render, this);
    };*/
    farmaciaCollectionView.prototype.busquedaNominalItem = function (eventData) {
        this.busquedaNominalFarmacia(eventData);
    };
	
	return farmaciaCollectionView;
}(af, common, Backbone, _, AppFrameworkRenderer, BaseView, FarmaciaNominal, FarmaciaNominalView));
