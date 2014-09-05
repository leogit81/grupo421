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
        }
    });
    
    return participaciones;
})(BaseModel);