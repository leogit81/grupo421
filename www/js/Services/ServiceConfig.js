/**
 * Configuración general de los servicios 
 */
var ServiceConfig = 
    {
        baseUrl: "https://sisa.msal.gov.ar/sisa/services/rest",
        /*baseUrl: "https://qa.sisa.msal.gov.ar/sisaqa/services/rest",*/
        enableCors: true,//false cuando se haga el build de la aplicación. Sirve para evitar errores con CORS cuando se debuguea la app desde el browser.
        serviceProvider: 'jquery', /*o custom*/
        timeout: 60000, /*tiempo de espera ilimitado*/
    };