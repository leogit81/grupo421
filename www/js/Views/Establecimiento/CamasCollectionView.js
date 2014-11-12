var CamasCollectionView = (function ($, common, _, renderer, BaseCollectionView) {
	"use strict";

	var camasCollectionView = BaseCollectionView.extend({
		tagName: 'div',
		className: 'panel consulta-detallada',

		attributes: {
			'id': 'resultadoConsultaNominalCamasEstablecimiento',
			'data-nav': "consultas_nav"
		},

		itemTemplateString :
		"<li><a>totalCamasDisponibles: <span><%=totalCamasDisponibles%></span></a></li>"+
		"<li><a>totalCamasHabilitadas: <span><%=totalCamasHabilitadas%></span></a></li>"+
		"<li><a>totalCamasLibres: <span><%=totalCamasLibres%></span></a></li>" +
		"<li><a>camasCuidadosEspecialesDisponibles: <span><%=camasCuidadosEspecialesDisponibles%></span></a></li>"+
		"<li><a>camasCuidadosEspecialesHabilitadas: <span><%=camasCuidadosEspecialesHabilitadas%></span></a></li>"+
		"<li><a>camasCuidadosEspecialesLibres: <span><%=camasCuidadosEspecialesLibres%></span></a></li>"+
		"<li><a>camasGeneralesDisponibles: <span><%=camasGeneralesDisponibles%></span></a></li>"+
		"<li><a>camasGeneralesDisponibles: <span><%=camasGeneralesHabilitadas%></span></a></li>"+
		"<li><a>camasGeneralesLibres: <span><%=camasGeneralesLibres%></span></a></li>"+
		"<li><a>camasInternacionProlongadaDisponibles: <span><%=camasInternacionProlongadaDisponibles%></span></a></li>"+
		"<li><a>camasInternacionProlongadaHabilitadas: <span><%=camasInternacionProlongadaHabilitadas%></span></a></li>"+
		"<li><a>camasInternacionProlongadaLibres: <span><%=camasInternacionProlongadaLibres%></span></a></li>"+
		"<li><a>camasMaternidadDisponibles: <span><%=camasMaternidadDisponibles%></span></a></li>"+
		"<li><a>camasMaternidadHabilitadas: <span><%=camasMaternidadHabilitadas%></span></a></li>"+
		"<li><a>camasMaternidadLibres: <span><%=camasMaternidadLibres%></span></a></li>"+
		"<li><a>camasNeonatologiaDisponibles: <span><%=camasNeonatologiaDisponibles%></span></a></li>"+
		"<li><a>camasNeonatologiaHabilitadas: <span><%=camasNeonatologiaHabilitadas%></span></a></li>"+
		"<li><a>camasNeonatologiaHabilitadas: <span><%=camasNeonatologiaLibres%></span></a></li>"+
		"<li><a>camasNoDiscriminadasDisponibles: <span><%=camasNoDiscriminadasDisponibles%></span></a></li>"+
		"<li><a>camasNoDiscriminadasHabilitadas: <span><%=camasNoDiscriminadasHabilitadas%></span></a></li>"+
		"<li><a>camasPediatricasDisponibles: <span><%=camasPediatricasDisponibles%></span></a></li>"+
		"<li><a>camasPediatricasHabilitadas: <span><%=camasPediatricasHabilitadas%></span></a></li>"+
		"<li><a>camasPediatricasLibres: <span><%=camasPediatricasLibres%></span></a></li>"+
		"<li><a>camasTerapiaIntensivaAdultosDisponibles: <span><%=camasTerapiaIntensivaAdultosDisponibles%></span></a></li>"+
		"<li><a>camasTerapiaIntensivaAdultosHabilitadas: <span><%=camasTerapiaIntensivaAdultosHabilitadas%></span></a></li>"+
		"<li><a>camasTerapiaIntensivaAdultosLibres: <span><%=camasTerapiaIntensivaAdultosLibres%></span></a></li>"+
		"<li><a>camasTerapiaIntensivaPediatricasDisponibles: <span><%=camasTerapiaIntensivaPediatricasDisponibles%></span></a></li>"+
		"<li><a>camasTerapiaIntensivaPediatricasHabilitadas: <span><%=camasTerapiaIntensivaPediatricasHabilitadas%></span></a></li>"+
		"<li><a>camasTerapiaIntensivaPediatricasLibres: <span><%=camasTerapiaIntensivaPediatricasLibres%></span></a></li>"+
		"<li><a>camasUsoTransitorioDisponibles: <span><%=camasUsoTransitorioDisponibles%></span></a></li>"+
		"<li><a>camasUsoTransitorioHabilitadas: <span><%=camasUsoTransitorioHabilitadas%></span></a></li>"+
		"<li><a>camasUsoTransitorioLibres: <span><%=camasUsoTransitorioLibres%></span></a></li>"
	});

	return camasCollectionView;
}(af, common, _, AppFrameworkRenderer, BaseCollectionView));