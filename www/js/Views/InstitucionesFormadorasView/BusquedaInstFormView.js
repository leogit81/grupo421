var BusquedaInstFormView = (function (jquery, $, renderer, BaseView, InstFormNominal, InstFormNominalView) {
    "use strict";

    var busquedaInstFormView = BaseView.extend({
        tagName: 'div',

        attributes: {
            'id': 'busquedaInstForm',
            'class': 'panel',
            'data-nav':"consultas_nav",    
        },

        template : _.template(
            '<div class="formGroupHead">Ingrese el código de la institución formadora que quiere buscar.</div>' +
            '<input id="codigoInstForm" type="tel" name="codigoInstForm" placeholder="Código de Institución Formadora"></input></br>' +
            '<a id="submitConsultaBusquedaInstForm" class="button">Buscar</a>'
        ),

        initialize: function(attributes, options) {
            options = options || {};
            options.renderer = renderer;
            
            this.idImagen = 'imagenInstFormadoras';
            
            BaseView.prototype.initialize.call(this, attributes, options);

            this.initializeModelDataSource();
        },

        initializeModelDataSource: function () {
            this.modelDataSource = new ModelDataSource ({view: this});
            this.modelDataSource.on('dataFetched', this.renderVistaDeDatos, this);
        },

        ejecutarBusquedaInstForm: function(){
            var codigoInstForm = $("#codigoInstForm").val();
            
            /*Si el código es vacío muestra un mensaje de error y cancela la consulta*/
            if (codigoInstForm === "" || codigoInstForm === null || codigoInstForm === undefined) {
                $("#afui").popup(
                    {
                        title: "SISA Móvil",
                        message: "Debe ingresar un código para realizar la búsqueda solicitada.",
                        cancelText: "Aceptar",
                        cancelCallback: function(){},						
                        cancelOnly: true
                    }
                );

                return;
            }
            
            var instFormNominalModel = new InstFormNominal();
            var instFormView = new InstFormNominalView({codigo: codigoInstForm});
            instFormView.loadDefaultView();
        },
        
        /**
         * Usado para bindear eventos a los controles del formulario.
         * Se ejecuta después del render cuando los controles se encuentran cargados en la página. 
         */
        attachEvents: function(){
            BaseView.prototype.attachEvents.call(this);
            $("#afui").delegate(this.getViewSelector() + " a#submitConsultaBusquedaInstForm", "click", _.bind(this.ejecutarBusquedaInstForm, this));
        }
    });
    return busquedaInstFormView;
})(jQuery, af, AppFrameworkRenderer, BaseView, InstFormNominal, InstFormNominalView);