/**
 * Vista base de la cual se pueden extender nuevas vistas. A su vez este extiende de la vista de Backbone.
 * Cuando se construye la misma (initialize()) si se pasa el model en los attributes, la misma guarda una referencia a este.
 * Además, se atacha la función render al evento 'change' del model, de forma que cada vez que cambie este se actualice la vista. 
 */
var BaseView = (function ($, common, _, jquery, Backbone, afRenderer) {
	"use strict";

	var baseView = Backbone.View.extend({
		/*COLORES A UTILIZAR EN LOS GRAFICOS*/
		color: ["#f14952",
				"#3b5998",
				"#ffff66",
				"#99cc66",
				"#ffc0cb",
				"#47d6d4",
				"#6366e8",
				"#999999",
				"#6366e8",
				"#00aedb",	
				"#a200ff",	
				"#f47835",	
				"#d41243",	
				"#8ec127"],

		tagName : "div",
		className: "panel",

		template : _.template("<div></div>"),

		initialize: function (attributes, options) {
			this.reemplazarViewId();

			if (attributes !== undefined && !common.isEmpty(attributes.model)) {
				this.setModel(attributes.model);
			}

			options = options || {};
			if (!common.isEmpty(options.renderer)) {
				this.renderer = options.renderer.getInstance();
			}

			this.attachEvents();

			//El prerender inserta el elemento HTML vacío de la vista en el DOM
			//afRenderer.getInstance().preRender(this);
			//this.insertElementInDom();
			//$(this.getViewSelector()).addClass("consulta-detallada");
			this.$el.attr("data-footer", "none");
		},

		/**
        * El parámetro model puede ser un objeto literal que contenga el model.
        * Ej: {"model": BaseModel}
        */
		setModel: function (model) {
			if (common.isEmpty(model))
			{
				throw "Argumento inválido. Debe proporcionar el atributo obligatorio 'model'."
			}

			if (common.isEmpty(model.model) || this.modelEsCollection(model)) {
				//si es una BaseCollection, el model.model tiene una función de Backbone
				//que no es el objeto que estamos esperando. Por eso lo seteamos así.
				this.model = model;
			} else {
				this.model = model.model;
			}

			this.model.on('change', this.render, this);
		},

		/**
        * Indica si el model es una objeto que extiende de Backbone.Collection
        */
		modelEsCollection: function (model) {
			return !common.isEmpty(model) && !common.isEmpty(model.models) && _.isFunction(model.model);
		}
	});

	/**
    * Inserta el elemento HTML mínimo que tiene la vista en el DOM.
    * Si la vista tiene un parent, lo inserta dentro del elemento HTML con ID igual al InsertElID
    */
	baseView.prototype.insertElementInDom = function () {
		$("#afui div#content").append(this.$el[0]);
	};

	baseView.prototype.model = null;
	baseView.prototype.scroller = null;
	baseView.prototype.renderedHtml = null;

	/**
    * Sobreescribe el valor del atributo ID en el elemento HTML generado para la vista con uno que es único.
    */
	baseView.prototype.reemplazarViewId = function () {
		var uniqueId = this.generateUniqueViewId();
		this.$el.attr("id", uniqueId);
	};

	/**
    * Muestra los controles y la información del modelo en la página.
    */
	baseView.prototype.render = function () {
		var jsonData = this.getModelData();
		//después del render se oculta la máscara de "Cargando..."
		this.hideLoadingMask();
		return this.renderFromData(jsonData);
	};
	/**
    * Encapsula la lógica del render de la vista en la página.
    */
	baseView.prototype.renderFromData = function (data) {
		this.clearView();

		this.armarHtmlConData(data);

      if (common.isEmpty(this.parent)) {
            this.renderHtml();
        }

		$(this.getViewSelector()).addClass("consulta-detallada");

		this.trigger("viewRendered", this);
	};

	baseView.prototype.clearView = function () {
		this.$el.empty();
	};

	/**
    * Devuelve la data del modelo. Esta para que puedan sobreescribir las subclases de base view
    */
	baseView.prototype.getModelData = function () {
		var jsonData = {};
		if (!common.isEmpty(this.model)) {
			jsonData = this.model.toJSON();
		}

		jsonData = _.extend(this.getModelDefault(), jsonData);

		return jsonData;
	};

	/**
    * Arma el html con la información del modelo, para después hacer el render de la vista.
    */
	baseView.prototype.armarHtmlConData = function (data) {
		if (!common.isEmpty(this.parent)) {
			this.renderedHtml = this.$el.append(this.replaceTemplateWithData(data))[0].innerHTML;
		} else {
			this.renderedHtml = this.$el.append(this.replaceTemplateWithData(data))[0].outerHTML;
		}
	};

	/**
    * Delega el render de la vista al renderer. El renderer agrega el panel en el DOM.
    * La implementación del renderer tiene lógica particular del framework de UI usado.
    * Este método se utiliza en el render() y renderEmptyView()
    */
	baseView.prototype.renderHtml = function () {
		if (!common.isEmpty(this.parent)) {
			//el parent debería ser una MasterView que tiene este método
			//this.parent.updateView(this.renderedHtml);
		} else {
			if (!common.isEmpty(this.renderer)) {
				this.renderer.render(this);
			}   
		}
	};

	/**
    * Muestra los controles y limpia toda la información que pudieran tener.
    */
	baseView.prototype.renderEmptyView = function () {
		var jsonData = {};
		if (!common.isEmpty(this.model)) {
			jsonData = this.model.getDefaults();
		}

		return this.renderFromData(jsonData);
	};

	baseView.prototype.parent = null;

	/**
    * Bindea los handlers para los eventos de la vista.
    */
	baseView.prototype.attachEvents = function () {
		//jquery(AjaxRestService).bind("beforeCallRestService", _.bind(this.showLoadingMask, this));
		//jquery(AjaxRestService).bind("callRestServiceError", _.bind(this.logError, this));
	};

	baseView.prototype.showLoadingMask = function (loadingMessage) {
		loadingMessage = {} || "Cargando...";
		$.ui.showMask(loadingMessage);
	};


	baseView.prototype.hideLoadingMask = function () {
		$.ui.hideMask();
	};

	baseView.prototype.logError = function (response) {
		this.hideLoadingMask();
	};

	/**
     * Set the parent for this view
     * @param {Backbone.View} the parent view
     */
	baseView.prototype.setParent = function (parent) {
		this.parent = parent;
	};

	/**
    * Genera un ID único para la vista.
    * @returns {string} un id que concatena el id definido por el usuario y el id generado por Backbone para esa vista.
    */
	baseView.prototype.generateUniqueViewId = function () {
		if (!common.isEmpty(this.attributes) && !common.isEmpty(this.attributes.id)){
			return this.attributes.id + "_" + this.cid;
		}

		return this.cid;
	};

	/**
    * Devuelve el ID único generado para la vista, utilizado para generar el atributo ID del elemento HTML.
    */
	baseView.prototype.getViewId = function () {
		return this.$el.attr("id");
	};

	/**
    * Devuelve un selector que permite obtener el elemento HTML que tenga el mismo ID que la vista.
    * @returns {string} selector CSS.
    */
	baseView.prototype.getViewSelector = function () {
		return "#" + this.$el.attr("id");
	};

	/**
     * Devuelve un string con el template de la vista reemplazando las variables por los valores pasados en el JSON
     * Utiliza el default del modelo para rellenar el objeto JSON con las propiedades faltantes necesarias para reemplazar
     * en el template.
     * @param {JSON} jsonData, un objeto JSON con la data que se reemplazará en el template.
     */
	baseView.prototype.replaceTemplateWithData = function (jsonData) {
		if (common.isEmpty(jsonData)) {
			jsonData = {};
		}

        //jsonData = _.extend(_.result(this.getModelDefault()), jsonData);

		return this.template(jsonData);
	};

	/**
    * Devuelve el default del modelo.
    */
	baseView.prototype.getModelDefault = function () {
		if (!common.isEmpty(this.model) && !common.isEmpty(this.model.defaults)) {
			return this.model.defaults;
		}

		return {};
	};

	_.extend(baseView, Backbone.Singleton);

	return baseView;
}(af, common, _, jQuery, Backbone, AppFrameworkRenderer));