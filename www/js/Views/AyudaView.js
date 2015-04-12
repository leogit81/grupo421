var AyudaView = (function ($, BaseView, renderer) {
    "use strict";

    var ayudaView = BaseView.extend({
        tagName: 'div',
        asideMenu: null,

        carousel: null,

        imagenes: [{nombreImagen: '01.png'},
                   {nombreImagen: '02.png'},
                   {nombreImagen: '03.png'},
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
                   {nombreImagen: '18.png'},
                   {nombreImagen: '19.png'},
                   {nombreImagen: '20.png'},
                   {nombreImagen: '21.png'},
                   {nombreImagen: '22.png'},
                   {nombreImagen: '23.png'},
                   {nombreImagen: '24.png'},
                   {nombreImagen: '25.png'},
                   {nombreImagen: '26.png'},
                   {nombreImagen: '27.png'},
                   {nombreImagen: '28.png'},
                   {nombreImagen: '29.png'},
                   {nombreImagen: '30.png'},
                   {nombreImagen: '31.png'},
                   {nombreImagen: '32.png'},
                   {nombreImagen: '33.png'},
                   {nombreImagen: '34.png'},
                   {nombreImagen: '35.png'},
                   {nombreImagen: '36.png'}
                   
                  ],

        attributes: {
            'id': 'ayuda',
            'class': 'panel',
            'data-nav': 'consultas_nav'
        },

        initialize: function (attributes, options) {
            options = options || {};
            options.renderer = renderer;
            
            this.idImagen = 'imagenAyuda';
            
            BaseView.prototype.initialize.call(this, attributes, options);
        },

        template: _.template(
            '<div id="ayudaCarousel" class="owl-carousel owl-theme"><%=renderedHtml%></div>'),

        replaceTemplateWithData: function (imagenes) {
            this.renderedHtml = "";
            _.each(imagenes, this.itemTemplate, this);
            return this.template({renderedHtml: this.renderedHtml});
        },

        itemTemplate: function (nombreImagen) {
            var temp = "<div class='owl-item'><img class='zimgAyuda' src='./img/ayuda/<%=nombreImagen%>'></div>";
            this.renderedHtml += _.template(temp, nombreImagen);
        },

        getModelData: function () {
            return this.imagenes;
        },

        /*Fix para WP8, porque no se mostraban correctamente las imágenes
        En lugar de armar la vista en forma dinámica, ya se encuentra creada en el index.html
        y lo que se hace es hacerla visible solamente*/
        render: function () {
            /*BaseView.prototype.render.call(this);*/
            
            $.ui.loadContent("ayudaSISA", false, false, 'slide');
        
            //agrego esta clase para poder aplicar estilos CSS
            $("#acercaDeView").trigger("orientationchange");
            
            this.carousel = jQuery("#ayudaCarousel").owlCarousel({
                navigation : false, // Show next and prev buttons
                navigationText: ["anterior", "siguiente"],
                autoPlay: false,
                rewindSpeed: 500,
                pagination: false,
                slideSpeed : 300,
                paginationSpeed : 400,
                singleItem:true
            });
            var carouselData = this.carousel.data('owlCarousel');
            carouselData.addItem(this.renderedHtml);
            carouselData.removeItem(carouselData.maximumItem);
            jQuery("#ayudaCarousel .owl-item").css("height",(window.innerHeight*0.885));
            jQuery("#ayudaCarousel .owl-controls").css("margin-top","0");
            $("#ayudaSISA").on("loadpanelcomplete", _.bind(function () {
                $.ui.hideMask();
                this.onLoadPanelComplete();
            }, this));
        }
    });
    return ayudaView;
}(af, BaseView, AppFrameworkRenderer));