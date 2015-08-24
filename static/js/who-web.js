/**
 * Created with Sublime Text 2.
 * User: leongaban
 * Date: 5/14/14
 * Time: 10:56 AM
 * For Who@ Website | Version 3
 */

// =========================================================================
//  WEBSITE methods and functions
// =========================================================================
WHOAT.web = (function ($, w, undefined) {
    'use strict';
    var pdf_open = false;
    
    function init() {
        var loc = location.pathname;
        wireUpViews(loc);

        $('.whoat_logo').unbind('click').bind('click', function () {
            WHOAT.networking.redirectToURL('/home');
        });
    }
    
    function wireUpViews(loc) {

        var tab_type;
        loc = loc.split("/");

        switch (loc[1]) {

            // WIRE DASHBOARD
            case 'home':
                wireHomePage();
                break;

            // WIRE LOGIN / REGISTER
            case 'login':
                tab_type = $('.register_box').data('tab-type');
                wireLoginRegister(tab_type);
                break;

            case 'register':
                tab_type = $('.register_box').data('tab-type');
                wireLoginRegister(tab_type);
                break;

            case 'about':
                wireHomePage();
                break;

            case 'faq':
                wireHomePage();
                wireFAQ();
                break;

            // FORGOT PASSWORD
            case 'forgot':
                WHOAT.credentials.forgotPassword();
                break;

            // RESET PASSWORD
            case 'resetpassword':
                WHOAT.credentials.resetPassword();
                break;
        }
    }

    // Wire's the top nav
    var wireHomePage = function() {

        var timeoutHandle;

        // Open login dropdown
        $('#open_login').unbind('click').bind('click', function () {
            $('.home_login_box').slideToggle('fast');
        });

        // Close login dropdown on header bg click
        $('.gradient').unbind('click').bind('click', function() {
            $('.home_login_box').fadeOut('fast');
            window.clearTimeout(timeoutHandle);

            if (pdf_open === true) {
                $('.pdf_menu').css('left', '0px');
                $('.gradient').css('margin-top', '-71px');
                $('#pdf_dropdown').hide();
                pdf_open = false;
            }
        });

        $('#getting_started_guide').unbind('click').bind('click', function() {
            if (pdf_open === false) {
                $('#pdf_dropdown').fadeIn('fast');
                pdf_open = true;

            } else {
                $('#pdf_dropdown').hide();
                pdf_open = false;
            }
        });

        function resetHomeLoginErrors() {
            $('.error_home_username span').text(" ");
            $('.error_home_username').hide();
            $('.error_home_password span').text(" ");
            $('.error_home_password').hide();
        }

        // LOGIN FORM SUBMIT
        // ###############################################################
        $('#home_login').unbind('submit').bind("submit", function() {

            // WHOAT.validation.validateLoginForm('#home_login');
            resetHomeLoginErrors();

            var params = { username : '', password : '' };
            var theBtn = $('#home_login_submit');
            $(theBtn).css('cursor','auto');
            $(theBtn).css('background','#004e84');
            $(theBtn).css('font-size','13px');
            $(theBtn).text('logging...');
            $(theBtn).attr("disabled", "true");

            var pathname = window.location.pathname,
            staticLink = window.location.href.split('?'),  // Get path before Hotlink
            bounce = staticLink[1]; 

            params.username = $('#home_login_email').val();
            params.password = $('#home_login_password').val();

            WHOAT.networking.postToServerWithAjax('/login', params, function (response) {

                if (response.result === 'success') {

                    $('#home_login_email').css('border', '2px solid #E8E8E8');
                    $('#home_login_password').css('border', '2px solid #E8E8E8');
                    WHOAT.networking.redirectToURL('/dashboard');

                // There was an error:
                } else if (response.result === 'error') {

                    $(theBtn).text('register');
                    $(theBtn).removeAttr("disabled");
                    $(theBtn).css('font-size','16px');
                    $(theBtn).text('login');
                    $(theBtn).css('background','#006497');
                    $(theBtn).css('cursor','pointer');

                    var errorMessage = (response.message);

                    if (errorMessage === "Username not registered") {
                        $('.error_home_username span').text(errorMessage);
                        $('.error_home_username').show();

                    } else if (errorMessage === "Invalid password") {
                        $('.error_home_password span').text(errorMessage);
                        $('.error_home_password').show();

                    } else {
                        $('.error_home_username span').text(errorMessage);
                        $('.error_home_username').show();
                    }
                }
            });

            return false;
        });

        // Click to hide error messages:
        $('.close_errs').unbind('click').bind('click', function() {
            resetHomeLoginErrors();
        });

        // Input focus - hide error messages:
        $( ".home_login_input" ).focus(function() {
            resetHomeLoginErrors();
        });

        // PAGE NAVIGATION
        // ###############################################################

        // Go to Intro Section
        $('.learn_more').unbind('click').bind('click', function () {
            WHOAT.analytics.trackClickEvent("Learn More");
            $("html, body").animate({ scrollTop: $('#intro_app_area').offset().top }, 1000);
        });

        // Go to App store
        $('.go_appstore').unbind('click').bind('click', function () {
            var el = $(this),
            id = el.data('id');
            
            WHOAT.analytics.trackClickEvent("iPhone App Store");
            WHOAT.networking.redirectToURL("https://itunes.apple.com/us/app/who-intro/id"+id, "_blank");
        });

        // Go to Name Game
        $('.arrow_to_namegame').unbind('click').bind('click', function () {
            $("html, body").animate({ scrollTop: $('#namegame_area').offset().top }, 1000);
        });

        // PopEasy
        // -------------------------------------
        var modalObj = $('.see_it_works');
        if (modalObj.length && modalObj.modal) {
            modalObj.modal({
                trigger: '.see_it_works',
                olay:'div.overlay',
                modals:'div.video_holder',
                animationEffect: 'fadeIn',
                animationSpeed: 400,
                moveModalSpeed: 'slow',
                background: '000',
                opacity: 0.8,
                openOnLoad: false,
                docClose: true,
                closeByEscape: true,
                moveOnScroll: true,
                resizeWindow: true,
                video: 'https://player.vimeo.com/video/84403777?autoplay=1',
                // video: 'https://www.youtube.com/watch?v=4EUMGtLWf8U?autoplay=true',
                videoClass:'video',
                close:'.big_x'
            });
        }
    };

    // For future About Page functions
    var wireAboutPage = function() {

    };

    var wireLoginRegister = function(tab_type) {

        $('.login_unselected').unbind('click').bind('click', function() {
            switchTabs('login');
        });

        $('.register_unselected').unbind('click').bind('click', function() {
            switchTabs('register');
        });

        var switchTabs = function(tab) {

            if (tab === 'register') {
                $('#login_form').hide();
                $('#register_form').show();
                $('.on_login_tab').hide();
                $('.on_register_tab').show();

            } else if (tab === 'login') {
                $('#register_form').hide();
                $('#login_form').show();
                $('.on_login_tab').show();
                $('.on_register_tab').hide();
            }
        };

        switchTabs(tab_type);

        // LOGIN FORM SUBMIT
        $('#login_form').unbind('submit').bind("submit", function() {

            // WHOAT.validation.validateLoginForm('/login','#login_form');
            // WHOAT.validation.validateLoginForm('#login_form');

            var params = { username : '', password : '' };
            var theBtn = $('#login_page_submit');
            $(theBtn).css('cursor','auto');
            $(theBtn).css('background','#ccc');
            $(theBtn).text('logging...');
            $(theBtn).attr("disabled", "true");

            var staticLink = window.location.href.split('?'),
            bounce = staticLink[1];

            if (bounce !== undefined) { 
                if (bounce.toLowerCase().indexOf("bounce=") >= 0) {
                    bounce = bounce.replace('bounce=', '');
                    params.bounce = bounce;
                }          
            }

            params.username = $('#login_input_email').val();
            params.password = $('#login_input_password').val();

            WHOAT.networking.postToServerWithAjax('/login', params, function (response) {

                if (response.result === 'success') {
                    WHOAT.networking.redirectToURL('/dashboard');

                } else if (response.result === 'bounce') {
                    WHOAT.networking.redirectToURL(response.message);

                } else if (response.result === 'error') {

                    $(theBtn).text('register');
                    $(theBtn).removeAttr("disabled");
                    $(theBtn).text('login');
                    $(theBtn).css('background','#f58733');
                    $(theBtn).css('cursor','pointer');

                    var errorMessage = (response.message);

                    if (errorMessage === "Username not registered") {
                        
                    } else if (errorMessage === "Invalid password") {
                        $('.error_password_span').text(errorMessage);
                        $('#error_login_password').show();

                    } else {
                        $('.error_email_span').text(errorMessage);
                        $('#error_login_email').show();
                    }
                }
            });

            return false;
        });

        // REGISTER FORM SUBMIT
        $('#register_form').unbind('submit').bind("submit", function(event) {

            // WHOAT.validation.validateRegisterForm('/register','#register_form');
            WHOAT.validation.validateRegisterForm('#register_form');

            var theBtn = $('#the_register_button');
            $(theBtn).css('cursor','auto');
            $(theBtn).css('background','#ccc');
            $(theBtn).text('registering...');
            $(theBtn).attr("disabled", "true");

            var params = {
                username  : '',
                firstName : '',
                lastName  : '', 
                password  : '',
                register_source : '',
                register_original : ''
            };

            params.username          = $('#register_email').val();
            params.firstName         = $('#register_firstname').val();
            params.lastName          = $('#register_lastname').val();
            params.password          = $('#register_password').val();
            params.register_original = $('#register_original').val();
            params.register_source   = $('#register_source').val();

            WHOAT.networking.postToServerWithAjax('/register', params, function (response) {

                if (response.result === 'success') {
                    $(theBtn).text('register');
                    $(theBtn).css('background','#f58733');

                    if (params.register_original === undefined || params.register_original === '') {
                        window.location = '/register/success';
                    } else {
                        window.location = '/auto/verify';
                    }

                } else if (response.result === 'error') {
                    $(theBtn).text('register');
                    $(theBtn).removeAttr("disabled");
                    $(theBtn).css('background','#f58733');
                    $(theBtn).css('cursor','pointer');

                    $('#register_input_error').fadeIn('fast', function() {

                        var showingError = true,
                        register_input_error = $('#register_input_error');

                        $('#input_error_message').text(response.message);
                        register_input_error.show();

                        register_input_error.click(function () {
                            $('#register_input_error').hide();
                            showingError = false;
                        });

                        if (showingError) {
                            setTimeout(function () {
                                $(this).fadeOut('slow', function() {
                                    showingError = false;
                                });
                            }, 5000);
                        }
                        
                    });
                }
            });

            return false;
        });

        // Close errors
        $('.x').unbind('click').bind('click', function() {
            var x = $(this),
                tip_error = x.parent("div").attr("id");
                x.parent("div").hide();

            if (tip_error === 'error_login_email') {
                $('#login_input_email').css('border', '2px solid #E8E8E8');
            } else if (tip_error === 'error_login_password') {
                $('#password').css('border', '2px solid #E8E8E8');
            }
        });
    }

    var wireFAQ = function() {
        $('#faq_page .open_guides').unbind('click').bind('click', function() {
            $('#faq_page').animate({
                scrollTop: $('#header').offset().top
            }, 500);

            $('.pdf_menu').css('left', '79px');
            $('#pdf_dropdown').fadeIn('fast');
            pdf_open = true;
        });
    }

    return {
        init : init,
        wireHomePage : wireHomePage,
        wireAboutPage : wireAboutPage,
        wireLoginRegister : wireLoginRegister,
        wireFAQ : wireFAQ
    };

}(jQuery, window));

$(document).ready(function () {
    WHOAT.web.init();
});