var TabPanelView = (function ($, Backbone, common, _, BaseView, TabPanel) {
    "use strict";
    
    var tabPanelView = BaseView.extend({
        tagName : "div",
        className: "panel",
        
        template : _.template("<div class='tabs'><ul></ul></div>" +
                              "<div id='selectedTab' class='selectedTab consulta-detallada'></div>"),
        /**
        * Array con la configuración de cada tab. Ver TabPanel para detalle de configuración.
        */
        tabsConfig: null,
        
        /**
        * Array con los tab panel, se crean a partir de las configuraciones en el array tabsConfig .
        */
        tabs: null,
        
        initialize: function (attributes, options) {
            BaseView.prototype.initialize.call(this, attributes, options);
            //this.wrapTabsInFunction();
            this.tabs = this.createTabs();
            //this.wrapTabsConfigInFunction(),
            //this.tabsConfig = this.createTabsConfig();
            this.loadTabsConfig();
            this.initializeTabs();
        },
        
        /**
        * Carga la configuración.
        */
        loadTabsConfig: function () {
            var tabsConfig = this.createTabsConfig();
            _.each(this.tabsConfig, function (element, index, list) {
                tabsConfig[index] = _.clone(element);
            }, this);
            this.tabsConfig = tabsConfig;
        },
        
        /**
        * Función que devuelve una nueva instancia de configuración de los tabs vacía.
        */
        createTabsConfig: function () {
            return (function () {
                var myTabsConfig = function () {
                    return [];
                };

                return new myTabsConfig();
            }());
        },
        
        /**
        * Función que devuelve una nueva instancia de los tabs vacía.
        */
        createTabs: function () {
            return (function () {
                var myTabs = function () {
                    return [];
                };

                return new myTabs();
            }());
        },
        
        onSelectedTab: function (args) {
            if (!common.isEmpty(args)) {
                var selectedTabPanelId = common.trimLeft(args.currentTarget.getAttribute("href"), "#");
                this.selectedTab = this.findTab("panelId", selectedTabPanelId);
                this.loadSelectedTab();
            }
        },
        
        loadSelectedTab: function () {
            /*if (common.isEmpty(this.selectedTab.isLoaded) || !this.selectedTab.isLoaded) {
                this.selectedTab.view.model.load(_.result(this.selectedTab, "filtroConsulta"));
                this.selectedTab.isLoaded = true;
            } else {
                this.renderFromData();
            }*/
            this.selectedTab.loadView();
        },
        
        /**
        * Handler del evento viewRendered que se dispará luego de que una de las vistas de los tabs termina de cargarse.
        */
        onViewRendered: function (view) {
            //this.renderFromData();
            if (this.selectedTab.view.getViewId() === view.getViewId()){
                $(this.getViewSelector() + " div#selectedTab").empty();
                $(this.getViewSelector() + " div#selectedTab").html(view.$el.html());
            }
            $.ui.hideMask();
        }
    });
    
    tabPanelView.prototype.hideLoadingMask = function () { };
    
    tabPanelView.prototype.renderFromData = function () {
        BaseView.prototype.renderFromData.call(this);
        $(this.getViewSelector()).addClass("tabPanelViewClass");
    };
    
    tabPanelView.prototype.selectedTab = null;
    tabPanelView.prototype.selectedTabEl = function () {
        return $("#selectedTab");
    };
    
    tabPanelView.prototype.clearView = function () {
        this.selectedTabEl().empty();
    };
    
    /**
    * Arma el html con la información del modelo, para después hacer el render de la vista.
    */
    tabPanelView.prototype.armarHtmlConData = function (data) {
        this.insertTabDivInDOM();
        this.loadTabs();
        this.setTabWidth();
        this.armarHtmlSelectedTab();
    };
    
    /**
    * Muestra la vista con el tab seleccionado.
    */
    tabPanelView.prototype.loadDefaultView = function () {
        this.loadSelectedTab();
        this.render();
    };
    
    /**
    * Hace un render del panel seleccionado.
    */
    tabPanelView.prototype.armarHtmlSelectedTab = function () {
        if (!common.isEmpty(this.selectedTab)) {
            this.insertHTMLSubVista(this.selectedTab);
        }
    };
    
    /**
    * Crea para cada tab el elemento HTML que le corresponde, y lo agrega al DOM.
    */
    tabPanelView.prototype.loadTabs = function () {
        for (var i = 0; i < this.tabs.length; i++) {
            var tab = this.tabs[i];
            
            if (common.isEmpty(tab.titleCSSClass)) {
                tab.titleCSSClass = "";
            }
            
            if (!this.existeTabHtml(tab.tabName)) {
                $(".tabs ul", this.el).append("<li id='tab" + tab.tabIndex + "'><a href='#" 
                                              + tab.panelId + "'><span class='" + tab.titleCSSClass + "'>" 
                                              + tab.tabName + "</span></a></li>");
            }   
        }
    };
    
    /**
    * Inserta el div class='tabs' en el DOM. Lo hace una sola vez cuando se carga la tab panel view la primera vez.
    * @param {Object} data, es la data que se utiliza para reemplazar el template
    */
    tabPanelView.prototype.insertTabDivInDOM = function (data) {
        var tabsDiv = $("#afui div#" + this.getViewSelector() + " div.tabs");
        //Existe el div class='tabs'
        if (tabsDiv.length === 0) {
            BaseView.prototype.armarHtmlConData.call(this, data);
        }
    };
    
    tabPanelView.prototype.setTabWidth = function () {
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
    * Agrega un tab.
    * @param {TabPanel} tab, objeto TabPanel.
    */
    tabPanelView.prototype.addTab = function (tab) {
        if (!common.isEmpty(tab.tabName)) {
            if (!this.existeTab(tab.tabName)) {
                this.tabs.push(tab);
            }
        }
    };
    
    /**
    * Se fija si existe un tab en la colección de tabs.
    * @param {String} tabName, el nombre del tab que se desea buscar.
    */
    tabPanelView.prototype.existeTab = function (tabName) {
        var tabBuscado = this.findTab("tabName", tabName);
        
        return (tabBuscado !== undefined);
    };

    /**
    * Se fija si existe un tab en el html de la vista.
    * @param {String} tabName, el nombre del tab que se desea buscar.
    */
    tabPanelView.prototype.existeTabHtml = function (tabName) {
        var tabBuscado = _.find($(".tabs ul li a", this.el),
            function (item) {
                return $(item).html() === tabName;
            });
        
        return $(tabBuscado).length > 0;
    };
    
    /**
    * Agrega un rango de tabs.
    * @param {TabPanel[]} tabs un array de objetos TabPanel
    */
    tabPanelView.prototype.addTabRange = function (tabs) {
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
    tabPanelView.prototype.findTab = function (prop, value) {
        return _.find(this.tabs, function (item) {
            return item[prop] === value;
        }, this);
    };
    
    tabPanelView.prototype.attachEvents = function() {
        BaseView.prototype.attachEvents.call(this);
        //bindea un handler para el click de cada tab de la vista
        //$("#afui").delegate("#" + this.attributes.id + " ul li a", "click", _.bind(this.renderSelectedTab, this));
        $("#afui").delegate(this.getViewSelector() + " ul li a", "click", _.bind(this.onSelectedTab, this));
    };
    
    /**
    * Recorre el array con la configuración de los tabs y los inicializa.
    */
    tabPanelView.prototype.initializeTabs = function () {
        _.each(this.tabsConfig, function (tabConfig, index) {
            var tab = this.initializeTab(tabConfig, index);
            this.addTab(tab);
        }, this);
        
        /*if (tabsConfigAdicional !== undefined) {
            this.addTabRange(tabsConfigAdicional);
        }*/

        if (!common.isEmpty(this.tabs) && this.tabs.length > 0) {
            this.selectedTab = this.tabs[0];
        }
    };
    
    /**
    * Crea e inicializa un tab. Se usa cuando se construye el objeto o cuando se agrega un nuevo tab.
    * @param {Object} tabConfig, un objeto que contiene la configuración de un tab
    * @param {int} index, índice del tab, se utiliza para darle un id al tab que se agrega
    * @returns {TabPanel} devuelve el objeto tab panel que creó e inicializó con la configuración.
    */
    tabPanelView.prototype.initializeTab = function (tabConfig, index) {
        tabConfig.insertElID = 'selectedTab';
        tabConfig.tabIndex = index;
        tabConfig.isLoaded = false;
        tabConfig.tabPanelView = this;
        
        var tab = new TabPanel(tabConfig);
        tab.initialize();
        tab.view.on("viewRendered", _.bind(this.onViewRenderedHandler || this.onViewRendered, this));
        return tab;
    };
    
    _.extend(tabPanelView, Backbone.Singleton);
    common.extendSinPisar(tabPanelView.prototype , false, MasterView.prototype);
    
    return tabPanelView;
}(af, Backbone, common, _, BaseView, TabPanel));
