$(document).ready(function(){
	compartir.botonTwittear();
	compartir.botonFBMeGusta();
	compartir.botonLinkedin();
});

var compartir = {
	botonTwittear: function(){
		var ruta = location.href;
		if (ruta != undefined){
			var textoTweet = '';
			textoTweet = $('#recurso h3:first').text();
			if (textoTweet == '') textoTweet = $('#pactivo h2:first').text();
			if (textoTweet.length>100){textoTweet = textoTweet.substring(0,97)+'...';}
			$('.compartir').before('<li class="twitter"></li>');		
			$('.twitter').html('<a href="http://twitter.com/share" class="twitter-share-button" data-via="'+usuarioTwitter+'" data-text="'+textoTweet+'" data-url="" data-count="horizontal" data-lang="'+codigoIdioma+'">'+texto.twitter+'</a>');
			$.getScript("http://platform.twitter.com/widgets.js");
		}
	},	
	botonFBMeGusta: function(){
		var ruta = location.href;
		if(ruta != undefined){
			$('.compartir').before('<li class="facebook"></li>');
			$('.facebook').html('<iframe allowtransparency="true" class="facebooklike" src="http://www.facebook.com/plugins/like.php?locale='+codigoDobleIdioma+'&amp;href='+encodeURIComponent(ruta)+'&amp;layout=button_count&amp;show_faces=false&amp;width=100&amp;action=recommend&amp;colorscheme=light&amp;height=21" scrolling="no" frameborder="0"></iframe>');
		}
	},
	botonLinkedin: function(){
		var ruta = location.href;
		if (ruta != undefined){
			$('.compartir').before('<li class="linkedin"></li>');
			$('.linkedin').html('<script type="in/share" data-url="'+encodeURIComponent(ruta)+'" data-counter="right" data-title="Compartir"></script>');
			$.getScript("http://platform.linkedin.com/in.js");
		}
	}	
}