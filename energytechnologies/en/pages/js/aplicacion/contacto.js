var contacto = {

	activarValidacionFormularioContacto: function() {
		if ($("#contactoForm")) {
			$("#contactoForm").submit(function(){
				return contacto.validarContactoForm(this);				
			});
		}
	},
	
	validarContactoForm: function(form) {
		var bValida = validateContactoForm(form);
		if (bValida) {
			if($("#consulta").val() == "" && !$("#subscripcionBoletin").prop('checked')){
				alert(validacionSuscripcionOConsulta);
				bValida = false;
			}
		}
		return bValida;
	}
}

$(document).ready(function(){
	contacto.activarValidacionFormularioContacto();	
});