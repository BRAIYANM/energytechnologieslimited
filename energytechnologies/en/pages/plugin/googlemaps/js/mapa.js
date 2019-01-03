var mapa = {
	marcadorPosicion: null,
	mapaGoogle: null,
	estilosMarcadores: null,
	infoBox: new InfoBox(),
	mensajesError: {
		timeout: 'Tiempo de espera agotado',
		permissionDenied: 'Permiso denegado al intentar obtener los datos',
		positionUnavailable: 'Posición no disponible',
		unknown: 'Error desconocido: '
	},
	
	/**
	 * Funcion que se encarga de crear el mapa de Google
	 * 
	 * @param capa Nombre de la capa donde se cargara el mapa
	 * @param latitud Coordenada de latitud para el mapa
	 * @param longitud Coordenada de longitud para el mapa
	 * @param zoom Nivel de zoom del mapa
	 * @param alto Alto de la capa contenedora del mapa
	 * @param ancho Ancho de la capa contenedora del mapa
	 * @param geolocalizacion Booleano para indicar si se debe geolocalizar 
	 * la posición del usuario (en navegadores que lo permitan), en ese caso el parametro "sensor" debe ser true
	 */
	cargarMapa: function(capa, latitud, longitud, zoom, alto, ancho, geolocalizacion) {
		var options = {
			zoom: zoom, 
			center: new google.maps.LatLng(latitud, longitud), 
			mapTypeId: google.maps.MapTypeId.ROADMAP, 
			backgroundColor: '#ffffff', 
			draggableCursor: 'hand', 
			draggingCursor: 'hand', 
			mapTypeControl: true, 
			mapTypeControlOptions: {
				style: google.maps.MapTypeControlStyle.DROPDOWN_MENU, 
				position: google.maps.ControlPosition.TOP_RIGHT, 
				mapTypeIds: [
					google.maps.MapTypeId.ROADMAP, 
					google.maps.MapTypeId.SATELLITE
				] 	
			}, 
			streetViewControl: true, 
			navigationControl: true, 
			navigationControlOptions: {             
				position: google.maps.ControlPosition.TOP_LEFT, 
				style: google.maps.NavigationControlStyle.ZOOM_PAN
			},            		
			scaleControl: true, 
			scaleControlOptions: {             
				position: google.maps.ControlPosition.BOTTOM_LEFT, 
				style: google.maps.ScaleControlStyle.DEFAULT
			}		
		};
		$("#"+capa).css({"height": this._isNumber(alto) ? alto + "px" : alto, "width": this._isNumber(ancho) ? ancho + "px" : ancho});
		mapa.mapaGoogle = new google.maps.Map(document.getElementById(capa), options);
		if (geolocalizacion) {
			var useragent = navigator.userAgent;
		    $("head").append("<link>");
		    css = $("head").children(":last");
		    css.attr({
		      rel:  "stylesheet",
		      type: "text/css",
		      media: "screen, projection",
		      href: contextoPortal + "pages/plugin/googlemaps/css/mapa.css"
		    });		    
			if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 ) {
				navigator.geolocation.watchPosition(this._mostrarLocalizacion, this._manejarError);
			} else if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(this._mostrarLocalizacion, this._manejarError);
			}
		}
		return mapa.mapaGoogle;
	},

	/**
	 * Funcion que se encarga de cambiar las opciones de configuracion del mapa
	 * 
	 * @param mapaGoole Objeto del mapa de Google
	 * @param opciones Objeto JSON con las opciones del mapa
	 */
	cambiarOpciones: function(mapaGoogle, opciones) {
		mapaGoogle.setOptions(opciones);
	},
	
	/**
	 * Funcion que se encarga de crear un marcador para un mapa de Google
	 * 
	 * En la dirección: http://gmaps-samples.googlecode.com/svn/trunk/markers/{color}/marker{n}.png
	 * se pueden obtener diferentes tipos de marcadores, donde {color} puede ser: blue, green, orange, pink y red. 
	 * {n} puede ser un número entre el 1 y el 99 y para los que no se requiere número se puede usar blank.png
	 * 
	 * @param mapaGoole Objeto del mapa de Google donde crear el marcador
	 * @param latitud Coordenada de latitud para el marcador
	 * @param longitud Coordenada de longitud para el marcador
	 * @param info Objeto que contiene el titulo y el contenido del marcador {titulo, contenido}
	 * @param imagen Objeto que contiene el icono y la sombra del marcador {icono, sombra}
	 */
	crearMarcador: function(mapaGoogle, latitud, longitud, info, imagen) {
		var marker = null;
		if (mapaGoogle != null) {
			marker = new google.maps.Marker({         
				position: new google.maps.LatLng(latitud, longitud), 
				map: mapaGoogle, 
				draggable: false,
				title: (info && info.titulo) ? info.titulo : '',
				icon: (imagen && imagen.icono) ? imagen.icono : null,
				shape: (imagen && imagen.sombra) ? imagen.sombra : null
			});
			if (info && info.contenido) {
				google.maps.event.addListener(marker, 'click', function(){
					mapa.infoBox.close();
					var cajaContenido = document.createElement("div");
					cajaContenido.className = "contenedorBocata";
					cajaContenido.innerHTML = info.contenido;
					var optionsInfoBox = {
							content: cajaContenido,
							alignBottom: false,
							disableAutoPan: false,
							maxWidth: 0,
							zIndex: null,
							boxClass: "infoBox",
							boxStyle: { 
							  opacity: 0.95
							},
							closeBoxMargin: "4px 2px 2px 2px",
							closeBoxURL: contextoPortal + "pages/img/css/icono/cerrarBocata.gif",
							infoBoxClearance: new google.maps.Size(1, 1),
							isHidden: false,
							pane: "floatPane",
							enableEventPropagation: false
						};
					mapa.infoBox.setOptions(optionsInfoBox);
					mapa.infoBox.open(mapaGoogle, this);
				});
			}
		}
		return marker;
	},

	/**
	 * Funcion que se encarga de cambiar las opciones del marcador
	 * 
	 * @param marcador Marcador de Google Maps
	 * @param opciones Objeto JSON con las opciones del marcador
	 */
	cambiarOpcionesMarcador: function(marcador, opciones) {
		marcador.setOptions(opciones);
	},
	
	/**
	 * Funcion que se encarga de centrar el mapa de Google en un marcador
	 * 
	 * @param mapaGoole Objeto del mapa de Google donde crear el marcador
	 * @param marcador Punto a centrar
	 */
	centrarMarcador: function(mapaGoogle, marcador) {
		mapaGoogle.setOptions({
			center: marcador.getPosition()
		});
	},

	/**
	 * Funcion para crear un markerImage que se utiliza para las imagenes y las sombras
	 * 
	 * Se pueden crear iconos en esta url: http://www.powerhut.co.uk/googlemaps/custom_markers.php
	 * 
	 * @param url La direccion donde esta la imagen/sombra del icono
	 * @param tamanio Objeto que contiene las dimensiones del icono {ancho, alto}
	 * @param ancla Objeto que contiene el punto de anclaje del icono {x, y}
	 */
	crearIcono: function(url, tamanio, ancla) {
	    var image = new google.maps.MarkerImage(
	    		url,
	            new google.maps.Size(tamanio.ancho, tamanio.alto),
	            new google.maps.Point(0,0),
	            new google.maps.Point(ancla.x, ancla.y)
	        );
	    return image;
	},
	
	/**
	 * Funcion para ajustar el mapa a todos los marcadores disponibles y que sean todos visibles
	 * 
	 * @param mapaGoole Objeto del mapa de Google a ajustar
	 * @param marcadores Array que contiene todos los marcadores del mapa
	 */
	ajustarMarcadores: function(mapaGoogle, marcadores) {
		var limits = new google.maps.LatLngBounds();
	    for(var i in marcadores){
	        limits.extend(marcadores[i].getPosition());
	    }
	    mapaGoogle.fitBounds(limits);
	},
	
	/**
	 * Funcion para agrupar todos los marcadores disponibles usando la libreria MarkerClusterer
	 * 
	 * La agrupacion se hace de acuerdo a esta escala:
	 * Azul 2-9
	 * Amarillo 10-99
	 * Rojo 100-999
	 * Violeta 1.000-9.999
	 * Violeta oscuro +10.000
	 * 
	 * @param mapaGoole Objeto del mapa de Google
	 * @param marcadores Array que contiene todos los marcadores del mapa a agrupar
	 * @param estilo Numero que identifica el estilo personalizado a utilizar para los marcadores agrupados, si existen
	 * @param numeroMinimo Numero minimo de marcadores a partir del cual realizar la agrupacion
	 */
	agruparMarcadores: function(mapaGoogle, marcadores, estilo) {
		 var markerclusterer = new MarkerClusterer(mapaGoogle, marcadores, {
	        gridSize: 60,
	        maxZoom: 11,
	        zoomOnClick: true,
	        minimumClusterSize: 4,
	        averageCenter: true,
	        styles: (mapa.estilosMarcadores == undefined) ? null : mapa.estilosMarcadores[estilo]
		 });
		 return markerclusterer;
	},

	/**
	 * Funcion para crear un nuevo estilo de agrupacion de marcadores para sobrescribir los iconos por defecto
	 * 
	 * @param estilo Objeto con las propiedades del estilo, un estilo tiene las siguientes propiedades:
	 *   'url': (string) La url de la imagen
	 *   'height': (number) El alto de la imagen
	 *   'width': (number) El ancho de la imagen
	 *   'anchor': (Array) Las coordenadas para la etiqueta de texto
	 *   'textColor': (string) El color del texto
	 *   'textSize': (number) El tamanio del texto
	 */
	anadirEstiloMarcadores: function(estilo) {
		if (mapa.estilosMarcadores == undefined) {
			mapa.estilosMarcadores = new Array();
		}
		mapa.estilosMarcadores.push(estilo);
	},

	/**
	 * Funcion para crear una vista de panorama con Street View a partir de unas coordenadas
	 * 
	 * @param capaPanorama Nombre de la capa donde se generara la vista del panorama
	 * @param latitud Coordenada de latitud para el panorama
	 * @param longitud Coordenada de longitud para el panorama
	 * @param funcionError Funcion que se lanzara en el caso de que no exista panorama para las coordenadas dadas
	 */
	streetView: function(capaPanorama, latitud, longitud, funcionError) {
	    var cliente = new google.maps.StreetViewService();
	    var localizacion = new google.maps.LatLng(latitud, longitud);
	    cliente.getPanoramaByLocation(localizacion, 50, function(result, status) {
	        if (status == google.maps.StreetViewStatus.OK) {
	            var panoramaOptions = {
	                position: localizacion,
	                pov: {
	                    heading: 34,
	                    pitch: 10,
	                    zoom: 1
	                }
	            };
	            panorama = new google.maps.StreetViewPanorama(document.getElementById(capaPanorama), panoramaOptions);
	        } else {
	        	funcionError();
	        }
	    });
	},
	
	/**
	 * Funcion para calcular la ruta entre dos puntos
	 * 
	 * @param mapaGoole Objeto del mapa de Google a ajustar
	 * @param capaDirecciones Nombre de la capa donde se generara el listado de puntos de la ruta (opcional)
	 * @param inicio Direccion del punto inicial (puede ser textual o coordenadas)
	 * @param fin Direccion del punto final (puede ser textual o coordenadas)
	 * @param funcionError Funcion que se lanzara en el caso de que no exista ruta para las coordenadas dadas
	 */
	calcularRuta: function(mapaGoogle, capaDirecciones, inicio, fin, funcionError) {
		var directionsDisplay = new google.maps.DirectionsRenderer();
		var directionsService = new google.maps.DirectionsService()
		directionsDisplay.setMap(mapaGoogle);
		if (capaDirecciones != null) {
			directionsDisplay.setPanel(document.getElementById(capaDirecciones));
		}
	    var request = {
	        origin: inicio, 
	        destination: fin,
	        travelMode: google.maps.DirectionsTravelMode.DRIVING
	    };
	    directionsService.route(request, function(response, status) {
	      if (status == google.maps.DirectionsStatus.OK) {
	    	  directionsDisplay.setDirections(response);
	      } else {
	    	  funcionError();
	      }
	    });	
	},
	
	/**
	 * Funcion para incluir un listener que permita posicionar un marcador en un mapa mediante un evento de "click"
	 * 
	 * @param mapaGoole Objeto del mapa de Google a utilizar
	 * @param marcador El marcador a posicionar
	 */
	listenerPosicionarMarcador: function(mapaGoogle, marcador) {
		google.maps.event.addListener(mapaGoogle, 'click', function(event) {
			if (marcador != null) {
				mapa.cambiarOpcionesMarcador(marcador, {
					position: event.latLng
				});
			} else {
				marcador = mapa.crearMarcador(mapaGoogle, event.latLng.lat(), event.latLng.lng(), null, null);
			}
	    });
	},
	
	/**
	 * Funcion que devuelve un punto de localizacion a partir de unas coordenadas dadas
	 * 
	 * @param latitud Coordenada de latitud para el punto
	 * @param longitud Coordenada de longitud para el punto
	 */
	obtenerPunto: function(latitud, longitud) {
		return new google.maps.LatLng(latitud, longitud);
	},
	
	
	/**
	 * Funcion interna para actualizar la posicion actual del usuario
	 * 
	 * @param position Objeto con las coordenadas de la posicion actual
	 */
	_mostrarLocalizacion: function(position) {
		var miLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		if (!mapa.marcadorPosicion) {
			var image = new google.maps.MarkerImage(contextoPortal + 'pages/plugin/googlemaps/img/blue_dot_circle.png',
				new google.maps.Size(38, 38),
				new google.maps.Point(0, 0),
				new google.maps.Point(19, 19)
			);
			mapa.marcadorPosicion = new google.maps.Marker({
				position: miLatLng,
				map: mapa.mapaGoogle,
				icon: image,
				flat: true
			});
		} else {
			mapa.marcadorPosicion.setPosition(miLatLng);
		}
		mapa.mapaGoogle.setCenter(miLatLng);
	},

	/**
	 * Funcion interna para manejar los distintos mensajes de error al mostrar la localizacion del usuario
	 * 
	 * @param error Variable con el codigo de error generado
	 */
	_manejarError: function(error) {
		switch (error.code){
			case error.TIMEOUT:
				alert(this.mensajesError.timeout);
				break;
			case error.PERMISSION_DENIED:
				alert(this.mensajesError.permissionDenied);
				break;
			case error.POSITION_UNAVAILABLE:
				alert(this.mensajesError.positionUnavailable);
				break;
			default:
				alert(this.mensajesError.unknown + error.code);
				break;
		}
	},
	
	/**
	 * Funcion interna para comprobar si una cadena es un numero
	 * 
	 * @param n Variable con el valor a comprobar
	 */
	_isNumber: function(n) { 
	    return !isNaN(parseFloat(n)) && isFinite(n); ; 
	} 	
	
}
