var ListadoNoticiasView = (function (jquery, $, renderer, BaseView, NoticiaCollection, NoticiaCollectionView) {
    "use strict";

    var listadoNoticiasView = BaseView.extend({
        tagName: 'div',

        attributes: {
            'id': 'listadoNoticias',
            'class': 'panel',
            'data-nav':"consultas_nav",    
        },

        initialize: function(attributes, options) {
            options = options || {};
            options.renderer = renderer;
            BaseView.prototype.initialize.call(this, attributes, options);

            this.initializeModelDataSource();
            this.ejecutarListadoNoticias();
        },

        initializeModelDataSource: function () {
            this.modelDataSource = new ModelDataSource ({view: this});
            this.modelDataSource.on('dataFetched', this.renderVistaDeDatos, this);
        },
        
        renderVistaDeDatos: function (data) {
            var noticiaCollection = new NoticiaCollection();
            var noticiaColleccionView = NoticiaCollectionView.getInstance();
            noticiaColleccionView.setModel({model: noticiaCollection});
            noticiaCollection.processData(data);
        },

        ejecutarListadoNoticias: function(){
            this.modelDataSource.getModelData(NoticiaCollection, {
                "cantidad": 10,
            });
        },

        render: function(){ },

        /**
         * Usado para bindear eventos a los controles del formulario.
         * Se ejecuta después del render cuando los controles se encuentran cargados en la página. 
         */
        attachEvents: function(){
            BaseView.prototype.attachEvents.call(this);
        }
    });

    return listadoNoticiasView;
})(jQuery, af, AppFrameworkRenderer, BaseView, NoticiaCollection, NoticiaCollectionView);