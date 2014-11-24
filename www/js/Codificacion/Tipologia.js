function Tipologias () {
    "use strict";
    var listaTipologias = [{idTipologia:"10", tipologia:"Establecimiento de salud con internación general"},
                           {idTipologia:"11", tipologia:"Establecimiento de salud con internación especializada en pediatría"},
                           {idTipologia:"12", tipologia:"Establecimiento de salud con internación especializada en maternidad/m.infantil"},
                           {idTipologia:"13", tipologia:"Establecimiento de salud con internación especializada en salud mental"},
                           {idTipologia:"14", tipologia:"Establecimiento de salud con internación especializada en otras especialidades"},
                           {idTipologia:"15", tipologia:"Establecimiento de salud con internación especializada en tercera edad"},
                           {idTipologia:"50", tipologia:"Establecimiento de salud sin internación de diagnóstico y tratamiento"},
                           {idTipologia:"51", tipologia:"Establecimiento de salud sin internación de diagnóstico"},
                           {idTipologia:"52", tipologia:"Establecimiento de salud sin internación de tratamiento"},
                           {idTipologia:"53", tipologia:"Establecimiento de salud complementario"}
                          ];

    this.listaTipologiasHTML = function () {
        var i;
        var respuesta;
        respuesta += "<option value =''>Seleccione una tipología...</option>";
        for (i = 0; i < listaTipologias.length; i++) {
            respuesta += "<option value='" + listaTipologias[i].idTipologia + "'>" + listaTipologias[i].tipologia + "</option>";
        };
        return respuesta;
    };

};
var tipologias = new Tipologias();
var listaCompletaTipologias = tipologias.listaTipologiasHTML();