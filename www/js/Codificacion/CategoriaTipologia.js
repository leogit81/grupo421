function CategoriaTopologia () {
    "use strict";
    var listaCatTipologia = [{idCatTip:"111", catTip:"Bajo riesgo con internación simple"},
                           {idCatTip:"112", catTip:"Mediano riesgo con internación con cuidados especiales"},
                           {idCatTip:"113", catTip:"Alto riesgo con terapia intensiva"},
                           {idCatTip:"114", catTip:"Alto riesgo con terapia intensiva especializada"},
                           {idCatTip:"121", catTip:"Bajo riesgo con internación simple"},
                           {idCatTip:"122", catTip:"Mediano riesgo con internación con cuidados especiales"},
                           {idCatTip:"123", catTip:"Alto riesgo con terapia intensiva"},
                           {idCatTip:"124", catTip:"Alto riesgo con terapia intensiva especializada"},
                           {idCatTip:"131", catTip:"Bajo riesgo con internación simple"},
                           {idCatTip:"132", catTip:"Mediano riesgo con internación con cuidados especiales"},
                           {idCatTip:"133", catTip:"Alto riesgo con terapia intensiva"},
                           {idCatTip:"134", catTip:"Alto riesgo con terapia intensiva especializada"},
                           {idCatTip:"141", catTip:"Bajo riesgo con internación simple"},
                           {idCatTip:"142", catTip:"Mediano riesgo con internación con cuidados especiales"},
                           {idCatTip:"143", catTip:"Alto riesgo con terapia intensiva"},
                           {idCatTip:"144", catTip:"Alto riesgo con terapia intensiva especializada"},
                           {idCatTip:"151", catTip:"Bajo riesgo con internación simple"},
                           {idCatTip:"152", catTip:"Mediano riesgo con internación con cuidados especiales"},
                           {idCatTip:"153", catTip:"Alto riesgo con terapia intensiva"},
                           {idCatTip:"154", catTip:"Alto riesgo con terapia intensiva especializada"},
                           {idCatTip:"161", catTip:"Sin atención médica en forma periódica (menor a 3 veces por semana)"},
                           {idCatTip:"162", catTip:"Con atención médica general por lo menos 3 días de la semana"},
                           {idCatTip:"163", catTip:"Con atención médica diaria y con especialidades y/o otras profesiones"},
                           {idCatTip:"164", catTip:"Con guardia permanente"},
                           {idCatTip:"192", catTip:"Internación Domiciliaria"},
                           {idCatTip:"193", catTip:"Sistema de Atención extra hospitalaria"},
                           {idCatTip:"194", catTip:"Laboratorios mecánica dental"},
                           {idCatTip:"195", catTip:"Gabinete de Podología"},
                           {idCatTip:"196", catTip:"Óptica"},
                           {idCatTip:"197", catTip:"Ortopedia"},
                           {idCatTip:"198", catTip:"Bancos de Sangre"},
                           {idCatTip:"199", catTip:"Residuos Patológicos"},
                           {idCatTip:"200", catTip:"Vacunatorios"},
                           {idCatTip:"201", catTip:"Bajo riesgo con internación simple"},
                           {idCatTip:"202", catTip:"Mediano riesgo con internación con cuidados especiales"},
                           {idCatTip:"204", catTip:"Agencias-servicios gubernamentales"},
                           {idCatTip:"205", catTip:"Unidades de Atención Móviles"},
                           {idCatTip:"206", catTip:"Otros"},
                           {idCatTip:"500", catTip:"Diagnostico por Imágenes"},
                           {idCatTip:"501", catTip:"Diagnostico por Imágenes odontológicas"},
                           {idCatTip:"502", catTip:"Laboratorio de Análisis Clínicos"},
                           {idCatTip:"503", catTip:"Laboratorio de Anatomía patológica"},
                           {idCatTip:"504", catTip:"Diagnostico por Imágenes y Laboratorio Análisis clínicos"},
                           {idCatTip:"505", catTip:"Diagnostico por Imágenes y Laboratorio"},
                           {idCatTip:"506", catTip:"Análisis clínicos y Laboratorio de Anatomía Patológica"},
                           {idCatTip:"507", catTip:"Diagnostico por Imágenes y Diagnostico por Imágenes odontológicas"},
                           {idCatTip:"509", catTip:"Centro de Diálisis"},
                           {idCatTip:"510", catTip:"Centro Rehabilitación motora"},
                           {idCatTip:"511", catTip:"Centro de salud mental"},
                           {idCatTip:"512", catTip:"Centro de día"},
                           {idCatTip:"513", catTip:"Centro tratamientos oncológicos"}
                          ];

    this.listaCatTipologiasHTML = function () {
        var i;
        var respuesta;
        respuesta += "<option value =''>Seleccione una categoría de tipología...</option>";
        for (i = 0; i < listaCatTipologia.length; i++) {
            respuesta += "<option value='" + listaCatTipologia[i].idCatTip + "'>" + listaCatTipologia[i].catTip + "</option>";
        };
        return respuesta;
    };

};
var catTipologia = new CategoriaTopologia();
var listaCompletaCatTipologias = catTipologia.listaCatTipologiasHTML();