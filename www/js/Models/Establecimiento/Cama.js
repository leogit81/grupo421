var Cama = (function (BaseModel) {
	"use strict";

	var cama = BaseModel.extend({
		defaults: {
			"idEstablecimiento": null,
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
				"disponibles": null,
				"libres": null
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
		}

	});

	return cama;
}(BaseModel));