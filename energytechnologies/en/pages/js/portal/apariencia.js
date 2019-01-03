$(document).ready(function() {
	//$(".botones input").css({"-moz-border-radius": "5px", "-webkit-border-radius": "5px", "border-radius": "5px"});
	$(".textodest").css({"-moz-border-radius": "5px", "-webkit-border-radius": "5px", "border-radius": "5px"});

	if ($(".banners_home").length!=0){
		$('.banners_home ul li').hover(function () {
			$(this).toggleClass( "on" );
		});
	}
	
	if ($("#a_proyecto_buscador").length!=0){
		$("#a_proyecto_buscador h2").css('cursor', 'pointer');
		$("#a_proyecto_buscador h2").next('form').hide();
		
		$("#a_proyecto_buscador h2").click(function () {
			$(this).toggleClass('activo');
			$(this).next('form').slideToggle('slow');
		});
	}
	
	if ($(".caja_pestanas.tipo2")) {
		 $('.caja_pestanas.tipo2 .caja-ancla a').each(function() {
			$(this).parent().parent('div').attr('id', $(this).attr('name'));
			$(this).parent().remove();
		 });
		 $(".caja_pestanas.tipo2").easytabs();
	 }

});