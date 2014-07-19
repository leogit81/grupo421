define(['require', 'xmltojson', 'underscore'], function(require, xmltojson, _){
    var converter = {};
    
    converter.jsonAux = {};
    
    converter.convert = function(xml){
        var primerJson = xmltojson.parseString(xml);
        return this.parsePrimerJson(primerJson);
    };
    
    /**
     * Recorre el json generado la primera vez, para convertirlo en un json represente realmente el modelo.
     * @param {Object} primerJson
     */
    converter.parsePrimerJson = function(primerJson){
        var auxObject = {};
        
        for(var property in primerJson){
            if(primerJson.hasOwnProperty(property)){
                if (_.isArray(primerJson[property]) && primerJson[property].length == 1){
                    if (primerJson[property][0].hasOwnProperty("_text")){
                        auxObject[property] = primerJson[property][0]["_text"];
                    }
                    else{
                        auxObject[property] = this.parsePrimerJson(primerJson[property][0]);
                    }
                }
            }
        }
        
        return auxObject;
    };
    
    return converter;
});