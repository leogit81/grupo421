var BusquedaFarmaciasCercanasView = (function (jquery, $, renderer, BaseView, FarmaciasCercanasView) {
    "use strict";

    var busquedaFarmaciasCercanasView = BaseView.extend({
        tagName: 'div',

        attributes: {
            'id': 'busquedaFarmaciasCercanas',
            'class': 'panel',
            'data-nav':"consultas_nav",    
        },

        cantidadDeFarmaciasCercanasPorDefecto: 10,
        filtrosServicio: null,

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
        
        initialize: function(attributes, options) {
            options = options || {};
            options.renderer = renderer;
            BaseView.prototype.initialize.call(this, attributes, options);

            //this.initializeModelDataSource();
        },
        
        render: function () {
            BaseView.prototype.render.call(this);            
            $(this.getViewSelector() + " select#provinciaFarmacia")[0].innerHTML = listaCompletaProvincias;
            $(this.getViewSelector() + " select#departamentoFarmacia")[0].innerHTML = "<option value =''>Seleccione un departamento...</option>";
            $(this.getViewSelector() + " select#localidadFarmacia")[0].innerHTML = "<option value =''>Seleccione una localidad...</option>";
            $(this.getViewSelector() + " #cantidadFarmaciasCercanas").val(this.cantidadDeFarmaciasCercanasPorDefecto);
        },

        /**
        * Handler que se ejecuta cuando se hace clic en el botón enviar, para ejecutar la consulta.
        */
        onSubmitConsultaFarmaciaClick: function (e) {
            $.ui.showMask("Cargando...");
            Geolocation.obtenerPosicion(_.bind(this.ejecutarBusquedaFarmaciasCercanas, this));
        },
        
        ejecutarBusquedaFarmaciasCercanas: function(posicion){
            this.obtenerDatosFiltroServicio(posicion);
            var farmaciasCercanasView = new FarmaciasCercanasView({
                "filtrosServicio": this.filtrosServicio
            });
            af.ui.showMask("Cargando...");
            farmaciasCercanasView.loadDefaultView();
        },
        
        obtenerDatosFiltroServicio: function (position) {
            this.filtrosServicio = {
                "longitud": position.coords.longitude,
                "latitud": position.coords.latitude
            };

            this.filtrosServicio.nombre = $(this.getViewSelector() + " input#nombreFarmacia").val();
            this.filtrosServicio.provincia = $(this.getViewSelector() + " select#provinciaFarmacia").val();
            this.filtrosServicio.depto = $(this.getViewSelector() + " select#departamentoFarmacia").val();
            this.filtrosServicio.localidad = $(this.getViewSelector() + " select#localidadFarmacia").val();
            this.filtrosServicio.cantidad = $(this.getViewSelector() + " #cantidadFarmaciasCercanas").val();
        },

        /**
         * Usado para bindear eventos a los controles del formulario.
         * Se ejecuta después del render cuando los controles se encuentran cargados en la página. 
         */
        attachEvents: function() {
            BaseView.prototype.attachEvents.call(this);
            $("#afui").delegate(this.getViewSelector() + " a#submitConsultaFarmacia", "click", _.bind(this.onSubmitConsultaFarmaciaClick, this));
            $("#afui").delegate(this.getViewSelector() + " select#provinciaFarmacia", "change", _.bind(this.actualizarListaDepartamentos, this));
            $("#afui").delegate(this.getViewSelector() +" select#departamentoFarmacia", "change", _.bind(this.actualizarListaLocalidades, this));
        },
        
        actualizarListaDepartamentos: function () {
            deptos.actualizarDepartamentosDeLaVista(this, "provinciaFarmacia", "departamentoFarmacia", "localidadFarmacia");
        },
        
        actualizarListaLocalidades: function () {
            localidades.actualizarLocalidadesDeLaVista(this, "provinciaFarmacia", "departamentoFarmacia", "localidadFarmacia");
        }
    });

    return busquedaFarmaciasCercanasView;
})(jQuery, af, AppFrameworkRenderer, BaseView, FarmaciasCercanasView);