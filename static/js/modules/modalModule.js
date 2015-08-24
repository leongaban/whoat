// =========================================================================
//  MODALS
// =========================================================================
WHOAT.modal = (function ($, w, undefined) {
    'use strict';

    // Vars
    var tourPosition = 1, gotoNumber = 0;

    // TOUR & SYNC MODAL
    var wireTourSyncModal = function () {

        var startTour = function (section, closeButton) {
            closeButton = closeButton || "no";
            section = section || null;

            $('.overlay').show();
            $('#tour_modal').show();

            // If activated from the Gear menu
            if (section === "ftue") {

                if (closeButton === "withClose") {
                    $('.close_tour_x').show();
                    $('.overlay').addClass('close_ftue');
                    $('.close_ftue').unbind('click').bind('click', function (event) {
                        $(this).hide();
                        $('.overlay').hide();
                        $('#tour_modal').hide();
                        $('#tour_modal').empty();
                        tourPosition = 1;
                        gotoNumber = 1;
                        animateFrames(gotoNumber);
                    });
                }

                // Wire Navigation buttons

                // Navigation Code
                // ------------------------------------------------------

                // Circle Buttons
                $('.tour_nav_circle').unbind('click').bind('click', function (event) {
                    var id = this.id;
                    
                    switch (id) {
                        case 'tour_btn_1':
                            gotoNumber = 1;
                            break;
                        case 'tour_btn_2':
                            gotoNumber = 2;
                            break;
                        case 'tour_btn_3':
                            gotoNumber = 3;
                            break;
                        case 'tour_btn_4':
                            gotoNumber = 4;
                            break;
                        case 'tour_btn_5':
                            gotoNumber = 5;
                            break;
                        case 'tour_btn_6':
                            gotoNumber = 6;
                            break;
                        case 'tour_btn_7':
                            gotoNumber = 7;
                            break;
                    }
                    
                    animateFrames(gotoNumber);
                });

                // Prev Button
                $('.tour_prev').unbind('click').bind('click', function (event) {
                    if (tourPosition > 0) {
                        gotoNumber = (tourPosition - 1);
                        animateFrames(gotoNumber, "prev");
                    }
                });

                // Next Button
                $('.tour_next').unbind('click').bind('click', function (event) {
                    if (tourPosition < 8) {
                        gotoNumber = (tourPosition + 1);
                        animateFrames(gotoNumber, "next");
                    }
                });

                // Change the position of Frames and Navigation dots
                var animateFrames = function(gotoNumber) {
                    tourPosition = gotoNumber;

                    if (gotoNumber != 7) {
                        $('#next_ftue_btn').show();
                        $('#finish_ftue_btn').hide();
                    } else if (gotoNumber === 7) {
                        $('#next_ftue_btn').hide();
                        $('#finish_ftue_btn').show();
                    }

                    switch (gotoNumber) {
                        case 1:
                            $('.tour_prev').css({ opacity: 0.5 });
                            $('.tour_next').empty();
                            $('.tour_next').append("Next");
                            fadeFramesTo(1);
                            buttonStates('#tour_btn_1');
                            break;

                        case 2:
                            $('.tour_prev').css({ opacity: 1 });
                            $('.tour_next').empty();
                            $('.tour_next').append("Next");
                            fadeFramesTo(2);
                            buttonStates('#tour_btn_2');
                            break;

                        case 3:
                            $('.tour_prev').css({ opacity: 1 });
                            $('.tour_next').empty();
                            $('.tour_next').append("Next");
                            fadeFramesTo(3);
                            buttonStates('#tour_btn_3');
                            break;

                        case 4:
                            $('.tour_prev').css({ opacity: 1 });
                            $('.tour_next').empty();
                            $('.tour_next').append("Next");
                            fadeFramesTo(4);
                            buttonStates('#tour_btn_4');
                            break;

                        case 5:
                            $('.tour_prev').css({ opacity: 1 });
                            $('.tour_next').empty();
                            $('.tour_next').append("Next");
                            fadeFramesTo(5);
                            buttonStates('#tour_btn_5');
                            break;

                        case 6:
                            $('.tour_prev').css({ opacity: 1 });
                            $('.tour_next').empty();
                            $('.tour_next').append("Next");
                            fadeFramesTo(6);
                            buttonStates('#tour_btn_6');
                            break;

                        case 7:
                            $('.tour_prev').css({ opacity: 1 });
                            $('.tour_next').text('Done');

                            // Done: Finished FTUE
                            $('#finish_ftue_btn').unbind('click').bind('click', function (event) {
                                $('#tour_modal').hide();
                                $('.overlay').hide();
                            });

                            fadeFramesTo(7);
                            buttonStates('#tour_btn_7');
                            break;
                    }
                }

                // Fade out all Frames and fade in the selected Frame
                var fadeFramesTo = function(showFrame) {
                    $('#tour_modal').find('.main_tour_section').hide();

                    if (showFrame === 1) {
                        $('#tour_1').fadeIn('slow');
                    } else if (showFrame === 2) {
                        $('#tour_2').fadeIn('slow');
                    } else if (showFrame === 3) {
                        $('#tour_3').fadeIn('slow');
                    } else if (showFrame === 4) {
                        $('#tour_4').fadeIn('slow');
                    } else if (showFrame === 5) {
                        $('#tour_5').fadeIn('slow');
                    } else if (showFrame === 6) {
                        $('#tour_6').fadeIn('slow');
                    } else if (showFrame === 7) {
                        $('#tour_7').fadeIn('slow');
                    }
                }

                // Change button states
                var buttonStates = function(id) {
                    var $navBtn = $(id);
                    $navBtn.children().removeClass("tour_nav_white");
                    $navBtn.children().addClass("tour_nav_blue");
                    $navBtn.siblings('li').children().removeClass("tour_nav_blue");
                    $navBtn.siblings('li').children().addClass("tour_nav_white");
                }

                // Section 1 code: What is WhoAt?
                // ------------------------------------------------------

                // Section 2 code: Help Requesting Intros
                // ------------------------------------------------------

                // Section 3 code: We Provide Analytics (Heatmap)
                // ------------------------------------------------------

                // Section 4 code: Secure and Private
                // ------------------------------------------------------

                // Section 5 code: How to get started (Video)
                // ------------------------------------------------------

                // Section 6 code: Sync Email Options
                // ------------------------------------------------------
                $('.snarf_btn').unbind('click').bind('click', function (event) {

                    var $li = $(this).closest("li");
                    var type = $li.data('type');

                    if (type === 'exchange') {

                        // Hide Tour 6 (screen with sync buttons)
                        $('#tour_6').hide();
                        
                        // Hide Prev & Next Button
                        $('.tour_prev').hide();
                        $('#next_ftue_btn').hide();

                        // Make nav circle buttons unclickable
                        $('.nav_circles').hide();

                        // Show Back button
                        $('.back_to_tour_6').show();

                        // Show Simple Exchange Snarf
                        $('#tour_6_exchange_snarf').show();
                        $('#simple_exchange_form').show();

                        // Wire the Snarf Exchange form submission
                        wireSnarfExchange();

                    } else if (type === 'gmail') {
                
                        var url = "/connect/gmail";
                        var windowName = "popUp";
                        var windowSize = "width=600, height=540";
                        var win = window.open(url, windowName, windowSize);
                        win.focus();
                        document.title = 'Who@ Gmail Snarf';
                        event.preventDefault();
                        event.stopPropagation();

                        WHOAT.notify.topNotify('success', 'Connecting to Google, this may take a few minutes');
                    }
                });

            // If triggered from Sync page
            } else if (section === "exchange" && closeButton === "withClose") {
                
                $('.close_tour_x').show();
                $('.overlay').addClass('close_ftue');

                $('.close_ftue').unbind('click').bind('click', function () {
                    $(this).hide();
                    $('.overlay').hide();
                    $('#tour_modal').hide();
                });

                // Wire only Exchange section
                wireSnarfExchange("exchange");
            }

            function wireSnarfExchange(type) {
                type = type || null;

                if (type === "exchange") {
                    $('#tour_1').hide();
                    $('#tour_6_exchange_snarf').show();
                    $('#simple_exchange_form').css('margin-top', '70px');
                    $('.exchange_help_options').css('margin-top', '70px');
                    $('.tour_footer').hide();
                }

                function createHelpModal(path) {
                    var url = path;
                    var windowName = "popUp";
                    var windowSize = "width=820, height=581";
                    window.open(url, windowName, windowSize);
                    document.title = 'Advanced Exchange Help';
                    event.preventDefault();
                }

                // Help buttons
                $('.ex_help_iphone').unbind('click').bind('click', function() {
                    createHelpModal("/help/iphone");
                });

                $('.ex_help_outlook').unbind('click').bind('click', function() {
                    createHelpModal("/help/outlook");
                });

                $('.ex_help_android').unbind('click').bind('click', function() {
                    createHelpModal("/help/android");
                });

                $('.back_to_tour_6').unbind('click').bind('click', function () {
                    $('.back_to_tour_6').hide();
                    $('#tour_6_exchange_snarf').hide();
                    $('#tour_6').show();
                    $('.tour_prev').show();
                    $('#next_ftue_btn').show();
                    $('.nav_circles').show();
                });

                // HACKS REFACTOR: After full Tour is ready...
                $('.exchanged_advanced').unbind('click').bind('click', function () {
                    $('#tour_modal').css('height', '454px');
                    $('#tour_6_exchange_snarf .tour_6_bullets p').empty();
                    $('#tour_6_exchange_snarf .tour_6_bullets p').css('text-align', 'center');
                    $('#tour_6_exchange_snarf .tour_6_bullets p').css('margin-bottom', '10px');
                    $('#tour_6_exchange_snarf .tour_6_bullets p').text("This is the advanced sync form. Contact support if you need help.");
                    $('#simple_exchange_form').hide();
                    $('#advanced_exchange_form').show();

                    $('.exchanged_simple').unbind('click').bind('click', function () {
                        $('#tour_modal').css('height', '434px');
                        $('#tour_6_exchange_snarf .tour_6_bullets p').empty();
                        $('#tour_6_exchange_snarf .tour_6_bullets p').css('text-align', 'left');
                        $('#tour_6_exchange_snarf .tour_6_bullets p').css('margin-bottom', '0px');
                        $('#tour_6_exchange_snarf .tour_6_bullets p').text("We don't download your calendar, notes, emails or any other data besides contacts. At the moment this is only a one way sync, So if you add additional contacts to your exchange, please re-sync with Who@.");
                        $('#simple_exchange_form').show();
                        $('#advanced_exchange_form').hide();
                    });
                });

                function exchangeSnarfer(type, section, closeButton) {

                    // defaults:
                    type        = type        || "simple";
                    section     = section     || "exchange";
                    closeButton = closeButton || "withClose";

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

                        $('#simple_exchange_form').hide();

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

                        $('#advanced_exchange_form').hide();
                    }

                    $(theBtn).css('cursor','auto');
                    $(theBtn).css('background','#ccc');
                    $(theBtn).text('sync started');
                    $(theBtn).attr("disabled", "true");

                    $('.tour_6_section').hide();
                    $('.tour_6_header').hide();
                    $('#tour_6').hide();
                    $('.exchange_help_options').hide();
                    $('.tour_footer').hide();
                    $('#patience_exchange').show();

                    WHOAT.notify.topNotify('success', 'Please be patient, this may take a few minutes.');
                    WHOAT.networking.postToServerWithAjax('/sync_exchange', params, function (response) {

                        $(theBtn).text('sync contacts');
                        $(theBtn).removeAttr("disabled");
                        $(theBtn).css('cursor','pointer');
                        $(theBtn).css('background','#f58733');

                        // if success go back to sync page 1
                        if (response.result === 'success') {

                            if (section === "ftue") {

                                // Hide back button
                                $('.back_to_tour_6').hide();
                                // Hide patience modal
                                $('#patience_exchange').hide();
                                // Hide exchange snarf
                                $('#tour_6_exchange_snarf').hide();
                                // Show Sync step
                                $('#tour_6').show();
                                // Show Sync step content
                                $('.tour_6_section').show();
                                // Show Sync help options
                                $('.exchange_help_options').show();
                                // Show Prev button
                                $('.tour_prev').show();
                                // Show Next button
                                $('#next_ftue_btn').show();
                                // Show Navigation
                                $('.nav_circles').show();
                                // Show Footer
                                $('.tour_footer').show();
                                // Orange border for snarf complete
                                $('#btn_sync_exchange .snarf_btn').addClass('snarf_btn_done');
                                // Add Snarf check
                                $('#btn_sync_exchange .check_holder').empty();
                                $('#btn_sync_exchange .check_holder').append('<div class="snarfed_check"></div>');

                                // Hide previously snarfed contacts
                                $('.snarfed_exchange_info').hide();

                                // Display contacts snarfed
                                $('.snarf_exchange_info em').text(response.total);
                                $('.snarf_exchange_info').fadeIn('fast');

                            } else if (section === "exchange") {

                                $('.overlay').hide();
                                $('#tour_modal').hide();
                                $('.the_exchange_li').hide();
                                
                                // Ajax in new synced stats:
                                $.get("/get/exchange/stats", function(data) {
                                    $("#temp_row_exchange").html(data);
                                    $('.ajax_exchange_row').fadeIn('fast');
                                    WHOAT.contacts.wireSyncContacts();
                                });
                            }

                        // if error then go to advanced sync page
                        } else if (response.result === 'error') {

                            $('#patience_modal').hide();
                            $('#patience_exchange').css('display', 'none');
                            // Show Simple Exchange
                            $('.tour_6_header').show();
                            $('.tour_6_section').show();
                            // Show Navigation
                            $('.nav_circles').show();
                            // Show Footer
                            $('.tour_footer').show();

                            $('#tour_6_exchange_snarf .tour_6_bullets p').empty();
                            $('#tour_6_exchange_snarf .tour_6_bullets p').css('text-align', 'center');
                            $('#tour_6_exchange_snarf .tour_6_bullets p').css('margin-bottom', '10px');
                            $('#tour_6_exchange_snarf .tour_6_bullets p').text("This is the advanced sync form. Contact support if you need help.");

                            $('.exchange_help_options').show();
                            $('#advanced_exchange_form').show();

                            $('.exchanged_simple').unbind('click').bind('click', function (event) {

                                $('#tour_6_exchange_snarf .tour_6_bullets p').empty();
                                $('#tour_6_exchange_snarf .tour_6_bullets p').css('text-align', 'left');
                                $('#tour_6_exchange_snarf .tour_6_bullets p').css('margin-bottom', '0px');
                                $('#tour_6_exchange_snarf .tour_6_bullets p').text("We don't download your calendar, notes, emails or any other data besides contacts. At the moment this is only a one way sync, So if you add additional contacts to your exchange, please re-sync with Who@.");

                                $('#simple_exchange_form').show();
                                $('#advanced_exchange_form').hide();
                            });

                            WHOAT.notify.topNotify(response.result, response.message);
                        }

                    });
                }

                // SNARF EXCHANGE SIMPLE FORM
                $('#exchange_simple_form').unbind('submit').bind("submit", function() {
                    exchangeSnarfer("simple", section, closeButton);
                    return false;
                });

                // SNARF EXCHANGE ADVANCED FORM
                $('#exchange_advanced_form').unbind('submit').bind("submit", function() {
                    exchangeSnarfer("advanced", section, closeButton);
                    return false;
                });
            }

            // Section 7 code: App buttons
            // ------------------------------------------------------
            
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

                // Show input for number to recieve Android app:
                // Request to get Android app:

                // Go to Apple Store:
                $('.apple_store_logo').unbind('click').bind('click', function (event) {
                    WHOAT.networking.redirectToURL('https://itunes.apple.com/us/app/who-intro/id777717885', '_blank');
                });
        }

        return {
            startTour: startTour
        }
    }

    //  Generate vCard HTML and objects for Modal
    var generateModal = function(type, id, params, modal, combo, details, emails, phones, hide_status, contact_row) {

        // Defaults
             type        = type    || " ";
             id          = id      || " ";
             params      = params  || {};
             modal       = modal   || " ";
             combo       = combo   || false;
             details     = details || {};
             emails      = emails  || "";
             phones      = phones  || "";
             hide_status = hide_status || "";
             contact_row = contact_row || "";

        // Variables
        var hidden       = hide_status,
            emails_array = [],
            phones_array = [];

        /*
            NEED TO REFACTOR LATER ...
        */

        // If there is an Emails Array:
        if (emails !== undefined || emails !== null || emails !== "") {
            $.each(emails.split(",").slice(0,-1), function(index, item) {
                emails_array.push(item); 
            });
        }

        // If there is an Phones Array:
        if (phones !== undefined || phones !== null || phones !== "") {
            $.each(phones.split(",").slice(0,-1), function(index, item) {
                phones_array.push(item); 
            });
        }

        /*
            Just an Intro Request
            *******************************************************
        */
        if (modal === "intro") {

            WHOAT.networking.getToServerWithAjax('/get/new/modal', null, function (response) {

                // Create Intro modal
                var modal_html = response;
                wireModals().createRequestModal(id, details, combo, modal_html);
            });

        /*
            Modal contains a vCard
            *******************************************************
        */
        } else {

            /*
                User is your Contact and may be an Introduction Request
                *******************************************************
            */
            if (type === "contact") {

                // Get Requester Member details:
                WHOAT.networking.getToServerWithAjax('/api/v1/'+type+'/details/'+id, params, function (response) {

                    // Get modal HTML
                    var contact_card = response;

                    // Get hidden status:
                    if (contact_card.hidden && contact_card.hidden === 1) {
                        hidden = "true";
                    } else {
                        hidden = "false";
                    }

                    // TEMP to hide Hide button on non-contacts
                    if (hide_status === "off") {
                        hidden = hide_status;
                    }

                    WHOAT.networking.getToServerWithAjax('/get/new/modal', null, function (response) {
                        // Create vCard modal
                        var modal_html = response;
                        if (modal === 'vcard') {
                            wireModals().createVcardModal(id, contact_card, modal_html, hidden, null, null, null, contact_row);
                        } else if (modal === 'intro_combo') {
                            wireModals().createRequestModal(id, details, combo, modal_html);
                        }

                    });
                });

            /*
                User is a Member and not a Contact
                *****************************************************
            */
            } else if (type === "member") {

                // Setup contact_card:
                // params     = { 'id' : id, 'label' : label, 'title' : title, 'company' : company };
                var contact_card = params;

                // Get hidden status:
                var hidden = "off";

                WHOAT.networking.getToServerWithAjax('/get/new/modal', null, function (response) {
                    // Create vCard modal
                    var modal_html = response;
                    wireModals().createVcardModal(id, contact_card, modal_html, hidden, type, emails_array, phones_array);
                });
            }
        }

        // wire close modal
        wireModals().activateCloseModal();
    }

    // WIRE MODALS (vCards & Intro Requests)
    var wireModals = function () {

        // =============================================================================================
        // VCARD MODALS (My Contacts and contacts in Search Results)
        // =============================================================================================
        
        // Pull & Create My Contact vCard
        //buildVcard(contact_card, emails, phones, type, email_a, phones_a);
        function buildVcard(response, emails, phones, type, emails_a, phones_a) {
            type     = type || "";
            emails_a = emails_a || [];
            phones_a = phones_a || [];

            var loop_num = 0,
                response_emails,
                response_phones;

            /*
                NEED TO REFACTOR LATER ...
            */

            // If Contact then get vCard details from Response:
            if (type !== "member") {

                if (response.emails !== undefined && response.emails !== null) {
                    response_emails = response.emails;
                }

                if (response.phones !== undefined && response.phones !== null) {
                    response_phones = response.phones;
                }

                // Create Emails Array ---------------------------------------------
                if (response_emails !== undefined && response_emails !== null) {
                    for ( var i = 0; i < response_emails.length; i++ ) {
                        emails.push(response_emails[i].label);
                    }
                }

                // Create Phones Array ---------------------------------------------
                if (response_phones !== undefined && response_phones !== null) {
                    for ( var i = 0; i < response_phones.length; i++ ) {
                        phones.push(response_phones[i].label);
                    }
                }

            // If Member and not Contact then get vCard details from Arrays:
            } else if (type === "member") {
                response_emails = emails_a;
                response_phones = phones_a;

                // Create Emails Array ---------------------------------------------
                if (response_emails !== undefined && response_emails !== null) {
                    for ( var i = 0; i < response_emails.length; i++ ) {
                        emails.push(response_emails[i]);
                    }
                }

                // Create Phones Array ---------------------------------------------
                if (response_phones !== undefined && response_phones !== null) {
                    for ( var i = 0; i < response_phones.length; i++ ) {
                        phones.push(response_phones[i]);
                    }
                }
            }

            /*
                Render the vCard details
            */
            if (phones.length !== 0) {
                for ( var i = 0, length = phones.length; i < length; i++ ) {
                    loop_num = i;
                    $('#vcard_table #modal_vcard_row').append(rowPhoneBuilder(phones[i], loop_num));
                }
            }

            if (emails.length !== 0) {
                for ( var i = 0, length = emails.length; i < length; i++ ) {
                    loop_num = i;
                    $('#vcard_table #modal_vcard_row').append(rowEmailBuilder(emails[i], loop_num));
                }
            }
        }

        // vCard email row builder:
        var rowEmailBuilder = function(data, i) {
            return '<tr>'
                 + '<td class="vcard_contact_type" width="10%">'
                 + '<span></span>'
                 + '<div class="vcard_phone_icon"></div>'
                 + '</td><td class="vcard_data" width="90%"><a href="mailto:'+data+'">'+data+'</a></td>'+'</tr>';
        }

        // vCard phone row builder:
        var rowPhoneBuilder = function(data, i) {
            return '<tr>'
                 + '<td class="vcard_contact_type" width="10%">'
                 + '<span></span>'
                 + '<div class="vcard_email_icon"></div>'
                 //+ '</td><td class="vcard_data" width="90%"><a href="tel:'+data+'">'+data+'</a></td>'+'</tr>';
                 + '</td><td class="vcard_data" width="90%" style="padding-left:20px;">'+data+'</td>'+'</tr>';
        }

        var createVcardModal = function(contact_id, contact_card, response, hidden, type, emails_a, phones_a, contact_row) {

            // Defaults
            contact_id     = contact_id   || "",
            contact_card   = contact_card || "",
            response       = response     || "",
            hidden         = hidden       || "",
            type           = type         || "",
            emails_a       = emails_a     || [],
            phones_a       = phones_a     || [];
            contact_row    = contact_row  || [];

            // Vars
            var contact_id = contact_id,
            emails         = [],
            phones         = [],
            groups_array   = [],
            name, title, company, networks;

            // Reset Modals
            modalReset();

            $(".injected_div").html(response);

            // Is Modal a vCard for contact / search?
            // ======================================
            $('.vcard_details_section').show();   // Show contact vCard
            $('#intro_network_selection').hide(); // Hide networks
            $('.intro_request_message').hide();   // Hide message

            // Refactor later, once I can hide contacts from anywhere...
            if (hidden !== "off") {
                if (hidden === "false") {
                    $('.hide_contact_button').show();
                    hidden = "true";
                } else if (hidden == "true") {
                    $('.show_contact_button').show();
                    hidden = "false";
                }

            // Don't show Hide option
            } else if (hidden === "off") {
                $('.hidden_btn_container').hide();
            }

            wireVCardButtons(contact_id, contact_row);

            // Display Contact vCard
            function showContactDetails(response) {
                response = response || "";

                // Get Avatar
                if (response.avatar !== undefined) {
                    var avatar_img = "<img src="+response.avatar+" onerror='WHOAT.modal.imgError('vcard');' alt=''/>"
                } else if (response.avatar == undefined) {
                    var avatar_img = "<img src='https://s3.amazonaws.com/whoat_assets/images/member_avatar.png' alt=''>";
                }

                $('.intro_modal_avatar').append(avatar_img);

                // Get Name
                name = response.label;
                $('#intro_contact_details .username').text(response.label);

                // Get Title
                if (response.title !== undefined && response.title !== null) {
                    $('#intro_contact_details .title').text(response.title);
                }

                // Get Company
                if (response.company !== undefined && response.company !== null) {                    
                    $('#intro_contact_details .company').text(response.company);
                }

                $('#intro_contact_details').show();
            }

            // Build vCard
            showContactDetails(contact_card);
            buildVcard(contact_card, emails, phones, type, emails_a, phones_a);

            // SHOW MODAL
            // ===============================
            $('.overlay').show();
            $('#intro_modal').fadeIn('fast');
        }

        var wireVCardButtons = function(user_id, contact_row) {

            // Friend / unfriend contact
            $('.friending_btn').unbind('click').bind('click', function() {
                var value = $(this).html(), params = { 'id' : user_id };
                WHOAT.contacts.reWireFriendbutton(value, user_id);
            });

            // Hide / unhide contact
            $('.hiding_btn').unbind('click').bind('click', function() {
                var value = $(this).html(), params = { 'id' : user_id };
                contact_row.addClass('contact_hidden');
                WHOAT.contacts.reWireShowHide(value, user_id, contact_row);
            });
        }

        // =============================================================================================
        // Create & Wire the Intro Request modal
        // =============================================================================================
        var createRequestModal = function(id, details, has_vcard, response) {

            // Defaults
            id      = id      || "",
            details = details || "";

            // Vars
            var contact_id = id,
            contactObj = details,
            emails = [], phones = [], groups_array = [],
            name, title, company, networks, loop_num,
            organization_count, group_count, friend_count,
            organizationOn = false, groupsOn = false, friendsOn = false;

            $(".injected_div").html(response);

            // Toggle vCard area display:
            if (has_vcard) {
                $('#intro_vcard').show();
            } else if (has_vcard === false) {
                $('#intro_vcard').hide();
                $('#intro_network_selection').css('margin-top', '0');
            }

            // Create Networks Object if Combo:
            networks = contactObj.networks;

            // Reset Modals
            modalReset();
            $('#check_comission_2').removeAttr('checked');

            // START WIRING
            $('.vcard_details_section').hide();     // Hide contact vCard
            $('#intro_network_selection').show();   // Show networks
            $('.intro_request_message').show();     // Show message

            // Display target name
            if (contactObj.label !== undefined) {
                $('#intro_network_selection .username').text(contactObj.label);
            }

            // Display target title
            if (contactObj.title !== undefined) {
                $('#intro_network_selection .title').text(contactObj.title);
            }

            // Display target organization
            if (contactObj.organization !== undefined) {
                $('#intro_network_selection .company').text("at "+contactObj.organization);
            }
            
            // function to show Network buttons
            function getNetworks(networks) {
                for ( var i = 0, length = networks.length; i < length; i++ ) {
                    loop_num = i;
                    
                    if (networks[i].type === 'Organization') {
                        $('#network_company').show();
                        organizationOn = true;

                    } else if (networks[i].type === 'Group') {
                        $('#network_groups').show();
                        groupsOn = true;

                    } else if (networks[i].type === 'Friends') {
                        $('#network_friends').show();
                        friendsOn = true;
                    }

                    organization_count = networks[i].organization_count;
                    group_count        = networks[i].group_count;
                    friend_count       = networks[i].friend_count;
                }
            }

            // function to show Network counts
            function addNumbers(o_count, g_count, f_count) {
                if (o_count > 0) {
                    $('#intro_network_selection .organization_count').html(o_count);
                } if (g_count > 0) {
                    $('#intro_network_selection .group_count').html(g_count);
                } if (f_count > 0) {
                    $('#intro_network_selection .friend_count').html(f_count);
                } else {
                    // do nothing
                }
            }

            // Setup Networks for Intro Request Modal
            function setupRequestModal() {

                // Vars
                var hasOrg, hasPhone, hasGroup, hasFriend, checkString, disableSendCount, groupCount,
                    networks = details.networks,
                    requestType = { work: true, groups: true, friends: true },
                    org_obj, grp_obj, grp_ids = [], grp_obj_array = [], friend_obj,
                    loop_num = 0, work_On, groups_On, friends_On,
                    grp_ids = [], grp_arry = [];

                // remove Personal from network Array
                networks = $.grep(networks, function(o,i) {
                    return o.type === "Personal" ? ((org_obj = o), true) : false 
                }, true);

                // Create disable count
                disableSendCount = networks.length;

                // Group row builder:
                var groupRowBuilder = function(check_id, group_id, value) {
                    return '<li>' 
                          +'<div id="'+check_id+'" class="check-group check-div-on" name="'+group_id+'" value="'+value+'" />'
                          +'<p>&nbsp; '+value+'</p>'
                          +'</li>'
                }

                // GROUP SETUP:
                // Save all Groups into Group Array
                for ( var i = 0, length = networks.length; i < length; i++ ) {
                    loop_num = i;

                    if (networks[i].type === 'Group') {
                        grp_arry.push(networks[i]);
                    }
                }

                // There is a group! Build the sub groups row
                var filtered = $(networks).filter(function() {
                    return this.type == 'Group';
                });

                // Clear out groups row
                $('#sub_groups .groups_check_row ul').empty();

                // Create Array with Group ID numbers
                if (filtered.length > 0) {
                    for ( var i = 0, length = grp_arry.length; i < length; i++ ) {
                        loop_num = i;

                        // Populate the Groups Row
                        $('#sub_groups .groups_check_row ul').append(groupRowBuilder(
                            'group_check_'+i,
                            grp_arry[i].id,
                            grp_arry[i].label)
                        );

                        grp_ids.push(grp_arry[i].id);
                    }
                }

                // Remove ALL Groups from networks
                networks = $.grep(networks, function(o,i) {
                    if (o.type === 'Group') {
                        obj = o;
                        return true;
                    }
                    return false;
                }, true);

                // Create new objects with Group IDs and push back into networks
                for (var i = 0; i < grp_ids.length; i++) {
                    var obj = {};
                    obj['id'] = grp_ids[i];
                    obj['type'] = 'Group';
                    grp_obj_array.push(obj);
                    networks.push(grp_obj_array[i]);
                }

                groupCount = grp_obj_array.length;

                // Wire up the Group checkboxes
                var wireGroupChecks = function(ids) {

                    var theBtn = $('#btn_send_request');

                    $(".check-group").click(function() {
                        var name = parseInt($(this).attr('name'));

                        if ($(this).hasClass( "check-div-on" )) {

                            // is on now turn off
                            $(this).addClass("check-div-off");
                            $(this).removeClass("check-div-on");

                            // remove Group from networks
                            var obj;
                            networks = networks.filter(function (o,i) {
                                return o.id !== name ? ((obj = o), true) : false;
                            });

                            disableSendCount = networks.length;
                            groupCount--;
                        
                        } else if ($(this).hasClass( "check-div-off" )) {

                            // is off now turn back on
                            $(this).addClass("check-div-on");
                            $(this).removeClass("check-div-off");

                            // add Group back to networks
                            var group_obj = { 'id': name, 'type': 'Group' };
                            networks.push(group_obj);
                            disableSendCount = networks.length;
                            groupCount++;
                        }

                        if (groupCount < 1) {
                            $('#network_groups').find('.icon_groups_on').replaceWith('<div class="icon_groups_off"></div>');
                        } else if (groupCount > 0) {
                            $('#network_groups').find('.icon_groups_off').replaceWith('<div class="icon_groups_on"></div>');
                        }

                        if (disableSendCount < 1) {
                            $(theBtn).css('cursor','auto');
                            $(theBtn).css('background','#ccc');
                            $(theBtn).text('Send Request');
                            $(theBtn).attr("disabled", "disabled");

                        } else if (disableSendCount >= 1) {
                            $(theBtn).css('cursor','pointer');
                            $(theBtn).text('Send Request');
                            $(theBtn).css('background','#f58733');
                            $(theBtn).removeAttr("disabled");
                        }
                    });
                }

                // Network button click actions:
                $('.network_btn').unbind('click').bind('click', function () {

                    var theBtn = $('#btn_send_request'),
                    networkType = $(this).attr('id');

                    if (networkType === "network_company") {

                        if (organizationOn) {
                            $('#network_company').find('.icon_company_on').replaceWith('<div class="icon_company_off"></div>');
                            // remove work from network
                            networks = $.grep(networks, function(o,i) {
                                return o.type === "Organization" ? ((org_obj = o), true) : false 
                            }, true);
                            disableSendCount--;
                            organizationOn = false;

                        } else if (organizationOn === false) {
                            $('#network_company').find('.icon_company_off').replaceWith('<div class="icon_company_on"></div>');
                            // add work to network
                            // var org_obj = { 'id': name, 'type': 'Organization' };
                            networks.push(org_obj);
                            disableSendCount++;
                            organizationOn = true;
                        }

                    } else if (networkType === "network_groups") {

                        var allGroupsVisible = $('#sub_groups').css('display');

                        wireGroupChecks(grp_ids);

                        if (allGroupsVisible == 'block') {
                            $('#sub_groups').slideUp('fast');
                        } else {
                            $('#sub_groups').slideDown('fast');
                            $('.close_sub_groups').unbind('click').bind('click', function () {
                                wireGroupChecks(grp_ids);
                                $('#sub_groups').slideUp('fast');
                            });
                        }

                    } else if (networkType === "network_friends") {
                        
                        if (friendsOn) {
                            $('#network_friends').find('.icon_friends_on').replaceWith('<div class="icon_friends_off"></div>');
                            networks = $.grep(networks, function(o,i) {
                                return o.type === "Friends" ? ((friend_obj = o), true) : false 
                            }, true);
                            disableSendCount--;
                            friendsOn = false;

                        } else if (friendsOn === false) {
                            $('#network_friends').find('.icon_friends_off').replaceWith('<div class="icon_friends_on"></div>');
                            networks.push(friend_obj);
                            disableSendCount++;
                            friendsOn = true;
                        }
                    }

                    if (disableSendCount < 1) {
                        $(theBtn).css('cursor','auto');
                        $(theBtn).css('color','#eee');
                        $(theBtn).css('background','#ccc');
                        $(theBtn).attr("disabled", "disabled");

                    } else if (disableSendCount >= 1) {
                        $(theBtn).css('cursor','pointer');
                        $(theBtn).css('color','white');
                        $(theBtn).css('background','#f58733');
                        $(theBtn).removeAttr("disabled");
                    }
                });

                // submit the intro
                $('#intro_request_form').unbind('submit').bind('submit', function() {

                    // Vars
                    var text_area = $('#intro_text_area').find('textarea'),
                    name, company, bounty;
                    company = details.organization;

                    // Reset sent message
                    $('#widget_msg p').empty();
                    $('#widget_msg').hide();

                    // Is there commission sharing?
                    if ($('#check_comission_2').is(":checked")) {
                        bounty = true;
                    } else {
                        bounty = false;
                    }

                    // If no custom message, set the default message:
                    if (text_area.val() === '') {
                        text_area.val('I would like to get an introduction to '+details.label+'. Could you help me?');
                    }

                    // Config the params:
                    var params = {
                        name : details.label,
                        message : text_area.val(),
                        networks : networks,
                        contact_id : details.id,
                        bounty : bounty
                    }

                    // Hide Modal:
                    $('.overlay').hide();
                    $('#intro_modal').hide();

                    // Display notification sent msg
                    wireIntroSentMsgs(params.name, company);

                    // Make the server request:
                    WHOAT.networking.postToServerWithAjaxJSON('/introduction/request', params, function (response) {
                        if (response.result === 'error') {
                            WHOAT.notify.topNotify('error', response.message);
                        }
                    });

                    return false;
                });

                // Create the Intro Request sent notification:
                var introSentMsgBuilder = function(name, company) {
                    if (company != null || undefined) {
                        return "Intro request sent for <span>"+name+"</span> at "+company+"";
                    } else {
                        return "Intro request sent for <span>"+name+"</span>";
                    }
                };

                // Display & wire the Intro Request sent notification;
                var wireIntroSentMsgs = function(name, company) {
                    
                    $('.top_alert').hide();
                    $('.top_alert').css('top', '-36px');
                    $('.top_alert p').empty();
                    $('.top_alert p').append(introSentMsgBuilder(name, company));
                    $('.top_alert').show();
                    $('.top_alert').stop().animate({top: '0px'}, 300);

                    $('.top_alert').unbind('click').bind('click', function() {
                        var $div = $(this).closest("div");
                        $(this).closest('p').empty();
                        $('.top_alert').hide();
                    });

                    // slide up after 4 secs
                    setTimeout(function () {
                        $('.top_alert').animate({ top: -36 }, 300, function() {
                            $('.top_alert p').empty();
                            $('.top_alert').hide();
                        });

                    }, 4000);
                };
            }

            // Obtain Network counts & display buttons:
            getNetworks(networks);

            // Show Network counts:
            addNumbers(organization_count, group_count, friend_count);

            // Wire Networks
            setupRequestModal();

            // Show vCard if target is also a contact
            if (has_vcard) {

                var loop_num = 0;
                phones = (contactObj === undefined) ? [] : contactObj.phones,
                emails = (contactObj === undefined) ? [] : contactObj.emails;

                $('#intro_contact_details').show();

                if (details.label !== undefined) {
                    $('#intro_contact_details .username').text(details.label);
                }

                if (details.title !== undefined) {
                    $('#intro_contact_details .title').text(details.title);
                }

                if (details.organization !== undefined) {
                    $('#intro_contact_details .company').text(details.organization);
                }

                // Build vCard for Search Result Contact:
                if (phones !== undefined) {
                    if (phones.length !== 0) {
                        for ( var i = 0, length = phones.length; i < length; i++ ) {
                            loop_num = i; 
                            $('#vcard_table #modal_vcard_row').append(rowPhoneBuilder(
                                phones[i].label,
                                loop_num));
                        }
                    }
                }

                if (emails !== undefined) {
                    if (emails.length !== 0) {
                        for ( var i = 0, length = emails.length; i < length; i++ ) {
                            loop_num = i;
                            $('#vcard_table #modal_vcard_row').append(rowEmailBuilder(
                                emails[i].label,
                                loop_num));
                        }
                    }
                }

                $('.vcard_details_section').show();
            }

            // SHOW MODAL
            // ===============================
            $('.overlay').show();
            $('#intro_modal').fadeIn('fast');
        }

        var activateCloseModal = function() {

            $('div.overlay').addClass('close_intro_modal');

            $('.close_intro_modal').unbind('click').bind('click', function () {

                // Reset the modal
                modalReset();

                // SHOW MODAL
                $('.overlay').hide();
                $('.overlay').removeClass('close_intro_modal');
                $('#intro_modal').hide();
            });
        }

        var modalReset = function() {
            $('#sub_groups').hide();                            // Hide sub groups
            $('#modal_vcard_row').empty();                      // Empty contact vCard
            $('#sub_groups .groups_check_row ul').empty();      // Empty groups
            $('#intro_contact_details li').empty();             // Empty target vCard
            $('#intro_network_selection .username').text('');   // Clear target username
            $('#intro_network_selection .title').text('');      // Clear target title
            $('#intro_network_selection .company').text('');    // Clear target company
            $('#intro_text_area textarea').val('');             // Empty textarea
        }

        return {
            createVcardModal : createVcardModal,
            wireVCardButtons : wireVCardButtons,
            createRequestModal : createRequestModal,
            activateCloseModal : activateCloseModal,
            modalReset : modalReset
        }
    }

    // Create NameGame Results Modal:
    var makeNameGameModal = function(name, names, ids, total) {

        // FILL MODAL
        $('.outbox_details_name_game .name_game_count em').text(total);
        $('.outbox_details_name_game h2 strong').text(name);

        // WIRE MODAL
        wireModals().activateCloseModal();

        // SHOW MODAL
        $('#intro_modal').css('top', '5%');
        $('.outbox_details_name_game').show();
        $('.overlay').show();
        $('#intro_modal').fadeIn('fast');
    }

    // If Member avatar is missing, replace with default image:
    var imgError = function(image) {
        image.onerror = "";
        image.src = "/static/img/dashboard/messages/target_avatar.png";
        return true;
    }
    
    return {
        wireTourSyncModal : wireTourSyncModal,
        generateModal : generateModal,
        wireModals : wireModals,
        makeNameGameModal : makeNameGameModal,
        imgError : imgError
    };

}(jQuery, window));