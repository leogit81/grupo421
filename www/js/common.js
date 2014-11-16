/**
 * Biblioteca de funciones comunes 
 */
var common = (function (_) {
    "use strict";

    var common = {};

    common.isEmpty = function (value) {
        return value === undefined
        || value === null
        || value === '';
    };

    common.isJSON = function (str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    };
    
    common.homeLoad = function () {
        common.showLogin();
        document.getElementById("zfooter_noticias").style.display="block";
    };
    
    common.homeUnload = function () {
        common.hideLogin();
        document.getElementById("zfooter_noticias").style.display="none";
        document.getElementById("navbar").style.display="none";
    };

    common.showLogin = function () {
        if (ServiceConfig.usuario) {
            document.getElementById("loginButton").style.display="none";
            document.getElementById("logoutButton").style.display="block";
        }
        else {
            document.getElementById("loginButton").style.display="block";
            document.getElementById("logoutButton").style.display="none";
        }
    };
    common.hideLogin = function () {
        document.getElementById("loginButton").style.display="none";
        document.getElementById("logoutButton").style.display="none";
    };

    /**
     * Devuelve una url combinando las parámetros pasados
     * @param {Object} baseUrl
     * @param {Object} relativeUrl
     * @param {Object} number, string o un objeto literal con los datos para pasar al servicio
     */
    common.combineUrl = function (baseUrl, relativeUrl, data) {
        if (this.isEmpty(baseUrl) || typeof (baseUrl) !== 'string') {
            return '';
        }

        baseUrl = this.trimRight(baseUrl, ['/']);

        if (this.isEmpty(relativeUrl) || typeof (relativeUrl) !== 'string') {
            return baseUrl;
        }

        relativeUrl = this.trim(relativeUrl, ['/']);

        if (this.isEmpty(data)) {
            return baseUrl + '/' + relativeUrl;
        }

        var parametrosGet = this.obtenerParametrosGet(data);

        return baseUrl + '/' + relativeUrl + parametrosGet;
    };

    /**
     * Obtiene un string con los parámetros que se enviaran en la petición HTTP GET 
     */
    common.obtenerParametrosGet = function (data) {
        var parametrosGet = "";

        if (_.isObject(data)) {
            _.compactObject(data);
            parametrosGet += '?';
            for (var property in data) {
                parametrosGet += property + '=' + data[property] + '&';
            }
            parametrosGet = this.trimRight(parametrosGet, ['&']);
        } else {
            data = this.trim(data, ['/']);
            parametrosGet = '/' + data;
        }

        return parametrosGet;
    };

    /**
     * Quita los caracteres al comienzo del string que se encuentren dentro del array de caracteres
     * @param {Object} aString
     * @param {Object} charArray array con los caracteres que se quieren remover
     */
    common.trimLeft = function (aString, charArray) {
        var stringArray = this.stringToArray(aString);

        for(var i = 0; i < stringArray.length; i++){
            if(charArray.indexOf(stringArray[i]) < 0){
                break;
            }
        }

        return _.rest(stringArray, i).join("");
    };

    /**
     * Quita los caracteres al final del string que se encuentren dentro del array de caracteres
     * @param {Object} aString
     * @param {Object} charArray array con los caracteres que se quieren remover
     */
    common.trimRight = function(aString, charArray){
        var stringArray = this.stringToArray(aString);
        var reverseArray = this.stringToArray(this.trimLeft(stringArray.reverse().join(""), charArray));
        return reverseArray.reverse().join("");
    };

    common.trim = function(aString, charArray){
        if(this.isEmpty(charArray))
        {
            charArray = [" "];
        }
        return this.trimRight(this.trimLeft(aString, charArray), charArray);
    };

    common.stringToArray = function(aString){
        var aArray = [];
        for (var i = 0; i < aString.length; i++){
            aArray.push(aString[i]);
        }

        return aArray;
    };

    /**
     * Devuelve el valor del atributo o un valor por default si el valor del atributo es nulo.
     * @param {Object} atributo
     */
    common.obtenerValorODefault = function(atributo) {
        if (this.isEmpty(atributo))
        {
            return "No definido";
        }
        return atributo;
    };

    /**
    * Igual que el extend de underscore, pero se agrega un flag que si es false, no sobreescribe la propiedad de objeto
    * que se quiere extender.
    * @param {Object} obj, objeto que se quiere extender.
    * @param {boolean} override, si el argumento pasado vale true, entonces, funciona igual que underscore.
    * Esto quiere decir que se copian las propiedades de los objetos origen al objeto destino.
    * Si la propiedad existe se sobreescribe con el valor que tiene en el objeto origen.
    * Si es false, entonces, si la propiedad evaluada existe en el objeto destino, se conserva, no se sobreescribe.
    */
    common.extendSinPisar = function (obj, override) {
        var argsAux = [],
            i;

        for (i = 2; i < arguments.length; i++) {
            argsAux[i - 2] = arguments[i];
        };

        _.each(argsAux, function(source) {
            if (source) {
                for (var prop in source) {
                    if (!override && !common.isEmpty(obj[prop])){
                        continue;
                    }
                    obj[prop] = source[prop];
                }
            }
        });
        return obj;
    };

    //Se modifica la función de underscore para que si la propiedad es una función asume que es un constructor,
    // y de esta forma lo instancia.
    // If the value of the named `property` is a function then invoke it with the
    // `object` as context; otherwise, return it.
    common.constructorResult = function (object, property) {
        if (object == null) return void 0;
        var value = object[property];
        return _.isFunction(value) ? new value() : value;
    };

    return common;
}(_));


/*Esta función se utiliza para extender underscore con compactObject.
*La función compactObject se utiliza para procesar un objeto y eliminar los atributos que tengan valor falsy (undefined, null, "")
*/
_.mixin({
    compactObject: function(o) {
        _.each(o, function(v, k) {
            if(!v && ( isNaN(v) || common.isEmpty(v))) { /*!!!!!!!!!!!!!!*/
                delete o[k];
            }
        });
        return o;
    }
});