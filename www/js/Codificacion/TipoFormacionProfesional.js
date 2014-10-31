function TipoFormacionProfesional () {
    "use strict";
    var listaTipoFormacionProfesional = [{id: "1", nombre: "TipoFormacionProfesional1"}, 
                                         {id: "2", nombre: "TipoFormacionProfesional2"}
                                        ];

    this.listaTipoFormacionProfesionalHTML = function () {
        var i;
        var respuesta;
        respuesta += "<option value =''>Seleccione un tipo de formación...</option>";
        for (i = 0; i < listaTipoFormacionProfesional.length; i++) {
            respuesta += "<option value='" + listaTipoFormacionProfesional[i].id + "'>" + listaTipoFormacionProfesional[i].nombre + "</option>";
        };
        return respuesta;
    };

};
var tipoFormacionProfesional = new TipoFormacionProfesional();
var listaCompletaTipoFormacionProfesional = tipoFormacionProfesional.listaTipoFormacionProfesionalHTML();