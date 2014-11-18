var BusquedaDrogueriaView = (function (jquery, $, renderer, BaseView, DrogueriaNominal, DrogueriaNominalView) {
    "use strict";

    var busquedaDrogueriaView = BaseView.extend({
        tagName: 'div',

        attributes: {
            'id': 'busquedaDrogueria',
            'class': 'panel',
            'data-nav':"consultas_nav",
        },

        template : _.template(
            '<div class="formGroupHead">Ingrese el código de la droguería que quiere buscar.</div>' +
            '<input id="codigoDrogueria" type="number" name="codigoDrogueria" placeholder="Código de droguería"></input></br>' +
            '<a id="submitConsultaBusquedaDrogueria" class="button">Buscar</a>'
        ),

        initialize: function(attributes, options) {
            options = options || {};
            options.renderer = renderer;
            BaseView.prototype.initialize.call(this, attributes, options);

            this.initializeModelDataSource();
        },

        initializeModelDataSource: function () {
            this.modelDataSource = new ModelDataSource ({view: this});
            this.modelDataSource.on('dataFetched', this.renderVistaDeDatos, this);
        },

        ejecutarBusquedaDrogueria: function(){
            var codigoDrogueria = $("#codigoDrogueria").val();
            var drogueriaNominalModel = new DrogueriaNominal();
            var drogueriaView = new DrogueriaNominalView({codigo: codigoDrogueria});
            drogueriaView.loadDefaultView();
//            drogueriaView.setModel(drogueriaNominalModel);
//            drogueriaNominalModel.load(codigoDrogueria);
        },

//        render: function(){},

        /**
         * Usado para bindear eventos a los controles del formulario.
         * Se ejecuta después del render cuando los controles se encuentran cargados en la página. 
         */
        attachEvents: function(){
            BaseView.prototype.attachEvents.call(this);
            $("#afui").delegate(this.getViewSelector() + " a#submitConsultaBusquedaDrogueria", "click", _.bind(this.ejecutarBusquedaDrogueria, this));
        }
    });
    return busquedaDrogueriaView;
})(jQuery, af, AppFrameworkRenderer, BaseView, DrogueriaNominal, DrogueriaNominalView);