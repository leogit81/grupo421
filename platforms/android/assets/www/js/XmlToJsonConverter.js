define(['require', 'xmltojson'], function(require, xmltojson){
    var converter = {};
    
    converter.convertToJson = function(xml){
        return xmltojson.parseXML(xml);
    };
    
    return converter;
});