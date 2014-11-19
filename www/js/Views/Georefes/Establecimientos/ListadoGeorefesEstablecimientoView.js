var ListadoGeorefesEstablecimientoView = (function ($, renderer, BaseView, GeorefesEstablecimientoCollection, GeorefesEstablecimientoCollectionView, Geolocation) {
    "use strict";

    var listadoGeorefesEstablecimientoView = BaseView.extend({
        tagName: 'div',

        attributes: {
            'id': 'listadoGeorefesEstablecimiento',
            'class': 'panel',
            'data-nav': 'consultas_nav'
        },
        
        cantidadDeEstablecimientosCercanosPorDefecto: 10,

        template : _.template(
            '<div class="formGroupHead">Filtros</div>' +
            '<label>Cantidad de establecimientos cercanos</label>' +
            '<input id="cantidadEstablecimientosCercanos" type="number" name="cantidadEstablecimientosCercanos"></input></br>' +
            '<input id="nombreEstablecimiento" type="text" placeholder="Nombre de Establecimiento"/>' +
            '<select id="provinciaEstablecimiento" name="provinciaEstablecimiento"></select>' +
            '<select id="departamentoEstablecimiento" name="departamentoEstablecimiento"></select>' +
            '<select id="localidadEstablecimiento" name="localidadEstablecimiento"></select>' +
            '<a id="submitConsultaEstablecimiento" class="button">Enviar</a>'
        ),
        
        render: function () {
            BaseView.prototype.render.call(this);            
            $(this.getViewSelector() + " select#provinciaEstablecimiento")[0].innerHTML = listaCompletaProvincias;
            $(this.getViewSelector() + " select#departamentoEstablecimiento")[0].innerHTML = "<option value =''>Seleccione un departamento...</option>";
            $(this.getViewSelector() + " select#localidadEstablecimiento")[0].innerHTML = "<option value =''>Seleccione una localidad...</option>";
            $(this.getViewSelector() + " #cantidadEstablecimientosCercanos").val(this.cantidadDeEstablecimientosCercanosPorDefecto);
        },

        initialize: function (attributes, options) {
            options = options || {};
            options.renderer = renderer;
            BaseView.prototype.initialize.call(this, attributes, options);

            this.initializeModelDataSource();
        },

        ejecutarListadoGeorefesEstablecimiento: function () {
            var filtroServicio = {};
            var self = this;
            Geolocation.obtenerPosicion(function (position) {
                filtroServicio = {
                    "longitud": position.coords.longitude,
                    "latitud": position.coords.latitude
                };

                filtroServicio.nombre = $(self.getViewSelector() + " input#nombreEstablecimiento").val();
                filtroServicio.provincia = $(self.getViewSelector() + " select#provinciaEstablecimiento").val();
                filtroServicio.depto = $(self.getViewSelector() + " select#departamentoEstablecimiento").val();
                filtroServicio.localidad = $(self.getViewSelector() + " select#localidadEstablecimiento").val();
                filtroServicio.cantidad = $(self.getViewSelector() + " #cantidadEstablecimientosCercanos").val();

                self.modelDataSource.getModelData(GeorefesEstablecimientoCollection, filtroServicio);
            });
        },

        /**
        * Hace el render de la vista que muestra los datos del modelo que se obtuvieron a partir de la consulta
        * aplicando los filtros.
        * @param {Object} data, información del modelo obtenida del servicio.
        */
        renderVistaDeDatos: function (data) {
            var georefesEstablecimientoCollection = new GeorefesEstablecimientoCollection();
            var georefesEstablecimientoCollectionView = new GeorefesEstablecimientoCollectionView();
            georefesEstablecimientoCollectionView.setModel({model: georefesEstablecimientoCollection});
            georefesEstablecimientoCollection.processData(data);
        },

        initializeModelDataSource: function () {
            this.modelDataSource = new ModelDataSource();
            this.modelDataSource.on('dataFetched', this.renderVistaDeDatos, this);
        },

        /**
         * Usado para bindear eventos a los controles del formulario. Se ejecuta después del render cuando los controles 
         * se encuentran cargados en la página. 
         */
        attachEvents: function() {
            BaseView.prototype.attachEvents.call(this);
            $("#afui").delegate(this.getViewSelector() + " a#submitConsultaEstablecimiento", "click", _.bind(this.ejecutarListadoGeorefesEstablecimiento, this));
            $("#afui").delegate(this.getViewSelector() + " select#provinciaEstablecimiento", "change", _.bind(this.actualizarListaDepartamentos, this));
            $("#afui").delegate(this.getViewSelector() +" select#departamentoEstablecimiento", "change", _.bind(this.actualizarListaLocalidades, this));
        },
        
        actualizarListaDepartamentos: function () {
            deptos.actualizarDepartamentosDeLaVista(this);
        },
        
        actualizarListaLocalidades: function () {
            localidades.actualizarLocalidadesDeLaVista(this);
        }
    });

    return listadoGeorefesEstablecimientoView;
}(af, AppFrameworkRenderer, BaseView, GeorefesEstablecimientoCollection, GeorefesEstablecimientoCollectionView, Geolocation));