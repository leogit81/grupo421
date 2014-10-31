function Dependencias () {
    "use strict";
    var listaDependencias = [{ id: "20", nombre: "Nacional", origen_financ: "Público" }, 
                             { id: "21", nombre: "Provincial", origen_financ: "Público" }, 
                             { id: "22", nombre: "Municipal", origen_financ: "Público" }, 
                             { id: "23", nombre: "Privado", origen_financ: "Privado" }, 
                             { id: "24", nombre: "FFAA/Seguridad", origen_financ: "Público" }, 
                             { id: "25", nombre: "Universitario público", origen_financ: "Público" }, 
                             { id: "26", nombre: "Universitario privado", origen_financ: "Privado" }, 
                             { id: "27", nombre: "Obra social", origen_financ: "Privado" }, 
                             { id: "28", nombre: "Mutual", origen_financ: "Privado" }, 
                             { id: "29", nombre: "Mixta", origen_financ: "Privado" }, 
                             { id: "30", nombre: "Otros", origen_financ: "Privado" }, 
                             { id: "31", nombre: "Servicio Penitenciario Federal", origen_financ: "Público" }];

    this.listaDependenciasHTML = function () {
        var i;
        var respuesta;
        respuesta += "<option value =''>Seleccione una dependencia...</option>";
        for (i = 0; i < listaDependencias.length; i++) {
            respuesta += "<option value='" + listaDependencias[i].id + "'>" + listaDependencias[i].nombre + "</option>";
        };
        return respuesta;
    };

};
var dependencias = new Dependencias();
var listaCompletaDependencias = dependencias.listaDependenciasHTML();