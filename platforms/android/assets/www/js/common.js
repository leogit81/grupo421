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
     * Devuelve una url combinando las pasadas por parámetro
     * @param {Object} baseUrl
     * @param {Object} relativeUrl or data to pass to the service
     * @param {Object} number or string, data to pass to the service
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
            return baseUrlArray + '/' + relativeUrl;
        }
        
        data = this.trim(data.toString(), ['/']);
        
        return baseUrlArray + '/' + relativeUrl + '/' + data;
    };
    
    /**
     * Quita los caracteres al comienzo del string que se encuentren dentro del array de caracteres
     * @param {Object} aString
     * @param {Object} charArray array con los caracteres que se quieren remover
     */
    common.trimLeft = function(aString, charArray){
        var stringArray = stringToArray(aString);
        
        for(var i = 0; i < stringArray.length; i++){
            if(charArray.indexOf(stringArray[i]) < 0){
                break;
            }
        }
        
        return _.rest(stringArray, i);
    };
    
    /**
     * Quita los caracteres al final del string que se encuentren dentro del array de caracteres
     * @param {Object} aString
     * @param {Object} charArray array con los caracteres que se quieren remover
     */
    common.trimRight = function(aString, charArray){
        var stringArray = stringToArray(aString);
        return this.trimLeft(stringArray.reverse().toString(), charArray);
    };
    
    common.trim = function(aString, charArray){
        return this.trimRight(this.trimLeft(stringArray, charArray), charArray);
    };
    
    common.stringToArray = function(aString){
        var aArray = [];
        for (var i = 0; i < baseUrl.length; i++){
            urlArray.push(baseUrl[i]);
        }
        
        return aArray;
    };
    
    return common;
});