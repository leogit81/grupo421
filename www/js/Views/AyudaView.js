var AyudaView = (function ($, BaseView, renderer) {
    "use strict";

    var ayudaView = BaseView.extend({
        tagName: 'div',
        asideMenu: null,

        carousel: null,

        imagenes: [{nombreImagen: '01.png'},
                   {nombreImagen: '02.png'},
                   {nombreImagen: '03_1.png'},
                   {nombreImagen: '03_2.png'},
                   {nombreImagen: '04.png'},
                   {nombreImagen: '05.png'},
                   {nombreImagen: '06.png'},
                   {nombreImagen: '07.png'},
                   {nombreImagen: '08.png'},
                   {nombreImagen: '09.png'},
                   {nombreImagen: '10.png'},
                   {nombreImagen: '11.png'},
                   {nombreImagen: '12.png'},
                   {nombreImagen: '13.png'},
                   {nombreImagen: '14.png'},
                   {nombreImagen: '15.png'},
                   {nombreImagen: '16.png'},
                   {nombreImagen: '17.png'},
                   {nombreImagen: '18.png'}
                  ],

        attributes: {
            'id': 'ayuda',
            'class': 'panel',
            'data-nav': 'consultas_nav'
        },

        initialize: function (attributes, options) {
            options = options || {};
            options.renderer = renderer;
            BaseView.prototype.initialize.call(this, attributes, options);
        },

        template: _.template(
            '<div id="ayudaCarousel" class="owl-carousel owl-theme"><%=renderedHtml%></div>'),

        replaceTemplateWithData: function (imagenes) {
            this.renderedHtml = "";
            _.each(imagenes, this.itemTemplate, this);
            return this.template({renderedHtml: this.renderedHtml});
//            return this.renderedHtml;
        },

        itemTemplate: function (nombreImagen) {
            var temp = "<div class='owl-item'><img class='zimgAyuda' src='./img/ayuda/<%=nombreImagen%>'></div>";
            this.renderedHtml += _.template(temp, nombreImagen);
        },

        getModelData: function () {
            return this.imagenes;
        },

        render: function () {
            BaseView.prototype.render.call(this);
            this.carousel = jQuery("#ayudaCarousel").owlCarousel({
                navigation : true, // Show next and prev buttons
                navigationText: ["anterior", "siguiente"],
                autoPlay: false,
                rewindSpeed: 500,
                pagination: false,
                slideSpeed : 300,
                paginationSpeed : 400,
                singleItem:true
            });
            this.carousel.data('owlCarousel').removeItem(0);
            this.carousel.data('owlCarousel').addItem(this.renderedHtml);
            jQuery("#ayudaCarousel .owl-item").css("height",(window.innerHeight*0.80));
            jQuery("#ayudaCarousel .owl-controls").css("margin-top","0");
            $.ui.hideMask();
        }
    });
    return ayudaView;
}(af, BaseView, AppFrameworkRenderer));