var BaseCollectionView = (function ($, common, _, renderer, BaseView) {
    "use strict";
    
    var baseCollectionView = BaseView.extend({
        tagName: 'div',
        className: 'panel',
        
        /**
        * Template para la colecciÃ³n.
        */
        collectionTemplate : _.template("<ul class='list'><%= renderedHtml %></ul>"),
        /**
        * Template para un item de la colecciÃ³n.
        */
        itemTemplateString: "<li></li>",

        renderedHtml: null,
                                   
        itemTemplate: function (item) {
            this.renderedHtml += _.template(this.itemTemplateString, item);
        },
        
		initialize: function (attributes, options) {
            options = options || {};
            options.renderer = renderer;
            
            //la opcion asociadoBusquedaNominal indica si cada item de la colección
            //"dispara" una búsqueda nominal al hacer clic sobre un item.
            if (!common.isEmpty(options.asociadoBusquedaNominal)) {
                this.asociadoBusquedaNominal = options.asociadoBusquedaNominal;
            } else {
                this.asociadoBusquedaNominal = true;
            }
            
            BaseView.prototype.initialize.call(this, attributes, options);
            //this.setModel(attributes);
        },
        
        cantidadDeItems: 0,
        
        render: function (model, collection, options) {
            //TODO: esto hay que corregirlo, es un parche para evitar que me haga un render para cada item que se agrega a la colecciÃ³n.
            this.cantidadDeItems++;
            if (this.cantidadDeItems < this.model.length) {
                return;
            } else {
                this.cantidadDeItems = 0;
            }
            //fin del parche
            
            BaseView.prototype.render.call(this);
            
            return this;
        },
        
        busquedaNominalItem: function (eventData) {
            //override
        },
        
        getCodigoEstablecimientoFromSelectedItem: function (selectedItem) {
            return common.trim($(selectedItem).find("span.codigoEstablecimiento").html());
        },
        
        attachEvents: function() {
            BaseView.prototype.attachEvents.call(this);
            if (this.asociadoBusquedaNominal){
                $("#afui").delegate(this.getViewSelector() + " ul li a", "click", _.bind(this.busquedaNominalItem, this));
            }
        }
        
	});
    
    baseCollectionView.prototype.setModel = function (attributes) {
        BaseView.prototype.setModel.call(this, attributes);
        
        this.model.on('remove', this.render, this);
        this.model.on('add', this.render, this);
    };
    
    baseCollectionView.prototype.template = function (jsonData) {
        this.renderedHtml = "";
        _.each(jsonData, this.itemTemplate, this);
        return this.collectionTemplate({"renderedHtml": this.renderedHtml});
    };
	
	return baseCollectionView;
}(af, common, _, AppFrameworkRenderer, BaseView));