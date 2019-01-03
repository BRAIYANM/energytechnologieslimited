var proyecto = {
	/**
	 * Función que se encarga de cargar la galeria
	 */
	cargarGaleria: function() {
		if ($("#galeria").is(":visible")) {
	    	$("a[rel='gal']").colorbox({opacity: "0.5", maxWidth: "80%", maxHeight: "80%", current: "{current} / {total}", scrolling: true});
	    	$("a.colorboxVideo").each(function() {
	    	   	 var id = $(this)[0].id;
	    	   	 if (id != null) {
	    	   		 var identificador = id.replace("video_", "");
	    	   		 $(this).colorbox({href: contextoPortal + "cargarFichaVideo.do?identificador=" + identificador, opacity: "0.5", iframe:true, innerWidth:640, innerHeight:480, scrolling: false});
	    	   	 }
    	    });
		}
	},
	/**
	 * Función que se encarga de cargar el carrusel de relacionados
	 */
	cargarCarruselRelacionados: function() {
		$("#mycarousel").jcarousel({
	    	scroll: 3
	   	});
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
}

$(document).ready(function() {
	proyecto.cargarCombosBuscadorProyectos();
});