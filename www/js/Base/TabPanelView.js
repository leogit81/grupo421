var TabPanelView = (function ($, Backbone, common, _, BaseView) {
    "use strict";
    
    var tabPanel = BaseView.extend({
        tagName : "div",
        className: "panel",
        
        template : _.template("<div class='tabs'><ul></ul></div>" +
                              "<div id='selectedTab' class='selectedTab consulta-detallada'></div>"),
        /**
        * Array con la configuración de cada tab.
        * {
        *   tabName: 'General',
        *   tabIndex: 0,
        *   view: Instancia de la vista que se renderea cuando se selecciona el panel,
        *   viewClass: Constructor de la vista.  
        *   panelId: "general" //id. del panel que contiene la información, debería ser el mismo que tiene la vista.
        * }
        */
        tabs: [],
        
        initialize: function (attributes, options) {
            BaseView.prototype.initialize.call(this, attributes, options);
            this.initializeTabs();
        },
        
        renderSelectedTab: function (args) {
            //obtiene del current target el id del panel
            if (!common.isEmpty(args)) {
                var selectedTabPanelId = common.trimLeft(args.currentTarget.getAttribute("href"), "#");
                this.selectedTab = this.findTab("panelId", selectedTabPanelId);
            }
            this.renderFromData();
        }
    });
    
    tabPanel.prototype.selectedTab = null;
    tabPanel.prototype.selectedTabEl = function () {
        return $("#selectedTab");
    };
    
    tabPanel.prototype.clearView = function () {
        this.selectedTabEl().empty();
    };
    
    /**
    * Arma el html con la información del modelo, para después hacer el render de la vista.
    */
    tabPanel.prototype.armarHtmlConData = function (data) {
        this.insertTabDivInDOM();
        this.loadTabs();
        this.setTabWidth();
        this.armarHtmlSelectedTab();
    };
    
    /**
    * Hace un render del panel seleccionado.
    */
    tabPanel.prototype.armarHtmlSelectedTab = function () {
        if (!common.isEmpty(this.selectedTab)) {
            this.insertHTMLSubVista(this.selectedTab);
        }
    };
    
    tabPanel.prototype.loadTabs = function () {
        for (var i = 0; i < this.tabs.length; i++) {
            var tab = this.tabs[i];
            if (!this.existeTabHtml(tab.tabName)) {
                $(".tabs ul", this.el).append("<li id='tab" + tab.tabIndex + "'><a href='#" + tab.panelId + "'>" + tab.tabName + "</a></li>");
            }   
        }
    };
    
    /**
    * Inserta el div class='tabs' en el DOM. Lo hace una sola vez cuando se carga la tab panel view la primera vez.
    * @param {Object} data, es la data que se utiliza para reemplazar el template
    */
    tabPanel.prototype.insertTabDivInDOM = function (data) {
        var tabsDiv = $("#afui div#" + this.attributes.id + " div.tabs");
        //Existe el div class='tabs'
        if (tabsDiv.length === 0) {
            BaseView.prototype.armarHtmlConData.call(this, data);
        }
    };
    
    tabPanel.prototype.setTabWidth = function () {
        var tabList = $(".tabs ul li", this.el),
            //el ancho porcentual de cada tab dentro del panel
            porcAnchoTab = Number((100 / tabList.length).toFixed(2)),
        //el ancho porcentual de cada tab dentro del afui
            /*afuiEl = $("#afui"),
            afuiWidth = Number(common.trimRight(afuiEl.css("width"), "px")),
            porcAnchoTab = Number((afuiWidth / tabList.length).toFixed(0)),*/
            i;
        
        for (i = 0; i < tabList.length; i++) {
            $(tabList[i]).css("width", porcAnchoTab + "%");
            //$(tabList[i]).css("width", porcAnchoTab + "px");
        }
    };
    
    /**
    * Agrega un tab
    * @param {Object} tab un objeto que contiene un nombre y el id del panel que se mostrará en cada tab
    * @param {int} index, índice del tab, se utiliza para darle un id al tab que se agrega
    */
    tabPanel.prototype.addTab = function (tab, index) {
        if (!common.isEmpty(tab.tabName)) {
            if (!this.existeTab(tab.tabName)) {
                this.tabs.push(tab);
                this.initializeTab(tab, index);
            }
        }
    };
    
    /**
    * Se fija si existe un tab en la colección de tabs.
    * @param {String} tabName, el nombre del tab que se desea buscar.
    */
    tabPanel.prototype.existeTab = function (tabName) {
        var tabBuscado = this.findTab("tabName", tabName);
        
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
        
        return $(tabBuscado).length > 0;
    };
    
    /**
    * Agrega un rango de tabs.
    * @param {Array} tabs un array de objetos que contienen un nombre y el id del panel que se mostrará en cada tab
    */
    tabPanel.prototype.addTabRange = function (tabs) {
        var i;
        for (i = 0; i < tabs.length; i++) {
            this.addTab(tabs[i], i);
        }
    };
    
    /**
    * Busca un tab por una de sus propiedades
    * @param {String} prop, el nombre de la propiedad del tab.
    * @param {String} value, valor de la propiedad.
    */
    tabPanel.prototype.findTab = function (prop, value) {
        return _.find(this.tabs, function (item) {
            return item[prop] === value;
        }, this);
    };
    
    tabPanel.prototype.attachEvents = function() {
        BaseView.prototype.attachEvents.call(this);
        //bindea un handler para el click de cada tab de la vista
        $("#afui").delegate("#" + this.attributes.id + " ul li a", "click", _.bind(this.renderSelectedTab, this));
    };
    
    /**
    * Recorre la lista de los tabs que se encuentran configurados y los inicializa.
    * @param {Array} tabs, un array con objetos que contienen la configuración de un tab
    */
    tabPanel.prototype.initializeTabs = function (tabs) {
        _.each(this.tabs, function (tab, index) {
            this.initializeTab(tab, index);
        }, this);
        
        if (tabs !== undefined) {
            this.addTabRange(tabs);
        }

        if (!common.isEmpty(this.tabs) && this.tabs.length > 0) {
            this.selectedTab = this.tabs[0];
        }
    };
    
    /**
    * Inicializa un tab. Se usa cuando se construye el objeto o cuando se agrega un nuevo tab.
    * @param {Object} tab, un objeto que contiene la configuración de un tab
    * @param {int} index, índice del tab, se utiliza para darle un id al tab que se agrega
    */
    tabPanel.prototype.initializeTab = function (tab, index) {
        tab.view = common.constructorResult(tab, "viewClass");
        tab.view.setParent(this);
        tab.view.on("viewRendered", _.bind(this.renderSelectedTab, this));
        var model = common.constructorResult(tab, "modelClass", this);
        if (!common.isEmpty(model)) {
            tab.view.setModel(model);
        }
        tab.insertElID = 'selectedTab';
        tab.tabIndex = index;
    };
    
    _.extend(tabPanel, Backbone.Singleton);
    common.extendSinPisar(tabPanel.prototype , false, MasterView.prototype);
    
    return tabPanel;
}(af, Backbone, common, _, BaseView));