define(['require', 'Base/BaseView', 'Models/CoordenadasMapa'], function(require, BaseView, CoordenadasMapa){
    CoordenadasMapaView = BaseView.extend({
        model: CoordenadasMapa,
    });
    
    return CoordenadasMapaView;
});