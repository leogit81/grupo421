/**
 * Created by Leo on 6/12/2014.
 */
var Ministerio = Backbone.Model.extend({
		defaults : {
			"coordenadasDeMapa" : new CoordenadasMapa(),
			"domicilio" : new Domicilio(),
			"localidad" : null,
			"mail1" : null,
			"ministroDeSalud" : null,
			"nombre" : null,
			"provincia" : null,
			"sitioWeb" : null,
			"telefono1" : new Telefono(),
			"telefono2" : new Telefono(),
			"telefono3" : new Telefono(),
			"telefono4" : new Telefono()
		}

	});