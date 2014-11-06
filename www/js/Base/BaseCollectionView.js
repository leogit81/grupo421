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
            BaseView.prototype.initialize.call(this, attributes, options);
            this.setModel(attributes);
        },
        
        cantidadDeEstablecimientos: 0,
        
        render: function (model, collection, options) {
            //TODO: esto hay que corregirlo, es un parche para evitar que me haga un render para cada establecimiento que se agrega a la colecciÃ³n.
            this.cantidadDeEstablecimientos++;
            if (this.cantidadDeEstablecimientos < collection.length) {
                return;
            } else {
                this.cantidadDeEstablecimientos = 0;
            }
            //fin del parche
            
            BaseView.prototype.render.call(this, model, collection, options);
            
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
            $("#afui").delegate(this.getViewSelector() + " ul li a", "click", _.bind(this.busquedaNominalItem, this));
        }
        
	});
    
    baseCollectionView.prototype.setModel = function (attributes) {
        if (attributes !== undefined && attributes.model !== undefined) {
            this.model = attributes.model;
        } else {
            return;
        }
        
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