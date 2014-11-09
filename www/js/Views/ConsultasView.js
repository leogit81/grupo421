var ConsultasView = (function($, BaseView, MenuConsultasView, renderer){
    var consultasView = BaseView.extend({
        tagName: 'div',
        asideMenu: null,

        attributes: {
            'id': 'consultas',
            'class': 'panel',
            'data-nav':"consultas_nav",
        },

        render: function(){
            var contentEl = $("#afui div#content");
            var consultaElement = this.$el.append(this.template())[0];
            contentEl.append(consultaElement);

            this.asideMenu = MenuConsultasView.getInstance();
            $("#content").trigger("orientationchange");
            //this.asideMenu.render();
        }
    });
    
    return consultasView;
})(af, BaseView, MenuConsultasView, AppFrameworkRenderer);