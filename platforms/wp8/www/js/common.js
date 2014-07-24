/**
 * Biblioteca de funciones comunes 
 */
define(['require', 'underscore'], function(require, _){
    var common = {};
    
    common.isEmpty = function(value){
        return value === undefined
                || value === null
                || value === '';
    };
    
    /**
     * Devuelve una url combinando las parámetros pasados
     * @param {Object} baseUrl
     * @param {Object} relativeUrl
     * @param {Object} number, string o un objeto literal con los datos para pasar al servicio
     */
    common.combineUrl = function(baseUrl, relativeUrl, data){
        if (this.isEmpty(baseUrl) || typeof (baseUrl) !== 'string')
            return '';
            
        baseUrl = this.trimRight(baseUrl, ['/']);
        
        if (this.isEmpty(relativeUrl) || typeof (relativeUrl) !== 'string'){
            return baseUrl;
        }
        
        relativeUrl = this.trim(relativeUrl, ['/']);
        
        if (this.isEmpty(data)){
            return baseUrl + '/' + relativeUrl;
        }
        
        var parametrosGet = this.obtenerParametrosGet(data);
         
        return baseUrl + '/' + relativeUrl + parametrosGet;
    };
    
    /**
     * Obtiene un string con los parámetros que se enviaran en la petición HTTP GET 
     */
    common.obtenerParametrosGet = function(data){
        var parametrosGet = "";
        
        if (_.isObject(data)){
            parametrosGet += '?';
            for(var property in data){
                parametrosGet += property + '=' + data[property] + '&';
            }
            parametrosGet = this.trimRight(parametrosGet, ['&']);
        }else{
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
    common.trimLeft = function(aString, charArray){
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
    common.obtenerValorODefault = function(atributo){
        if (this.isEmpty(atributo))
        {
            return "No definido";
        }
        return atributo;
    };
    
    return common;
});