var ListadoGeorefesDrogueriaView = (function ($, renderer, BaseView, GeorefesEstablecimientoCollection, GeorefesEstablecimientoCollectionView, Geolocation) {
    "use strict";

    var listadoGeorefesDrogueriaView = BaseView.extend({
        tagName: 'div',

        attributes: {
            'id': 'listadoGeorefesDrogueria',
            'class': 'panel',
            'data-nav': 'consultas_nav'
        },
        
        cantidadDeDrogueriasCercanasPorDefecto: 10,

        template : _.template(
            '<div class="formGroupHead">Filtros</div>' +
            '<label>Cantidad de droguerías cercanas</label>' +
            '<input id="cantidadDrogueriasCercanas" type="te" name="cantidadDrogueriasCercanas"></input></br>' +
            '<input id="nombreDrogueria" type="text" placeholder="Nombre de la droguería"/>' +
            '<select id="provinciaDrogueria" name="provinciaDrogueria"></select>' +
            '<select id="departamentoDrogueria" name="departamentoDrogueria"></select>' +
            '<select id="localidadDrogueria" name="localidadDrogueria"></select>' +
            '<a id="submitConsultaDrogueria" class="button">Enviar</a>'
        ),
        
        render: function () {
            BaseView.prototype.render.call(this);            
            $(this.getViewSelector() + " select#provinciaDrogueria")[0].innerHTML = listaCompletaProvincias;
            $(this.getViewSelector() + " select#departamentoDrogueria")[0].innerHTML = "<option value =''>Seleccione un departamento...</option>";
            $(this.getViewSelector() + " select#localidadDrogueria")[0].innerHTML = "<option value =''>Seleccione una localidad...</option>";
            $(this.getViewSelector() + " #cantidadDrogueriasCercanas").val(this.cantidadDeDrogueriasCercanasPorDefecto);
        },

        initialize: function (attributes, options) {
            options = options || {};
            options.renderer = renderer;
            BaseView.prototype.initialize.call(this, attributes, options);

            this.initializeModelDataSource();
        },

        ejecutarListadoGeorefesDrogueria: function () {
            var filtroServicio = {};
            var self = this;
            Geolocation.obtenerPosicion(function (position) {
                filtroServicio = {
                    "longitud": position.coords.longitude,
                    "latitud": position.coords.latitude
                };

                filtroServicio.nombre = $(self.getViewSelector() + " input#nombreDrogueria").val();
                filtroServicio.provincia = $(self.getViewSelector() + " select#provinciaDrogueria").val();
                filtroServicio.depto = $(self.getViewSelector() + " select#departamentoDrogueria").val();
                filtroServicio.localidad = $(self.getViewSelector() + " select#localidadDrogueria").val();
                filtroServicio.cantidad = $(self.getViewSelector() + " #cantidadDrogueriasCercanas").val();

                self.modelDataSource.getModelData(GeorefesEstablecimientoCollection, filtroServicio);
            });
        },

        /**
        * Hace el render de la vista que muestra los datos del modelo que se obtuvieron a partir de la consulta
        * aplicando los filtros.
        * @param {Object} data, información del modelo obtenida del servicio.
        */
        renderVistaDeDatos: function (data) {
            //TODO: esto vamos a tener que modificarlo cuando tengamos el web service para droguerías
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
            $("#afui").delegate(this.getViewSelector() + " a#submitConsultaDrogueria", "click", _.bind(this.ejecutarListadoGeorefesDrogueria, this));
            $("#afui").delegate(this.getViewSelector() + " select#provinciaDrogueria", "change", _.bind(this.actualizarListaDepartamentos, this));
            $("#afui").delegate(this.getViewSelector() +" select#departamentoDrogueria", "change", _.bind(this.actualizarListaLocalidades, this));
        },
        
        actualizarListaDepartamentos: function () {
            deptos.actualizarDepartamentosDeLaVista(this);
        },
        
        actualizarListaLocalidades: function () {
            localidades.actualizarLocalidadesDeLaVista(this);
        }
    });

    return listadoGeorefesDrogueriaView;
}(af, AppFrameworkRenderer, BaseView, GeorefesEstablecimientoCollection, GeorefesEstablecimientoCollectionView, Geolocation));