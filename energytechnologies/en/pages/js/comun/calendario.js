/**
 * Inicializa los popup de calendarios
 */
$(function() {
	$.datepicker.setDefaults(
		$.extend({
			showMonthAfterYear: false,
			duration: 'fast', 
			showOn: 'button', 
			buttonBefore: false, 
			buttonText: texto.altPopupCalendario, 
			buttonImage: contextoPortal+'pages/img/'+codigoIdioma+'/icono/calendario.gif', 
			buttonImageOnly: true,
			gotoCurrent: true,
			hideIfNoPrevNext: true,
			mandatory: false,
			showStatus: false,
			closeAtTop: false,
			beforeShow: function(input) {
				if (jQuery.browser.msie) {
					$(".ui-datepicker-cover").css("filter", "mask()");
				} 
			}
		}, $.datepicker.regional[codigoIdioma]));
});

/**
 * Objeto calendario
 */
var calendario = {
	/**
	 * Vincula un calendario datepicker con un campo de texto
	 *
	 * @param campoOrigen Campo de texto al que vincular el calendario
	 * @param tipo Puede ser "desde", "hasta", "unica"
	 * @param campoDestino Se utiliza cuando "tipo" es "desde" o "hasta" para vincular un campo con otro
	 * @param minFecha Establece la fecha minima permitida para el calendario
	 * @param maxFecha Establece la fecha maxima permitida para el calendario
	 */
	inicializar: function(campoOrigen, tipo, campoDestino, minFecha, maxFecha){		
		$(campoOrigen).datepicker({
			minDate: minFecha || null,
			maxDate: maxFecha || null,
			onSelect: function(dateText, inst) {
				if (tipo == "desde") { 
					var desde = $(campoOrigen).datepicker('getDate');
					$(campoDestino).datepicker('option', 'minDate', desde || minFecha);
				} 
				if (tipo == "hasta") { 
					var hasta = $(campoOrigen).datepicker('getDate');
					$(campoDestino).datepicker('option', 'maxDate', hasta || maxFecha);
				} 
			}, 
			beforeShow: function(dateText, inst) {	
				if ($.browser.msie && parseInt($.browser.version,10) < 7) { // fix IE < 7 select problems
					$("select").hide();
				}
				if (tipo == "desde") { 					
					$(campoOrigen).datepicker('option', 'maxDate', $(campoDestino).datepicker('getDate') || null);
				}
				if (tipo == "hasta") { 
					$(campoOrigen).datepicker('option', 'minDate', $(campoDestino).datepicker('getDate') || null);
				}
			},
			onClose: function(dateText, inst) {
				if ($.browser.msie && parseInt($.browser.version,10) < 7) { // fix IE < 7 select problems
					$("select").show();
				}
			}	
		});
	}

}