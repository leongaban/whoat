// WHOAT CREDIENTIALS
//======================================================================
WHOAT.credentials = (function ($, w, undefined) {
    'use strict';
    
    function init() {
        
    };

    // FORGOT PASSWORD request new one
    var forgotPassword = function() {

        $('.close_error').unbind('click').bind("click", function() {
            $('#forgot_password_error').hide();
            $('#forgot_password').css('top', '30px');
        });

        $('#forgot-form').unbind('submit').bind("submit", function() {

	   		// Validate email
	   		//WHOAT.validation.validateForgotPasswordForm('#reset-form');

            var reset_email = $('#reset_email').val();
            var params = { 'reset_email':reset_email },
            responseMessage,
            theBtn = $('#btn_forgot_password');

            $(theBtn).css('cursor','auto');
            $(theBtn).css('background','#ccc');
            $(theBtn).text('submitting...');
            $(theBtn).attr("disabled", "true");

            function resetBtn() {
                $(theBtn).text('submit');
                $(theBtn).removeAttr("disabled");
                $(theBtn).css('background','#f58733');
                $(theBtn).css('cursor','pointer');
            };

            var displayMessage = function(type, message) {
                $('.forgot_password_error_msg').empty();
                $('.forgot_password_error_msg').text(responseMessage);

                if (type === "success") {
                    $('#forgot_password_error').css('background', '#006497');
                }

                $('#forgot_password').css('top', '-35px');
                $('#forgot_password_error').fadeIn('fast');
            }

            // Ajax Post to server
            WHOAT.networking.postToServerWithAjax('/forgot/password', params, function (response) {

		   		if (response.result == "success") {

                    if ( $('#forgot_password_error').is(':visible') ) {
		   				$('#forgot_password_error').hide();
		   			}

                    responseMessage = (response.message);
                    displayMessage('success', responseMessage);
                    resetBtn();

				} else if (response.result == "error") {
                    
                    responseMessage = (response.message);
                    displayMessage('error', responseMessage);
                    resetBtn();
                };

            });

            return false;
        });
    };

    var resetPassword = function() {

        $('.close_error').unbind('click').bind("click", function() {
            $('#forgot_password_error').hide();
            $('#reset_password').css('top', '30px');
        });

        var resetButton = function(theBtn) {
            $(theBtn).text('submit');
            $(theBtn).removeAttr("disabled");
            $(theBtn).css('cursor','pointer');
            $(theBtn).css('background','#f58733');
        }

        var displayMessage = function(type, message) {
            $('.forgot_password_error_msg').empty();
            $('.forgot_password_error_msg').text(message);
            $('#reset_password').css('top', '-35px');
            $('#forgot_password_error').css('height', '60px');
            $('#forgot_password_error').css('line-height', '28px');
            $('#forgot_password_error').css('padding-top', '10px');

            if (type === 'success') {

                $('#forgot_password_error').css('background', '#006497');
                $('#forgot_password_error').fadeIn('fast', function() {
                    setTimeout(function() {
                        window.location = '/login';
                    }, 4000);
                });

            } else {
                $('#forgot_password_error').fadeIn('fast');
            }
        }

        $('#reset_password').unbind('submit').bind("submit", function(event) {

            // disable submit
            var theBtn = $('#submit-to-reset');
                $(theBtn).css('cursor','auto');
                $(theBtn).css('background','#ccc');
                $(theBtn).text('Resetting Password...');
                $(theBtn).attr("disabled", "true");

            // Validate passwords
            if ((WHOAT.validation.validateForgotPasswordForm('#reset-form')) === true) {
                var reset_pass1 = $('#reset-password-input').val();
                var reset_pass2 = $('#reset-password-input2').val();
                var docUrl = document.URL,
                urlSplit = docUrl.split('hotlink='),
                hotlink = urlSplit[1],
                responseMessage;

                var params = {
                    'resetPass1':reset_pass1,
                    'resetPass2':reset_pass2,
                    'hotlink':hotlink
                }

                // Ajax Post to server
                WHOAT.networking.postToServerWithAjax('/resetpassword', params, function (response) {

                    if (response.result == "success") {
                        resetButton('#submit-to-reset');

                        if ( $('#forgot_password_error').is(':visible') ) {
                            $('#forgot_password_error').hide();
                        }

                        responseMessage = (response.message);
                        displayMessage('success', responseMessage);

                        $('#forgot_password_error').fadeIn('fast', function() {
                            setTimeout(function() {
                                window.location = '/login';
                            }, 4000);
                        });

                    } else if (response.result == "error") {
                        resetButton('#submit-to-reset');

                        if (response.message_expired) {
                            responseMessage = (response.message_expired);
                            displayMessage('error', responseMessage);

                        } else if (response.message) {
                            responseMessage = (response.message);
                            displayMessage('error', responseMessage);
                        }

                        $('#forgot_password_error').fadeIn('fast');
                    }

                });

            } else {
                // failed validation
                resetButton('#submit-to-reset');
            }

            return false;
        });

        return {
            displayMessage: displayMessage
        }
    };

    return {
        forgotPassword: forgotPassword,
        resetPassword : resetPassword,
        init : init
    };

}(jQuery, window));

$(document).ready(function () {
    WHOAT.credentials.init();
});