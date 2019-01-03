$(document).ready(function() {
	$("input.fechas").each(function() {
		var idFecha = '#' + $(this)[0].id;
		calendario.inicializar(idFecha,'unica','', null, null, '');
	});	
});