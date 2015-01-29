var BusquedaDrogueriasCercanasView = (function (jquery, $, renderer, BaseView, DrogueriasCercanasView) {
    "use strict";

    var busquedaDrogueriasCercanasView = BaseView.extend({
        tagName: 'div',

        attributes: {
            'id': 'busquedaDrogueriasCercanas',
            'class': 'panel',
            'data-nav':"consultas_nav",    
        },

        cantidadDeDrogueriasCercanasPorDefecto: 10,
        filtrosServicio: null,

        template : _.template(
            '<div class="formGroupHead">Filtros</div>' +
            '<label>Cantidad de droguerías cercanas</label>' +
            '<input id="cantidadDrogueriasCercanas" type="tel" name="cantidadDrogueriasCercanas"></input></br>' +
            '<input id="nombreDroguerias" type="text" placeholder="Nombre de la droguería"/>' +
            '<select id="provinciaDrogueria" name="provinciaDrogueria"></select>' +
            '<select id="departamentoDrogueria" name="departamentoDrogueria"></select>' +
            '<select id="localidadDrogueria" name="localidadDrogueria"></select>' +
            '<a id="submitConsultaDrogueria" class="button">Enviar</a>'
        ),
        
        initialize: function(attributes, options) {
            options = options || {};
            options.renderer = renderer;
            
            this.idImagen = 'imagenGeorefes';
            
            BaseView.prototype.initialize.call(this, attributes, options);

            //this.initializeModelDataSource();
        },
        
        render: function () {
            BaseView.prototype.render.call(this);            
            $(this.getViewSelector() + " select#provinciaDrogueria")[0].innerHTML = listaCompletaProvincias;
            $(this.getViewSelector() + " select#departamentoDrogueria")[0].innerHTML = "<option value =''>Seleccione un departamento...</option>";
            $(this.getViewSelector() + " select#localidadDrogueria")[0].innerHTML = "<option value =''>Seleccione una localidad...</option>";
            $(this.getViewSelector() + " #cantidadDrogueriasCercanas").val(this.cantidadDeDrogueriasCercanasPorDefecto);
        },

        /**
        * Handler que se ejecuta cuando se hace clic en el botón enviar, para ejecutar la consulta.
        */
        onSubmitConsultaDrogueriaClick: function (e) {
            $.ui.showMask("Cargando...");
            Geolocation.obtenerPosicion(_.bind(this.ejecutarBusquedaDrogueriasCercanas, this));
        },
        
        ejecutarBusquedaDrogueriasCercanas: function(posicion){
            this.obtenerDatosFiltroServicio(posicion);
            var drogueriasCercanasView = new DrogueriasCercanasView({
                "filtrosServicio": this.filtrosServicio
            });
            af.ui.showMask("Cargando...");
            drogueriasCercanasView.loadDefaultView();
        },
        
        obtenerDatosFiltroServicio: function (position) {
            this.filtrosServicio = {
                "longitud": position.coords.longitude,
                "latitud": position.coords.latitude
            };

            this.filtrosServicio.nombre = $(this.getViewSelector() + " input#nombreDrogueria").val();
            this.filtrosServicio.provincia = $(this.getViewSelector() + " select#provinciaDrogueria").val();
            this.filtrosServicio.depto = $(this.getViewSelector() + " select#departamentoDrogueria").val();
            this.filtrosServicio.localidad = $(this.getViewSelector() + " select#localidadDrogueria").val();
            this.filtrosServicio.cantidad = $(this.getViewSelector() + " #cantidadDrogueriasCercanas").val();
        },

        /**
         * Usado para bindear eventos a los controles del formulario.
         * Se ejecuta después del render cuando los controles se encuentran cargados en la página. 
         */
        attachEvents: function() {
            BaseView.prototype.attachEvents.call(this);
            $("#afui").delegate(this.getViewSelector() + " a#submitConsultaDrogueria", "click", _.bind(this.onSubmitConsultaDrogueriaClick, this));
            $("#afui").delegate(this.getViewSelector() + " select#provinciaDrogueria", "change", _.bind(this.actualizarListaDepartamentos, this));
            $("#afui").delegate(this.getViewSelector() +" select#departamentoDrogueria", "change", _.bind(this.actualizarListaLocalidades, this));
        },
        
        actualizarListaDepartamentos: function () {
            deptos.actualizarDepartamentosDeLaVista(this, "provinciaDrogueria", "departamentoDrogueria", "localidadDrogueria");
        },
        
        actualizarListaLocalidades: function () {
            localidades.actualizarLocalidadesDeLaVista(this, "provinciaDrogueria", "departamentoDrogueria", "localidadDrogueria");
        }
    });

    return busquedaDrogueriasCercanasView;
})(jQuery, af, AppFrameworkRenderer, BaseView, DrogueriasCercanasView);