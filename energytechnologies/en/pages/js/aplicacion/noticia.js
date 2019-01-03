var noticia = {
	/**
	 * Activa el carrusel de imagenes relacionadas
	 */
	activarCarrusel: function() {
		if ($("#mycarousel")) {
			$("#mycarousel").jcarousel({scroll: 4});
	   	}		
		if ($("a[rel='gal']")) {
			$("a[rel='gal']").colorbox({opacity: "0.5", maxWidth: "80%", maxHeight: "80%", current: "{current} / {total}", scrolling: true});
        }
	}
}

$(document).ready(function() {	
	noticia.activarCarrusel();
});