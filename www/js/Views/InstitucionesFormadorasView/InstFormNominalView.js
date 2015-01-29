var InstFormNominalView = (function ($, renderer, BaseView, InstFormNominalGeneralView, GoogleMapView) {
    "use strict";

    var instFormNominalView = TabPanelView.extend({
        tagName: 'div',
        className: 'panel consulta-detallada',

        attributes: {
            'id': 'resultadoConsultaNominalInstForm',
            'data-nav': 'consultas_nav'
        },

        codigoInstForm: null,

        setCodigoInstForm: function (codigoInstForm) {
            this.codigoInstForm = codigoInstForm;
        },

        getCodigoInstForm: function (codigoInstForm) {
            return this.codigoInstForm;
        },

        tabsConfig: [
            {
                tabName: "<img src='./img/pestanas/accesosA_general-24-px.png'>",
                panelId: "instFormGeneral",
                viewClass: InstFormNominalGeneralView,
                modelClass: InstFormNominal
            },

            {
                tabName: "<img src='./img/pestanas/accesosA_mapa-24-px.png'>",
                panelId: "instFormMapas",
                viewClass: GoogleMapView,
                esMapa: true
            }
        ],

        ejecutarConsultaNominalInstForm: function (codigoInstForm) {
            this.codigoInstForm = codigoInstForm;
            var tabGeneral = this.findTab("panelId", "instFormGeneral");
            tabGeneral.view.model.load(this.codigoInstForm);
        },

        initialize: function (attributes, options) {
            options = options || {};
            options.renderer = renderer;
            this.setCodigoInstForm(attributes.codigo);
            
            this.idImagen = 'imagenInstFormadoras';
            
            TabPanelView.prototype.initialize.call(this, attributes, options);
            this.findTab("panelId", "instFormGeneral").filtroConsulta = _.bind(this.getCodigoInstForm, this);
        },

        getModelOrDefault: function (tabName) {
            var tab = this.findTab("tabName", tabName);
            return tab.view.model;
        }
    });

    /**
     * Devuelve una vista por nombre.
     *  @param {String} , el nombre de la vista, si se quiere poder acceder a la misma mediante nombre. 
     */
    instFormNominalView.prototype.getViewByName = function (viewName) {
        var tab = this.findTab("tabName", viewName);
        return tab.view;
    };

    instFormNominalView.prototype.renderSelectedTab = function (args) {
        //Si se hizo clic en el tab de mapas, se carga el mapa
        if (!common.isEmpty(args)) {
            var selectedTabPanelId = common.trimLeft(args.currentTarget.getAttribute("href"), "#");
            if (selectedTabPanelId === "instFormMapas") {
                var tabMapa = this.findTab("panelId", selectedTabPanelId);
                $.ui.loadContent(tabMapa.view.attributes.id, false, false, "pop");
            }
        } else {
            //Cuando se carga el tab panel view por primera vez, después de inicializar el mapa, viene por este laod.
            TabPanelView.prototype.renderSelectedTab.call(this, args);
        }
        $("#" + this.attributes.id).addClass("consultaNominalInstForm");
    };

    /**
    * Obtiene el modelo de coordenadas a partir del modelo de institucion formadora nominal.
    */
    instFormNominalView.prototype.getCoordenadasMapaModel = function () {
        var tabGeneral = this.findTab("panelId", "instFormGeneral");

        /*
        *EN TODOS LOS DEMAS SERVICIOS, SE DEVUELVEN LAS COORDENADAS BAJO EL TAG coordenadasDeMapa.
        *EN INSTITUCIONES FORMADORAS, LOS DEVUELVE BAJO EL TAG coordenadas.
        */
        return tabGeneral.view.model.get("coordenadas");
        //        return tabGeneral.view.model.get("coordenadasDeMapa"); 
    };

    instFormNominalView.prototype.onGoogleMapViewRendered = function () {
        //Si se hizo clic en el tab de mapas, se carga el mapa de forma diferente, no se muestra dentro del tab

        if (this.selectedTab.panelId === "instFormMapas") {
            var tabMapa = this.findTab("panelId", "instFormMapas");
            $.ui.loadContent(tabMapa.view.getViewId(), false, false, "pop");
            return;
        }
    };

    return instFormNominalView;
}(af, AppFrameworkRenderer, BaseView, InstFormNominalGeneralView, GoogleMapView));
