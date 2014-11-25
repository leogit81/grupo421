var BaseCollectionView = (function ($, common, _, renderer, BaseView) {
    "use strict";

    var baseCollectionView = BaseView.extend({
        tagName: 'div',
        className: 'panel',

        templateSinDatos: "<span class='coleccionSinDatos'>No hay datos disponibles.</span>",
        
        /**
        * Template para la colecciÃ³n.
        */
        collectionTemplate : _.template("<div id='resultadoCollection'><input class='search' placeholder='Buscar en resultados...'/><ul class='list'><%= renderedHtml %></ul><div class='paginasCollection'><ul class='pagination'></ul></div></div>"),
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
		},

        cantidadDeItems: 0,

        render: function (model, collection, options) {
            BaseView.prototype.render.call(this);

            /*
            *Creación de lista con filtro de búsqueda en resultados
            */
            var options = {
                valueNames: [ 'znombre', 'codigoEstablecimiento' ],
                page: 50,
                plugins: [ ListPagination({}) ] 
            };
            var selector = this.getViewSelector() + " #resultadoCollection";
            var listaConFiltro = new List(selector, options, false, true);
            /*
            *Si el primer y el último elemento de la lista paginada son iguales, se elimina el último
            */
            if(listaConFiltro.list.firstChild.innerHTML === listaConFiltro.list.lastChild.innerHTML) {
                listaConFiltro.list.lastChild.remove();
            };

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

		this.model.on('remove', this.onItemRemoved, this);
		this.model.on('add', this.onItemAdded, this);
		this.model.on('updateOk', this.updateOk, this);
        this.model.on('registrosNoEncontrados', this.render, this);
	};

	baseCollectionView.prototype.onItemAdded = function (model, collection, options) {
		this.cantidadDeItems++;

		if (this.cantidadDeItems === this.model.length) {
			this.render();
		}
	};

	baseCollectionView.prototype.onItemRemoved = function (model, collection, options) {
		this.cantidadDeItems--;
		if (this.cantidadDeItems === 0) {
			this.render();
		}
	};

	baseCollectionView.prototype.template = function (jsonData) {
		this.renderedHtml = "";
		_.each(jsonData, this.itemTemplate, this);
		return this.collectionTemplate({"renderedHtml": this.renderedHtml});
	};
    
    baseCollectionView.prototype.replaceTemplateWithData = function(jsonData) {
        //si la colección queda vacía muestra un mensaje informativo al usuario
        if (this.model.length == 0) {
            return this.templateSinDatos;
        }
        return BaseView.prototype.replaceTemplateWithData.call(this, jsonData);
    };

    /**
    * Método que maneja el evento updateOk que dispara la BaseCollection luego de que se realizó
    * el update del modelo sin errores.
    */
    baseCollectionView.prototype.updateOk = function (jsonData) {
        /**METODO VACIO PARA SOBRE ESCRIBIR DESDE CADA VISTA**/
    };

    return baseCollectionView;
}(af, common, _, AppFrameworkRenderer, BaseView));
