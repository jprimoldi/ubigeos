/**	
 *	@author JPRimoldi
 *	@date 05/7/2017-06/072017
 */
var departamento = [],
	provincia = [],
	distrito = [];

$(function () {

	var lineas;
	var temp = {};
	var template = $('[data-template="fila"]').clone().removeAttr('data-template');
	var template_cabecera = $('[data-template="cabecera"]').clone().removeAttr('data-template');

	$.get('../ubigeos.txt', function (data) {

		lineas = data.match(/([^"\n]+)/g);

		lineas.forEach(function (elem, index) {

			temp = utils.parseoDatos(elem);

			switch (temp.tipo) {

				case 'distrito': distrito.push(temp); break;
				case 'provincia': provincia.push(temp); break;
				default: departamento.push(temp); break;
			}
		});

		cargoTablas();
	});

	function cargoTablas () {

		var item;

		[departamento,provincia,distrito].forEach(function (tabla) {

			tabla.forEach(function (elem, index) {

				if (index === 0) {

					item = template_cabecera.clone();
					$('.tabla.'+elem.tipo+' .cabecera').append(item);
					$('.tabla.'+elem.tipo+' .cuerpo .spinner').remove();
				}

				item = template.clone();
				item.find('.codigo .valor').html(elem.codigo);
				item.find('.nombre .valor').html(elem.nombre);
				item.find('.cod_padre .valor').html(elem.padre);

				if (elem.padre) {

					var padre = window[elem.tipo_padre];

					padre = padre.filter(function (p) {
						return p.codigo === elem.padre;
					})[0];
					
					item.find('.desc_padre .valor').html(padre.nombre);
				}

				$('.tabla.'+elem.tipo+' .cuerpo').append(item);
			});
		});
	}
});