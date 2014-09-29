var ConsultaEstablecimientoView = (function ($, renderer, BaseView, EstablecimientoCollection, EstablecimientoCollectionView) {
    "use strict";
    
    var consultaEstablecimientoView = BaseView.extend({
        tagName: 'div',
        
        attributes: {
            'id': 'consultaEstablecimiento',
            'class': 'panel',
            'data-title': 'Filtros',
            'data-nav': 'consultas_nav'
        },
        
        template : _.template(
            '<div class="formGroupHead">Filtros</div>' +
                '<form>' +
                    '<input id="nombreEstablecimiento" type="text" placeholder="Nombre de Establecimiento"/>' +
                    '<input id="provinciaEstablecimiento" type="text" placeholder="Provincia de Establecimiento"/>' +
                    '<input id="departamentoEstablecimiento" type="text" placeholder="Departamento de Establecimiento"/>' +
                    '<input id="localidadEstablecimiento" type="text" placeholder="Localidad de establecimiento"/>' +
                    '<a id="submitConsultaEstablecimiento" class="button">Enviar</a>' +
                '</form>'
        ),
  
		initialize: function (attributes, options) {
            options = options || {};
            options.renderer = renderer;
            BaseView.prototype.initialize.call(this, attributes, options);
            
            this.initializeModelDataSource();
        },
        
        setNombreEstablecimiento: function (e) {
            this.model.set("nombreEstablecimiento", e.target.value);
        },
        
        ejecutarConsultaEstablecimiento: function () {
           /*var establecimientoColleccionView = EstablecimientoCollectionView.getInstance({
                model: this.model,
            });*/
            
            var nombreEstablecimiento = $("#nombreEstablecimiento").val();
            var provinciaEstablecimiento = $("#provinciaEstablecimiento").val();
            var departamentoEstablecimiento = $("#departamentoEstablecimiento").val();
            var localidadEstablecimiento = $("#localidadEstablecimiento").val();
            
            /*this.model.load({
               "provincia": provinciaEstablecimiento,
               "nombre": nombreEstablecimiento,
               "departamento": departamentoEstablecimiento,
               "localidad": localidadEstablecimiento
           });*/
            
            this.modelDataSource.getModelData(EstablecimientoCollection, {
                "provincia": provinciaEstablecimiento,
                "nombre": nombreEstablecimiento,
                "departamento": departamentoEstablecimiento,
                "localidad": localidadEstablecimiento
            });
        },
        
        /**
        * Hace el render de la vista que muestra los datos del modelo que se obtuvieron a partir de la consulta
        * aplicando los filtros.
        * @param {Object} data, información del modelo obtenida del servicio.
        */
        renderVistaDeDatos: function (data) {
            var establecimientoCollection = new EstablecimientoCollection();
            var establecimientoColleccionView = EstablecimientoCollectionView.getInstance();
            establecimientoColleccionView.setModel({model: establecimientoCollection});
            establecimientoCollection.processData(data);
        },
        
        initializeModelDataSource: function () {
            this.modelDataSource = new ModelDataSource ({view: this});
            this.modelDataSource.on('dataFetched', this.renderVistaDeDatos, this);
        },
        
        /**
         * Usado para bindear eventos a los controles del formulario. Se ejecuta después del render cuando los controles 
         * se encuentran cargados en la página. 
         */
        attachEvents: function() {
            $("#afui").delegate("#submitConsultaEstablecimiento", "click", _.bind(this.ejecutarConsultaEstablecimiento, this));
        }
	});
	
	return consultaEstablecimientoView;
})(af, AppFrameworkRenderer, BaseView, EstablecimientoCollection, EstablecimientoCollectionView);