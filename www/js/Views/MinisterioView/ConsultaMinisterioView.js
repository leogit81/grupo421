var ConsultaMinisterioView = (function(jquery, $, renderer, BaseView, Ministerio, MinisterioView){

    var consultaMinisterioView = BaseView.extend({
        tagName: 'div',

        attributes: {
            'id': 'consultaMinisterio',
            'class': 'panel',
            'data-nav':"consultas_nav"
        },

        template : _.template(
            '<div class="formGroupHead">Complete el filtro para buscar un Ministerio de Salud.</div>' +
            '<select id="numeroMinisterio" required="true"></select>' +
            '<a id="submitConsultaMinisterio" class="button">Buscar</a>'
        ),

        initialize: function(attributes, options) {
            options = options || {};
            options.renderer = renderer;
            
            this.idImagen = 'imagenMinisterio';
            
            BaseView.prototype.initialize.call(this, attributes, options);
        },

        ejecutarConsultaMinisterio: function(){
            var numeroMinisterio = $("#numeroMinisterio").val();
            numeroMinisterio = numeroMinisterio || "0";
            
            var ministerioNominalView = new MinisterioNominalView({codigo: numeroMinisterio});
            ministerioNominalView.loadDefaultView();
        },

        render: function(){
            BaseView.prototype.render.call(this);
            document.getElementById("numeroMinisterio").innerHTML = listaCompletaProvincias;
            return this;
        },

        /**
         * Usado para bindear eventos a los controles del formulario.
         * Se ejecuta después del render cuando los controles se encuentran cargados en la página. 
         */
        attachEvents: function(){
            BaseView.prototype.attachEvents.call(this);
            $("#afui").delegate(this.getViewSelector() + " a#submitConsultaMinisterio", "click", _.bind(this.ejecutarConsultaMinisterio, this));
        }
    });

    return consultaMinisterioView;
})(jQuery, af, AppFrameworkRenderer, BaseView, Ministerio, MinisterioView);