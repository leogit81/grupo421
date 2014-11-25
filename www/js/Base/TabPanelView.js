var TabPanelView = (function ($, Backbone, common, _, BaseView, TabPanel) {
    "use strict";
    
    var tabPanelView = BaseView.extend({
        tagName : "div",
        className: "panel",
        
        template : _.template("<div class='tabs'><ul></ul></div>" +
                              "<div id='selectedTab' class='selectedTab consulta-detallada'></div>" + 
                             "<div id='map_canvas' style='width:100%; height:100%; min-height:100%; overflow:auto;'></div>"),
		
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
            this.tabs = this.createTabs();
            this.loadTabsConfig();
            this.createNestedViewsDictionary();
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
                this.selectedTabButtonHref = args.currentTarget.getAttribute("href");
                this.selectedTab = this.findTab("panelId", common.trimLeft(this.selectedTabButtonHref, "#"));
                this.loadSelectedTab();
                this.setSelectedTabButtonClass(this.selectedTabButtonHref);
            }
        },
        
        /**
        * Setea la clase css del tab button seleccionado.
        */
        setSelectedTabButtonClass: function (selectedTabButtonHref) {
            var selectedTabButtonEl = this.getTabHtmlPorHref(selectedTabButtonHref);
            this.$el.find(".tabs ul li").removeClass("selectedTabButtonClass");
            selectedTabButtonEl.addClass("selectedTabButtonClass");
        },
        
        /**
        * Cuando se hace clic en un tab, se le dice al TabPanel que cargue la vista que tiene.
        * Si la vista asociada al TabPanel seleccionado ya se encuentra cargada, entonces,
        * muestra el contenido de esta.
        * Si la vista del TabPanel se estÃ¡ cargando por primera vez, se debe esperar a que se
        * produzca el evento viewRendered para mostrar el contenido.
        */
        loadSelectedTab: function () {
            this.selectedTab.loadView();
        },
        
        loadMapaView: function (esUbicacionDispositivo) {
            this.showPanel();
            var coordenadasModel = this.getCoordenadasMapaModel();
            coordenadasModel.esUbicacionDispositivo = esUbicacionDispositivo;
            this.selectedTab.view.setModel(coordenadasModel);
            this.selectedTab.view.render();
            $(this.getViewSelector() +" #map_canvas").resize();
        },
        
        /**
        * Handler del evento viewRendered que se disparÃ¡ al finalizar la ejecución
        * del método render de cualquiera de las vistas asociadas a los tabs.
         */
        onViewRendered: function (view) {
            //Este se utiliza para no llamar al servicio que devuelve los datos del modelo,
            //cada vez que se hace clic en alguno de los tabs.
            this.selectedTab.isLoaded = true;
            
            //Cuando se carga el tab panel por primera vez ingresa al if y hace el render
            if (this.isLoadingDefaultView) {
                this.isLoadingDefaultView = false;
                //para que al mostrar el tab general la primera vez se muestren completos
                //los datos de la ubicación del establecimiento
                this.render();
                this.setSelectedTabButtonClass(this.selectedTabButtonHref);
                var self = this;
                setTimeout( function () {
                    self.selectedTab.view.render();
                }, 150);
                return;
             }
            
            $(this.getViewSelector()).trigger("orientationchange");
            this.showPanel();
        }
    });
    
    tabPanelView.prototype.selectedTab = null;
    tabPanelView.prototype.selectedTabButtonHref = null;
    
    /**
    * Obtiene el modelo de coordenadas de mapa que tiene la información de posición
    * de los establecimientos y del dispositivo.
    */
    tabPanelView.prototype.getCoordenadasMapaModel = function () {
        //Obtiene el tab que tiene el modelo de coordenadas de mapa.
        var tabQueTieneModeloCoordenadasDeMapa = this.findTab("tieneCoordenadasDeMapa", true),
            nombreAtributoCoordenadasDeMapaModel;
        //obtiene el nombre del atributo que tiene una referencia al model de coordenadas de mapa
        nombreAtributoCoordenadasDeMapaModel = tabQueTieneModeloCoordenadasDeMapa.nombreAtributoCoordenadasDeMapaModel || "coordenadasDeMapa";
        return tabQueTieneModeloCoordenadasDeMapa.view.model.get(nombreAtributoCoordenadasDeMapaModel);
    };
    
    tabPanelView.prototype.hideLoadingMask = function () { };
    
    tabPanelView.prototype.renderFromData = function () {
        BaseView.prototype.renderFromData.call(this);
        $(this.getViewSelector()).addClass("tabPanelViewClass");
        this.setElement($(this.getViewSelector())[0]);
    };
    
    tabPanelView.prototype.selectedTabEl = function () {
        return $(this.getViewSelector() + " div#selectedTab");
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
        this.isLoadingDefaultView = true;
        this.selectedTabButtonHref = "#" + this.selectedTab.panelId;
        this.loadSelectedTab();
    };
    
    /**
    * Hace un render del panel seleccionado.
    */
    tabPanelView.prototype.armarHtmlSelectedTab = function () {
        if (!common.isEmpty(this.selectedTab)) {
            this.insertHTMLSubVista(this.selectedTab);
        }
    };
    
    /* Es como el método que está en MasterView, pero directamente recibe como argumento
    * un string con el Html que se quiere usar para actualizar el elemento selectedTab
    */
    tabPanelView.prototype.updateSubVistaConHTML = function (subViewHtml) {
        var insertElement = this.selectedTabEl();

        insertElement.empty();
        var panel = $(subViewHtml).removeClass("panel");
        insertElement.append(panel);
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
            
            if (!tab.isHidden && !this.existeTabHtml(tab.tabName)) {
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
            i;
        
        for (i = 0; i < tabList.length; i++) {
            $(tabList[i]).css("width", porcAnchoTab + "%");
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
    
    tabPanelView.prototype.getTabHtmlPorHref = function (href) {
        var tabBuscado = _.find(this.$el.find(".tabs ul li"),
            function (item) {
                return $(item).find("a").attr("href") === href;
            });
        
        return $(tabBuscado);
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
    
    /**
    * Busca un tab a partir de la view que contiene
    * @param {View} view, vista del tab que se quiere encontrar.
    */
    tabPanelView.prototype.findTabByView = function (view) {
        return _.find(this.tabs, function (item) {
            return item.view.getViewId() === view.getViewId();
        }, this);
    };
    
    /**
     * Devuelve una vista por nombre.
     *  @param {String} , el nombre de la vista, si se quiere poder acceder a la misma mediante nombre. 
     */
    tabPanelView.prototype.getViewByName = function (viewName) {
        var tab = this.findTab("tabName", viewName);
        return tab.view;
    };
    
    tabPanelView.prototype.attachEvents = function() {
        BaseView.prototype.attachEvents.call(this);
        //bindea un handler para el click de cada tab de la vista
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
        var tab;
        tabConfig.insertElID = 'selectedTab';
        tabConfig.tabIndex = index;
        tabConfig.isLoaded = false;
        tabConfig.tabPanelView = this;
        
        tab = new TabPanel(tabConfig);
        tab.initialize();
        this.nestedViewsDictionary[tab.tabName] = {
            view: tab.view,
            insertElID: (tab.esMapa ? "map_canvas" : "selectedTab")
        };
        tab.view.on("viewRendered", _.bind(tabConfig.onViewRenderedHandler || this.onViewRendered, this));
        return tab;
    };
    
    tabPanelView.prototype.showPanel = function () {
        //Si el tab seleccionado es un mapa, oculto el div selectedTab y muestro el div map_canvas
        //y viceversa, si el tab seleccionado no es un mapa.
        if (this.selectedTab.esMapa){
            this.selectedTabEl().hide();
            $(this.getViewSelector() + " #map_canvas").show();
        } else {
            this.selectedTabEl().empty();
            this.selectedTabEl().append(this.selectedTab.view.$el.html());
            $(this.getViewSelector() + " #map_canvas").hide();
            this.selectedTabEl().show();
        }
    };
    
    _.extend(tabPanelView, Backbone.Singleton);
    common.extendSinPisar(tabPanelView.prototype , false, MasterView.prototype);
    
    return tabPanelView;
}(af, Backbone, common, _, BaseView, TabPanel));