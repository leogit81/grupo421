var ReferentesView = (function ($, common, Backbone, _, renderer, BaseView) {
    "use strict";

    var referentesView = BaseView.extend({
        tagName: 'div',
        className: 'panel consulta-detallada',

        attributes: {
            'id': 'resultadoConsultaReferentes',
            'data-nav': "consultas_nav"
        },

        template : _.template("<ul class='list'><%= renderedHtml %></ul>"),

        renderedHtml: null,

        armarHtml: function (referentes) {
            this.renderedHtml = "";
            _.each(referentes, this.itemTemplate, this);
        },

        itemTemplate: function (referente) {
            var temp = "<li>" + 
                "<div style='text-align: center;'><h3><span><%=nombre%></span> - (<span><%=provincia%></span>)</div></h3></br>" +
                "<div><h4><span><%=lugar%></span></h4></div></br>" +
                "<div><h5><span><%=tipo%></span></h5></div></br>" +
                "<div><label>Mail: </label><span><%=email%></span></div></br>" +
                "<div><label>Teléfono: </label><span><%=telefono%></span></div></br>" +
                "<div><label>Registro: </label><span><%=registro%></span></div></br>" +
                "</li>";
            this.renderedHtml += _.template(temp, referente);
        },

        self: this,

        initialize: function (attributes, options) {
            options = options || {};
            options.renderer = renderer;
            BaseView.prototype.initialize.call(this, attributes, options);
            this.setModel(attributes);
        },

        cantidadDeReferentes: 0,

        render: function (model, collection, options) {
            //TODO: esto hay que corregirlo, es un parche para evitar que me haga un render para cada establecimiento que se agrega a la colección.
            this.cantidadDeReferentes++;
            if (this.cantidadDeReferentes < collection.length) {
                return;
            } else {
                this.cantidadDeReferentes = 0;
            }
            //fin del parche

            this.$el.empty();
            this.armarHtml(this.model.toJSON());
            this.$el.append(this.template({"renderedHtml": this.renderedHtml}));

            if (!common.isEmpty(this.renderer)) {
                this.renderer.render(this);
            }

            //agrego esta clase para poder aplicar estilos CSS
            $("#resultadoConsultaReferentes").addClass("consulta-detallada");

            //TODO: ESTO NO TIENE QUE ESTAR ACÁ PORQUE YA ESTÁ EN LA CLASE BaseView
            $.ui.hideMask();

            return this;
        }        
    });

    referentesView.prototype.setModel = function (attributes) {
        if (attributes !== undefined && attributes.model !== undefined) {
            this.model = attributes.model;
        } else {
            return;
        }

        //this.model.on('change', this.render, this);
        this.model.on('remove', this.render, this);
        this.model.on('add', this.render, this);
    };

    return referentesView;
}(af, common, Backbone, _, AppFrameworkRenderer, BaseView));
