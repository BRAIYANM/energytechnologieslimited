var division = {
	cargarPestanas: function() {
		if ($('form#divisionForm').length > 0 && $('form#divisionForm')[0].activoBuscador.value == 'true') {
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
	},
	/**
	 * Carga el reproductor de video jwplayer
	 * 
	 * @param file video a reproducir
	 * @param image imagen de espera
	 * @param subitutlos fichero de subitutlos
	 * @param stretching parametro de relacion de apecto
	 * @param rutaPortal ruta portal
	 */
	cargarReproductor: function(file, image, subtitulos, stretching, rutaPortal) {
		var plugins = {'gapro-2': {}};
		if (subtitulos != '') {
			var captions = {'captions-2': {
		          'back': false,
		          'file': subtitulos
		        }};
			plugins = $.extend(plugins, captions);
		}
		jwplayer('reproductorVideo').setup({
			'file': file,
		    'image': image,
		    'plugins': plugins,
			'skin': rutaPortal + '/pages/jwplayer/skins/beelden/beelden.zip',
			'stretching': stretching,
			'modes': [ {type: "flash", src: rutaPortal +  "/pages/jwplayer/player.swf" }, {type: "html5"}, {type: "download"}],
			'height': '235', 
			'width': '345'
		 });
	}
}

$(document).ready(function() {
	division.cargarPestanas();
	division.cargarCombosBuscadorProyectos();
});