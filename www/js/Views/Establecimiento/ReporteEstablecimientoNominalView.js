var ReporteEstablecimientoNominalView = (function ($, common, _, renderer, BaseView) {
    "use strict";

    var reporteEstablecimientoNominalView = BaseView.extend({
        tagName: 'div',
        className: 'panel consulta-detallada',

        attributes: {
            'id': 'reporteEstablecimientoNominal'
        },

        template : _.template(
            "<div><h2>Reporte de Establecimientos</h2></div></br>" +
            "<div><label>Cantidad total</label><%=cantidadTotal%></div></br>" +
//            "<div><label>Porcentaje total</label><%=porcentajeTotal%></div></br>" +
            "<% if (ItemList) { %><div id='itemList'><h2>Distribución</h2><%=ItemList%><% } %></div>"
        ),

        initialize: function (attributes, options) {
            options = options || {};
            options.renderer = renderer;
            BaseView.prototype.initialize.call(this, attributes, options);
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