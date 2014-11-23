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
		"<div><span class = 'titulosReportes'><h2>Total de camas del establecimiento</h2></span><ul class='list inset'>" +
		"<li>Camas disponibles:<span><%=totalCamasDisponibles%></span></li>"+
		"<li>Camas habilitadas: <span><%=totalCamasHabilitadas%></span></li>"+
		"<li>Camas libres: <span><%=totalCamasLibres%></span></li>" +
		"</ul></div><br>" +
		"<h2 class='titulosReportes'>Detalle de los tipos de camas</h2><br>" +
		"<div><span class='tituloCamas'>Cuidados especiales</span><ul class='list inset'>" +
		"<li>Disponibles: <input class='reportInput' type='number' name='camasDisponibles' value='<%=camasCuidadosEspecialesDisponibles%>' disabled='disable'></input></li>"+
		"<li>Habilitadas: <input class='reportInput' type='number' name='camasDisponibles' value='<%=camasCuidadosEspecialesHabilitadas%>' disabled='disable'></input></li>"+
		"<li>Libres: <input class='reportInput' type='number' name='camasDisponibles' value='<%=camasCuidadosEspecialesLibres%>' disabled='disable'></input></li>"+
		"</ul></div><br>" +
		"<div><span class='tituloCamas'>Generales</span><ul class='list inset'>" +
		"<li>Disponibles: <input class='reportInput' type='number' name='camasDisponibles' value='<%=camasGeneralesDisponibles%>' disabled='disable'></input></li>"+
		"<li>Habilitadas: <input class='reportInput' type='number' name='camasDisponibles' value='<%=camasGeneralesHabilitadas%>' disabled='disable'></input></li>"+
		"<li>Libres: <input class='reportInput' type='number' name='camasDisponibles' value='<%=camasGeneralesLibres%>' disabled='disable'></input></li>"+
		"</ul></div><br>" +
		"<div><span class='tituloCamas'>Internación prolongada</span><ul class='list inset'>" +
		"<li>Disponibles: <input class='reportInput' type='number' name='camasDisponibles' value='<%=camasInternacionProlongadaDisponibles%>' disabled='disable'></input></li>"+
		"<li>Habilitadas: <input class='reportInput' type='number' name='camasDisponibles' value='<%=camasInternacionProlongadaHabilitadas%>' disabled='disable'></input></li>"+
		"<li>Libres: <input class='reportInput' type='number' name='camasDisponibles' value='<%=camasInternacionProlongadaLibres%>' disabled='disable'></input></li>"+
		"</ul></div><br>" +
		"<div><span class='tituloCamas'>Maternidad</span><ul class='list inset'>" +
		"<li>Disponibles: <input class='reportInput' type='number' name='camasDisponibles' value='<%=camasMaternidadDisponibles%>' disabled='disable'></input></li>"+
		"<li>Habilitadas: <input class='reportInput' type='number' name='camasDisponibles' value='<%=camasMaternidadHabilitadas%>' disabled='disable'></input></li>"+
		"<li>Libres: <input class='reportInput' type='number' name='camasDisponibles' value='<%=camasMaternidadLibres%>' disabled='disable'></input></li>"+
		"</ul></div><br>" +
		"<div><span class='tituloCamas'>Neonatología</span><ul class='list inset'>" +
		"<li>Disponibles: <input class='reportInput' type='number' name='camasDisponibles' value='<%=camasNeonatologiaDisponibles%>' disabled='disable'></input></li>"+
		"<li>Habilitadas: <input class='reportInput' type='number' name='camasDisponibles' value='<%=camasNeonatologiaHabilitadas%>' disabled='disable'></input></li>"+
		"<li>Libres: <input class='reportInput' type='number' name='camasDisponibles' value='<%=camasNeonatologiaLibres%>' disabled='disable'></input></li>"+
		"</ul></div><br>" +
		"<div><span class='tituloCamas'>No discriminadas</span><ul class='list inset'>" +
		"<li>Disponibles: <input class='reportInput' type='number' name='camasDisponibles' value='<%=camasNoDiscriminadasDisponibles%>' disabled='disable'></input></li>"+
		"<li>Habilitadas: <input class='reportInput' type='number' name='camasDisponibles' value='<%=camasNoDiscriminadasHabilitadas%>' disabled='disable'></input></li>"+
		"</ul></div><br>" +
		"<div><span class='tituloCamas'>Pediátricas</span><ul class='list inset'>" +
		"<li>Disponibles: <input class='reportInput' type='number' name='camasDisponibles' value='<%=camasPediatricasDisponibles%>' disabled='disable'></input></li>"+
		"<li>Habilitadas: <input class='reportInput' type='number' name='camasDisponibles' value='<%=camasPediatricasHabilitadas%>' disabled='disable'></input></li>"+
		"<li>Libres: <input class='reportInput' type='number' name='camasDisponibles' value='<%=camasPediatricasLibres%>' disabled='disable'></input></li>"+
		"</ul></div><br>" +
		"<div><span class='tituloCamas'>Terapia intensiva adultos</span><ul class='list inset'>" +
		"<li>Disponibles: <input class='reportInput' type='number' name='camasDisponibles' value='<%=camasTerapiaIntensivaAdultosDisponibles%>' disabled='disable'></input></li>"+
		"<li>Habilitadas: <input class='reportInput' type='number' name='camasDisponibles' value='<%=camasTerapiaIntensivaAdultosHabilitadas%>' disabled='disable'></input></li>"+
		"<li>Libres: <input class='reportInput' type='number' name='camasDisponibles' value='<%=camasTerapiaIntensivaAdultosLibres%>' disabled='disable'></input></li>"+
		"</ul></div><br>" +
		"<div><span class='tituloCamas'>Terapia intensiva pediátricas</span><ul class='list inset'>" +
		"<li>Disponibles: <input class='reportInput' type='number' name='camasDisponibles' value='<%=camasTerapiaIntensivaPediatricasDisponibles%>' disabled='disable'></input></li>"+
		"<li>Habilitadas: <input class='reportInput' type='number' name='camasDisponibles' value='<%=camasTerapiaIntensivaPediatricasHabilitadas%>' disabled='disable'></input></li>"+
		"<li>Libres: <input class='reportInput' type='number' name='camasDisponibles' value='<%=camasTerapiaIntensivaPediatricasLibres%>' disabled='disable'></input></li>"+
		"</ul></div><br>" +
		"<div><span class='tituloCamas'>Uso transitorio</span><ul class='list inset'>" +
		"<li>Disponibles: <input class='reportInput' type='number' name='camasDisponibles' value='<%=camasUsoTransitorioDisponibles%>' disabled='disable'></input></li>"+
		"<li>Habilitadas: <input class='reportInput' type='number' name='camasDisponibles' value='<%=camasUsoTransitorioHabilitadas%>' disabled='disable'></input></li>"+
		"<li>Libres: <input class='reportInput' type='number' name='camasDisponibles' value='<%=camasUsoTransitorioLibres%>' disabled='disable'></input></li>" +
		"</ul></div>"+
		"<a id='habilitarModCamas' class='button'> Modificar Camas del Establecimiento</a>"+
		"<a id='submitCamas' class='button' style='display: none;'> Enviar </a>",

		render: function (){
			BaseView.prototype.render.call(this);

			var ctx = jQuery(this.parent.getViewSelector() + " #myChart").get(0); //	.getContext("2d");

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

			ctx = jQuery(this.parent.getViewSelector() + " #myChart").get(0).getContext("2d");

			var camasChart = new Chart(ctx).Doughnut(data);

			return this;
		},

		attachEvents: function(){
			BaseCollectionView.prototype.attachEvents.call(this);

			//Se agrega el parent porque el div de camas es un subDiv de la consulta gral.
			$("#afui").undelegate("#habilitarModCamas", "click").delegate("#habilitarModCamas", "click", _.bind(this.ejecutarHabilitarModCamas, this));
			$("#afui").undelegate("#submitCamas", "click").delegate("#submitCamas", "click", _.bind(this.ejecutarSubmitCamas, this));
		},

		ejecutarHabilitarModCamas: function(){

			if(ServiceConfig.usuario != null ){
				//Si la persona tiene una sesion inicializada...
				//Aca habria que preguntar por los permisos del usuario.
				$('div').each(function(){
					$('input').each(function() {
						if ($(this).attr('disabled')) {
							$(this).removeAttr('disabled');
						}
						else {
							$(this).attr({
								'disabled': 'disabled'
							});
						}
					});
				});
				jQuery("#habilitarModCamas").css('display','none');
				jQuery("#submitCamas").css('display','');
			}else{
				//La persona no esta inicializada
				alert('LOGUEATE FORRO, QUE TE CREES?!?');
			}
		},

		ejecutarSubmitCamas:function(){		
			var data = {"idEstablecimiento": 10260632129033,"credenciales":{"usuario":"uutn","clave":"UJR9KM4R5Q"},"camasCuidadosEspeciales":{},"camasGenerales":{"disponibles":6,"libres":6, "habilitadas":8}};

			this.model.update(data,"https://dev.sisa.msal.gov.ar/sisadev/services/rest/establecimiento/modificarCamas");

			jQuery("#submitCamas").css('display','none');
			jQuery("#habilitarModCamas").css('display','');
		}
	});


	return camasCollectionView;

}(af, common, _, AppFrameworkRenderer, BaseCollectionView, Chart));