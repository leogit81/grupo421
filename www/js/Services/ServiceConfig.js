/**
 * Configuración general de los servicios 
 */
define(
    {
        baseUrl: "https://sisa.msal.gov.ar/sisa/services/rest",
        enableCors: true,//false cuando se haga el build de la aplicación. Sirve para evitar errores con CORS cuando se debuguea la app desde el browser. 
        serviceProvider: 'jquery', /*o custom*/
        timeout: -1, /*tiempo de espera ilimitado*/
    }
);