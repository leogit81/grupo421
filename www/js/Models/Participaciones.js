var Participaciones = (function(BaseModel){
    "use strict";
    
    var participaciones = BaseModel.extend({
        defaults : {
            "planNacer" : null,
            "programaMedicosComunitarios" : null,
            "programaRemediar" : null,
            "redDirectoresHospitales": null,
            "redEstablecimientosCCC": null,
            "redNOMIVAC": null,
            "registroHPGD": null,
            "sistemaNacionalVigilanciaSalud": null,
            "sistemaNacionalSangre": null,
            "registroSIVILE": null,
            "ERC": null,
            "PNT": null,
            "RESAM": null
        }
    });
    
    return participaciones;
})(BaseModel);