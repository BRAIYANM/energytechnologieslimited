var rrhhCarrusel = {
	activarCarrusel: function() {
		$("#mycarousel").jcarousel({
			scroll: 3
		});
		$(".jcarousel-skin-4 li").css('cursor', 'pointer').hover(function(){
			$(this).find('blockquote').removeClass('hide-with-script');
		},function(){
			$(this).find('blockquote').addClass('hide-with-script');
		});
	}
}

$(document).ready(function() {
	rrhhCarrusel.activarCarrusel();
});