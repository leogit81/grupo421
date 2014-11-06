<<<<<<< HEAD
var TabPanel = (function ($, common) {
    "use strict";
    
    var tabPanel = function (config) {
        var self = getDefaultConfig();
        
        loadConfig(config);
        
        /**
        * Carga la configuración en el control
        * @param {Object} config, configuración que se va a cargar en el control.
        */
        function loadConfig(config) {
            /**
            * Array con la configuración de cada tab.
            * {
            *   tabName: 'General'
            *
            *   tabIndex: 0
            *
            *   view: Instancia de la vista que se renderea cuando se selecciona el panel
            *
            *   viewClass: Constructor de la vista.
            *
            *   panelId: id. del panel que contiene la información, debería ser el mismo que tiene la vista.
            *
            *   modelClass: la clase del modelo de la vista, para crear una instancia cuando se carga
            *   la vista por primera vez, al seleccionar el tab.
            *
            *   titleCSSClass: clase CSS del title del tap panel, sirve por si se quiere aplicar algún
            *   estilo particular al título.
            *
            *   insertElID: ID del elemento HTML dentro de la tab panel view donde se quiere insertar
            *   la vista del panel.
            *
            *   isLoaded: true/false, indica si el panel se encuentra cargado. La primera vez se encuentra
            *   en false
            *
            *   filtroConsulta: es una función que se utiliza para obtener la data que se pasará al
            *   servicio cuando se cargue la vista del panel la primera vez.
            *
            *   tabPanelView: vista que muestra los tab panel.
            *
            *   customLoadView: función que se puede pasar para modificar el comportamiento
            *   del loadView. Si se pasa directamente se ejecuta esta función y no la anterior.
            * }
            */
            if (common.isEmpty(config)) {
                return;
            }

            self.view = config.view;
            self.viewClass = config.viewClass;
            self.tabName = config.tabName;
            self.panelId = config.panelId;
            self.modelClass = config.modelClass;
            self.titleCSSClass = config.titleCSSClass;
            self.insertElID = config.insertElID;
            self.tabIndex = config.tabIndex;
            self.isLoaded = config.isLoaded;
            self.tabPanelView = config.tabPanelView;
            self.customLoadView = config.customLoadView;
        }
        
        function getDefaultConfig() {
            var config = {
                view: null,
                viewClass: null,
                tabName: null,
                panelId: null,
                modelClass: null,
                titleCSSClass: null,
                insertElID: null,
                tabIndex: null,
                isLoaded: null,
                tabPanelView: null,
                customLoadView: null
            };
            
            config = (function (configArg) {
                var myConfig = function () {
                    return configArg;
                };

                return new myConfig();
            }(config));
            
            return config;
        }
        
        /**
        * Inicializa un tab con la configuración pasado por parámetro.
        * @param {Object} (opcional) config, configuración para inicializar el tab.
        * No es necesario si ya se pasó la configuración cuando se construyó el objeto.
        */
        function initialize(config) {
            loadConfig(config);
            self.view = common.constructorResult(self, "viewClass");
            self.view.setParent(self.tabPanelView);
            if (!common.isEmpty(self.modelClass)) {
                var model = common.constructorResult(self, "modelClass");
                if (!common.isEmpty(model)) {
                    self.view.setModel(model);
                }
            }
        }

        function loadView() {
            if (!common.isEmpty(self.customLoadView)) {
                self.customLoadView();
                return;
            }

            if (common.isEmpty(self.isLoaded) || !self.isLoaded) {
                self.view.model.load(_.result(self, "filtroConsulta"));
                self.isLoaded = true;
            } /*else {
                self.tabPanelView.renderFromData();
            }*/
        }
        
        self.loadConfig = loadConfig;
        self.initialize = initialize;
        self.loadView = loadView;
        return self;
    };
    
    return tabPanel;
=======
var TabPanel = (function ($, common) {
    "use strict";
    
    var tabPanel = function (config) {
        var self = getDefaultConfig();
        
        loadConfig(config);
        
        /**
        * Carga la configuración en el control
        * @param {Object} config, configuración que se va a cargar en el control.
        */
        function loadConfig(config) {
            /**
            * Array con la configuración de cada tab.
            * {
            *   tabName: 'General'
            *
            *   tabIndex: 0
            *
            *   view: Instancia de la vista que se renderea cuando se selecciona el panel
            *
            *   viewClass: Constructor de la vista.
            *
            *   panelId: id. del panel que contiene la información, debería ser el mismo que tiene la vista.
            *
            *   modelClass: la clase del modelo de la vista, para crear una instancia cuando se carga
            *   la vista por primera vez, al seleccionar el tab.
            *
            *   titleCSSClass: clase CSS del title del tap panel, sirve por si se quiere aplicar algún
            *   estilo particular al título.
            *
            *   insertElID: ID del elemento HTML dentro de la tab panel view donde se quiere insertar
            *   la vista del panel.
            *
            *   isLoaded: true/false, indica si el panel se encuentra cargado. La primera vez se encuentra
            *   en false
            *
            *   filtroConsulta: es una función que se utiliza para obtener la data que se pasará al
            *   servicio cuando se cargue la vista del panel la primera vez.
            *
            *   tabPanelView: vista que muestra los tab panel.
            *
            *   customLoadView: función que se puede pasar para modificar el comportamiento
            *   del loadView. Si se pasa directamente se ejecuta esta función y no la anterior.
            * }
            */
            if (common.isEmpty(config)) {
                return;
            }

            self.view = config.view;
            self.viewClass = config.viewClass;
            self.tabName = config.tabName;
            self.panelId = config.panelId;
            self.modelClass = config.modelClass;
            self.titleCSSClass = config.titleCSSClass;
            self.insertElID = config.insertElID;
            self.tabIndex = config.tabIndex;
            self.isLoaded = config.isLoaded;
            self.tabPanelView = config.tabPanelView;
            self.customLoadView = config.customLoadView;
        }
        
        function getDefaultConfig() {
            var config = {
                view: null,
                viewClass: null,
                tabName: null,
                panelId: null,
                modelClass: null,
                titleCSSClass: null,
                insertElID: null,
                tabIndex: null,
                isLoaded: null,
                tabPanelView: null,
                customLoadView: null
            };
            
            config = (function (configArg) {
                var myConfig = function () {
                    return configArg;
                };

                return new myConfig();
            }(config));
            
            return config;
        }
        
        /**
        * Inicializa un tab con la configuración pasado por parámetro.
        * @param {Object} (opcional) config, configuración para inicializar el tab.
        * No es necesario si ya se pasó la configuración cuando se construyó el objeto.
        */
        function initialize(config) {
            loadConfig(config);
            self.view = common.constructorResult(self, "viewClass");
            self.view.setParent(self.tabPanelView);
            if (!common.isEmpty(self.modelClass)) {
                var model = common.constructorResult(self, "modelClass");
                if (!common.isEmpty(model)) {
                    self.view.setModel(model);
                }
            }
        }

        function loadView() {
            if (!common.isEmpty(self.customLoadView)) {
                self.customLoadView();
                return;
            }

            if (common.isEmpty(self.isLoaded) || !self.isLoaded) {
                self.view.model.load(_.result(self, "filtroConsulta"));
                self.isLoaded = true;
            } /*else {
                self.tabPanelView.renderFromData();
            }*/
        }
        
        self.loadConfig = loadConfig;
        self.initialize = initialize;
        self.loadView = loadView;
        return self;
    };
    
    return tabPanel;
>>>>>>> a210a8ebb3db8245cd83e673cff5453ac980331a
}(af, common));