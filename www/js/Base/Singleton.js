Backbone.Singleton = {
   getInstance: function (args) {
     if (this._instance === undefined) {
       this._instance = new this(args);
     }
     return this._instance;
   }
 }