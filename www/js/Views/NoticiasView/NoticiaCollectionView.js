var NoticiaCollectionView = (function ($, common, Backbone, _, renderer, BaseView, NoticiaNominal, NoticiaNominalView) {
    "use strict";

    var noticiaCollectionView = BaseView.extend({
        tagName: 'div',

        attributes: {
            'id': 'resultadoConsultaGeneralNoticia',
        },

        template : _.template('<div id="owl-demo" class="owl-carousel owl-theme"><%= renderedHtml %></div>'), 

        renderedHtml: null,

        armarHtml: function (noticias) {
            this.renderedHtml = "";
            _.each(noticias, this.itemTemplate, this);
        },

        itemTemplate: function (noticia) {
            var temp = "<div class='owl-item'><div class='zslider-item'><h3><%=titulo%></h3><span class='zmas'><i>[Seguir leyendo...]</i></span></br>" + 
                "<div id='idNoticia' style='display: none;'><%=idNoticia%></div></div></div>";
            this.renderedHtml += _.template(temp, noticia);
        },

        self: this,

        initialize: function (attributes, options) {
            options = options || {};
            options.renderer = renderer;
            BaseView.prototype.initialize.call(this, attributes, options);
            this.setModel(attributes);
        },

        cantidadDeNoticias: 0,

        render: function (model, collection, options) {
            //TODO: esto hay que corregirlo, es un parche para evitar que me haga un render para cada establecimiento que se agrega a la colección.
            this.cantidadDeNoticias++;
            if (this.cantidadDeNoticias < collection.length) {
                return;
            } else {
                this.cantidadDeNoticias = 0;
            }
            //fin del parche

            this.$el.empty();
            this.armarHtml(this.model.toJSON());
            owl.data('owlCarousel').removeItem(0);
            owl.data('owlCarousel').addItem(this.renderedHtml);

            //TODO: ESTO NO TIENE QUE ESTAR ACÁ PORQUE YA ESTÁ EN LA CLASE BaseView
            $.ui.hideMask();

            return this;
        },

        busquedaNominalNoticia: function (eventData) {
            var codigoNoticia = this.getCodigoNoticiaFromSelectedItem(eventData.currentTarget.outerHTML);    
            var noticiaNominalModel = new NoticiaNominal();
            var noticiaView = new NoticiaNominalView();
            noticiaView.setModel(noticiaNominalModel);
            noticiaNominalModel.load(codigoNoticia);
        },

        getCodigoNoticiaFromSelectedItem: function (selectedItem) {
            return common.trim($(selectedItem).find("#idNoticia").html());
        },

        attachEvents: function() {
            BaseView.prototype.attachEvents.call(this);
            $("#afui").delegate("div.zslider-item", "click", _.bind(this.busquedaNominalNoticia, this));
        }

    });

    noticiaCollectionView.prototype.setModel = function (attributes) {
        if (attributes !== undefined && attributes.model !== undefined) {
            this.model = attributes.model;
        } else {
            return;
        }

        this.model.on('remove', this.render, this);
        this.model.on('add', this.render, this);
    };

    return noticiaCollectionView;
}(af, common, Backbone, _, AppFrameworkRenderer, BaseView, NoticiaNominal, NoticiaNominalView));
