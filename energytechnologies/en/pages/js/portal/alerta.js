/** 
 * Sobrescritura de la funcion alert() nativa de Javascript
 * A diferencia de la función nativa, esta version trabaja de manera asincrona
 * Por lo tanto no es posible detener la ejecucion mientras se muestra la alerta.
 */ 
var oAlert = window.alert;

window.alert = function(message) {
    try {
    	$.alerts.okButton = texto.botonAlertaAceptar;
    	$.alerts.cancelButton = texto.botonAlertaCancelar;
    	$.alerts.overlayOpacity = 0.4;
    	$.alerts.overlayColor = "#000";
    	var listaMensajes = message.toString().split("\n");
    	var mensajeAlerta = "<ul>";
    	for(var i=0; i<listaMensajes.length; i++) {
    		mensajeAlerta += "<li>" + listaMensajes[i] + "</li>";
    	}
    	mensajeAlerta += "</ul>";
		jAlert(mensajeAlerta, texto.titleAlerta);
		$("#popup_overlay").bgiframe();
    } catch (e) {
        oAlert(message);
    }
}
