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
        ),
        
        render: function () {
            BaseView.prototype.render.call(this);
            var cuentaDeSI = 0;
            
            _.each(this.model.attributes, function (value, key, list) {
                if (!common.isEmpty(list[key]) && list[key].toString().toUpperCase() === "SI") {
                    cuentaDeSI++;
                }
            });
            
            if (cuentaDeSI <= 0) {
                this.$el.append("No se encuentra información disponible de participaciones.");
            }
        }
    });
    
    return participacionesView;
}(_, BaseView));