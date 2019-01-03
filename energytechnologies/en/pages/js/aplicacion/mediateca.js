function equalHeight(group) {
	tallest = 0;
	group.each(function() {
		thisHeight = $(this).height();
		if(thisHeight > tallest) {
			tallest = thisHeight;
		}
	});
	group.height(tallest);
}

$(document).ready(function() {
	if ($("#album")) {
		//control del alto de los titulos del album
		equalHeight($("#album .marco li span.cat"));
	    //over sobre el album
	    $("#album .marco li").hover(function(){
	    	$(this).find('span.capaover').fadeIn(700).css({cursor: "pointer"});
	        },function(){
	        	$(this).find('span.capaover').fadeOut(500);
	     });
	 }
	 if ($("#media")) {
		 // Activacion del colorbox
	     $("a[rel='gal']").colorbox({opacity: "0.5", maxWidth: "80%", maxHeight: "80%", current: "{current} / {total}"});
	     $("a.colorboxVideo").each(function() {
	    	 var id = $(this)[0].id;
	    	 if (id != null) {
	    		 var identificador = id.replace("video_", "");
	    		 $(this).colorbox({href: contextoPortal + "cargarFichaVideo.do?identificador=" + identificador, opacity: "0.5", iframe:true, innerWidth:640, innerHeight:480, scrolling: false});
	    	 }
	     });
	     //over sobre la imagen
	     $("#media .marco li span.capaover").css({display: "none"});
	     $("#media .marco li .thumb").hover(function() {
	    	 $(this).parent().addClass("active").find('span.capaover').fadeIn(700).css({cursor: "pointer"});
		     },function(){
		    	 $(this).parent().removeClass("active").find('span.capaover').fadeOut(500).css({display: "none"});
		     });
	 }
	 var tipo = $("#tipo").val();
	 if ((tipo == null) || (tipo == "0")) {
		 if ($(".caja_pestanas")) {
			 $(".caja_pestanas").easytabs();
		 }
	 }
	 $("#videos").removeClass("hide-with-script");
});