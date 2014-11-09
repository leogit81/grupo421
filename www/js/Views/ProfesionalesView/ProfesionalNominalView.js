var ProfesionalNominalView = (function ($, renderer, BaseView, ProfesionalNominalGeneralView) {
    "use strict";

    var profesionalNominalView = TabPanelView.extend({
        tagName: 'div',
        className: 'panel consulta-detallada',

        attributes: {
            'id': 'resultadoConsultaNominalProfesional',
            'data-nav': 'consultas_nav'
        },

        codigoProfesional: null,

        usuario: null,

        clave: null,

        setCodigoProfesional: function (codigoProfesional) {
            this.codigoProfesional = codigoProfesional;
        },

        getCodigoProfesional: function (codigoProfesional) {
            return this.codigoProfesional;
        },

        setUsuario: function (usuario) {
            this.usuario = usuario;
        },

        getUsuario: function (usuario) {
            return this.usuario;
        },

        setClave: function (clave) {
            this.clave = clave;
        },

        getClave: function (clave) {
            return this.clave;
        },

        tabsConfig: [
            {
                tabName: "General",
                panelId: "profesionalGeneral",
                viewClass: ProfesionalNominalGeneralView,
                modelClass: ProfesionalNominal
            }
        ],

        ejecutarConsultaNominalProfesional: function (codigoProfesional) {
            this.codigoProfesional = codigoProfesional;
            var tabGeneral = this.findTab("panelId", "profesionalGeneral");
            tabGeneral.view.model.load(this.codigoProfesional);
        },

        parametrosConsulta: function () {
            return {usuario: this.getUsuario(), clave: this.getClave(), codigo: this.getCodigoProfesional()};
        },

        initialize: function (attributes, options) {
            options = options || {};
            options.renderer = renderer;
            this.setCodigoProfesional(attributes.codigo);
            this.setUsuario(attributes.usuario);
            this.setClave(attributes.clave);
            TabPanelView.prototype.initialize.call(this, attributes, options);

            this.findTab("panelId", "profesionalGeneral").filtroConsulta = _.bind(this.parametrosConsulta, this);
        },

        /**
        * Devuelve el model asociado a la vista, que se muestra en uno de los tabs.
        * @param {String} tabName, nombre del tab, a partir de este se obtiene el modelo
        */
        getModelOrDefault: function (tabName) {
            var tab = this.findTab("tabName", tabName);
            return tab.view.model;
        }
    });

    /**
     * Devuelve una vista por nombre.
     *  @param {String} , el nombre de la vista, si se quiere poder acceder a la misma mediante nombre. 
     */
    profesionalNominalView.prototype.getViewByName = function (viewName) {
        var tab = this.findTab("tabName", viewName);
        return tab.view;
    };

    profesionalNominalView.prototype.renderSelectedTab = function (args) {
        TabPanelView.prototype.renderSelectedTab.call(this, args);
        $("#" + this.attributes.id).addClass("consultaNominalProfesional");
    };

    return profesionalNominalView;
}(af, AppFrameworkRenderer, BaseView, ProfesionalNominalGeneralView));
