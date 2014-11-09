var ParticipacionesView = (function (_, BaseView) {
    "use strict";
    
    var participacionesView = BaseView.extend({
        template : _.template(
            "<div><h2>PARTICIPACIONES</h2></div>" +
                "<% if (registroHPGD=='SI') { %><div><label>Registro de hospital público de gestión descentralizada (HPGD)</label></div><% } %>" +
                "<% if (programaRemediar=='SI') { %><div><label>Programa Remediar</label></div><% } %>" +
                "<% if (planNacer=='SI') { %><div><label>Plan Nacer</label></div><% } %>" +
                "<% if (programaMedicosComunitarios=='SI') { %><div><label>Programa Médicos Comunitarios</label></div><% } %>" +
                "<% if (sistemaNacionalVigilanciaSalud=='SI') { %><div><label>Sistema Nacional de Vigilancia de la Salud</label></div><% } %>" +
                "<% if (redDirectoresHospitales=='SI') { %><div><label>Red Directores de Hospitales</label></div><% } %>" +
                "<% if (redNOMIVAC=='SI') { %><div><label>Red vacunatorios NOMIVAC</label></div><% } %>" +
                "<% if (redEstablecimientosCCC=='SI') { %><div><label>Red de establecimientos de cardiopatías congénitas</label></div><% } %>" +
                "<% if (sistemaNacionalSangre=='SI') { %><div><label>Sistema Nacional de Sangre</label></div><% } %>" +
                "<% if (registroSIVILE=='SI') { %><div><label>Unidad centinela registro SIVILE</label></div><% } %>"
        )
    });
    
    return participacionesView;
}(_, BaseView));



//BACK UP TEMPLATE PREVIO
//"<div><h2>PARTICIPACIONES</h2></div>" +
//                "<div><label>Registro de hospital público de gestión descentralizada (HPGD)</label><span><%=registroHPGD%></span></div>" +
//                "<div><label>Programa Remediar</label><span><%=programaRemediar%></span></div>" +
//                "<div><label>Plan Nacer</label><span><%=planNacer%></span></div>" +
//                "<div><label>Programa Médicos Comunitarios</label><span><%=programaMedicosComunitarios%></span></div>" +
//                "<div><label>Sistema Nacional de Vigilancia de la Salud</label><span><%=sistemaNacionalVigilanciaSalud%></span></div>" +
//                "<div><label>Red Directores de Hospitales</label><span><%=redDirectoresHospitales%></span></div>" +
//                "<div><label>Red vacunatorios NOMIVAC</label><span><%=redNOMIVAC%></span></div>" +
//                "<div><label>Red de establecimientos de cardiopatías congénitas</label><span><%=redEstablecimientosCCC%></span></div>" +
//                "<div><label>Sistema Nacional de Sangre</label><span><%=sistemaNacionalSangre%></span></div>" +
//                "<div><label>Unidad centinela registro SIVILE</label><span><%=registroSIVILE%></span></div>"