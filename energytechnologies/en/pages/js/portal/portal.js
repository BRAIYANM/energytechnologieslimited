/**
 * Objeto que inicializa todo lo relativo al portal como la carga de utilidades,
 * imagenes adjuntas, enlaces externos, tooltip, etc.
 */
var portal = {

	/**
	 * Inicializa las funcionalidades de apariencia de portal
	 *
	 * @constructor
	 */
	inicializar: function(){
		portal.cargarUtilidades();
		portal.activarBuscadorGeneral();
		portal.imgAdjuntas();
		portal.externalLinks();
		portal.cargarBookmark();
		portal.cargarTooltip();
		portal.mostrarOcultarLOPD();
		portal.cargarMenuDesplegable();
		portal.cargarReproductorVideo();
		portal.cargarEmbed();
		portal.cargarAcordeon();
		portal.cargarPestanias();
	},

	/**
	 * Carga de las utilidades de servicios generales que solo estan disponibles con Javascript activado
	 */
	cargarUtilidades: function(){

		//Generar enlace para volver a la pagina anterior
		$("#atajo ul li").last().not('#atajoVolver').before('<li id="atajoVolver"><a href="#volver"><img src="' + texto.imagenVolver + '" alt="' + texto.volver + '"/></a></li>');
		$("#atajoVolver a").click(function() { portal.volver(); return false; });
	
		//Generar enlace para imprimir pagina
		var rutaImagenImprimir = contextoPortal + 'pages/img/' + codigoIdioma + '/icono/imprimir.gif'; 
		//$("#utilidades li").last().not('#servicioImprimir').removeClass('ultimo').after('<li class="ultimo" id="servicioImprimir"><a href="#imprimir">' + texto.imprimir + '</li>');
		//$("#servicioImprimir a").click(function() { portal.imprimir(); return false; });
		
		//Desplegable de idiomas
		$("<span>" + texto.worldwide + "</span>").insertBefore(".idioma .hide-with-script");
		$(".idioma").attr("id", "capaidioma");
		$("#capaidioma").hover(function(){
			$(this).addClass("idiomaover").find('div.hide-with-script').fadeIn("fast");
		}, function(){
			$(this).removeClass("idiomaover").find('div.hide-with-script').fadeOut("fast");
		});		
		
	},
	
	/**
	 * Activacion de las validaciones del buscador general 
	 *
	 * @return Devuelve si se puede lanzar el buscador general o no en funcion de los parametros de entrada 
	 */
	activarBuscadorGeneral: function() {
		if ($("#buscadorGeneralForm")) {
			$("#buscadorGeneralForm").submit(function(){
				return portal.validarBuscadorGeneral(this);
			});
		}
		if ($("#textobusqueda")) {
			this.textoBuscador = $("#textobusqueda").val();
			$("#textobusqueda").focus(function(){				
				portal.limpiar(this);
			});
		}			
	},
	
	/**
	 * Modifica el class y el alt de la imagenes que tiene imagen adjunta, advirtiendo que la aplicacion se abrira en ventana nueva
	 * Modifica los eventos click y keypress de las imagenes con adjunto
	 */
	imgAdjuntas: function(){
		$("img.adjunto_si").each(function(){
			$(this).bind('click keypress', function (){portal.verImagen(this)});
			$(this).addClass("cursorAdjunto");  
			if (typeof texto.altPopupImagen != 'undefined') {
				if (($(this).attr('alt') != '') && ($(this).attr('alt').indexOf(texto.altPopupImagen) == -1)) {
			    	$(this).attr('alt', ($(this).attr('alt') + " " + texto.altPopupImagen));
			    } else {
			      	$(this).attr('alt',texto.altPopupImagen);
			    }
			    $(this).attr("title", $(this).attr('alt'));
			}
		});	
	},
		
	/**
	 * Recorre todos los enlaces del documento (etiquetas <a> y <area> incluyendo un target="_blank" si rel="external" (<a>) o class="external" (<area>)
	 */
	externalLinks: function(){
		
		//Etiquetas <a>
		$("a[href][rel$='external']").each(function(){
			$(this).attr("target", "_blank");
			if (!$(this).hasClass("tooltip")) {
				if (!$("img",this).hasClass("tooltip")) {
					if ($(this).attr("title") == "") {
						$(this).attr("title", texto.titleVentanaNueva);
					} else {
						$(this).attr("title", $(this).attr("title") + " (" + texto.titleVentanaNueva + ")");
					}
				}
			}
		});

		//Etiquetas <area>
		$("area[href][class$='external']").each(function(){
			$(this).attr("target", "_blank");
			if ($(this).attr("title") == ""){
				$(this).attr("title", texto.titleVentanaNueva);
			} else {
				$(this).attr("title", $(this).attr("title") + " (" + texto.titleVentanaNueva + ")");
			}
		});
	},

	/**
	 * Imprimir pagina
	 */
	imprimir: function() {
		window.print();
	},
	
	/**
	 * Enlace a la pagina anterior
	 */
	volver: function() {
		if (portal.obtenerAction().indexOf("cambiarIdioma.do") <= 0 ) {
			history.go(-1);
		}
	},
	
	/**
	 * Obtiene el nombre de la acccion que se esta ejecutando
	 *
	 * @return Devuelve el nombre de la accion
	 */
	obtenerAction: function() {
		var retorno = window.location.href;	
		var pos = retorno.indexOf("?"); 
		if (pos > 0) {
	  		retorno = retorno.substring(0,pos);
		}
		return retorno;
	},

	/**
	 * Comprueba que el buscador general no busque por el texto por defecto en los idiomas existentes
	 *
	 * @return Devuelve si el texto de busqueda es valido
	 */
	validarBuscadorGeneral: function(formulario) { 
		if (validateBuscadorGeneralForm(formulario)) {
			if (formulario.textoBusqueda.value == this.textoBuscador) {
				alert(texto.validacionBuscadorGeneral);
				portal.limpiar(formulario.textoBusqueda);
				formulario.textoBusqueda.focus();
				return false;
			}else {
				return true;
			}
		} else {
			return false;
		}	
	},
	
	/**
	 * Limpia el valor del objeto
	 */
	limpiar: function(obj) {
		obj.value = "";
	},
	
	/**
	 * Accion para ver imagen en popup
	 */
	verImagen: function(img) {
		if (typeof(imagen) != 'undefined') {
			imagen.ampliarAdjunta(img);
		}
	},
	
	/**
	 * Accion para cargar el plugin de bookmarks para redes sociales
	 */
	cargarBookmark: function() {
		$('#expandedBookmark').bookmark({
    		sites: ['facebook', 'google']
    		/*
    		Descomentar si se quiere incluir en enviar pagina como bookmark.
    		Hay que definir las variable asuntoEmail y bodyEmail con los textos apropiados.
    		addEmail: true,
    		emailSubject: asuntoEmail,  
			emailBody: bodyEmail + '\n{t} ({u})'
			*/
    	});
    	/*
   		Descomentar si se quiere incluir en enviar pagina como bookmark
   		$("a[id$='enlaceEmailTo']").hide();
    	*/
	},
	
	/**
	 * Accion para cargar el plugin de tooltips
	 */	
	cargarTooltip: function() {
		$("a[title][class=tooltip]").each(function(){
			if ($(this).attr("title") != '') {
				$(this).tooltip();
				$(this).removeAttr("title");
			}
		});
		$("img[alt][class=tooltip]").each(function(){
			if ($(this).attr("alt") != '') {
				$(this).tooltip();
				$(this).removeAttr("alt");
			}
		});
	},
	
	/**
	 * Accion para mostrar/ocultar la capa de informacion de la LOPD
	 */
	mostrarOcultarLOPD: function() {
		 $("#LOPD").hide();
		 $("#enlaceLOPD").click(function() {
			if(!$("#LOPD").is(":visible")){
				$("#LOPD").slideToggle();
			}
			return false;
		 });
	},
	/**
	 * Inicializa el combo origen con el evento change
	 * 
	 * @param aIdComboOrigen array con los id del combo origen
	 * @param aIdComboDestino array con los id del combo destino
	 * @param aIdRelacion array con los identificadores de las relaciones
	 * @param aCampoTextoDefecto array con los textos por defecto
	 */
	inicializarCombo: function(aIdComboOrigen, aIdComboDestino, aIdRelacion, aCampoTextoDefecto) {
		var idComboOrigen;
		var idComboDestino;
		var idRelacion;
		var campoTextoDefecto;
		for (var i = 0; i < aIdComboOrigen.length; i++) {
			idComboOrigen = aIdComboOrigen[i];
			idComboDestino = aIdComboDestino[i];
			idRelacion = aIdRelacion[i];
			campoTextoDefecto = aCampoTextoDefecto[i];
			campoHeredado = "";
			if (aIdComboOrigen[i+1] != null){
				campoHeredado = aIdComboOrigen[i+1];
			}
			if (i==0) portal.recargarCombo(idComboOrigen, idComboDestino, idRelacion, campoHeredado, campoTextoDefecto);
			$("#" + idComboOrigen).bind("change", {idComboOrigen: idComboOrigen, idComboDestino: idComboDestino, idRelacion: idRelacion, campoHeredado: campoHeredado, campoTextoDefecto: campoTextoDefecto}, function(event) {
				portal.recargarCombo(event.data.idComboOrigen, event.data.idComboDestino, event.data.idRelacion, event.data.campoHeredado, event.data.campoTextoDefecto);
			});
		}
	},
	/**
	 * Realiza la llamada ajax cuando se selecciona una opcionn del combo origen
	 * 
	 * @param idComboOrigen id del combo origen
	 * @param idComboDestino id del combo destino
	 * @param idRelacion id de la relacion del combo
	 * @param campoHeredado campo relacionado
	 * @param campoTextoDefecto texto por defecto del combo
	 */
	recargarCombo: function(idComboOrigen, idComboDestino, idRelacion, campoHeredado, campoTextoDefecto) {
		if ($("#" + idComboOrigen) != null) {
			var idRegistro = $("#" + idComboOrigen).val();
			if ((idRegistro != undefined) && (idRegistro != null)) {
				$.ajax({
					type: "POST",
				  	url: contextoPortal + 'cargarComboAjax.do',
				  	data: {idRelacion: idRelacion, idCondicion: idRegistro}, 
				  	dataType: 'json',
				  	async: false,
				  	success : function(jsonArray) {
				  		portal.recargarOpcionesCombo("select#" + idComboDestino, jsonArray, campoHeredado, campoTextoDefecto);
				  	}
				});
			}
		}
	},
	/**
	 * Recarga las opciones del combo destino con el resultado de la llamada ajax
	 * 
	 * @param idComboOrigen id del combo origen
	 * @param jsonArray array json  
	 * @param campoHeredado campo relacionado
	 * @param campoTextoDefecto texto por defecto del combo
	 */
	recargarOpcionesCombo: function(idComboDestino, jsonArray, campoHeredado, campoTextoDefecto) {
		var opcionSeleccionada = $(idComboDestino).val();	
		if ((campoTextoDefecto == null) || (campoTextoDefecto == undefined) || (campoTextoDefecto == '')) {
			campoTextoDefecto = textoSeleccione;
		}
		var options = '<option value="">' + campoTextoDefecto + '</option>';
	    for (var i = 0; i < jsonArray.length; i++) {
	    	if ((opcionSeleccionada != null) && (opcionSeleccionada != '') && (opcionSeleccionada == jsonArray[i].value)){
	    		options += '<option selected="selected" value="' + jsonArray[i].value + '">' + jsonArray[i].label + '</option>';
	    	} else {
	    		options += '<option value="' + jsonArray[i].value + '">' + jsonArray[i].label + '</option>';
	    	}
	    }
	    $(idComboDestino).html(options);
	    if (campoHeredado != "") {
			$("#" + campoHeredado).trigger("change");
		}
	},
	
	/**
	 * Carga el menú desplegable de segundo nivel
	 */
	cargarMenuDesplegable: function(){
		$("ul#n1 li").each(function(){
			$("ul#sub_" + $(this).attr("id")).clone().appendTo("#" + $(this).attr("id")).wrap('<div class="desplegable"><div></div></div>');
		});
		$("#n1 div.desplegable").css({display: "none"});
		$("#n1 li").hover(function(){
				var ancho = ($(this).outerWidth(true) >= 130) ? $(this).outerWidth(true) : 130;
				$(this).find('div.desplegable:first').css({width: ancho, visibility: "visible", display: "none", position: "absolute"}).animate({"height": "toggle", "opacity": "toggle"}, { duration: "slow" });
				$(this).addClass("submenuon");
			},function(){
				$(this).find('div.desplegable:first').css({visibility: "hidden"});
				$(this).removeClass("submenuon");
		});
        $("#n1 .desplegable").find("li:last").css({"border": "0"});
        $("#n1 .desplegable").find("li:last a").css({"border": "0", "padding-bottom": "10px"});
	}, 
	
	/**
	 * Carga el reproductor de video jwplayer
	 */
	cargarReproductorVideo: function() {
		$(".reproductorVideo").each (function() {
			var id = $(this).attr("id");
			if ((id != null) && (id != '')) {
				var opciones = eval(id);
				var plugins = {'gapro-2': {}};
				if ((opciones.captions != null) && (opciones.captions != "")) {
					var captions = {'captions-2': {
				          'back': false,
				          'file': opciones.captions
				        }};
					plugins = $.extend(plugins, captions);	
				}
				var defaults = {'skin': portalUri + '/pages/jwplayer/skins/beelden/beelden.zip',
								'modes': [ {type: "flash", src: portalUri +  "/pages/jwplayer/player.swf" }, {type: "html5"}, {type: "download"}],
								'plugins': plugins};
				var settings = $.extend(defaults, opciones);
				jwplayer(id).setup(settings);
			}
		});
	},
	
	/**
	 * Carga los objetos embed creados desde el editor
	 */
	cargarEmbed: function() {
		$(".objetoEmbed").each (function() {
			var id = $(this).attr("id");
			if ((id != null) && (id != '')) {
				var embed = unescape(eval(id));
				$(this).html(embed);
			}
		});
	},
	
	/**
	 * Carga la plantilla de acordeon vertical
	 */
	cargarAcordeon: function() {
		$(".acordeon").find(".bloque:last").css({"background": "transparent"});
		if ($(".acordeon")){
	   		$(".acordeon .datos").hide();
	   		$(".acordeon .titulo").css("cursor", "pointer");
			$(".acordeon .titulo").click(function(){
				if($(this).parent().hasClass("bloqueactivo")) {
					$(this).parent().removeClass("bloqueactivo").find('.datos:first').slideToggle();
				}
				else {
					$(".acordeon .bloque").removeClass("bloqueactivo").find('.datos').hide();
					$(this).parent().addClass("bloqueactivo").find('.datos:first').slideToggle();
				}
				return false;
			});
		}
	},
	
	/**
	 * Carga el menu por pestanas en los contenidos con el class "caja_pestanas"
	 */
	cargarPestanias: function() {
		$("#contenido .caja_pestanas").easytabs();
	}
}
/* Cookies del portal */
function cerrarCookies() {
	$("#cookies").fadeOut("slow");
}