var ProfesionalNominalGeneralView = (function ($, common, _, renderer, BaseView) {
    "use strict";

    var profesionalNominalGeneralView = BaseView.extend({
        tagName: 'div',
        className: 'panel consulta-detallada',

        attributes: {
            'id': 'profesionalGeneral'
        },

        template : _.template(
            "<div><h3><%=nombre%> <%=apellido%></h3></div></br>" +
            "<div><label>Código</label><%=codigo%></div></br>" +
            "<div><label>Fecha registro</label><%=fechaRegistro%></div></br>" +
            "<div><label>Fecha modificación</label><%=fechaModificacion%></div></br>" +
            "<div><label>Tipo</label><%=tipoDocumento%><label>Nro</label><%=numeroDocumento%></div>" +
            "<% if (matriculas) { %><div id='matriculasProf'><h2>MATRICULAS</h2><%=matriculas%><% } %></div>"
        ),

        initialize: function (attributes, options) {
            options = options || {};
            options.renderer = renderer;
            BaseView.prototype.initialize.call(this, attributes, options);
        }
    });

    profesionalNominalGeneralView.prototype.getModelDefault = function () {
        if (common.isEmpty(this.model) || common.isEmpty(this.model.defaults)) {
            return {
                nombre: null,
                apellido: null,
                codigo: null,
                fechaRegistro: null,
                fechaModificacion: null,
                tipoDocumento: null,
                numeroDocumento: null
            };
        }

        if (_.isFunction(this.model.defaults)){
            return this.model.defaults();
        };
        return this.model.defaults;
    };


    profesionalNominalGeneralView.prototype.replaceTemplateWithData = function (jsonData) {
        var matriculas = this.model.get("matriculas").matricula;
        if (common.isEmpty(jsonData)) {
            jsonData = {};
        }
        if (matriculas){
            var matriculasLen = matriculas.length;
            var matriculasString = '';
            var i;
            for (i = 0 ; i < matriculasLen ; i++) { 
                matriculasString += 
                    "<div><h4>Estado: " + matriculas[i].estado + "</h4>" +
                    "Matrícula: " + matriculas[i].matricula + "</br>" +
                    "Profesión: " + matriculas[i].profesion + "</br>" +
                    "Jurisdicción: " + matriculas[i].jurisdiccion + "</br>" +
                    "Fecha registro: " + matriculas[i].fechaRegistro + "</br>" +
                    "Fecha modificación: " + matriculas[i].fechaModificacion + "</div></br>";
            }
            jsonData.matriculas = matriculasString;
        }
        else {jsonData.matriculas = null};
        
        return this.template(jsonData);
    };

    return profesionalNominalGeneralView;
}(af, common, _, AppFrameworkRenderer, BaseView));