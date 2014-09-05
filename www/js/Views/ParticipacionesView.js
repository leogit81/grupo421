var ParticipacionesView = (function(BaseView){
    var participacionesView = BaseView.extend({
        template : _.template(
                            "<div><h1>PARTICIPACIONES</h1></div></br></br>" +
                            "<div><label>Plan Nacer</label><span><%=planNacer%></span></div><br>" +
                            "<div><label>Programa Médicos Comunitarios</label><span><%=programaMedicosComunitarios%></span></div><br>" +
                            "<div><label>Programa Remediar</label><span><%=programaRemediar%></span></div><br>" +
                            "<div><label>Red Directores de Hospitales</label><span><%=redDirectoresHospitales%></span></div><br>" +
                            "<div><label>Red Establecimientos CCC</label><span><%=redEstablecimientosCCC%></span></div><br>" +
                            "<div><label>Red NOMIVAC</label><span><%=redNOMIVAC%></span></div><br>" +
                            "<div><label>Registro HPGD</label><span><%=registroHPGD%></span></div><br>" +
                            "<div><label>Sistema Nacional de Vigilancia de Salud</label><span><%=sistemaNacionalVigilanciaSalud%></span></div><br>"
                            ),
    });
    
    return participacionesView;
})(BaseView);