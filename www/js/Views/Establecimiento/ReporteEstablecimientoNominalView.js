var ReporteEstablecimientoNominalView = (function ($, common, _, renderer, BaseView) {
	"use strict";

	var reporteEstablecimientoNominalView = BaseView.extend({
		tagName: 'div',
		className: 'panel consulta-detallada',

		attributes: {
			'id': 'reporteEstablecimientoNominal',
            'data-nav': 'consultas_nav'
		},

		template : _.template(
			"<canvas id='myChart'></canvas>" +
			"<div><h2>Reporte Nominal</h2></div></br>" +
			"<div><label>Cantidad total</label><%=cantidadTotal%></div></br>" +
			"<% if (ItemList) { %><div id='itemList'><h2>Distribución</h2><%=ItemList%><% } %></div>"
		),

		initialize: function (attributes, options) {
			options = options || {};
			options.renderer = renderer;
            
            this.idImagen = 'imagenEstablecimientos';
            
			BaseView.prototype.initialize.call(this, attributes, options);
		},

		render: function (){
			BaseView.prototype.render.call(this);

			var ctx = jQuery(this.getViewSelector() + " #myChart").get(0);

			ctx.width = window.innerWidth;
			ctx.height = window.innerHeight * 0.5;

			var parsedData =  this.model.toJSON();
			var data = [];

			var listReport = $('.list_report');

			if(!_.isArray(parsedData.ItemList.item)) parsedData.ItemList.item = [parsedData.ItemList.item];

			for(var i = 0; i < parsedData.ItemList.item.length; i++){
				
				jQuery(listReport[i]).style('border-left-color',BaseView.prototype.color[i],'important');
				
				var temp =({
					value: parsedData.ItemList.item[i].cantidad,
					color: BaseView.prototype.color[i],
					highlight: "#D6EBFF",
					label: parsedData.ItemList.item[i].descripcion
				});

				data.push(temp);
			}

			ctx = jQuery(this.getViewSelector() + " #myChart").get(0).getContext("2d");
			var camasChart = new Chart(ctx).Pie(data);
			return this;
		}
	});

	reporteEstablecimientoNominalView.prototype.getModelDefault = function () {
		if (common.isEmpty(this.model) || common.isEmpty(this.model.defaults)) {
			return {
				nombre: null,
				cantidadTotal: null,
				codigo: null,
				porcentajeTotal: null,
				ItemList: null
			};
		}

		if (_.isFunction(this.model.defaults)){
			return this.model.defaults();
		};
		return this.model.defaults;
	};

	reporteEstablecimientoNominalView.prototype.replaceTemplateWithData = function (jsonData) {
		var itemList = this.model.get("ItemList").item;
		if(!_.isArray(itemList)){
			itemList = [itemList]
		};
		if (common.isEmpty(jsonData)) {
			jsonData = {};
		}
		if (itemList){
			var itemListLen = itemList.length;
			var itemListString = '';
			var i;
			for (i = 0 ; i < itemListLen ; i++) { 
				itemListString += 
					"<ul class='list inset list_report'>"+
					"<span class='descItemReporte'>" + itemList[i].descripcion + "</span></br></br>" +
					"<div>Cantidad: <span class='cantidadItemReporte'>" + itemList[i].cantidad + "</span></br>" +
					"<span class='idItemReporte'>ID: " + itemList[i].id + "</br></span>" +
					"Porcentaje:<span class='porcetajeItemReporte'> " + itemList[i].porcentaje + "%</span></div></br>"+
					"</ul>"
				;
			}
			jsonData.ItemList = itemListString;
		}
		else {jsonData.ItemList = null};
		return this.template(jsonData);
	};

	return reporteEstablecimientoNominalView;
}(af, common, _, AppFrameworkRenderer, BaseView));