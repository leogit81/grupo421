/**
* Es la vista que se muestra en el tab "General" de la consulta Nominal de Establecimientos.
*/
var ProfesionalNominalGeneralView = (function ($, common, _, renderer, MasterView) {
    "use strict";

    var profesionalNominalGeneralView = MasterView.extend({
        tagName: 'div',
        className: 'panel consulta-detallada',

        attributes: {
            'id': 'profesionalGeneral'
        },

        template : _.template(
            "<div><%=nombre%> <%=apellido%></span></div>"
        ),


        initialize: function (attributes, options) {
            options = options || {};
            options.renderer = renderer;
            
            this.createNestedViewsDictionary(this);

//            var ubicacionView = new UbicacionProfesionalView(this.getModelOrDefault("participaciones"));
//            this.addView(ubicacionView, "ubicacion", "ubicacionProfesional");
            
            MasterView.prototype.initialize.call(this, attributes, options);
        },

        /**
        * Setea el modelo para la vista y también actualiza los submodelos de las vistas anidadas.
        */
        setModel: function (model) {
            MasterView.prototype.setModel.call(this, model);
//            this.getViewByName("ubicacion").setModel(model);
        }
    });

    profesionalNominalGeneralView.prototype.getModelDefault = function () {
        if (common.isEmpty(this.model) || common.isEmpty(this.model.defaults)) {
            return {
                nombre: null,
                apellido: null
            };
        }

        return this.model.defaults;
    };

    return profesionalNominalGeneralView;
}(af, common, _, AppFrameworkRenderer, MasterView));