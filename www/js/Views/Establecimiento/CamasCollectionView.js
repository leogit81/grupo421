var CamasCollectionView = (function ($, common, _, renderer, BaseCollectionView, Chart) {
	"use strict";
	var estaRenderizado = 0;
	var camasCollectionView = BaseCollectionView.extend({
		tagName: 'div',
		className: 'panel consulta-detallada',

		attributes: {
			'id': 'resultadoConsultaNominalCamasEstablecimiento',
			'data-nav': "consultas_nav"
		},

		collectionTemplate : _.template("<%= renderedHtml %>"),


		itemTemplateString :
		"<canvas id='myChart'></canvas>" +
		"<div><span class='tituloCamas'><h2>Total de camas del establecimiento</h2></span><ul class='list inset'>" +
		"<li>Camas disponibles: <span><%=totalCamasDisponibles%></span></li>"+
		"<li>Camas habilitadas: <span><%=totalCamasHabilitadas%></span></li>"+
		"<li>Camas libres: <span><%=totalCamasLibres%></span></li>" +
		"</ul></div><br>" +
		"<h2>Detalle de los tipos de camas</h2><br>" +
		"<div><span class='tituloCamas'>Cuidados especiales</span><ul class='list inset'>" +
		"<li>Disponibles: <span><%=camasCuidadosEspecialesDisponibles%></span></li>"+
		"<li>Habilitadas: <span><%=camasCuidadosEspecialesHabilitadas%></span></li>"+
		"<li>Libres: <span><%=camasCuidadosEspecialesLibres%></span></li>"+
		"</ul></div><br>" +
		"<div><span class='tituloCamas'>Generales</span><ul class='list inset'>" +
		"<li>Disponibles: <span><%=camasGeneralesDisponibles%></span></li>"+
		"<li>Habilitadas: <span><%=camasGeneralesHabilitadas%></span></li>"+
		"<li>Libres: <span><%=camasGeneralesLibres%></span></li>"+
		"</ul></div><br>" +
		"<div><span class='tituloCamas'>Internación prolongada</span><ul class='list inset'>" +
		"<li>Disponibles: <span><%=camasInternacionProlongadaDisponibles%></span></li>"+
		"<li>Habilitadas: <span><%=camasInternacionProlongadaHabilitadas%></span></li>"+
		"<li>Libres: <span><%=camasInternacionProlongadaLibres%></span></li>"+
		"</ul></div><br>" +
		"<div><span class='tituloCamas'>Maternidad</span><ul class='list inset'>" +
		"<li>Disponibles: <span><%=camasMaternidadDisponibles%></span></li>"+
		"<li>Habilitadas: <span><%=camasMaternidadHabilitadas%></span></li>"+
		"<li>Libres: <span><%=camasMaternidadLibres%></span></li>"+
		"</ul></div><br>" +
		"<div><span class='tituloCamas'>Neonatología</span><ul class='list inset'>" +
		"<li>Disponibles: <span><%=camasNeonatologiaDisponibles%></span></li>"+
		"<li>Habilitadas: <span><%=camasNeonatologiaHabilitadas%></span></li>"+
		"<li>Libres: <span><%=camasNeonatologiaLibres%></span></li>"+
		"</ul></div><br>" +
		"<div><span class='tituloCamas'>No discriminadas</span><ul class='list inset'>" +
		"<li>Disponibles: <span><%=camasNoDiscriminadasDisponibles%></span></li>"+
		"<li>Habilitadas: <span><%=camasNoDiscriminadasHabilitadas%></span></li>"+
		"</ul></div><br>" +
		"<div><span class='tituloCamas'>Pediátricas</span><ul class='list inset'>" +
		"<li>Disponibles: <span><%=camasPediatricasDisponibles%></span></li>"+
		"<li>Habilitadas: <span><%=camasPediatricasHabilitadas%></span></li>"+
		"<li>Libres: <span><%=camasPediatricasLibres%></span></li>"+
		"</ul></div><br>" +
		"<div><span class='tituloCamas'>Terapia intensiva adultos</span><ul class='list inset'>" +
		"<li>Disponibles: <span><%=camasTerapiaIntensivaAdultosDisponibles%></span></li>"+
		"<li>Habilitadas: <span><%=camasTerapiaIntensivaAdultosHabilitadas%></span></li>"+
		"<li>Libres: <span><%=camasTerapiaIntensivaAdultosLibres%></span></li>"+
		"</ul></div><br>" +
		"<div><span class='tituloCamas'>Terapia intensiva pediátricas</span><ul class='list inset'>" +
		"<li>Disponibles: <span><%=camasTerapiaIntensivaPediatricasDisponibles%></span></li>"+
		"<li>Habilitadas: <span><%=camasTerapiaIntensivaPediatricasHabilitadas%></span></li>"+
		"<li>Libres: <span><%=camasTerapiaIntensivaPediatricasLibres%></span></li>"+
		"</ul></div><br>" +
		"<div><span class='tituloCamas'>Uso transitorio</span><ul class='list inset'>" +
		"<li>Disponibles: <span><%=camasUsoTransitorioDisponibles%></span></li>"+
		"<li>Habilitadas: <span><%=camasUsoTransitorioHabilitadas%></span></li>"+
		"<li>Libres: <span><%=camasUsoTransitorioLibres%></span></li>" +
		"</ul></div>",

		render: function (){
			BaseView.prototype.render.call(this);
			var ctx = jQuery(this.getViewSelector() + " #myChart").get(0); //	.getContext("2d");

			ctx.width = window.innerWidth;
			ctx.height = window.innerHeight * 0.5;
			
			var parsedData =  this.model.toJSON();
			var data = [];
			var i = 0;

			_.each(parsedData[0],function(itemValue, itemKey, list){	


				if(itemKey != "codigo" && itemKey != "nombre" && itemKey != "resultado" ){

					if( i >= BaseView.prototype.color.length ){
						i = 0;						
					};

					var temp =({
						value: itemValue,
						color: BaseView.prototype.color[i],
						highlight: "#D6EBFF",
						label: itemKey
					});

					data.push(temp);
					i++;
				}
			}, data);

			ctx = jQuery(this.getViewSelector() + " #myChart").get(0).getContext("2d");
			var camasChart = new Chart(ctx).Doughnut(data);

			return this;
		}

	});

	return camasCollectionView;

}(af, common, _, AppFrameworkRenderer, BaseCollectionView, Chart));