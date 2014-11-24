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
			"<div><h2>Reporte de Establecimientos</h2></div></br>" +
			"<div><label>Cantidad total</label><%=cantidadTotal%></div></br>" +
			//            "<div><label>Porcentaje total</label><%=porcentajeTotal%></div></br>" +
			"<% if (ItemList) { %><div id='itemList'><h2>Distribución</h2><%=ItemList%><% } %></div>"
		),

		initialize: function (attributes, options) {
			options = options || {};
			options.renderer = renderer;
			BaseView.prototype.initialize.call(this, attributes, options);
		},

		render: function (){
			BaseView.prototype.render.call(this);

			var ctx = jQuery(this.getViewSelector() + " #myChart").get(0); //	.getContext("2d");

			ctx.width = window.innerWidth;
			ctx.height = window.innerHeight * 0.5;

			var parsedData =  this.model.toJSON();
			var data = [];
			var c = 0;
            
            if(!_.isArray(parsedData.ItemList.item)) parsedData.ItemList.item = [parsedData.ItemList.item];

			for(var i = 0; i < parsedData.ItemList.item.length; i++){	

				if( c >= BaseView.prototype.color.length ){
					c = 0;						
				};

				var temp =({
					value: parsedData.ItemList.item[i].cantidad,
					color: BaseView.prototype.color[c],
					highlight: "#D6EBFF",
					label: parsedData.ItemList.item[i].descripcion
				});

				data.push(temp);
				c++;

			}

			ctx = jQuery(this.getViewSelector() + " #myChart").get(0).getContext("2d");
			var camasChart = new Chart(ctx).Pie(data,{tooltipFontStyle: "normal"});

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
                    "<span class='descItemReporte'>" + itemList[i].descripcion + "</span></br>" +
                    "<div>Cantidad: <span class='cantidadItemReporte'>" + itemList[i].cantidad + "</span></br>" +
                    "<span class='idItemReporte'>ID: " + itemList[i].id + "</br></span>" +
                    "Porcentaje:<span class='porcetajeItemReporte'> " + itemList[i].porcentaje + "%</span></div></br>";
            }
            jsonData.ItemList = itemListString;
        }
        else {jsonData.ItemList = null};
		
        return this.template(jsonData);
	};

	return reporteEstablecimientoNominalView;
}(af, common, _, AppFrameworkRenderer, BaseView));