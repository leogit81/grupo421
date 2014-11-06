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

        tabs: [
            {
                tabName: "General",
                panelId: "instFormGeneral",
                viewClass: InstFormNominalGeneralView,
                modelClass: InstFormNominal
            },

            {
                tabName: "Mapas",
                panelId: "instFormMapas",
                viewClass: GoogleMapView,
//                modelClass: function (scope) {
//                    var tabGeneral = scope.findTab("panelId", "instFormGeneral");
//                    return tabGeneral.view.model.get("coordenadas");
//                }
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
            TabPanelView.prototype.initialize.call(this, attributes, options);
            this.findTab("panelId", "instFormGeneral").filtroConsulta = _.bind(this.getCodigoInstForm, this);
        },

        /*mostrarTabEstablecimientoGeneral: function () {
            var tabGeneral = this.findTab("panelId", "establecimientoGeneral");
            tabGeneral.view.model.load(this.codigoEstablecimiento);
        },*/

        /**
        * Setea el modelo para la vista y también actualiza los modelos de las vistas de los tabs.
        */
        setModel: function (model) {
            this.getViewByName("General").setModel(model);
            this.getViewByName("Mapas").setModel(model.get("coordenadas"));
            /**
        * Devuelve el model asociado a la vista, que se muestra en uno de los tabs.
        * @param {String} tabName, nombre del tab, a partir de este se obtiene el modelo
        */
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

    return instFormNominalView;
}(af, AppFrameworkRenderer, BaseView, InstFormNominalGeneralView, GoogleMapView));
