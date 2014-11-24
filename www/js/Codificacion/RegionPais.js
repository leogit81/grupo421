function RegionPais () {
    "use strict";
    var listaRegionPais = [{idRegionPais:"1", regionPais:"Región NEA"},
                               {idRegionPais:"2", regionPais:"Región NOA"},
                               {idRegionPais:"3", regionPais:"Región Cuyo"},
                               {idRegionPais:"4", regionPais:"Región Centro"},
                               {idRegionPais:"5", regionPais:"Región Patagonia"}
                              ];

    this.listaRegionPaisHTML = function () {
        var i;
        var respuesta;
        respuesta += "<option value =''>Seleccione una región...</option>";
        for (i = 0; i < listaRegionPais.length; i++) {
            respuesta += "<option value='" + listaRegionPais[i].idRegionPais + "'>" + listaRegionPais[i].regionPais + "</option>";
        };
        return respuesta;
    };

};
var regionPais = new RegionPais();
var listaCompletaRegionPais = regionPais.listaRegionPaisHTML();