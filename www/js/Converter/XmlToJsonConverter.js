var XmlToJSONConverter = (function(xmltojson, _){
    var converter = {};
    
    converter.jsonAux = {};
    
    converter.convert = function(xml){
        var primerJson = {};
        
        if(_.isString(xml)){
            primerJson = xmltojson.parseString(xml);
        }
        else{
            primerJson = xmltojson.parseXML(xml);
        }
        return this.parsePrimerJson(primerJson);
    };
    
    /**
     * Recorre el json generado la primera vez, para convertirlo en un json represente realmente el modelo.
     * @param {Object} primerJson
     */
    converter.parsePrimerJson = function(primerJson){
        var auxObject = {};
        
        if (_.isArray(primerJson)){
            auxObject = [];
        }
        
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
                else if((_.isArray(primerJson[property]) && primerJson[property].length > 1) || _.isObject(primerJson[property]))
                {
                    auxObject[property] = this.parsePrimerJson(primerJson[property]);                    
                }
            }
        }
        
        return auxObject;
    };
    
    return converter;
})(xmlToJSON, _);