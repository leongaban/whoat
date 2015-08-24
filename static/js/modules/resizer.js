
// This function resizes the sidebar and should be the last function
$(document).ready(function () {
	
	function theResizer() {

		var currHeight = $(window).height() - ($("#top_bar").height() + $('footer').height());
		$('#sidebar, #content').css('height', currHeight);
		$('#sidebar, #content').css('position', 'relative');

		$(window).resize(function() {
			// Get new height
			var currH = $(window).height() - ($("#top_bar").height() + $('footer').height());
			$('#sidebar, #content').css('height', currH);
		});
	}

	theResizer();

	// For Responsive Design testing:
	// ------------------------------
	// var w = $(window);
	// w.resize(function() { var ww = w.width(); var wh = w.height();
	// 	console.log(wh);
	// });
});