var InstFormCollectionView = (function ($, common, Backbone, _, renderer, BaseView, InstFormNominal, InstFormNominalView) {
    "use strict";

    var instFormCollectionView = BaseView.extend({
        tagName: 'div',
        className: 'panel consulta-detallada',

        attributes: {
            'id': 'resultadoConsultaGeneralInstForm',
            'data-nav': "consultas_nav"
        },

        template : _.template("<ul class='list'><%= renderedHtml %></ul>"),

        renderedHtml: null,

        armarHtml: function (instForms) {
            this.renderedHtml = "";
            _.each(instForms, this.itemTemplate, this);
        },

        itemTemplate: function (instForm) {
            var temp = "<li><a><%=nombre%></br><span class='codigoInstForm'> <%=codigoSISA%> </span> - <%=provincia%></a></li>";
            this.renderedHtml += _.template(temp, instForm);
        },

        self: this,

        initialize: function (attributes, options) {
            options = options || {};
            options.renderer = renderer;
            BaseView.prototype.initialize.call(this, attributes, options);
            this.setModel(attributes);
        },

        cantidadDeInstForms: 0,

        render: function (model, collection, options) {
            //TODO: esto hay que corregirlo, es un parche para evitar que me haga un render para cada establecimiento que se agrega a la colección.
            this.cantidadDeInstForms++;
            if (this.cantidadDeInstForms < collection.length) {
                return;
            } else {
                this.cantidadDeInstForms = 0;
            }
            //fin del parche

            this.$el.empty();
            this.armarHtml(this.model.toJSON());
            this.$el.append(this.template({"renderedHtml": this.renderedHtml}));

            if (!common.isEmpty(this.renderer)) {
                this.renderer.render(this);
            }

            //agrego esta clase para poder aplicar estilos CSS
            $("#resultadoConsultaGeneralInstForm").addClass("consulta-detallada");

            //TODO: ESTO NO TIENE QUE ESTAR ACÁ PORQUE YA ESTÁ EN LA CLASE BaseView
            $.ui.hideMask();

            return this;
        },

        busquedaNominalInstForm: function (eventData) {
            //            var codigoInstForm = this.getCodigoInstFormFromSelectedItem(eventData.currentTarget.outerHTML);
            //            var instFormNominalModel = new InstFormNominal();
            //            var instFormView = new InstFormNominalView();
            //            instFormView.setModel(instFormNominalModel);
            //            instFormNominalModel.load(codigoInstForm);

            var codigoInstForm = this.getCodigoInstFormFromSelectedItem(eventData.currentTarget.outerHTML),
                instFormNominalView = new InstFormNominalView({codigo: codigoInstForm});
            instFormNominalView.loadDefaultView();
        },

        getCodigoInstFormFromSelectedItem: function (selectedItem) {
            return common.trim($(selectedItem).find("span.codigoInstForm").html());
        },

        attachEvents: function() {
            BaseView.prototype.attachEvents.call(this);
            $("#afui").delegate(this.getViewSelector() + " ul li a", "click", _.bind(this.busquedaNominalInstForm, this));
        }

    });

    instFormCollectionView.prototype.setModel = function (attributes) {
        if (attributes !== undefined && attributes.model !== undefined) {
            this.model = attributes.model;
        } else {
            return;
        }
        this.model.on('remove', this.render, this);
        this.model.on('add', this.render, this);
    };

    return instFormCollectionView;
}(af, common, Backbone, _, AppFrameworkRenderer, BaseView, InstFormNominal, InstFormNominalView));
