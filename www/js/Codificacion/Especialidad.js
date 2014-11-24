function Especialidades () {
    "use strict";
    var listaEspecialidades = [{idEspecialidad:"1", especialidad:"Enfermedades infecciosas"},
                               {idEspecialidad:"2", especialidad:"Oftalmología"},
                               {idEspecialidad:"3", especialidad:"Gastroenterología"},
                               {idEspecialidad:"4", especialidad:"Quemados"},
                               {idEspecialidad:"5", especialidad:"Enfermedades respiratorias"},
                               {idEspecialidad:"6", especialidad:"Oncología"},
                               {idEspecialidad:"7", especialidad:"Rehabilitación"},
                               {idEspecialidad:"8", especialidad:"Enfermedades neurológicas"},
                               {idEspecialidad:"9", especialidad:"Cirugía plástica y reparadora"},
                               {idEspecialidad:"10", especialidad:"Geriatría"},
                               {idEspecialidad:"11", especialidad:"Cardiovascular"},
                               {idEspecialidad:"12", especialidad:"Salud Mental"},
                               {idEspecialidad:"13", especialidad:"Adicciones"},
                               {idEspecialidad:"14", especialidad:"Discapacidad"},
                               {idEspecialidad:"15", especialidad:"Sin dato"},
                               {idEspecialidad:"16", especialidad:"Ambos"},
                               {idEspecialidad:"99", especialidad:"Otros"}
                              ];

    this.listaEspecialidadesHTML = function () {
        var i;
        var respuesta;
        respuesta += "<option value =''>Seleccione una especialidad...</option>";
        for (i = 0; i < listaEspecialidades.length; i++) {
            respuesta += "<option value='" + listaEspecialidades[i].idEspecialidad + "'>" + listaEspecialidades[i].especialidad + "</option>";
        };
        return respuesta;
    };

};
var especialidades = new Especialidades();
var listaCompletaEspecialidades = especialidades.listaEspecialidadesHTML();