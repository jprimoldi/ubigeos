/**	
 *	@author JPRimoldi
 *	@date 05/7/2017-06/072017
 */
(function () {

	angular.module('ubigeos', [])
		.controller('UbigeosCtrl', UbigeosCtrl)
		.factory('utilidades', utilidades)
		.directive('tabla', tablaDirective);

	function UbigeosCtrl (utilidades) {

		var self = this;
			self.departamento = [];
			self.provincia = [];
			self.distrito = [];

		utilidades.parseoTXT(self).then(function (a) { self.listo = true; });
	}

	function utilidades ($http) {

		var self = this;

		self.parseoTXT = parseoTXT;

		return self;

		function parseoTXT (ctrl) {

			return $http.get('../ubigeos.txt').then(function (response) {

				var lineas = response.data.match(/([^"\n]+)/g);
				var temp;

				angular.forEach(lineas, function (elem, index) {
					
					temp = utils.parseoDatos(elem);

					if (ctrl[temp.tipo]) {

						if (ctrl[temp.tipo_padre]) {

							temp.desc_padre = ctrl[temp.tipo_padre].filter(function (a) {
								return a.codigo === temp.padre;
							})[0].nombre;
						}

						ctrl[temp.tipo].push(temp);
					}
				});
			});
		}
	}

	function tablaDirective () {

		return {
			scope: {
				titulo: '@',
				items: '=',
			},
			restrict: 'E',
			replace: true,
			templateUrl: 'tpl/tabla.html',
			link: function (scope, elem, attr) {
				scope.clase = scope.titulo.toLowerCase();
			}
		}
	}

})();