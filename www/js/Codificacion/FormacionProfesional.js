function FormacionProfesional() {
    "use strict";
    var listaFormaciones = [{idTipoFormacion: "1", idFormacionProf: "1", formacionProfesional: "Formacion prof. 1"},
                      {idTipoFormacion: "2", idFormacionProf: "2", formacionProfesional: "Formacion prof. 2"}
                     ];
    
    this.actualizar = function () {
        var i;
        var formacionHTML;
        var len = listaFormaciones.length;
        var idTipoFormacionSeleccionada = jQuery("#tipoFormacionProfesional").val();
        formacionHTML += "<option value =''>Seleccione un nivel de formación profesional...</option>";
        for (i = 0; i < len; i++) {
            if ( listaFormaciones[i].idTipoFormacion == idTipoFormacionSeleccionada ) {
                formacionHTML += "<option value='" + listaFormaciones[i].idFormacionProf + "'>" + listaFormaciones[i].formacionProfesional + "</option>";
            };
        };
        document.getElementById("formacionProfesional").innerHTML = formacionHTML;
    };
};

var formacionProfesional = new FormacionProfesional();