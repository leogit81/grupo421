var TabPanelView = (function ($, Backbone, common, _, BaseView) {
    "use strict";
    
    var tabPanel = BaseView.extend({
        tagName : "div",
        className: "panel",
        
        template : _.template("<div class='tabs'><ul></ul>" +
                              "<div id='selectedTab'></div>" +
                              "</div>"),
        /**
        * Array con la configuración de cada tab.
        * {
        *     tabName: 'General',
        *     tabIndex: 0,
        *     view: Instancia de la vista que se renderea cuando se selecciona el panel,
        *     panelId: "general" //id. del panel que contiene la información, debería ser el mismo que tiene la vista.
        * }
        */
        tabs: [],
        
        initialize: function (attributes, options) {
            Backbone.View.prototype.initialize.call(this, attributes, options);
            
            if (attributes !== undefined && attributes.model !== undefined) {
                this.model = attributes.model;
                this.model.on('change', this.render, this);
                
                if (this.tabs !== undefined) {
                    this.addTabRange(this.tabs);
                }
            }
            
            //bindea un handler para el click de cada tab de la vista
            $(this.el).delegate("ul li", "click", _.bind(this.renderSelectedTab, this));
            
            if (!common.isEmpty(this.tabs) && this.tabs.length > 0) {
                this.selectedTab = this.tabs[0];
            }
        },
        
        renderSelectedTab: function (args) {
            this.selectedTab = args;
            this.render();
        }
    });
    
    tabPanel.prototype.selectedTab = null;
    tabPanel.prototype.selectedTabEl = function () {
        return $("#selectedTab", this.el);
    };
    
    tabPanel.prototype.render = function () {
        BaseView.prototype.render.call(this);
        
        this.loadTabs();
        this.setTabWidth();
        
        this.selectedTab.view.render();
        this.selectedTabEl().empty();
        this.selectedTabEl().append(this.selectedTab.view.renderedHtml);
    };
    
    tabPanel.prototype.loadTabs = function () {
        for (var i = 0; i < this.tabs.length; i++) {
            var tab = this.tabs[i];
            if (!this.existeTabHtml(tab.tabName)) {
                $(".tabs ul", this.el).append("<li id='tab" + tab.tabIndex + "'><a href='#" + tab.panelId + "'>" + tab.tabName + "</a></li>");
            }   
        }
    };
    
    tabPanel.prototype.setTabWidth = function () {
        //var tabList = this.$(".tabs ul li");
        var tabList = $(".tabs ul li", this.el),
        //el ancho porcentual de cada tab dentro del panel
            porcAnchoTab = Number((100 / tabList.length).toFixed(2)),
            i;
        
        for (i = 0; i < tabList.length; i++) {
            $(tabList[i]).css("width", porcAnchoTab + "%");
        }
    };
    
    /**
    * Agrega un tab
    * @param {Object} tab un objeto que contiene un nombre y el id del panel que se mostrará en cada tab
    */
    tabPanel.prototype.addTab = function (tab) {
        if (!common.isEmpty(tab.tabName)) {
            if (!this.existeTab(tab.tabName)) {
                this.tabs.push(tab);
                tab.view.setParent(this);
            }
        }
    };
    
    /**
    * Se fija si existe un tab en la colección de tabs.
    * @param {String} tabName, el nombre del tab que se desea buscar.
    */
    tabPanel.prototype.existeTab = function (tabName) {
        var tabBuscado = this.findTab(tabName);
        
        return (tabBuscado !== undefined);
    };

    /**
    * Se fija si existe un tab en el html de la vista.
    * @param {String} tabName, el nombre del tab que se desea buscar.
    */
    tabPanel.prototype.existeTabHtml = function (tabName) {
        var tabBuscado = _.find($(".tabs ul li a", this.el),
            function (item) {
                return $(item).html() === tabName;
            });
        
        return !common.isEmpty(tabBuscado) && tabBuscado.length > 0;
    };
    
    /**
    * Agrega un rango de tabs.
    * @param {Array} tabs un array de objetos que contienen un nombre y el id del panel que se mostrará en cada tab
    */
    tabPanel.prototype.addTabRange = function (tabs) {
        var i;
        for (i = 0; i < tabs.length; i++) {
            if (common.isEmpty(tabs[i].tabIndex)) {
                tabs[i].tabIndex = i;
            }
            
            this.addTab(tabs[i]);
        }
    };
    
    /**
    * Busca un tab por su nombre
    * @param {String} tabName, nombre del tab que se quiere buscar.
    */
    tabPanel.prototype.findTab = function (tabName) {
        return _.find(this.tabs, function (item) {
            return item.tabName === tabName;
        }, this);
    };
    
    /**
    * Busca un tab por su índice
    * @param {String} tabIndex, índice del tab que se quiere buscar.
    */
    tabPanel.prototype.findTabByName = function (tabIndex) {
        return _.find(this.tabs, function (item) {
            return item.tabIndex === tabIndex;
        }, this);
    };
    
    _.extend(tabPanel, Backbone.Singleton);
    
    return tabPanel;
}(af, Backbone, common, _, BaseView));