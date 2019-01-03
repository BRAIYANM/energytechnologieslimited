/**
 * Centra vertical y horizontalmente el elemento en la ventana
 */
(function($){
  $.fn.center = function(options) {
    var pos = {	  
	  SCROLLBAR_WIDTH : 17,	  
      sTop : function() {
			return window.pageYOffset || $.boxModel && document.documentElement.scrollTop || document.body.scrollTop;
      },
      wHeight : function() {
			if ( $.browser.opera || ($.browser.safari && parseInt ($.browser.version) > 520) ) { 
				return window.innerHeight - (($(document).height() > window.innerHeight) ? this.SCROLLBAR_WIDTH : 0);
            } else if ( $.browser.safari ) {
                return window.innerHeight;
            } else {
				return $.boxModel && document.documentElement.clientHeight || document.body.clientHeight;
        	}
      },
      wWidth : function() {
			if ( $.browser.opera || ($.browser.safari && parseInt ($.browser.version) > 520) ) { 
				return window.innerWidth - (($(document).width() > window.innerWidth) ? this.SCROLLBAR_WIDTH : 0);
            } else if ( $.browser.safari ) {
                return window.innerWidth;
            } else {
				return $.boxModel && document.documentElement.clientWidth || document.body.clientWidth;
        	}
      }
    };
    return this.each(function(index) {
      if (index == 0) {
        var $this = $(this);
        var elHeight = $this.height();
        var elWidth = $this.width();
        $this.css({
          position: 'absolute',
          marginTop: '0',
          top: pos.sTop() + (pos.wHeight() / 2) - (elHeight / 2),
          left: (pos.wWidth() / 2) - (elWidth / 2)
        });
      }
    });
  };
})(jQuery);

/**
 * Objeto imagen
 */
