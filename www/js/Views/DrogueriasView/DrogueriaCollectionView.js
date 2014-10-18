var DrogueriaCollectionView = (function ($, common, Backbone, _, renderer, BaseView, DrogueriaNominal, DrogueriaNominalView) {
    "use strict";
    
    var drogueriaCollectionView = BaseView.extend({
        tagName: 'div',
        className: 'panel consulta-detallada',
        
        attributes: {
            'id': 'resultadoConsultaGeneralDrogueria',
            'data-title': 'REDRO',
            'data-nav': "consultas_nav"
        },
        
        template : _.template("<ul class='list'><%= renderedHtml %></ul>"),

        renderedHtml: null,
        
        armarHtml: function (droguerias) {
            this.renderedHtml = "";
            _.each(droguerias, this.itemTemplate, this);
        },
                                   
        itemTemplate: function (drogueria) {
            var temp = "<li><a><%=nombre%></br><span class='codigoDrogueria'> <%=codigo%> </span> - <%=provincia%></a></li>";
            this.renderedHtml += _.template(temp, drogueria);
        },
        
        self: this,
        
		initialize: function (attributes, options) {
            options = options || {};
            options.renderer = renderer;
            BaseView.prototype.initialize.call(this, attributes, options);
            this.setModel(attributes);
        },
        
        cantidadDeDroguerias: 0,
        
        render: function (model, collection, options) {
            //TODO: esto hay que corregirlo, es un parche para evitar que me haga un render para cada establecimiento que se agrega a la colección.
            this.cantidadDeDroguerias++;
            if (this.cantidadDeDroguerias < collection.length) {
                return;
            } else {
                this.cantidadDeDroguerias = 0;
            }
            //fin del parche
            
            this.$el.empty();
            this.armarHtml(this.model.toJSON());
            this.$el.append(this.template({"renderedHtml": this.renderedHtml}));
            
            if (!common.isEmpty(this.renderer)) {
                this.renderer.render(this);
            }
            
            //agrego esta clase para poder aplicar estilos CSS
            $("#resultadoConsultaGeneralDrogueria").addClass("consulta-detallada");
            
            //TODO: ESTO NO TIENE QUE ESTAR ACÁ PORQUE YA ESTÁ EN LA CLASE BaseView
            $.ui.hideMask();
            
            return this;
        },
        
        busquedaNominalDrogueria: function (eventData) {
            var codigoDrogueria = this.getCodigoDrogueriaFromSelectedItem(eventData.currentTarget.outerHTML);
            
            var drogueriaNominalModel = new DrogueriaNominal();
            //EstablecimientoNominalView.getInstance().setModel(establecimientoNominalModel);
            var drogueriaView = new DrogueriaNominalView();
            drogueriaView.setModel(drogueriaNominalModel);
            drogueriaNominalModel.load(codigoDrogueria);
            //EstablecimientoNominalView.getInstance().ejecutarConsultaEstablecimiento(codigoEstablecimiento);
            /*var establecimientoNominalView = new EstablecimientoNominalView();
            establecimientoNominalView.ejecutarConsultaNominalEstablecimiento(codigoEstablecimiento);*/
        },
        
        getCodigoDrogueriaFromSelectedItem: function (selectedItem) {
            return common.trim($(selectedItem).find("span.codigoDrogueria").html());
        },
        
        attachEvents: function() {
            BaseView.prototype.attachEvents.call(this);
            $("#afui").delegate("#resultadoConsultaGeneralDrogueria ul li a", "click", _.bind(this.busquedaNominalDrogueria, this));
        }
        
	});
    
    drogueriaCollectionView.prototype.setModel = function (attributes) {
        if (attributes !== undefined && attributes.model !== undefined) {
            this.model = attributes.model;
        } else {
            return;
        }
        
        //this.model.on('change', this.render, this);
        this.model.on('remove', this.render, this);
        this.model.on('add', this.render, this);
    };
	
	return drogueriaCollectionView;
}(af, common, Backbone, _, AppFrameworkRenderer, BaseView, DrogueriaNominal, DrogueriaNominalView));
