var UbicacionEstablecimientoView = (function (_, common, BaseView) {
    "use strict";
    
    var ubicacionEstablecimientoView = BaseView.extend({
        tagName: 'div',
        className: 'ubicacionView',
        
        attributes: {
            'id': 'ubicacionEstablecimiento'
        },
        
        template : _.template(
            "<div><h2>UBICACIÓN</h2></div>" +
                "<div><label>Dirección</label><span><%=direccion%></span></div>" +
                "<div><label>Código Postal</label><span><%=codigoPostal%></span></div>" +
                "<div><label>Localidad</label><span><%=localidad%></span></div>" +
                "<div><label>Departamento</label><span><%=departamento%></span></div>" +
                "<div><label>Provincia</label><span><%=provincia%></span></div>" +
                "<% if (telefono1!='null - null') { %><div><label>Teléfono</label><span><%=telefono1%></span></div><% } %>" +
                "<% if (telefono2!='null - null') { %><div><span class='ztel'><%=telefono2%></span></div><% } %>" +
                "<% if (telefono3!='null - null') { %><div><span class='ztel'><%=telefono3%></span></div><% } %>" +
                "<% if (telefono4!='null - null') { %><div><span class='ztel'><%=telefono4%></span></div><% } %>"
        ),
        
        /**
        * Setea el modelo para la vista y también actualiza los submodelos de las vistas anidadas.
        */
        setModel: function (model) {
            BaseView.prototype.setModel.call(this, model);
            
            var domicilioModel = this.getModelOrDefault("domicilio").model;
            domicilioModel.on('change', this.render, this);
            
            var telefonoModel1 = this.getModelOrDefault("telefono1").model;
            telefonoModel1.on('change', this.render, this);
            
            var telefonoModel2 = this.getModelOrDefault("telefono2").model;
            telefonoModel2.on('change', this.render, this);
            
            var telefonoModel3 = this.getModelOrDefault("telefono3").model;
            telefonoModel3.on('change', this.render, this);
            
            var telefonoModel4 = this.getModelOrDefault("telefono4").model;
            telefonoModel4.on('change', this.render, this);
        },
        
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
        }
    });
                                    
    /**
    * Devuelve la data del modelo. Esta para que puedan sobreescribir las subclases de base view
    */
    ubicacionEstablecimientoView.prototype.getModelData = function () {
        var jsonData = {};
        
        if (!common.isEmpty(this.model)) {
            var domicilio = this.model.get("domicilio");
            jsonData.codigoPostal = domicilio.get("codigoPostal");
            jsonData.direccion = domicilio.get("direccion");
            jsonData.localidad = this.model.get("localidad");
            jsonData.departamento = this.model.get("depto");
            jsonData.provincia = this.model.get("provincia");
            jsonData.telefono1 = this.getNumeroTelefonoFormateado(this.model.get("telefono1"));
            jsonData.telefono2 = this.getNumeroTelefonoFormateado(this.model.get("telefono2"));
            jsonData.telefono3 = this.getNumeroTelefonoFormateado(this.model.get("telefono3"));
            jsonData.telefono4 = this.getNumeroTelefonoFormateado(this.model.get("telefono4"));
        }
        
        return jsonData;
    };
    
    /**
    * Devuelve el tipo concatenado con el número de teléfono.
    */
    ubicacionEstablecimientoView.prototype.getNumeroTelefonoFormateado = function (telefonoModel) {
        return telefonoModel.get("tipo") + " - " + telefonoModel.get("numero");
    };
    
    return ubicacionEstablecimientoView;
}(_, common, BaseView));