var BusquedaEstablecimientosCercanosView = (function (jquery, $, renderer, BaseView, EstablecimientosCercanosView) {
    "use strict";

    var busquedaEstablecimientosCercanosView = BaseView.extend({
        tagName: 'div',

        attributes: {
            'id': 'busquedaEstablecimientosCercanos',
            'class': 'panel',
            'data-nav':"consultas_nav",    
        },

        cantidadDeEstablecimientosCercanosPorDefecto: 10,
        filtrosServicio: null,

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
        
        initialize: function(attributes, options) {
            options = options || {};
            options.renderer = renderer;
            BaseView.prototype.initialize.call(this, attributes, options);

            //this.initializeModelDataSource();
        },
        
        render: function () {
            BaseView.prototype.render.call(this);            
            $(this.getViewSelector() + " select#provinciaEstablecimiento")[0].innerHTML = listaCompletaProvincias;
            $(this.getViewSelector() + " select#departamentoEstablecimiento")[0].innerHTML = "<option value =''>Seleccione un departamento...</option>";
            $(this.getViewSelector() + " select#localidadEstablecimiento")[0].innerHTML = "<option value =''>Seleccione una localidad...</option>";
            $(this.getViewSelector() + " #cantidadEstablecimientosCercanos").val(this.cantidadDeEstablecimientosCercanosPorDefecto);
        },

        /**
        * Handler que se ejecuta cuando se hace clic en el botón enviar, para ejecutar la consulta.
        */
        onSubmitConsultaEstablecimientoClick: function (e) {
            $.ui.showMask("Cargando...");
            Geolocation.obtenerPosicion(_.bind(this.ejecutarBusquedaEstablecimientosCercanos, this));
        },
        
        ejecutarBusquedaEstablecimientosCercanos: function(posicion){
            this.obtenerDatosFiltroServicio(posicion);
            var establecimientosCercanosView = new EstablecimientosCercanosView({
                "filtrosServicio": this.filtrosServicio
            });
            af.ui.showMask("Cargando...");
            establecimientosCercanosView.loadDefaultView();
        },
        
        obtenerDatosFiltroServicio: function (position) {
            this.filtrosServicio = {
                "longitud": position.coords.longitude,
                "latitud": position.coords.latitude
            };

            this.filtrosServicio.nombre = $(this.getViewSelector() + " input#nombreEstablecimiento").val();
            this.filtrosServicio.provincia = $(this.getViewSelector() + " select#provinciaEstablecimiento").val();
            this.filtrosServicio.depto = $(this.getViewSelector() + " select#departamentoEstablecimiento").val();
            this.filtrosServicio.localidad = $(this.getViewSelector() + " select#localidadEstablecimiento").val();
            this.filtrosServicio.cantidad = $(this.getViewSelector() + " #cantidadEstablecimientosCercanos").val();
        },

        /**
         * Usado para bindear eventos a los controles del formulario.
         * Se ejecuta después del render cuando los controles se encuentran cargados en la página. 
         */
        attachEvents: function() {
            BaseView.prototype.attachEvents.call(this);
            $("#afui").delegate(this.getViewSelector() + " a#submitConsultaEstablecimiento", "click", _.bind(this.onSubmitConsultaEstablecimientoClick, this));
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

    return busquedaEstablecimientosCercanosView;
})(jQuery, af, AppFrameworkRenderer, BaseView, EstablecimientosCercanosView);