$(document).ready(function() {
      // no hacemos el slide para el explorer 6
      if($.browser.version!="6.0"){
    	  if($("#slider")){
        	  $("#slider").nivoSlider({
        		  effect: "boxRain",
        		  pauseTime: 8000,
        		  controlNav: false,
        		  directionNav: true
              });
    	  }
      }
   });