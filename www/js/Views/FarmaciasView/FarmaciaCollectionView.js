var FarmaciaCollectionView = (function ($, common, Backbone, _, renderer, BaseView, FarmaciaNominal, FarmaciaNominalView) {
    "use strict";
    
    var farmaciaCollectionView = BaseView.extend({
        tagName: 'div',
        className: 'panel consulta-detallada',
        
        attributes: {
            'id': 'resultadoConsultaGeneralFarmacia',
            'data-title': 'REFAR',
            'data-nav': "consultas_nav"
        },
        
        template : _.template("<ul class='list'><%= renderedHtml %></ul>"),

        renderedHtml: null,
        
        armarHtml: function (farmacias) {
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
        },
        
        busquedaNominalFarmacia: function (eventData) {
            var codigoFarmacia = this.getCodigoFarmaciaFromSelectedItem(eventData.currentTarget.outerHTML);
            
            var farmaciaNominalModel = new FarmaciaNominal();
            //EstablecimientoNominalView.getInstance().setModel(establecimientoNominalModel);
            var farmaciaView = new FarmaciaNominalView();
            farmaciaView.setModel(farmaciaNominalModel);
            farmaciaNominalModel.load(codigoFarmacia);
            //EstablecimientoNominalView.getInstance().ejecutarConsultaEstablecimiento(codigoEstablecimiento);
            /*var establecimientoNominalView = new EstablecimientoNominalView();
            establecimientoNominalView.ejecutarConsultaNominalEstablecimiento(codigoEstablecimiento);*/
        },
        
        getCodigoFarmaciaFromSelectedItem: function (selectedItem) {
            return common.trim($(selectedItem).find("span.codigoFarmacia").html());
        },
        
        attachEvents: function() {
            BaseView.prototype.attachEvents.call(this);
            $("#afui").delegate("#resultadoConsultaGeneralFarmacia ul li a", "click", _.bind(this.busquedaNominalFarmacia, this));
        }
        
	});
    
    farmaciaCollectionView.prototype.setModel = function (attributes) {
        if (attributes !== undefined && attributes.model !== undefined) {
            this.model = attributes.model;
        } else {
            return;
        }
        
        //this.model.on('change', this.render, this);
        this.model.on('remove', this.render, this);
        this.model.on('add', this.render, this);
    };
	
	return farmaciaCollectionView;
}(af, common, Backbone, _, AppFrameworkRenderer, BaseView, FarmaciaNominal, FarmaciaNominalView));
