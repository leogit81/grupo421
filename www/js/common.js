/**
 * Biblioteca de funciones comunes 
 */
define(['require'], function(){
    var common = {};
    
    common.isEmpty = function(value){
        return value === undefined
                || value === null
                || value === '';
    };
    
    return common;
});