var imagen = {
	//Array de imagenes ya cargadas
	cargadas: [],
	//Contorno de la imagen, en principio es de valor fijo
	contorno: 100,
	
	/**
	 * Amplia la misma imagen sobre la que se hace clic
	 */
	ampliar: function() {
		if ($('body #a_ampliarImagen')){
			$('body #adjunto').remove();
		}
	    $('body').append("<div id='adjunto'></div>");
		$('body #adjunto').css({ visibility: "hidden" });
		// html de la capa
		var html = "<div id='a_ampliarImagen'><a><img src='" + contextoPortal + "pages/img/"+codigoIdioma+"/portal/cerrar.gif'/></a><img id='imagenAdjunta' src='" + this.src + "' alt='" + this.alt + "'><p class='piefoto'>" + this.alt + "</p></div>";
		$('body #adjunto').append(html);
		$('body #adjunto').css({ visibility: "visible", width: ( $('#imagenAdjunta').width() + imagen.contorno) + "px" });
		$('body #adjunto').center();
    	$('body #adjunto').click(function() { 
			imagen.reducir();
		});
	},
	
	/**
	 * Muestra la imagen adjunta asociada a la imagen sobre la que se hace clic
	 *
	 * @param img La imagen sobre la que se hace clic
	 */
	ampliarAdjunta: function(img) {
		if ($.fn.colorbox) {
			imagen.ampliarAdjuntaColorbox(img);
		} else {
			imagen.ampliarAdjuntaCapa(img);
		}
	},
	
	/**
	 * Muestra la imagen adjunta asociada a la imagen sobre la que se hace clic utilizando una capa propia
	 *
	 * @param img La imagen sobre la que se hace clic
	 */
	ampliarAdjuntaCapa: function(img) {
		var idImagen = img.id.split("_")[1];
		var altImagen = unicodeEscape(img.alt);
		if ($('body #adjunto')){
			$('body #adjunto').remove();
		}
	    $('body').append("<div id='adjunto'></div>");
	    $('body #adjunto').append("<div id='precarga'></div>");
	    $('body #adjunto #precarga').center();
		$.post(contextoPortal + "abrirImagenAdjunta.do",
			{ identificador: idImagen , descripcion: altImagen },
				function(xml){
					$('body #adjunto').css({ position: "absolute", left: "0", top: "0", visibility: "hidden" });
					$('body #adjunto').append(xml);
					if (jQuery.inArray($('#imagenAdjunta').attr("src"), imagen.cargadas) > -1) {
							$('body #precarga').remove();
							$('body #adjunto').width($('#imagenAdjunta').width() + imagen.contorno);	
							$('body #adjunto').center();
							$('body #adjunto').css({ visibility: "visible" });	
					} else {
						$('#imagenAdjunta').load(function() {
							imagen.cargadas.push($('#imagenAdjunta').attr("src"));
							$('body #precarga').remove();						
							$('body #adjunto').width($('#imagenAdjunta').width() + imagen.contorno);
							$('body #a_ampliarImagen').width($('#imagenAdjunta').width());
							$('body #adjunto').center();
							$('body #adjunto').css({ visibility: "visible" });	
						});
					}		
					var descripcion = unescape($('body #adjunto p.piefoto').text());
					if (typeof texto.altPopupImagen != 'undefined') {
						descripcion = descripcion.replace(texto.altPopupImagen, "");
					}
					
					$('#imagenAdjunta').attr("alt",descripcion);
					
					//para que no recargue la pagina al cerrar
					$('body #adjunto a').removeAttr("href"); 
					$('body #adjunto a').css({ cursor: "pointer" }); 
					$('body #adjunto p.piefoto').text(descripcion);
					
			    	$('body #adjunto').click(function() {
						imagen.reducir();
					});
				}
		);  
	},
	
	/**
	 * Muestra la imagen adjunta asociada a la imagen sobre la que se hace clic utilizando Colorbox
	 *
	 * @param img La imagen sobre la que se hace clic
	 */
	ampliarAdjuntaColorbox: function(img) {
		var urlImagen = img.src;
		var altImagen = img.alt;
		if (typeof texto.altPopupImagen != 'undefined') {
			altImagen = altImagen.replace(texto.altPopupImagen, "");
		}
		var nombreImagen = urlImagen.substring(urlImagen.lastIndexOf("/") + 1, urlImagen.lastIndexOf("."));
		var extensionImagen = urlImagen.substring(urlImagen.lastIndexOf("."));
		var urlImagenAmpliada = urlImagen.substring(0, urlImagen.lastIndexOf("/") + 1) + nombreImagen + "_adj" + extensionImagen;
		$.fn.colorbox({href: urlImagenAmpliada, title: altImagen, opacity: "0.5", maxWidth: "80%", maxHeight: "80%", rel: "editor", current: "{current} / {total}"});
	},
	
	/**
	 * Muestra la imagen ampliada de un enlace
	 *
	 * @param enlace Enlace para mostrar la imagen
	 * @param url La direccion fuente de la imagen
	 * @param desc Texto descriptivo de la imagen
	 */
	mostrar: function(enlace,ref,desc) {
		if ($('body #a_ampliarImagen')){
			$('body #adjunto').remove();
		}
		//para que no recargue la pagina
		$(enlace).removeAttr("href");
		//posicion
		var pos = getAbsoluteElementPosition(enlace);
	    $('body').append("<div id='adjunto'></div>");
		$('body #adjunto').css({ visibility: "hidden" });
		// html de la imagen
		var html = "<div id='a_ampliarImagen'><a><img src='" + contextoPortal + "pages/img/"+codigoIdioma+"/portal/cerrar.gif'/></a><img id='imagenAdjunta' src='" + ref + "' alt=''><p class='piefoto'>" + desc + "</p></div>";
		$('body #adjunto').append(html);
		$('body #adjunto').css({ visibility: "visible", width: ( $('#imagenAdjunta').width() + imagen.contorno) + "px" });
		$('body #adjunto').center();
    	$('body #adjunto').click(function() { 
			imagen.reducir();
			$(enlace).attr("href","#");
		});												
	},
	
	/**
	 * Oculta la capa de la imagen ampliada
	 */
	reducir: function() {
		$('body #adjunto').remove();
	}
}

/**
 * Convierte una cadena de caracteres a Unicode
 *
 * @param pstrString La cadena a convertir
 */
function unicodeEscape (pstrString) {
	if (pstrString == "") {
		return "";
	}
	var iPos = 0;
	var strOut = "";
	var strChar;
	var strString = escape(pstrString);
	while (iPos < strString.length) {
		strChar = strString.substr(iPos, 1);
		if (strChar == "%") {
			strNextChar = strString.substr(iPos + 1, 1);
			if (strNextChar == "u") {
				strOut += strString.substr(iPos, 6);
				iPos += 6;
			} else {
				strOut += "%u00" +
				strString.substr(iPos + 1, 2);
				iPos += 3;
			}
		} else {
			strOut += strChar;
			iPos++;
		}
	}
	return strOut;
}