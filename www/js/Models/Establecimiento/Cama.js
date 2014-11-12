var Cama = (function (BaseModel) {
	"use strict";

	var cama = BaseModel.extend({
		defaults : {
			"camasCuidadosEspecialesDisponibles": "0",
			"camasCuidadosEspecialesHabilitadas": "0",
			"camasCuidadosEspecialesLibres": "0",
			"camasGeneralesDisponibles": "0",
			"camasGeneralesHabilitadas": "0",
			"camasGeneralesLibres": "0",
			"camasInternacionProlongadaDisponibles": "0",
			"camasInternacionProlongadaHabilitadas": "0",
			"camasInternacionProlongadaLibres": "0",
			"camasMaternidadDisponibles": "0",
			"camasMaternidadHabilitadas": "0",
			"camasMaternidadLibres": "0",
			"camasNeonatologiaDisponibles": "0",
			"camasNeonatologiaHabilitadas": "0",
			"camasNeonatologiaLibres": "0",
			"camasNoDiscriminadasDisponibles": "0",
			"camasNoDiscriminadasHabilitadas": "0",
			"camasPediatricasDisponibles": "0",
			"camasPediatricasHabilitadas": "0",
			"camasPediatricasLibres": "0",
			"camasTerapiaIntensivaAdultosDisponibles": "0",
			"camasTerapiaIntensivaAdultosHabilitadas": "0",
			"camasTerapiaIntensivaAdultosLibres": "0",
			"camasTerapiaIntensivaPediatricasDisponibles": "0",
			"camasTerapiaIntensivaPediatricasHabilitadas": "0",
			"camasTerapiaIntensivaPediatricasLibres": "0",
			"camasUsoTransitorioDisponibles": "0",
			"camasUsoTransitorioHabilitadas": "0",
			"camasUsoTransitorioLibres": "0",
			"totalCamasDisponibles": "0",
			"totalCamasHabilitadas": "0",
			"totalCamasLibres": "0"
		}
	});

	return cama;
}(BaseModel));