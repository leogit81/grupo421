define(['require', 'Base/BaseView', 'Models/Domicilio'], function(require, BaseView, Domicilio){
    DomicilioView = BaseView.extend({
        model: Domicilio,
    });
    
    return DomicilioView;
});