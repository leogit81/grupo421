var ListadoGeorefesFarmaciaView = (function ($, renderer, BaseView, GeorefesEstablecimientoCollection, GeorefesEstablecimientoCollectionView, Geolocation) {
    "use strict";

    var listadoGeorefesFarmaciaView = BaseView.extend({
        tagName: 'div',

        attributes: {
            'id': 'listadoGeorefesFarmcia',
            'class': 'panel',
            'data-nav': 'consultas_nav'
        },
        
        cantidadDeFarmaciasCercanasPorDefecto: 10,

        template : _.template(
            '<div class="formGroupHead">Filtros</div>' +
            '<label>Cantidad de farmacias cercanas</label>' +
            '<input id="cantidadFarmaciasCercanas" type="number" name="cantidadFarmaciasCercanas"></input></br>' +
            '<input id="nombreFarmacia" type="text" placeholder="Nombre de la farmacia"/>' +
            '<select id="provinciaFarmacia" name="provinciaFarmacia"></select>' +
            '<select id="departamentoFarmacia" name="departamentoFarmacia"></select>' +
            '<select id="localidadFarmacia" name="localidadFarmacia"></select>' +
            '<a id="submitConsultaFarmacia" class="button">Enviar</a>'
        ),
        
        render: function () {
            BaseView.prototype.render.call(this);            
            $(this.getViewSelector() + " select#provinciaFarmacia")[0].innerHTML = listaCompletaProvincias;
            $(this.getViewSelector() + " select#departamentoFarmacia")[0].innerHTML = "<option value =''>Seleccione un departamento...</option>";
            $(this.getViewSelector() + " select#localidadFarmacia")[0].innerHTML = "<option value =''>Seleccione una localidad...</option>";
            $(this.getViewSelector() + " #cantidadFarmaciasCercanas").val(this.cantidadDeFarmaciasCercanasPorDefecto);
        },

        initialize: function (attributes, options) {
            options = options || {};
            options.renderer = renderer;
            BaseView.prototype.initialize.call(this, attributes, options);

            this.initializeModelDataSource();
        },

        ejecutarListadoGeorefesFarmacia: function () {
            var filtroServicio = {};
            var self = this;
            Geolocation.obtenerPosicion(function (position) {
                filtroServicio = {
                    "longitud": position.coords.longitude,
                    "latitud": position.coords.latitude
                };

                filtroServicio.nombre = $(self.getViewSelector() + " input#nombreFarmacia").val();
                filtroServicio.provincia = $(self.getViewSelector() + " select#provinciaFarmacia").val();
                filtroServicio.depto = $(self.getViewSelector() + " select#departamentoFarmacia").val();
                filtroServicio.localidad = $(self.getViewSelector() + " select#localidadFarmacia").val();
                filtroServicio.cantidad = $(self.getViewSelector() + " #cantidadFarmaciasCercanas").val();

                self.modelDataSource.getModelData(GeorefesEstablecimientoCollection, filtroServicio);
            });
        },

        /**
        * Hace el render de la vista que muestra los datos del modelo que se obtuvieron a partir de la consulta
        * aplicando los filtros.
        * @param {Object} data, información del modelo obtenida del servicio.
        */
        renderVistaDeDatos: function (data) {
            //TODO: esto vamos a tener que modificarlo cuando tengamos el web service para farmacias
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
            $("#afui").delegate(this.getViewSelector() + " a#submitConsultaFarmacia", "click", _.bind(this.ejecutarListadoGeorefesFarmacia, this));
            $("#afui").delegate(this.getViewSelector() + " select#provinciaFarmacia", "change", _.bind(this.actualizarListaDepartamentos, this));
            $("#afui").delegate(this.getViewSelector() +" select#departamentoFarmacia", "change", _.bind(this.actualizarListaLocalidades, this));
        },
        
        actualizarListaDepartamentos: function () {
            deptos.actualizarDepartamentosDeLaVista(this);
        },
        
        actualizarListaLocalidades: function () {
            localidades.actualizarLocalidadesDeLaVista(this);
        }
    });

    return listadoGeorefesFarmaciaView;
}(af, AppFrameworkRenderer, BaseView, GeorefesEstablecimientoCollection, GeorefesEstablecimientoCollectionView, Geolocation));