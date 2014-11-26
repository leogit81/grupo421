var CamasCollectionView = (function ($, common, _, renderer, BaseCollectionView, Chart) {
	"use strict";
	var parsedData;
	var jsonForUpdate = {
		"idEstablecimiento": null,
		"credenciales":{
			"usuario": null,
			"clave": null
		},
		"camasCuidadosEspeciales":{
			"habilitadas": null,
			"disponibles": null,
			"libres": null
		},
		"camasGenerales":{
			"habilitadas": null,
			"disponibles": null,
			"libres": null
		},
		"camasInternacionProlongada":{
			"habilitadas": null,
			"disponibles": null,
			"libres": null
		},
		"camasMaternidad":{
			"habilitadas": null,
			"disponibles": null,
			"libres": null
		},
		"camasNeonatologia":{
			"habilitadas": null,
			"disponibles": null,
			"libres": null
		},
		"camasNoDiscriminadas":{
			"habilitadas": null,
			"disponibles": null
		},
		"camasPediatricas":{
			"habilitadas": null,
			"disponibles": null,
			"libres": null
		},
		"camasTerapiaIntensivaAdultos":{
			"habilitadas": null,
			"disponibles": null,
			"libres": null
		},
		"camasTerapiaIntensivaPediatricas":{
			"habilitadas": null,
			"disponibles": null,
			"libres": null
		},
		"camasUsoTransitorio":{
			"habilitadas": null,
			"disponibles": null,
			"libres": null
		}
	};

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
		"<div ><span class = 'titulosReportes'><h2>Total de camas del establecimiento</h2></span><ul class='list inset'>" +
		"<li>Camas disponibles:<span><%=totalCamasDisponibles%></span></li>"+
		"<li>Camas habilitadas: <span><%=totalCamasHabilitadas%></span></li>"+
		"<li>Camas libres: <span><%=totalCamasLibres%></span></li>" +
		"</ul></div><br>" +
		"<h2 class='titulosReportes'>Detalle de los tipos de camas</h2><br>" +
		"<div class='categoriaCama' id='camasCuidadosEspeciales'><span class='tituloCamas'>Cuidados especiales</span><ul class='list inset'>" +
		"<li>Disponibles: <input class='reportInput disponibles' type='number' id='camasCuidadosEspecialesDisponibles' value='<%=camasCuidadosEspecialesDisponibles%>' disabled='disable'></input></li>"+
		"<li>Habilitadas: <input class='reportInput habilitadas' type='number' id='camasCuidadosEspecialesHabilitadas' value='<%=camasCuidadosEspecialesHabilitadas%>' disabled='disable'></input></li>"+
		"<li>Libres: <input class='reportInput libres' type='number' id='camasCuidadosEspecialesLibres' value='<%=camasCuidadosEspecialesLibres%>' disabled='disable'></input></li>"+
		"</ul></div><br>" +
		"<div class='categoriaCama' id='camasGenerales'><span class='tituloCamas'>Generales</span><ul class='list inset'>" +
		"<li>Disponibles: <input class='reportInput disponibles' type='number' id='camasGeneralesDisponibles' value='<%=camasGeneralesDisponibles%>' disabled='disable'></input></li>"+
		"<li>Habilitadas: <input class='reportInput habilitadas' type='number' id='camasGeneralesHabilitadas' value='<%=camasGeneralesHabilitadas%>' disabled='disable'></input></li>"+
		"<li>Libres: <input class='reportInput libres' type='number' id='camasGeneralesLibres' value='<%=camasGeneralesLibres%>' disabled='disable'></input></li>"+
		"</ul></div><br>" +
		"<div class='categoriaCama' id='camasInternacionProlongada'><span class='tituloCamas'>Internación prolongada</span><ul class='list inset'>" +
		"<li>Disponibles: <input class='reportInput disponibles' type='number' id='camasInternacionProlongadaDisponibles' value='<%=camasInternacionProlongadaDisponibles%>' disabled='disable'></input></li>"+
		"<li>Habilitadas: <input class='reportInput habilitadas' type='number' id='camasInternacionProlongadaHabilitadas' value='<%=camasInternacionProlongadaHabilitadas%>' disabled='disable'></input></li>"+
		"<li>Libres: <input class='reportInput libres' type='number' id='camasInternacionProlongadaLibres' value='<%=camasInternacionProlongadaLibres%>' disabled='disable'></input></li>"+
		"</ul></div><br>" +
		"<div class='categoriaCama' id='camasMaternidad'><span class='tituloCamas'>Maternidad</span><ul class='list inset'>" +
		"<li>Disponibles: <input class='reportInput disponibles' type='number' id='camasMaternidadDisponibles' value='<%=camasMaternidadDisponibles%>' disabled='disable'></input></li>"+
		"<li>Habilitadas: <input class='reportInput habilitadas' type='number' id='camasMaternidadHabilitadas' value='<%=camasMaternidadHabilitadas%>' disabled='disable'></input></li>"+
		"<li>Libres: <input class='reportInput libres' type='number' id='camasMaternidadLibres' value='<%=camasMaternidadLibres%>' disabled='disable'></input></li>"+
		"</ul></div><br>" +
		"<div class='categoriaCama' id='camasNeonatologia'><span class='tituloCamas'>Neonatología</span><ul class='list inset'>" +
		"<li>Disponibles: <input class='reportInput disponibles' type='number' id='camasNeonatologiaDisponibles' value='<%=camasNeonatologiaDisponibles%>' disabled='disable'></input></li>"+
		"<li>Habilitadas: <input class='reportInput habilitadas' type='number' id='camasNeonatologiaHabilitadas' value='<%=camasNeonatologiaHabilitadas%>' disabled='disable'></input></li>"+
		"<li>Libres: <input class='reportInput libres' type='number' id='camasNeonatologiaLibres' value='<%=camasNeonatologiaLibres%>' disabled='disable'></input></li>"+
		"</ul></div><br>" +
		"<div class='categoriaCama' id='camasNoDiscriminadas'><span class='tituloCamas'>No discriminadas</span><ul class='list inset'>" +
		"<li>Disponibles: <input class='reportInput disponibles' type='number' id='camasNoDiscriminadasDisponibles' value='<%=camasNoDiscriminadasDisponibles%>' disabled='disable'></input></li>"+
		"<li>Habilitadas: <input class='reportInput habilitadas' type='number' id='camasNoDiscriminadasHabilitadas' value='<%=camasNoDiscriminadasHabilitadas%>' disabled='disable'></input></li>"+
		"</ul></div><br>" +
		"<div class='categoriaCama' id='camasPediatricas'><span class='tituloCamas'>Pediátricas</span><ul class='list inset'>" +
		"<li>Disponibles: <input class='reportInput disponibles' type='number' id='camasPediatricasDisponibles' value='<%=camasPediatricasDisponibles%>' disabled='disable'></input></li>"+
		"<li>Habilitadas: <input class='reportInput habilitadas' type='number' id='camasPediatricasHabilitadas' value='<%=camasPediatricasHabilitadas%>' disabled='disable'></input></li>"+
		"<li>Libres: <input class='reportInput libres' type='number' id='camasPediatricasLibres' value='<%=camasPediatricasLibres%>' disabled='disable'></input></li>"+
		"</ul></div><br>" +
		"<div class='categoriaCama' id='camasTerapiaIntensivaAdultos'><span class='tituloCamas'>Terapia intensiva adultos</span><ul class='list inset'>" +
		"<li>Disponibles: <input class='reportInput disponibles' type='number' id='camasTerapiaIntensivaAdultosDisponibles' value='<%=camasTerapiaIntensivaAdultosDisponibles%>' disabled='disable'></input></li>"+
		"<li>Habilitadas: <input class='reportInput habilitadas' type='number' id='camasTerapiaIntensivaAdultosHabilitadas' value='<%=camasTerapiaIntensivaAdultosHabilitadas%>' disabled='disable'></input></li>"+
		"<li>Libres: <input class='reportInput libres' type='number' id='camasTerapiaIntensivaAdultosLibres' value='<%=camasTerapiaIntensivaAdultosLibres%>' disabled='disable'></input></li>"+
		"</ul></div><br>" +
		"<div class='categoriaCama' id='camasTerapiaIntensivaPediatricas'><span class='tituloCamas'>Terapia intensiva pediátricas</span><ul class='list inset'>" +
		"<li>Disponibles: <input class='reportInput disponibles' type='number' id='camasTerapiaIntensivaPediatricasDisponibles' value='<%=camasTerapiaIntensivaPediatricasDisponibles%>' disabled='disable'></input></li>"+
		"<li>Habilitadas: <input class='reportInput habilitadas' type='number' id='camasTerapiaIntensivaPediatricasHabilitadas' value='<%=camasTerapiaIntensivaPediatricasHabilitadas%>' disabled='disable'></input></li>"+
		"<li>Libres: <input class='reportInput libres' type='number' id='camasTerapiaIntensivaPediatricasLibres' value='<%=camasTerapiaIntensivaPediatricasLibres%>' disabled='disable'></input></li>"+
		"</ul></div><br>" +
		"<div class='categoriaCama' id='camasUsoTransitorio'><span class='tituloCamas'>Uso transitorio</span><ul class='list inset'>" +
		"<li>Disponibles: <input class='reportInput disponibles' type='number' id='camasUsoTransitorioDisponibles' value='<%=camasUsoTransitorioDisponibles%>' disabled='disable'></input></li>"+
		"<li>Habilitadas: <input class='reportInput habilitadas' type='number' id='camasUsoTransitorioHabilitadas' value='<%=camasUsoTransitorioHabilitadas%>' disabled='disable'></input></li>"+
		"<li>Libres: <input class='reportInput libres' type='number' id='camasUsoTransitorioLibres' value='<%=camasUsoTransitorioLibres%>' disabled='disable'></input></li>" +
		"</ul></div>"+
		"<a id='habilitarModCamas' class='button'> Modificar Camas del Establecimiento</a>"+
		"<a id='submitCamas' class='button' style='display: none;'> Enviar </a>",

		render: function (){
			BaseView.prototype.render.call(this);

			var ctx = jQuery(this.parent.getViewSelector() + " #myChart").get(0); //	.getContext("2d");

			ctx.width = window.innerWidth;
			ctx.height = window.innerHeight * 0.5;

			parsedData =  this.model.toJSON();
			var data = [];
			var i = 0;

			_.each(parsedData[0],function(itemValue, itemKey, list){	


				if(itemKey != "codigo" && itemKey != "nombre" && itemKey != "resultado" && itemValue !== 0){

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

			var camasChart = new Chart(ctx).Pie(data);

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
				$('.reportInput').removeAttr('disabled'); //Habilito los imput
				jQuery("#habilitarModCamas").css('display','none');
			}else{
				//La persona no esta inicializada
				$("#afui").popup(
					{
						title: "Error de Autenticación",
						message: "Para realizar la modificación de camas, debe iniciar sesión.",
						cancelText: "Aceptar",
						cancelCallback: function(){},
						//					doneText: "Aceptar",
						//					doneCallback: function (json) {},
						cancelOnly: true
					}
				);
			}
		},

		ejecutarSubmitCamas:function(){

			this.modelToJsonUpdate();

			this.model.update(jsonForUpdate,"https://dev.sisa.msal.gov.ar/sisadev/services/rest/establecimiento/modificarCamas");
		},

		updateOk: function(){

			$('.reportInput').attr('disabled', 'disabled'); //Disable
			jQuery("#submitCamas").css('display','none');
			jQuery("#habilitarModCamas").css('display','');


			$("#afui").popup(
				{
					title: "Actualizacion de camas",
					message: "Actualización de camas OK",
					cancelText: "Aceptar",
					cancelCallback: _.bind(function (json) {
						//Ejecuto nuevamente la consulta de camas para traer los datos impactados.	
						this.parent.findTab("panelId", "establecimientoCamas").isLoaded = false;
						this.parent.loadSelectedTab();
					},this),
					//					doneText: "Aceptar",
					//					doneCallback: function (json) {},
					cancelOnly: true
				}
			);

		},

		modelToJsonUpdate: function(){

			//			jsonForUpdate.credenciales.usuario = ServiceConfig.usuario;
			jsonForUpdate.credenciales.usuario = "uutn"
			//			jsonForUpdate.credenciales.clave = ServiceConfig.clave;
			jsonForUpdate.credenciales.clave = "UJR9KM4R5Q"
			jsonForUpdate.idEstablecimiento = parsedData[0].codigo;

			$('.categoriaCama').each(function(idx, el){
				jsonForUpdate[el.id].habilitadas = $(el).find('.habilitadas').val();
				jsonForUpdate[el.id].disponibles = $(el).find('.disponibles').val();

				if( el.id != "camasNoDiscriminadas"){
					jsonForUpdate[el.id].libres = $(el).find('.libres').val();
				}
			})
		}

	});


	return camasCollectionView;

}(af, common, _, AppFrameworkRenderer, BaseCollectionView, Chart));