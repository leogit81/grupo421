/**
* Es la vista que se muestra en el tab "General" de la consulta Nominal de Instituciones formadoras.
*/
var InstFormNominalGeneralView = (function ($, common, _, renderer, MasterView) {
    "use strict";

    var instFormNominalGeneralView = MasterView.extend({
        tagName: 'div',
        className: 'panel consulta-detallada',

        attributes: {
            'id': 'instFormGeneral'
        },

        template : _.template(
            "<div><span class='titulosNominalInstForm'><%=nombre%></span></div>" +
            "<div><h2>DATOS GENERALES</h2></div>" +
            "<div><label>Código</label><span><%=codigoSISA%></span></div>" +
            "<div><label>Auxiliarato</label><span><%=auxiliarato%></span></div>" +
            "<div><label>Región del país</label><span><%=regionPais%></span></div>" +
            "<div><label>Provincia</label><span><%=provincia%></span></div>" +            
            "<div><label>Departamento</label><span><%=depto%></span></div>" +
            "<div><label>Localidad</label><span><%=localidad%></span></div>" +
            "<div><label>Direccion</label><span><%=direccion%></span></div>" +
            "<div><label>Codigo Postal</label><span><%=codigoPostal%></span></div>" +
            "<div><label>Grado universitario</label><span><%=gradoUniversitario%></span></div>" +
            "<div><label>Tipo de institución</label><span><%=tipoInstitucion%></span></div>" +
            "<div><label>Subtipo de institución</label><span><%=subtipoInstitucion%></span></div>" +
            "<div><label>Tecnicatura</label><span><%=tecnicatura%></span></div>" +
            "<% if (telefono1!='null - null') { %><div><label>Teléfono</label><span><%=telefono1%></span></div><% } %>" +
            "<% if (telefono2!='null - null') { %><div><span class='ztel'><%=telefono2%></span></div><% } %>" +
            "<% if (telefono3!='null - null') { %><div><span class='ztel'><%=telefono3%></span></div><% } %>" +
            "<% if (telefono4!='null - null') { %><div><span class='ztel'><%=telefono4%></span></div><% } %>" +
            "<% if (especialidades) { %><div id='especialidadesInstForm'><h2>ESPECIALIDADES</h2><%=especialidades%><% } %></div>" +
            "<% if (carreras) { %><div id='carrerasInstForm'><h2>CARRERAS</h2><%=carreras%><% } %></div>"
        ),


        initialize: function (attributes, options) {
            options = options || {};
            options.renderer = renderer;
            this.createNestedViewsDictionary(this);
            
            MasterView.prototype.initialize.call(this, attributes, options);
        },

        /**
        * Setea el modelo para la vista y también actualiza los submodelos de las vistas anidadas.
        */
        setModel: function (model) {
            MasterView.prototype.setModel.call(this, model);
        }
    });

    instFormNominalGeneralView.prototype.getModelDefault = function () {
        if (common.isEmpty(this.model) || common.isEmpty(this.model.defaults)) {
            return {
                resultado: null,
                codIndecProvincia: null,
                codigoSISA: null,
                fechaModificacion: null,
                fechaRegistro: null,
                nombre: null,
                provincia: null,
                auxiliarato: null,
                carreras: null,
                codIndecDepto: null,
                codIndecLocalidad: null,
                coordenadas: null,
                depto: null,
                domicilio: null,
                especialidades: null,
                gradoUniversitario: null,
                localidad: null,
                regionPais: null,
                subtipoInstitucion: null,
                tecnicatura: null,
                telefono1: null,
                telefono2: null,
                telefono3: null,
                telefono4: null,
                tipoInstitucion: null
            };
        }

        return this.model.defaults;
    };

    instFormNominalGeneralView.prototype.getModelData = function () {
        var jsonData = {};

        if (!common.isEmpty(this.model)) {
            jsonData.nombre = this.model.get("nombre");
            jsonData.codigoSISA = this.model.get("codigoSISA");
            jsonData.auxiliarato = this.model.get("auxiliarato");
            jsonData.regionPais = this.model.get("regionPais");
            jsonData.provincia = this.model.get("provincia");
            jsonData.depto = this.model.get("depto");
            jsonData.localidad = this.model.get("localidad");

            var domicilio = this.model.get("domicilio");
            jsonData.codigoPostal = domicilio.get("codigoPostal");
            jsonData.direccion = domicilio.get("direccion");

            jsonData.gradoUniversitario = this.model.get("gradoUniversitario");
            jsonData.tipoInstitucion = this.model.get("tipoInstitucion");
            jsonData.subtipoInstitucion = this.model.get("subtipoInstitucion");
            jsonData.tecnicatura = this.model.get("tecnicatura");
            jsonData.telefono1 = this.getNumeroTelefonoFormateado(this.model.get("telefono1"));
            jsonData.telefono2 = this.getNumeroTelefonoFormateado(this.model.get("telefono2"));
            jsonData.telefono3 = this.getNumeroTelefonoFormateado(this.model.get("telefono3"));
            jsonData.telefono4 = this.getNumeroTelefonoFormateado(this.model.get("telefono4"));

            var carreras = this.model.get("carreras").carrera;
            if (carreras){
                var carrerasLen = carreras.length;
                var carrerasString = '';
                var i;
                for (i = 0 ; i < carrerasLen ; i++) { 
                    carrerasString += 
                        "<div><h4>" + carreras[i].nombre + "</h4>" +
                        "Duración: " + carreras[i].candidadAnio + " años</br>" +
                        "Nivel de formación: " + carreras[i].nivelFormacion + "</br>" +
                        "Título: " + carreras[i].titulo + "</br>" +
                        "Regulada: " + carreras[i].regulada + "</div></br>";
                }
                jsonData.carreras = carrerasString;
            }
            else {jsonData.carreras = null};

            var especialidades = this.model.get("especialidades").especialidade;
            if (especialidades){
                var especialidadesLen = especialidades.length;
                var especialidadesString = '';
                var i;
                var e;
                for (i = 0 ; i < especialidadesLen ; i++) {
                    e = especialidades[i];
                    especialidadesString += "<div><h4>" + e.nombre + "</h4>";
                    if ( e.refepsEntidadEvaluadora ) { especialidadesString += "Entidad Evaluadora: " + e.refepsEntidadEvaluadora + "</br>" };
                    if ( e.acredSolicitada ) { especialidadesString += "Acreditación solicitada: " + e.acredSolicitada + "</br>" };
                    if ( e.acredEvalRealizada ) { especialidadesString += "Evaluación de acred. realizada: " + e.acredEvalRealizada + "</br>" };
                    if ( e.acredEvalCompleta ) { especialidadesString += "Evaluación de acred. completa: " + e.acredEvalCompleta + "</br>" };
                    if ( e.acredNroExpediente ) { especialidadesString += "Expediente acred.: " + e.acredNroExpediente };
                    especialidadesString += "</div></br>";
                }
                jsonData.especialidades = especialidadesString;
            }
            else {jsonData.especialidades = null};

        }

        return jsonData;
    };

    instFormNominalGeneralView.prototype.getNumeroTelefonoFormateado = function (telefonoModel) {
        return telefonoModel.get("tipo") + " - " + telefonoModel.get("numero");
    };

    return instFormNominalGeneralView;
}(af, common, _, AppFrameworkRenderer, MasterView));