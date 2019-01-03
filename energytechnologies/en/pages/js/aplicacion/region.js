var region = {
	/**
	 * Carga las pestanas de la aplicacion de regiones
	 */
	cargarPestanas: function() {
		if ($('form#regionForm').length > 0 && $('form#regionForm')[0].activoBuscador.value == 'true') {
			$('.caja_pestanas').easytabs('select', '#buscador_proyectos');
		} else {
			$('.caja_pestanas').easytabs();
		}
	},
	/**
	 * Funcion que se encarga de recargar los combos
	 */
	cargarCombosBuscadorProyectos: function() {
		var aIdComboOrigen = new Array();
		var aIdComboDestino = new Array();
		var aIdRelacion = new Array();
		var aTextoDefecto = new Array();
		
		aIdComboOrigen[0]= "idDivision";
		aIdComboDestino[0]= "idActividad";
		aIdRelacion[0] = "1";
		aTextoDefecto[0] = textoTodas;
		
		portal.inicializarCombo(aIdComboOrigen, aIdComboDestino, aIdRelacion, aTextoDefecto);	
		
		aIdComboOrigen[0] = "idDivision";
		aIdComboDestino[0] = "idRegion";
		aIdRelacion[0] = "2";
		aTextoDefecto[0] = textoTodas;
		portal.inicializarCombo(aIdComboOrigen, aIdComboDestino, aIdRelacion, aTextoDefecto);	
	}
}

$(document).ready(function() {
	region.cargarPestanas();
	region.cargarCombosBuscadorProyectos();
	$(".bloquelistado").find('li.itemlistado:last').css({"border-bottom": "0", "background": "transparent"});
});