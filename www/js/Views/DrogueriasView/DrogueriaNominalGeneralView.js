/**
* Es la vista que se muestra en el tab "General" de la consulta Nominal de Establecimientos.
*/
var DrogueriaNominalGeneralView = (function ($, common, _, renderer, MasterView) {
    "use strict";

    var drogueriaNominalGeneralView = MasterView.extend({
        tagName: 'div',
        className: 'panel consulta-detallada',

        attributes: {
            'id': 'drogueriaGeneral'
        },

        template : _.template(
            "<div><span class='titulosNominalDrogueria'><%=nombre%></span></div>" +
            "<div><label>Dependencia</label><span><%=dependencia%></span></div>" +
            "<div><span><%=localidad%></span></div>" +
            "<div><h2>DATOS GENERALES</h2></div>" +
            "<div><label>Código</label><span><%=codigo%></span></div>" +
            "<div><label>Tipología</label><span><%=tipologia%></span></div>" +
            "<div><label>Categorización</label><span><%=categoriaTipologia%></span></div>" +
            "<div id='ubicacionDrogueria'></div>"
        ),


        initialize: function (attributes, options) {
            options = options || {};
            options.renderer = renderer;
            
            this.createNestedViewsDictionary(this);

            var ubicacionView = new UbicacionDrogueriaView(this.getModelOrDefault("participaciones"));
            this.addView(ubicacionView, "ubicacion", "ubicacionDrogueria");
            
            MasterView.prototype.initialize.call(this, attributes, options);
        },

        /**
        * Setea el modelo para la vista y también actualiza los submodelos de las vistas anidadas.
        */
        setModel: function (model) {
            MasterView.prototype.setModel.call(this, model);
            this.getViewByName("ubicacion").setModel(model);
        }
    });

    drogueriaNominalGeneralView.prototype.getModelDefault = function () {
        if (common.isEmpty(this.model) || common.isEmpty(this.model.defaults)) {
            return {
                categoriaTipologia: null,
                codIndecLocalidad: null,
                codIndecProvincia: null,
                codigo: null,
                dependencia: null,
                fechaRegistro: null,
                localidad: null,
                nombre: null,
                provincia: null,
                tipologia: null
            };
        }

        return this.model.defaults;
    };

    return drogueriaNominalGeneralView;
}(af, common, _, AppFrameworkRenderer, MasterView));