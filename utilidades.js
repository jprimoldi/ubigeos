var utils = new function () {

	var self = this;

	self.parseoDatos = function (cadena) {

		var objeto = {};
		var datos = /([^\/]+)\s\/\s([^\/]*)\s\/\s([^\/]*)/.exec(cadena);
		var divido;

		var dist = divido = /(\d+)\s([\w\s]+)/.exec(datos[3]);
		var prov = divido = /(\d+)\s([\w\s]+)/.exec(datos[2]);
		var depa = divido = /(\d+)\s([\w\s]+)/.exec(datos[1]);

		if (dist) {

			objeto = {
				'tipo'		: 'distrito',
				'codigo'	: dist[1],
				'nombre'	: dist[2],
				'padre' 	: prov[1],
				'tipo_padre': 'provincia'
			}

		} else if (prov) {

			objeto = {
				'tipo'      : 'provincia',
				'codigo'    : prov[1],
				'nombre'    : prov[2],
				'padre'     : depa[1],
				'tipo_padre': 'departamento'
			}

		} else if (depa) {

			objeto = {
				'tipo'		: 'departamento',
				'codigo'	: depa[1],
				'nombre'	: depa[2],
				'padre' 	: null,
				'tipo_padre': null
			}			
		}

		return objeto;
	}
}