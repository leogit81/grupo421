/**
* Es la vista que se muestra en el tab "General" de la consulta Nominal de Establecimientos.
*/
var EstablecimientoNominalGeneralView = (function ($, common, _, renderer, MasterView) {
    "use strict";
    
    var establecimientoNominalGeneralView = MasterView.extend({
        tagName: 'div',
        className: 'panel consulta-detallada',
        
        attributes: {
            'id': 'establecimientoGeneral'
        },
        
        template : _.template(
                "<div><span class='titulosNominalEstablecimiento'><%=nombre%></span></div>" +
                "<div><span><%=depto%> - <%=provincia%></span></div>" +
                "<div><h2>DATOS GENERALES</h2></div>" +
                "<div><label>Código</label><span><%=codigo%></span></div>" +
                "<div><label>Tipología</label><span><%=tipologia%></span></div>" +
                "<div><label>Categorización</label><span><%=categoriaDeLaTipologia%></span></div>" +
                "<div><label>Origen del Financiamiento</label><span><%=origenDelFinanciamiento%></span></div>" +
                "<div id='ubicacionEstablecimiento'></div>" +
                "<div id='participacionesEstablecimiento'></div>"
        ),
                              
		initialize: function (attributes, options) {
            options = options || {};
            options.renderer = renderer;
            
            var ubicacionView = new UbicacionEstablecimientoView(this.getModelOrDefault("participaciones"));
            this.addView(ubicacionView, "ubicacion", "ubicacionEstablecimiento");
            
            var participacionesView = new ParticipacionesView(this.getModelOrDefault("participaciones"));
            this.addView(participacionesView, "participaciones", "participacionesEstablecimiento");
            
            MasterView.prototype.initialize.call(this, attributes, options);
        },
        
        /**
        * Setea el modelo para la vista y también actualiza los submodelos de las vistas anidadas.
        */
        setModel: function (model) {
            MasterView.prototype.setModel.call(this, model);
            
            this.getViewByName("ubicacion").setModel(model);
            
            var participacionesModel = this.getModelOrDefault("participaciones");
            this.getViewByName("participaciones").setModel(participacionesModel);
        }
	});
    
    establecimientoNominalGeneralView.prototype.getModelDefault = function () {
        if (common.isEmpty(this.model) || common.isEmpty(this.model.defaults)) {
            return {
                nombre: null,
                depto: null,
                provincia: null,
                codigo: null,
                tipologia: null,
                categoriaDeLaTipologia: null,
                origenDelFinanciamiento: null
            };
        }
        
        return this.model.defaults;
    };
	
	return establecimientoNominalGeneralView;
}(af, common, _, AppFrameworkRenderer, MasterView));