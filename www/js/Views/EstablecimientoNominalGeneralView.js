/**
* Es la vista que se muestra en el tab "General" de la consulta Nominal de Establecimientos.
*/
var EstablecimientoNominalGeneralView = (function ($, common, _, renderer, BaseView) {
    "use strict";
    
    var establecimientoNominalGeneralView = MasterView.extend({
        tagName: 'div',
        className: 'panel consulta-detallada',
        
        attributes: {
            'id': 'establecimientoGeneral'
        },
        
        template : _.template(
            "<div><span><%=nombre%></span></div></br>" +
                "<div><span><%=depto%> - <%=provincia%></span></div></br></br>" +
                "<div><h1>DATOS GENERALES</h1></div></br></br>" +
                "<div><label>Codigo</label><span><%=codigo%></span></div></br>" +
                "<div><label>Tipología</label><span><%=tipologia%></span></div></br>" +
                "<div><label>Categoría de la Tipología</label><span><%=categoriaDeLaTipologia%></span></div></br>" +
                "<div><label>Origen del Financiamiento</label><span><%=origenDelFinanciamiento%></span></div></br>" +
                "<div id='coordenadasDeMapa'></div></br>" +
                "<div id='coordenadasDeMapaEstablecimiento'></div></br>" +
                "<div id='domicilioEstablecimiento'></div></br>" +
                "<div id='participacionesEstablecimiento'></div></br>" +
                "<div id='telefono1Establecimiento'></div></br>" +
                "<div id='telefono2Establecimiento'></div></br>" +
                "<div id='telefono3Establecimiento'></div></br>" +
                "<div id='telefono4Establecimiento'></div></br>"
        ),
                              
		initialize: function (attributes, options) {
            options = options || {};
            options.renderer = renderer;
            
            var coordenadaView = new CoordenadasMapaView(this.getModelOrDefault("coordenadasDeMapa"));
            this.addView(coordenadaView, "coordenadasDeMapa", "coordenadasDeMapaEstablecimiento");
            
            var domicilioView = new DomicilioView(this.getModelOrDefault("domicilio"));
            this.addView(domicilioView, "domicilio", "domicilioEstablecimiento");
            
            var participacionesView = new ParticipacionesView(this.getModelOrDefault("participaciones"));
            this.addView(participacionesView, "participaciones", "participacionesEstablecimiento");
            
            var telefonoView1 = new TelefonoView(this.getModelOrDefault("telefono1"));
            this.addView(telefonoView1, "telefono1", "telefono1Establecimiento");
            
            var telefonoView2 = new TelefonoView(this.getModelOrDefault("telefono2"));
            this.addView(telefonoView2, "telefono2", "telefono2Establecimiento");
            
            var telefonoView3 = new TelefonoView(this.getModelOrDefault("telefono3"));
            this.addView(telefonoView3, "telefono3", "telefono3Establecimiento");
            
            var telefonoView4 = new TelefonoView(this.getModelOrDefault("telefono4"));
            this.addView(telefonoView4, "telefono4", "telefono4Establecimiento");
            
            MasterView.prototype.initialize.call(this, attributes, options);
        },
        
        /**
        * Devuelve un objeto literal con el sub model o un objeto literal vacío.
        * @param {String} submodelName, nombre que tiene la propiedad que contiene el sub model
        */
        getModelOrDefault: function (submodelName) {
            if (!common.isEmpty(this.model)) {
                var submodel = this.model.get(submodelName);
                if (!common.isEmpty(submodel)) {
                    if (_.isFunction(submodel)) {
                        return {model: new submodel()};
                    }
                    
                    return {model: submodel};
                }
            }
            
            return {};
        },
        
        /**
        * Setea el modelo para la vista y también actualiza los submodelos de las vistas anidadas.
        */
        setModel: function (model) {
            MasterView.prototype.setModel.call(this, model);
            
            var coordenadasModel = this.getModelOrDefault("coordenadasDeMapa");
            this.getViewByName("coordenadasDeMapa").setModel(coordenadasModel);
            
            var domicilioModel = this.getModelOrDefault("domicilio");
            this.getViewByName("domicilio").setModel(domicilioModel);
            
            var participacionesModel = this.getModelOrDefault("participaciones");
            this.getViewByName("participaciones").setModel(participacionesModel);
            
            var telefonoModel1 = this.getModelOrDefault("telefono1");
            this.getViewByName("telefono1").setModel(telefonoModel1);
            
            var telefonoModel2 = this.getModelOrDefault("telefono2");
            this.getViewByName("telefono2").setModel(telefonoModel2);
            
            var telefonoModel3 = this.getModelOrDefault("telefono3");
            this.getViewByName("telefono3").setModel(telefonoModel3);
            
            var telefonoModel4 = this.getModelOrDefault("telefono4");
            this.getViewByName("telefono4").setModel(telefonoModel4);
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
}(af, common, _, AppFrameworkRenderer, BaseView));