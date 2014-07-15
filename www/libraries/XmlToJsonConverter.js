define(['require', 'xmltojson'], function(require, xmltojson){
    var converter = {};
    
    converter.convertToJson = function(xml){
        return xmltojson.parseString(xml);
    };
    
    return converter;
});