// NOTIFICATION CREATOR
//======================================================================
WHOAT.notify = (function ($, w, undefined) {
    'use strict';

    var init = function() {};

	// Display & wire the Intro Request sent notification;
    var topNotify = function(type, message) {

    	if (type === 'success') {
    		$('.top_alert').css('background', '#006497');
    	} else if (type === 'error') {
    		$('.top_alert').css('background', '#e54119');
    	}

        $('.top_alert').hide();
        $('.top_alert').css('top', '-36px');
        $('.top_alert p').empty();
        $('.top_alert p').append(message);
        $('.top_alert').show();
        $('.top_alert').stop().animate({top: '0px'}, 300);

        $('.top_alert').unbind('click').bind('click', function() {
            var $div = $(this).closest("div");
            $(this).closest('p').empty();
            $('.top_alert').hide();
        });

        // slide up after 4 secs
        setTimeout(function () {
            $('.top_alert').animate({ top: -36, }, 300, function() {
                $('.top_alert p').empty();
                $('.top_alert').hide();
            });

        }, 4000);
    };

	return {
        topNotify : topNotify,
        init : init
    };

}(jQuery, window));

$(document).ready(function () {
    WHOAT.notify.init();
});