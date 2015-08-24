// =========================================================================
//  FTUE MODULE
// =========================================================================
WHOAT.ftue = (function ($, w, undefined) {
    'use strict';

    var tourPosition = 1, gotoNumber = 0, snarfed = false, dark = '';

    var setSnarf = function(bool) {
        if (bool === 'true') { snarfed = true; }
    }

    // Request for White FTUE template
    var loadWhiteFtue = function (status) {
        status = status || '';
        WHOAT.networking.getToServerWithAjax('/white/ftue', null, function (response) {
            if (response) { wireWhiteFtue(response, status); }
        });
    };

    // Place response on page and wire tour
    function wireWhiteFtue(response, status) {
        $('#white_ftue').append(response);
        $('#white_ftue').show();
        wireFTUEtour(status);
    }

    // FTUE section 1
    var wireFTUEtour = function (status) {
        status = status || '';

        var showDark = function(string) {
            dark = string;
        }

    	// Circle Buttons
        $('.tour_nav_circle').unbind('click').bind('click', function (event) {
            var id = this.id;
            
            switch (id) {
                // Hand shake
                case 'ftue_btn_1':
                    gotoNumber = 1;
                    break;

                // Make Intros
                case 'ftue_btn_2':
                    gotoNumber = 2;
                    break;

                // Glass Bubbles
                case 'ftue_btn_3':
                    gotoNumber = 3;
                    break;

                // Security Lock
                case 'ftue_btn_4':
                    gotoNumber = 4;
                    break;

                // Video
                case 'ftue_btn_5':
                    gotoNumber = 5;
                    break;

                // Snarf: Exchange
                case 'ftue_btn_6':
                    gotoNumber = 6;
                    break;

                // Snarf: Gmail
                case 'ftue_btn_7':
                    gotoNumber = 7;
                    break;

                // Expand
                case 'ftue_btn_8':
                    gotoNumber = 8;
                    break;

                // Alerts
                case 'ftue_btn_9':
                    gotoNumber = 9;
                    break;

                // App Cloud / Fail
                case 'ftue_btn_10':
                    gotoNumber = 10;
                    break;
            }
            
            animateFrames(gotoNumber);
        });

        // Prev Button
        $('.ftue_prev').unbind('click').bind('click', function (event) {
            if (tourPosition > 1) {
                gotoNumber = (tourPosition - 1);
                animateFrames(gotoNumber);
            }
        });

        // Next Button
        $('.ftue_next').unbind('click').bind('click', function (event) {
            if (tourPosition < 10) {
                gotoNumber = (tourPosition + 1);
                animateFrames(gotoNumber);
            }
        });

        // Special buttons
        // ---------------
        $('.small_gmail_icon').unbind('click').bind('click', function (event) {
            tourPosition = 7;
            animateFrames(7);
        });

        $('.small_exchange_icon').unbind('click').bind('click', function (event) {
            tourPosition = 6;
            animateFrames(6);
        });

        // Go back to Exchange Snarf:
        $('.back_to_exchange').unbind('click').bind('click', function (event) {
            animateFrames(6);
        });

        // Go back to Gmail Snarf:
        $('.back_to_gmail').unbind('click').bind('click', function (event) {
            animateFrames(7);
        });

        // Go to Apple Store:
        $('.apple_store_logo').unbind('click').bind('click', function (event) {
            WHOAT.networking.redirectToURL('https://itunes.apple.com/us/app/who-intro/id777717885', '_blank');
        });

        // Show input for number to recieve iPhone app:
        $('.text_iphone_app').unbind('click').bind('click', function (event) {
            $('.text_iphone_app').hide();
            $('#get_text_iphone_app').show();
        });

        // Request to get iPhone app:
        $('#text_request_app').unbind('submit').bind("submit", function(event) {
            var params = { text_app_num : '' };
            params.text_app_num = $('#text_app_num').val();

            WHOAT.networking.postToServerWithAjax('/send_sms_ios', params, function (response) {
                $('#get_text_iphone_app').hide();
                if (response.message === "success") {
                } else if (response.message === "error") {
                    $('.ios_app_sent').text("Error :( Try again later");
                }
                $('.ios_app_sent').show();
            });
            return false;
        });

        // Change the position of Frames and Navigation dots
        var animateFrames = function(gotoNumber) {
            tourPosition = gotoNumber;

            function resetNextBtn() {
                $('.ftue_next').empty();
                $('.ftue_next').append("Next");
            }

            function showFailScreen() {
                tourPosition = 8;
                $('.ftue_prev').css({ opacity: 1 });
                $('#ftue_btn_1').children().removeClass("tour_nav_orange");
                $('#ftue_btn_1').children().addClass("tour_nav_blue");
                fadeFramesTo(7);
                buttonStates('ftue_btn_7');
                $('.ftue_7_header').hide();
                $('.ftue_gmail_snarf').hide();
                $('.ftue_next').hide();
                $('.ftue_continue').show();
                $('.last_tour_fail').show();

                $('.ftue_1').hide();
                $('.ftue_7').show();
                $('.ftue_continue').unbind('click').bind('click', function (event) {
                    location.reload();
                });
            }

            // Resets
            $('.ftue_continue').hide();
            $('.last_tour_fail').hide();
            $('.ftue_next').show();

            switch (gotoNumber) {

                // Fadein to Hand Shake
                case 1:
                    $('.ftue_prev').css({ opacity: 0.25 });
                    resetNextBtn();
                    fadeFramesTo(1);
                    buttonStates('ftue_btn_1');
                    break;

                // Fadein Intro Graphic
                case 2:
                    $('.ftue_prev').css({ opacity: 1 });
                    resetNextBtn();
                    fadeFramesTo(2);
                    buttonStates('ftue_btn_2');
                    break;

                // Fadein Glass Bubbles
                case 3:
                    $('.ftue_prev').css({ opacity: 1 });
                    resetNextBtn();
                    fadeFramesTo(3);
                    buttonStates('ftue_btn_3');
                    break;

                // Fadein Security Lock
                case 4:
                    $('.ftue_prev').css({ opacity: 1 });
                    resetNextBtn();
                    fadeFramesTo(4);
                    buttonStates('ftue_btn_4');
                    break;

                // Fadein Video
                case 5:
                    $('.ftue_prev').css({ opacity: 1 });
                    resetNextBtn();
                    fadeFramesTo(5);
                    buttonStates('ftue_btn_5');
                    break;

                // Fadein Snarf Exchange
                case 6:
                    $('.ftue_prev').css({ opacity: 1 });
                    $('.ftue_7_header').show();
                    resetNextBtn();
                    fadeFramesTo(6);
                    buttonStates('ftue_btn_6');
                    break;

                // Fadein Gmail Snarf
                case 7:
                    $('.ftue_prev').css({ opacity: 1 });
                    $('.ftue_7_header').show();
                    $('.ftue_gmail_snarf').show();
                    resetNextBtn();
                    fadeFramesTo(7);
                    buttonStates('ftue_btn_7');
                    break;

                // Fadein Alerts
                case 8:

                    // Record last frame reached:
                    WHOAT.networking.getToServerWithAjax('/watched/last', null, function (response) {});

                    // User has synced, goto EXPAND NETWORK
                    if (snarfed) {
                        $('.ftue_prev').css({ opacity: 1 });
                        resetNextBtn();
                        fadeFramesTo(8);
                        buttonStates('ftue_btn_8');

                    // User has NOT synced, display warning message:
                    } else { showFailScreen(); }

                    break;

                // Fadein Expand
                case 9:

                    // Record last frame reached:
                    WHOAT.networking.getToServerWithAjax('/watched/last', null, function (response) {});

                    // User has synced, goto EXPAND NETWORK
                    if (snarfed) {
                        $('.ftue_prev').css({ opacity: 1 });
                        resetNextBtn();
                        fadeFramesTo(9);
                        buttonStates('ftue_btn_9');
                        wireSnarfExchange();

                    // User has NOT synced, display warning message:
                    } else { showFailScreen(); }

                    break;

                // Fadein You Rock / Fail
                case 10:

                    // User has synced, goto EXPAND NETWORK
                    if (snarfed) {
                        $('.ftue_prev').css({ opacity: 1 });
                        resetNextBtn();
                        fadeFramesTo(10);
                        buttonStates('ftue_btn_10');
                        wireFinalFrame();

                    // User has NOT synced, display warning message:
                    } else { showFailScreen(); }

                    break;
            }
        }

        // Fade out all Frames and fade in the selected Frame
        var fadeFramesTo = function(showFrame) {

            $('#ftue_tour_screens').find('.ftue_block_section').hide();

            // Resets:
            $('.ftue_last').hide();
            $('.ftue_next').css('color', '#006497');
            $('.ftue_next').show();
            $('.snarf_lock_hover').hide();
            $('.ajax_in_video').empty();

            // Wire Gmail Snarf
            function wireGmailSnarfBtn() {
                $('.gmail_ftue_snarf').unbind('click').bind('click', function (event) {
                    var theBtn = $('.gmail_ftue_snarf');
                    $(theBtn).css('cursor','auto');
                    $(theBtn).css('background','#ccc');
                    $(theBtn).attr("disabled", "true");
                    $(this).unbind('click');

                    var url = "/connect/gmail";
                    var windowName = "popUp";
                    var windowSize = "width=600, height=540";
                    var win = window.open(url, windowName, windowSize);
                    win.focus();
                    document.title = 'Who@ Gmail Sync';
                    event.preventDefault();
                    event.stopPropagation();
                });
            }

            // Wire EXPAND INVITE
            function wireFtueInvite() {
                $('.expand_tbody .invite_blue').unbind('click').bind('click', function (event) {

                    var theBtn = $(this),
                        $tr    = $(this).closest("tr"),
                        id     = $(theBtn).parents('tr:first').data('invite-id');

                    var params    = {},
                        coworkers = [];
                        coworkers.push(id);
                        params[0] = coworkers[0];

                    $(theBtn).css('background', '#00386f');
                    $(theBtn).css('cursor','auto');
                    $(theBtn).html('Inviting...');
                    $(theBtn).attr("disabled", "true");

                    WHOAT.networking.postToServerWithAjax('/invite/coworkers', params, function (response) {

                        if (response.result === 'success') {
                            $(theBtn).css('background', '#ccc');
                            $(theBtn).html('Invited');

                        } else if (response.result === 'error') {
                            $(theBtn).css('cursor','pointer');
                            $(theBtn).removeAttr("disabled");
                        }

                    });
                });
            }

            // Wire EXPAND FRIENDS
            function wireFtueFriend() {
                $('.expand_tbody .friend_yellow').unbind('click').bind('click', function (event) {

                    var theBtn = $(this),
                        $tr    = $(this).closest("tr"),
                        userID = $(this).parents('tr:first').data('user-id'),
                        id     = $.trim(userID);

                    var params = { 'id' : id };

                    $(theBtn).css('background', '#d69f00');
                    $(theBtn).text('Sending...');
                    $(theBtn).css('cursor','auto');
                    $(theBtn).attr("disabled", "disabled");

                    WHOAT.networking.postToServerWithAjax('/add_friend', params, function (response) {

                        if (response.result === 'success') {
                            $(theBtn).css('background', '#ccc');
                            $(theBtn).html('Sent');

                        } else if (response.result === 'error') {
                            $(theBtn).css('cursor','pointer');
                            $(theBtn).css('background', '#e4be0b');
                            $(theBtn).removeAttr("disabled");
                        }

                    });
                });
            }

            // Wire FTUE ALERTS
            function wireFtueAlerts() {

                var curr_val = "", updated_val = "", alerts_added = false;

                function wireRemoveCompanyAlert() {

                    $('.blue_delete').unbind('click').bind("click", function() {
                        var theBtn = $(this),
                        $tr        = $(this).closest("tr"),
                        trigger_id = $(theBtn).parents('tr:first').data('trigger-id'),
                        params     = { 'id' : trigger_id };

                        $(theBtn).css('cursor','auto');
                        $(theBtn).attr("disabled", "disabled");
                        // $tr.parent().fadeOut('fast');
                        $tr.fadeOut('fast');

                        WHOAT.networking.postToServerWithAjax('/delete/company/alert', params, function (response) {

                            if (response.result === "success") {
                                
                            } else if (response.result === "error") {
                                $('.company_alert_error').empty();
                                $('.company_alert_error').html(response.message);
                                $('.company_alert_error').fadeIn('fast');
                                $('.company_alert_error').unbind('click').bind('click', function() {
                                    $('.company_alert_error').hide();
                                });
                            }
                        });
                    });
                }

                function wireAddAlert() {

                    $('.ftue_9').unbind('click').bind("click", function() {
                        $('.ftue_company_results').hide();
                        if (alerts_added) {
                            $('.ftue_added_companies').show();
                        }
                    });

                    $('.add_company_alert').unbind('click').bind("click", function() {
                        var theBtn = $(this),
                        $tr        = $(this).closest("tr"),
                        comp_id    = $(theBtn).parents('tr:first').data('company-id'),
                        comp_label = $(this).closest('td').prev('.company_label').html(),
                        params     = { 'id' : comp_id, 'label' : comp_label };

                        $(theBtn).css('cursor','auto');
                        $(theBtn).css('background','#333');
                        $(theBtn).text('Added');
                        $(theBtn).attr("disabled", "disabled");

                        WHOAT.networking.postToServerWithAjax('/add/company/alert', params, function (response) {

                            if (response) {
                                $('.ftue_company_results').hide();
                                $('.ajax_company_results').empty();
                                $('.ajax_added_company').append(response);
                                $('.ftue_added_companies').fadeIn('fast');
                                alerts_added = true;

                                wireRemoveCompanyAlert();
                            }
                        });
                    });
                }

                $( "#ftue_alert_input" ).on("keyup", function () {
                    curr_val = $('#ftue_alert_input').val();
                    $('.company_alert_error').hide();
                    if(curr_val === ""){
                        $('.ajax_company_results').empty();
                        $('.ftue_company_results').hide();
                    }

                    setTimeout(function () {
                        updated_val = $('#ftue_alert_input').val();
                        if (updated_val === curr_val && curr_val != ""){
                            WHOAT.networking.getToServerWithAjax('/companies/'+curr_val, null, function (response) {
                                if (response) {
                                    $('.ftue_added_companies').hide();
                                    $('.ftue_company_results').show();
                                    $('.ajax_company_results').empty();
                                    $('.ajax_company_results').append(response);
                                    
                                    wireAddAlert();
                                }
                            });
                        }
                        
                    }, 200);
                });

                // Prevent alerts input from submitting
                $('.noEnterSubmit').keypress(function(e){
                    if ( e.which == 13 ) return false;
                });

                $( "#alert_triggers_form").unbind('submit').bind("submit", function(event) {
                    return false;
                });
            }

            if (showFrame === 1) {
                $('.ftue_1').fadeIn('slow');

            } else if (showFrame === 2) {
                $('.ftue_2').fadeIn('slow');

            } else if (showFrame === 3) {
                $('.ftue_3').fadeIn('slow');

            } else if (showFrame === 4) {
                $('.ftue_4').fadeIn('slow');

            } else if (showFrame === 5) {
                WHOAT.networking.getToServerWithAjax('/get/ftue/video', null, function (response) {
                    if (response) {
                        $('.ajax_in_video').empty();
                        $('.ajax_in_video').append(response);
                        $('.ftue_5').fadeIn('slow');
                    }
                });

            // SNARF Exchange
            } else if (showFrame === 6) {
                $('.ftue_6').fadeIn('slow');
                $('.ftue_exchange_snarf_simple').css('height', '350px');
                wireSnarfExchange();

            // SNARF Gmail
            } else if (showFrame === 7) {
                $('.ftue_7').fadeIn('slow');
                $('.snarf_lock_hover').show();
                $('#ftue_btn_6 .icon_snarf_lock').removeClass("tour_lock_blue");
                $('#ftue_btn_6 .icon_snarf_lock').addClass("tour_lock_orange");
                wireGmailSnarfBtn();

            // CUSTOM ALERTS
            } else if (showFrame === 8) {
                $('.ftue_8').fadeIn('slow');
                wireFtueAlerts();

            // EXPAND NETWORK
            } else if (showFrame === 9) {
                
                $('.snarf_lock_hover').hide();
                $('.ftue_9').fadeIn('slow');
                $('.expand_invite').hide();
                $('.expand_friend').hide();
                $('.ajax_in_invite').empty();
                $('.ajax_in_friends').empty();
                $('.ftue_9_content #spinner').show();

                // Wait 2 secs, then ajax in contacts:
                setTimeout(function () {
                    
                    // Ajax in coworkers to invite
                    WHOAT.networking.getToServerWithAjax('/get/ftue/invite', null, function (response) {
                        if (response) {
                            $('.ftue_9_content #spinner').hide();
                            $('.ajax_in_invite').empty();
                            $('.ajax_in_invite').append(response);
                            $('.expand_invite').fadeIn('slow');
                            wireFtueInvite();
                        }
                    });

                    // Ajax in contacts to friend
                    WHOAT.networking.getToServerWithAjax('/get/ftue/friend', null, function (response) {
                        if (response) {
                            $('.ftue_9_content #spinner').hide();
                            $('.ajax_in_friends').empty();
                            $('.ajax_in_friends').append(response);
                            $('.expand_friend').fadeIn('slow');
                            wireFtueFriend();
                        }
                    });
                }, 1000);

            // LAST FRAME
            } else if (showFrame === 10) {
                $('.last_tour_ok').show();
                $('.ftue_10').fadeIn('slow');
            }
        }

        // Change button states
        var buttonStates = function(id) {
            var $navBtn = $('#'+id);

            function resetRest() {
                $navBtn.siblings('li').children().removeClass("tour_nav_orange");
                $navBtn.siblings('li').children().addClass("tour_nav_blue");
            }

            function resetPlay() {
                $('#ftue_btn_5 .nav_circle').removeClass("tour_play_orange");
                $('#ftue_btn_5 .nav_circle').addClass("tour_play_blue");
            }

            function resetLock() {
                $('#ftue_btn_6 .icon_snarf_lock').removeClass("tour_lock_orange");
                $('#ftue_btn_6 .icon_snarf_lock').addClass("tour_lock_blue");
            }

            function resetAlerts() {
                $('#ftue_btn_8 .nav_circle').removeClass("tour_alerts_orange");
                $('#ftue_btn_8 .nav_circle').addClass("tour_alerts_blue");
            }

            function resetExpand() {
                $('#ftue_btn_9 .nav_circle').removeClass("tour_expand_orange");
                $('#ftue_btn_9 .nav_circle').addClass("tour_expand_blue");
            }

            function resetCloud() {
                $('#ftue_btn_10 .icon_cloud').removeClass("tour_cloud_orange");
                $('#ftue_btn_10 .icon_cloud').addClass("tour_cloud_blue");
            }

            // Clicked to Watch Video
            if (id === 'ftue_btn_5') {
                $navBtn.children().removeClass("tour_play_blue");
                $navBtn.children().addClass("tour_play_orange");
                
                resetRest();
                resetLock();
                resetExpand();
                resetAlerts();
                resetCloud();

            // Clicked to Security Lock: Exchange Snarf
            } else if (id === 'ftue_btn_6') {
                $('.small_exchange_icon').css('opacity', 1);
                $('.small_gmail_icon').css('opacity', 0.5);
                $navBtn.children().removeClass("tour_lock_blue");
                $navBtn.children().addClass("tour_lock_orange");
                $('.snarf_lock_hover').fadeIn('fast');
                
                resetRest();
                resetPlay();
                resetExpand();
                resetAlerts();
                resetCloud();

            // Clicked to Security Lock: Gmail Snarf
            } else if (id === 'ftue_btn_7') {
                $('.small_exchange_icon').css('opacity', 0.5);
                $('.small_gmail_icon').css('opacity', 1);
                $('.ftue_gmail_snarf').css('height', '300px');
                $('.ftue_gmail_snarf').show();

                resetPlay();
                resetExpand();
                resetAlerts();

            // Clicked to Alerts
            } else if (id === 'ftue_btn_8') {
                $navBtn.children().removeClass("tour_alerts_blue");
                $navBtn.children().addClass("tour_alerts_orange");
                
                resetRest();
                resetLock();
                resetPlay();
                resetExpand();
                resetCloud();

            // Clicked to Expand
            } else if (id === 'ftue_btn_9') {
                $navBtn.children().removeClass("tour_expand_blue");
                $navBtn.children().addClass("tour_expand_orange");
                
                resetRest();
                resetLock();
                resetPlay();
                resetAlerts();
                resetCloud();
                
            // Clicked to Cloud Icon (Final Frame)
            } else if (id === 'ftue_btn_10') {
                $('.snarf_lock_hover').hide();
                $('#ftue_btn_10 .icon_cloud').removeClass("tour_cloud_blue");
                $('#ftue_btn_10 .icon_cloud').removeClass("tour_nav_blue");
                $('#ftue_btn_10 .icon_cloud').addClass("tour_cloud_orange");

                $('.ftue_next').hide();
                $('.ftue_last').show();

                $('.ftue_last').unbind('click').bind('click', function (event) {

                    // Load the Dark FTUE
                    if (dark === 'true') {
                        $('#white_ftue').hide();
                        $('#white_ftue').empty();
                        WHOAT.dark.loadDarkFtue($());
                    } else {
                        $('#white_ftue').hide();
                        $('#white_ftue').empty();
                        $('.white_cover').hide();
                        $('.white_cover').remove();
                    }
                });

                resetRest();
                resetLock();
                resetPlay();
                resetExpand();
                resetAlerts();
                resetLock();

            } else {
                $('.snarf_lock_hover').hide();
                $('.nav_circle').removeClass("tour_nav_blue");
                $('.nav_circle').addClass("tour_nav_orange");

                resetRest();
                resetLock();
                resetPlay();
                resetExpand();
                resetAlerts();
                resetLock();
                resetCloud();
            }
        }

        function wireSnarfExchange() {

            // SNARF EXCHANGE SIMPLE FORM
            $('#ftue_exchange_simple').unbind('submit').bind("submit", function() {
                exchangeSnarfer("simple");
                return false;
            });

            // SNARF EXCHANGE ADVANCED FORM
            $('.ftue_exchange_snarf_advanced').unbind('submit').bind("submit", function() {
                exchangeSnarfer("advanced");
                return false;
            });

            $('.exchanged_advanced').unbind('click').bind('click', function () {
                $('.ftue_exchange_snarf_simple').hide();
                $('.ftue_exchange_snarf_advanced').show();

                $('.exchanged_simple').unbind('click').bind('click', function () {
                    $('.ftue_exchange_snarf_simple').show();
                    $('.ftue_exchange_snarf_advanced').hide();
                });
            });

            function exchangeSnarfer(type) {

                // defaults:
                type = type || "simple";

                // ipad fix:
                WHOAT.dashboard.hideKeyboard($());

                if (type === "simple") {
                    var exchange_email = $('#sync_exchange_email').val();
                    var exchange_pass  = $('#sync_exchange_password').val();
                    var theBtn         = $('#exchange_simple_btn');
                    var params         = {
                        'type'     : 'simple',
                        'email'    : exchange_email,
                        'password' : exchange_pass
                    }

                    $('.ftue_exchange_snarf_simple').hide();

                } else if (type === "advanced") {
                    var domain         = $('#adv_exchange_domain').val();
                    var exchange_email = $('#adv_exchange_username').val();
                    var exchange_pass  = $('#adv_exchange_password').val();
                    var server         = $('#adv_exchange_server').val();
                    var theBtn         = $('#exchange_simple_btn');
                    var params         = {
                        'type'     : 'advanced',
                        'email'    : exchange_email,
                        'password' : exchange_pass,
                        'domain'   : domain,
                        'server'   : server
                    }

                    $('.ftue_exchange_snarf_advanced').hide();
                }

                $(theBtn).css('cursor','auto');
                $(theBtn).css('background','#ccc');
                $(theBtn).text('sync started');
                $(theBtn).attr("disabled", "true");
                $('.ftue_footer').hide();
                $('#patience_exchange').show();
                $('#spinner').show();

                WHOAT.notify.topNotify('success', 'Please be patient, this may take a few minutes');
                WHOAT.networking.postToServerWithAjax('/sync_exchange', params, function (response) {

                    $(theBtn).text('sync contacts');
                    $(theBtn).removeAttr("disabled");
                    $(theBtn).css('cursor','pointer');
                    $(theBtn).css('background','#f58733');

                    // Hide patience modal
                    $('#patience_exchange').hide();
                    $('.ftue_footer').show();

                    // if success go back to sync page 1
                    if (response.result === 'success') {

                        // Display contacts snarfed
                        $('.ftue_exchange_snarfed strong').text(response.total);
                        $('.ftue_exchange_snarfed').fadeIn('fast');
                        snarfed = true;

                    // if error then go to advanced sync page (not done yet...)
                    } else if (response.result === 'error') {

                        $('.ftue_exchange_snarf_simple').show();
                        $('.ftue_exchange_error').show();
                        $('.ftue_exchange_error').unbind('click').bind('click', function () {
                            $(this).hide();
                        });
                    }

                });
            }
        }

        function wireFinalFrame() {
            // Show input for number to recieve iPhone app:
            $('.text_iphone_app').unbind('click').bind('click', function (event) {
                $('.text_iphone_app').hide();
                $('.ftue_10_section #get_text_iphone_app').show();
            });
        }

        if (status === 'failed') {
            animateFrames(8);
        }

        return {
            showDark : showDark,
            animateFrames : animateFrames
        }
    }

    return {
        setSnarf : setSnarf,
        loadWhiteFtue : loadWhiteFtue,
        wireFTUEtour : wireFTUEtour
    };

}(jQuery, window));