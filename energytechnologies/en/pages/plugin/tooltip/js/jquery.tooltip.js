/**
 *  jQuery Tooltip Plugin
 *  @requires jQuery v1.3 or 1.4
 *  http://intekhabrizvi.wordpress.com/
 *
 *  Copyright (c)  Intekhab A Rizvi (intekhabrizvi.wordpress.com)
 *  Licensed under GPL licenses:
 *  http://www.gnu.org/licenses/gpl.html
 * 
 *  Version: 1.1
 *  Dated : 21-Jan-2010
 *	24-Jan-2010 : V1.1 : Build tooltip without static file.
 */
(function($) {
	jQuery.fn.tooltip = function(options){
		 var defaults = {  
		    offsetX: 15,  //X Offset value
		    offsetY: 10,  //Y Offset value
		    bordercolor: '#000000', // tooltip border color
		    bgcolor: '#ffffff', //Tooltip background color
		    fontcolor : '#000000', //Tooltip Font color
		    fontsize : '11px', // Tooltip font size
		    folderurl : 'NULL', // Folder url, where the tooltip's content file is placed, needed with forward slash in the last (/), or can be use as http://www.youwebsitename.com/foldername/ also.
		    filetype: 'txt' // tooltip's content files type, can be use html, txt		
		   };  
	var options = $.extend(defaults, options);
	return this.each(function(){
	//Runtime div building to hold tooltip data, and make it hidden
			$tooltip = $('<div id="divToolTip"></div>');			
			$('body').append($tooltip);
			$tooltip.hide();
	//Runtime variable definations
		var element = this;
		var id = $(element).attr('title');
		if (id == '') {
			id = $(element).attr('alt');
		}
		var filename = options.folderurl + id + '.' + options.filetype;
		var dialog_id = '#divToolTip';
	//Tooltips main function
		$(this).hover(function(e){
				//to check whether the tooltips content files folder is defined or not
				if(options.folderurl != "NULL"){
					$(dialog_id).load(filename);

				}else
				{
					//$(dialog_id).html("Tooltip content file not found");
					$(dialog_id).html(id);
				}
				//enable div block
				$(dialog_id).attr('style', 'display:block');	
				//assign css value to div	
				$(dialog_id).css({
					'position' : 'absolute',
					'border' : '1px solid ' + options.bordercolor,
					'background-color' : options.bgcolor,
					'padding' : '5px 5px 5px 5px',
					'-moz-border-radius' : '5px 5px 5px 5px',
					'top' : e.pageY + options.offsetY,
					'left' : e.pageX + options.offsetX,
					'color' : options.fontcolor,
					'font-size' : options.fontsize	
				});
					},function(){
				// when mouse out remove all data from div and make it hidden
				$(dialog_id).html("");
				$(dialog_id).attr('style', 'display:none');

					}).mousemove(function(e){	
				// to make tooltip moveable with mouse			
				$(dialog_id).css({
					'position' : 'absolute',
					'border' : '1px solid ' + options.bordercolor,
					'background-color' : options.bgcolor,
					'padding' : '5px 5px 5px 5px',
					'-moz-border-radius' : '5px 5px 5px 5px',
					'top' : e.pageY + options.offsetY,
					'left' : e.pageX + options.offsetX,
					'color' : options.fontcolor
				});
					});
		});
	};
 })(jQuery);

//FINISH, simple isnt it ??
//if you like it or have any suggestions / comments , or you have some idea to make it better, 
//or you need some more fetures in it PLS PLS PLS let me know that at
//i.rizvi@hotmail.com
//Thank you for using my plugin
