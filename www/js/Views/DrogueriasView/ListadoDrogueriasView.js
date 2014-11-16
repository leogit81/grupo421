var ListadoDrogueriasView = (function (jquery, $, renderer, BaseView, DrogueriaCollection, DrogueriaCollectionView) {
    "use strict";

    var listadoDrogueriasView = BaseView.extend({
        tagName: 'div',

        attributes: {
            'id': 'listadoDroguerias',
            'class': 'panel',
            'data-nav':"consultas_nav",    
        },

        template : _.template(
            '<div class="formGroupHead">Seleccione el filtro por el que quiera buscar droguerias.</div>' +
            '<select id="dependenciaDrogueria" name="dependenciaDrogueria"></select>' +
            '<select id="provinciaDrogueria" name="provinciaDrogueria"></select>' +                
            '<a id="submitConsultaListadoDroguerias" class="button">Consultar</a>'
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

        renderVistaDeDatos: function (data) {
            var drogueriaCollection = new DrogueriaCollection();
            var drogueriaColleccionView = DrogueriaCollectionView.getInstance();
            drogueriaColleccionView.setModel({model: drogueriaCollection});
            drogueriaCollection.processData(data);
        },

        ejecutarListadoDroguerias: function(){
            var dependenciaDrogueria = $("#dependenciaDrogueria").val();
            var provinciaDrogueria = $("#provinciaDrogueria").val();

            this.modelDataSource.getModelData(DrogueriaCollection, {
                "dependencia": dependenciaDrogueria,
                "provincia": provinciaDrogueria
            });
        },

        render: function(){
            BaseView.prototype.render.call(this);
            $(this.getViewSelector() + " select#provinciaDrogueria")[0].innerHTML = listaCompletaProvincias;
            $(this.getViewSelector() + " select#dependenciaDrogueria")[0].innerHTML = listaCompletaDependencias;
            return this;
        },

        /**
         * Usado para bindear eventos a los controles del formulario.
         * Se ejecuta después del render cuando los controles se encuentran cargados en la página. 
         */
        attachEvents: function(){
            BaseView.prototype.attachEvents.call(this);
            $("#afui").delegate(this.getViewSelector() + " a#submitConsultaListadoDroguerias", "click", _.bind(this.ejecutarListadoDroguerias, this));
        }
    });

    return listadoDrogueriasView;
})(jQuery, af, AppFrameworkRenderer, BaseView, DrogueriaCollection, DrogueriaCollectionView);