// =========================================================================
//  MESSAGING MODULE
// =========================================================================
WHOAT.messaging = (function ($, w, undefined) {
    'use strict';
    
    // function init() {};
    
    var wire = (function () {

        var namegame_names = [], namegame_ids = [];

        // Build a Name Game Row
        function buildNameGameRow(id, label, title, company) {
            title   = title || " ";
            company = company || " ";

            if (title === null) {
                title = " ";
            }

            return "<tr data-contact-id='"+id+"'><td data-common-label='"+label+"' data-common-title='"+title+"' data-common-company='"+company+"'><div class='vcard_gray orange open_modal'></div></td><td class='common_label small_gray_font' style='padding-left:10px;'>"+label+"</td><td class='common_label small_gray_font' style='padding-left:10px;'>"+title+"</td><td class='common_label namegame_company small_gray_font' style='padding-left:10px;'>"+company+"</td></tr>";
        };

        // Create multiple Name Game Rows
        function callBuildNameGameRow(target_row, response) {
            for ( var i = 0, length = namegame_names.length; i < length; i++ ) {
                target_row.append(buildNameGameRow(
                    namegame_ids[i],
                    namegame_names[i],
                    response.contacts[i].title,
                    response.contacts[i].company)
                );
            }

            target_row.fadeIn('fast');

            // Wire NameGame open vcard modal button:
            $('.name_game_rows .open_modal').unbind('click').bind('click', function () {
                var vcard = $(this),
                user      = 'contact',
                personID  = vcard.closest('tr').data('contact-id'),
                id        = $.trim(personID),
                params    = { 'id' : id };

                // Create Contact vCard
                WHOAT.modal.generateModal('contact', id, params, 'vcard', false, null, null, null, "off");
            });
        };

        // Play Name Game
        function playNameGame(name, type, id) {
            name = name || "";
            type = type || "";
            id   = id   || "";

            WHOAT.networking.getToServerWithAjax(('/api/v1/name_game/play/'+id), null, function (response) {
                
                var target_row;

                if (response) {
                    if (response.contacts !== null || undefined) {

                        namegame_names = [],
                        namegame_ids   = [];

                        for ( var i = 0; i < response.contacts.length; i++ ) {
                            namegame_names.push(response.contacts[i].label);
                            namegame_ids.push(response.contacts[i].id);
                        }

                        if (type === "rows") {
                            target_row = $('.inbox_details_name_game .name_game_rows');
                        } else if (type === "modal") {
                            target_row = $('.outbox_details_name_game .name_game_rows');
                            // RESET MODAL
                            $('.injected_div').empty();
                            $('.outbox_details_name_game .name_game_rows').empty();
                            WHOAT.modal.makeNameGameModal(name, namegame_names, namegame_ids, namegame_names.length);
                        }

                        callBuildNameGameRow(target_row, response);

                    } else {
                        // No name game results
                    }
                }
            });
        };

        // Need to organize these friend functions...
        function wireFriendDetailsVcard() {

            // Show Requester vCard:
            $('.vcard_button .open_modal').unbind('click').bind('click', function () {

                var vcard  = $(this),
                user       = 'member',
                avatarPath = vcard.closest('li').data('avatar'),
                personID   = vcard.closest('li').data('member-id'),
                emailsData = vcard.closest('li').data('get-emails'),
                phonesData = vcard.closest('li').data('get-phones'),
                label      = $('.sender_friend_label').html(),
                title      = $('.sender_friend_title').html(),
                company    = $('.sender_friend_company').html(),
                avatar     = $.trim(avatarPath),
                id         = $.trim(personID),
                emails     = $.trim(emailsData),
                phones     = $.trim(phonesData),
                params     = { 'id' : id, 'avatar' : avatar, 'label' : label, 'title' : title, 'company' : company };

                $('.outbox_details_name_game').hide();

                WHOAT.modal.generateModal('member', id, params, 'vcard', false, null, emails, phones, "off");
            });

            // Play NameGame with Requester:
            $('.namegame_button .open_modal').unbind('click').bind('click', function () {

                var namegame = $(this),
                user         = 'member',
                avatarPath   = namegame.closest('li').data('avatar'),
                personID     = namegame.closest('li').data('member-id'),
                avatar       = $.trim(avatarPath),
                id           = $.trim(personID),
                params       = { 'id' : id };

                var namegame = $(this),
                memberID     = namegame.closest('li').data('member-id'),
                name         = namegame.closest('ul').find('.friend_name').text(),
                memberName   = $.trim(name);

                playNameGame(memberName, 'modal', memberID);
            });
        }

        // Wire (OUTBOX) List View
        // ======================================================================================================
        var outboxList = function (viewing_num, total_num, outbox_table, outbox_count) {

            var outbox_list_URL = function() { return "/outbox"; }
            var outbox_details_URL = function(messageID) { return '/outbox/'+messageID; }

            // setup minimize for outbox list widget
            WHOAT.helper.wireMinimize(".intro_outbox_list");
            
            // View Outbox List
            $(outbox_count).unbind('click').bind('click', function() {
                WHOAT.networking.redirectToURL(outbox_list_URL());
            });

            // View Outbox Message Details
            // $(".row_outbox").unbind('click').bind('click', function () {
            //     var $tr = $(this).closest("tr"),
            //     id = $tr.data('message-id');
            //     WHOAT.networking.redirectToURL(outbox_details_URL(id));
            // });

            // Delete my request
            $('.delete_my_request').unbind('click').bind("click", function() {
                var $tr          = $(this).closest("tr"),
                id               = $tr.data('message-id'),
                outbox_num       = $(viewing_num).text(),
                outbox_total     = $(total_num).text(),
                new_outbox_num,
                new_outbox_total;

                // Update My Requests count
                if (outbox_num > 0 && outbox_total > 0) {
                    new_outbox_num   = (outbox_num - 1);
                    new_outbox_total = (outbox_total - 1);
                    $(outbox_count).fadeOut('fast', function() {
                        $(viewing_num).text(new_outbox_num);
                        $(total_num).text(new_outbox_total);
                        $(outbox_count).fadeIn('fast');
                    });
                }

                $tr.fadeOut('slow');

                // Update count
                $('.outbox_badge').fadeOut('slow', function() {
                    $.get("/get/outbox/unread", function(data) {
                        $(".fetch_outbox_badge").html(data);
                        
                        setTimeout(function () {
                            WHOAT.dashboard.home.outbox.reWireOutboxUnread();
                        }, 1000);
                    });
                });

                // if 3 deleted get next 3
                if (outbox_num === "1" && outbox_total > 1) {
                    $('#my_requests .loading_next_box').show();
                    $('.default_outbox_count').fadeOut('fast');
                    $('.default_outbox_count').empty();
                    $('.default_outbox_list').fadeOut('fast', function() {

                        // Fetch next list
                        $.get("/get/outbox", function(data) {
                            $(".fetch_next_outbox_list").html(data);

                            // Update count
                            $.get("/get/outbox/count", function(data) {
                                $(".fetch_outbox_count").html(data);
                                
                                setTimeout(function () {
                                    // Re-wire outboxList
                                    WHOAT.dashboard.home.outbox.fetchNextOutbox();
                                    $('#my_requests .loading_next_box').hide();
                                }, 1500);
                            });
                        });
                    });
                }

                //if no outbox msgs left, display no request div:
                if (outbox_total === "1") {
                    $(outbox_table).hide();
                    $('.no_outbox_requests_hidden').fadeIn('fast');
                }

                WHOAT.networking.postToServerWithAjax('/outbox/'+id+'/delete', null, function (response) {
                    
                });

                return false;
            });

            // Animates the delete outbox request trashcan
            var wireTrashCans = function() {

                $('.a_outbox_row').unbind('mouseover').bind('mouseover', function() {
                    $(this).find('.trashcan').show();
                    $(this).find('.trashcan').animate({ left: "0px" }, 80);
                });

                $('.a_outbox_row').unbind('mouseout').bind('mouseout', function() {
                    $(this).find('.trashcan').css('left', '-24px');
                    $(this).find('.trashcan').hide();
                    // $(this).find('.trashcan').css('left', '-24px');
                });

                // $('.trashcan').unbind('mouseover').bind('mouseover', function() {
                //     $(this).animate({ left: "0px" }, 80);     
                // });

                // $('.trashcan').unbind('mouseout').bind('mouseout', function() {
                //     $(this).find('.trashcan').css('left', '-24px');
                // });
            }

            // wire delete outbox requests
            wireTrashCans();
        }

        // Wire (OUTBOX) Details
        // ======================================================================================================
        var outboxDetails = function (message_id) {

            // Get type of Request (Intro or Friend)
            var requestType = $('#my_request_details').data('request-type');

            function wireGetNameGame() {
                $('.name_game .open_modal').unbind('click').bind('click', function () {
                    var row    = $(this),
                    // memberID   = row.closest('tr').data('member-id'),
                    memberID   = row.data('member-id'),
                    name       = row.closest('tr').find('.response_name').text(),
                    memberName = $.trim(name);
                    playNameGame(memberName, 'modal', memberID);
                });
            }

            // This is the OUTBOX details view
            // ==================================================================================================
            if (requestType === "intro") {

                // Play NameGame
                $(".outbox_accepted_row .name_game p").each( function( i, el ) {
                    var elem = $( el );
                    var member_id = elem.data('member-id');

                    // Make API call to get common contact counts:
                    WHOAT.networking.getToServerWithAjax(('/api/v1/name_game/play/'+member_id), null, function (response) {
                        if (response) {
                            if (response.contacts !== null || undefined) {
                                elem.html(response.contacts.length);
                            }
                        }
                    });

                    elem.addClass('open_modal');

                    // Wire buttons
                    wireGetNameGame();
                });

                // Show Responder vCard:
                $('.response_vcard .open_modal').unbind('click').bind('click', function () {
                    var vcard  = $(this),
                    user       = 'member',
                    modalType  = 'contact_vcard',
                    avatarPath = vcard.closest('tr').data('avatar'),
                    personID   = vcard.closest('tr').data('member-id'),
                    emailsData = vcard.closest('tr').data('get-emails'),
                    phonesData = vcard.closest('tr').data('get-phones'),
                    titleData  = vcard.closest('tr').data('title'),
                    coData     = vcard.closest('tr').data('company'),
                    label      = $('.outbox_accepted_row .response_name').html(),
                    avatar     = $.trim(avatarPath),
                    title      = $.trim(titleData),
                    company    = $.trim(coData),
                    id         = $.trim(personID),
                    emails     = $.trim(emailsData),
                    phones     = $.trim(phonesData),
                    params;
                    params     = { 'id' : id, 'avatar' : avatar, 'label' : label, 'title' : title, 'company' : company };

                    // emails.replace(/[\n\r]/g, '');
                    // phones.replace(/[\n\r]/g, '');

                    $('.outbox_details_name_game').hide();
                    
                    WHOAT.modal.generateModal('member', id, params, 'vcard', false, null, emails, phones);
                });

            // This is the friend outbox details view
            // ==================================================================================================
            } else if (requestType === "friend") {
                wireFriendDetailsVcard();
            }

            $('#back_to_requests').unbind('click').bind('click', function () {
                window.location = '/outbox';
            });

            $('#delete_this_request').unbind('click').bind('click', function () {

                $('#delete_this_request').css('cursor','auto');
                $('#delete_this_request').attr("disabled", "disabled");
                $('#delete_this_request').text('deleting...');

                WHOAT.networking.postToServerWithAjax('/outbox/'+(message_id)+'/delete', null, function (response) {
                    if (response) {
                        setTimeout(function () {
                            window.location = '/outbox';
                        }, 1);
                    }
                });
            });
        }

        // Wire (INBOX) List View
        // ======================================================================================================
        var inboxList = function (viewing_num, total_num, inbox_table) {

            var inbox_list_URL = function() { return "/inbox"; }
            var inbox_details_URL = function(messageID) {
                return '/inbox/'+messageID;
            }

            // view inbox list
            $('.goto_inbox').unbind('click').bind('click', function() {
                WHOAT.networking.redirectToURL(inbox_list_URL());
            });

            // setup minimize for inbox list widget
            WHOAT.helper.wireMinimize(".intro_inbox_list");

            // Message Tip
            $('#inbox_thead_message').unbind('mouseover').bind('mouseover', function() {
                $('#inbox_thead_message .help_bubble').fadeIn('fast');
            });

            $('#inbox_thead_message').unbind('mouseout').bind('mouseout', function() {
                $('#inbox_thead_message .help_bubble').hide();
            });

            // Quick Actions tip
            $('#inbox_thead_actions').unbind('mouseover').bind('mouseover', function() {
                $('#inbox_thead_actions .help_bubble').fadeIn('fast');
            });

            $('#inbox_thead_actions').unbind('mouseout').bind('mouseout', function() {
                $('#inbox_thead_actions .help_bubble').hide();
            });

            // View Inbox Message Details
            // $(".row_inbox").unbind('click').bind('click', function () {
            //     var $tr = $(this).closest("tr"),
            //     id = $tr.data('message-id');
            //     WHOAT.networking.redirectToURL(inbox_details_URL(id));
            // });

            // Remove an Inbox row
            function removeInboxRow(this_button, type, params, action) {
                var $tr = this_button.closest("tr"),
                inbox_msg_id = $tr.data('message-id');

                $tr.fadeOut('fast');                            
                deleteUpdateInboxCount();

                if (action === 'delete') {
                    WHOAT.networking.postToServerWithAjax('/inbox/'+(inbox_msg_id)+type, params, function (response) {

                        if (response.result === 'success') {
                            // Update badge count
                            $('.inbox_badge').fadeOut('fast', function() {
                                $.get("/get/inbox/unread", function(data) {
                                    $(".fetch_inbox_badge").html(data);
                                    
                                    setTimeout(function () {
                                        WHOAT.dashboard.home.inbox.reWireInboxUnread();
                                    }, 1000);
                                    
                                });
                            });
                        }
                    });
                }
            }

            // Updates the Inbox count base on deletes and delcines:
            function deleteUpdateInboxCount() {
                var inbox_num   = $(viewing_num).text(),
                inbox_total     = $(total_num).text(),
                new_inbox_num,
                new_inbox_total;

                // Update Their Requests count
                if (inbox_num > 0 && inbox_total > 0) {
                    new_inbox_num   = (inbox_num - 1);
                    new_inbox_total = (inbox_total - 1);
                    $('.widget_lid .goto_inbox').fadeOut('fast', function() {
                        $(viewing_num).text(new_inbox_num);
                        $(total_num).text(new_inbox_total);
                        $('.widget_lid .goto_inbox').fadeIn('fast');
                    });
                }

                // if 3 deleted get next 3
                if (inbox_num === "1" && inbox_total > 1) {
                    $('#their_requests .loading_next_box').show();
                    $('.default_inbox_count').fadeOut('fast');
                    $('.default_inbox_count').empty();
                    $('.default_inbox_list').fadeOut('fast', function() {

                        // Fetch next list
                        $.get("/get/inbox", function(data) {
                            $(".fetch_next_inbox_list").html(data);

                            // Update count
                            $.get("/get/inbox/count", function(data) {
                                $(".fetch_inbox_count").html(data);
                                
                                setTimeout(function () {
                                    // Re-wire outboxList
                                    WHOAT.dashboard.home.inbox.fetchNextInbox();
                                    $('#their_requests .loading_next_box').hide();
                                }, 1000);
                                
                            });
                        });
                    });
                }

                //if no inbox msgs left, display no request div:
                if (inbox_total === "1") {
                    $(inbox_table).hide();
                    $('.no_inbox_requests_hidden').fadeIn('fast');
                }
            }

            // Quick Action clicked:
            $('.inbox_action').unbind('click').bind('click', function() {

                // HTML replacements
                var deleteXhtml = $('<div data-action="delete" class="delete_their_request" title="Delete"></div>'),
                iconSent        = $('<div class="inbox_td_icon_send">Sent</div>'),
                introAccepted   = $('<div class="inbox_icon_accepted"></div><p>Intro</p>'),
                iconFriend      = $('<div class="inbox_friend_icon_accepted"></div><p>Friend</p>'),

                // VARS, Buttons & cointaners
                $tr             = $(this).closest("tr"),
                user_choice     = $(this).data('action'),
                request_type    = $(this).data('request-type'),
                btnAccept       = $(this).closest(".center_action_group").find(".quick_accept"),
                btnSend         = $(this).parents(".center_action_group").find(".quick_send"),
                btnDeny         = $(this).parents(".center_action_group").find(".quick_deny"),
                deleteBox       = $(this).parents(".center_action_group").find(".delete_x_here"),
                quickContainer  = $(this).closest(".center_action_group").find(".quick_btn_container"),
                iconContainer   = $tr.find(".td_inbox_icon .inbox_icon_container"),
                iconNew         = $tr.find(".td_inbox_icon .inbox_icon_new"),
                id              = $tr.data('message-id'),
                sender_id       = $tr.data('sender-id'),
                inbox_msg_id    = id,
                params          = {},
                message,
                response;

                // Start Server request to Accept this request:
                // --------------------------------------------------
                if (user_choice === 'accept' || user_choice === 'accept_friend') {

                    if (user_choice === 'accept') {
                        response = "I'd be happy to make this introduction if possible. Contact me at your convenience.";
                    } else if (user_choice === 'accept_friend') {
                        response = "Hey, I would like to add you to my friend network so we can help each other out.";
                    }

                    params  = { 'response':response, 'id':inbox_msg_id }

                    $(btnAccept).css('background-position', '-246px -5px');
                    $(btnAccept).attr("disabled", "disabled");
                    $(btnDeny).attr("disabled", "disabled");

                    // Swap out Icons
                    if (user_choice === 'accept') {
                        $(iconContainer).fadeOut('fast', function() {
                            $(iconNew).append(introAccepted);
                            $(iconNew).fadeIn('fast');
                        });
                    } else if (user_choice === 'accept_friend') {
                        $(iconContainer).fadeOut('fast', function() {
                            $(iconNew).append(iconFriend);
                            $(iconNew).fadeIn('fast');
                        });
                    }

                    // Replace Quick buttons with Quick Delete
                    $(quickContainer).empty();
                    $(quickContainer).fadeOut('fast', function() {
                        $(deleteBox).append(deleteXhtml);
                        $(deleteBox).fadeIn('fast');

                        $('.delete_their_request').unbind('click').bind('click', function() {
                            removeInboxRow($(this), '/delete', null, 'delete');
                        });
                    });

                    WHOAT.networking.postToServerWithAjax('/inbox/'+(inbox_msg_id)+"/accept", params, function (response) {

                        if (response.result === "success") {

                            // Update badge count
                            $('.inbox_badge').fadeOut('fast', function() {
                                $.get("/get/inbox/unread", function(data) {
                                    $(".fetch_inbox_badge").html(data);
                                    
                                    setTimeout(function () {
                                        WHOAT.dashboard.home.inbox.reWireInboxUnread();
                                    }, 1000);
                                    
                                });
                            });

                        } else if (response.result === "error") {
                            WHOAT.notify.topNotify('error', response.message);
                            $(deleteBox).hide();
                            $(deleteBox).empty();
                            $(quickContainer).show();
                            $(btnAccept).css('cursor','pointer');
                            $(btnAccept).css('background-position','-286px -5px');
                            $(btnAccept).removeAttr("disabled");
                        }
                    });
                    return false;

                // Start Server request to Forward/Send this message:
                // --------------------------------------------------
                } else if (user_choice === 'send') {
                    message = "I thought this would be a good deal for the company.";
                    params  = { 'response':message, 'id':inbox_msg_id }

                    // Disable Buttons here while waiting on Request
                    $(btnSend).css('background-position', '-341px -80px');
                    $(btnSend).attr("disabled", "disabled");
                    $(btnDeny).attr("disabled", "disabled");

                    WHOAT.networking.postToServerWithAjax('/inbox/'+(inbox_msg_id)+'/accept', params, function (response) {

                        if (response.result === "success") {
                            $tr.fadeOut('fast');

                            // Update count
                            $('.inbox_badge').fadeOut('slow', function() {
                                $.get("/get/inbox/unread", function(data) {
                                    $(".fetch_inbox_badge").html(data);
                                    
                                    setTimeout(function () {
                                        WHOAT.dashboard.home.inbox.reWireInboxUnread();
                                    }, 1000);
                                    
                                });
                            });

                        } else if (response.result === "error") {
                            WHOAT.notify.topNotify('error', response.message);
                        }

                    });
                    return false;

                // Start Server request to Decline this message:
                // --------------------------------------------------
                } else if (user_choice === 'deny' || user_choice === 'deny_friend') {

                    if (user_choice === 'deny') {
                        message = "Sorry, I'm unable to help you at this time. Good luck in your search!";
                    } else if (user_choice === 'deny_friend') {
                        message = " ";
                    }

                    params = { message:message, id:inbox_msg_id }

                    deleteUpdateInboxCount();

                    $(btnDeny).css('background-position', '-327px -6px');
                    $(btnDeny).attr("disabled", "disabled");
                    $(btnAccept).attr("disabled", "disabled");

                    removeInboxRow($(this), '/deny', params, 'delete');
                }
            });

            // Start Server request to Delete this message:
            $('.delete_their_request').unbind('click').bind('click', function() {
                removeInboxRow($(this), '/delete', null, 'delete');
            });
        }

        // Wire (INBOX) Details
        // ======================================================================================================
        var inboxDetails = function (message_id) {
            
            // Get type of Request (Intro or Friend)
            var requestType = $('#their_request_details').data('request-type');

            // This is an INTRO Request
            // ======================================================================================================
            if (requestType === "intro") {
                
                // Get Name Game Results
                var vcard, user, modalType, avatarPath, personID, avatar, id, params, label, title, company, emailsData, phonesData, emails, phones,
                name_game_id   = $('#their_request_details').data('name-game-id'),
                namegame_names = [],
                namegame_ids   = [];

                playNameGame(null, 'rows', name_game_id);

                // RESPONSE BUTTON:
                $('.inbox_response_btn').unbind('click').bind('click', function () {

                    // VARS setup
                    var choice    = $(this).closest('li').data('choice'),
                    acceptForm    = $('.response_form .accepted_form'),
                    denyForm      = $('.response_form .denied_form'),                    
                    requesterName = $('.the_requesters_name').html(),
                    targetName    = $('.target_vcard_area .bold').html(),
                    defaultMsg, text_area, theBtn;

                    var w  = $(window);
                    var ww = w.width();

                    $('.center_details_right').css('margin-top', '0px');

                    if (choice === 'accept') {

                        defaultMsg = "I would be happy to make this introduction if possible. Contact me at your convenience.",
                        text_area  = document.getElementById("accept_response_text"),
                        theBtn     = $('.accepted_form .accept_this_request');

                        sendIntroResponse(text_area, choice, defaultMsg, acceptForm, message_id, theBtn, 
                            'Sending...', '/accept', 'Request Accepted', requesterName, targetName);

                    } else if (choice === 'send') {

                        defaultMsg = "I thought this would be a good deal for the company.",
                        text_area  = document.getElementById("accept_response_text"),
                        theBtn     = $('.accepted_form .accept_this_request');

                        sendIntroResponse(text_area, choice, defaultMsg, acceptForm, message_id, theBtn, 
                            'Sending...', '/accept', 'Request Accepted', requesterName, targetName);

                    } else if (choice === 'deny') {

                        defaultMsg = "Sorry, I am unable to help you at this time. Good luck in your search!",
                        text_area  = document.getElementById("deny_response_text"),
                        theBtn     = $('.denied_form .deny_this_request');

                        sendIntroResponse(text_area, choice, defaultMsg, denyForm, message_id, theBtn, 
                            'Processing...', '/deny', 'Request Denied', requesterName, targetName);
                    }
                });

                // Show Requester vCard:
                $('.block_requestor .open_modal').unbind('click').bind('click', function () {
                    vcard      = $(this),
                    user       = 'member',
                    avatarPath = vcard.closest('li').data('avatar'),
                    personID   = vcard.closest('li').data('member-id'),
                    emailsData = vcard.closest('li').data('get-emails'),
                    phonesData = vcard.closest('li').data('get-phones'),
                    avatar     = $.trim(avatarPath),
                    id         = $.trim(personID),
                    label      = $('.the_sender_label').html(),
                    title      = $('.the_sender_title').html(),
                    company    = $('.the_sender_company').html(),
                    emails     = $.trim(emailsData),
                    phones     = $.trim(phonesData);
                    params     = { 'id' : id, 'avatar' : avatar, 'label' : label, 'title' : title, 'company' : company };

                    WHOAT.modal.generateModal('member', id, params, 'vcard', false, null, emails, phones, "off");
                });

                // Show Target vCard:
                $('.block_target .open_modal').unbind('click').bind('click', function () {
                    vcard      = $(this),
                    user       = 'contact',
                    personID   = vcard.closest('li').data('contact-id'),
                    id         = $.trim(personID);
                    params     = { 'id' : id };

                    WHOAT.modal.generateModal('contact', id, params, 'vcard', null, null, null, null, 'off');
                });

                // Show Manager vCard:
                $('.manager_message .open_modal').unbind('click').bind('click', function () {
                    vcard  = $(this),
                    user   = 'contact',
                    id     = vcard.closest('span').data('id'),
                    params = { 'id' : id };

                    WHOAT.modal.generateModal('member', id, params, 'vcard');
                });

            // This is an FRIEND Request
            // ======================================================================================================
            } else if (requestType === "friend") {

                // wire the vCard of the requestor or friend target
                wireFriendDetailsVcard();

                // RESPONSE BUTTON:
                $('.friend_response').unbind('click').bind('click', function () {

                    var choice = $(this).siblings('p').text().toLowerCase(),
                    id         = $('.friend_id_details').data('friend-id');

                    $('.big_accept').attr("disabled", "disabled");
                    $('.big_accept').css('cursor','none');
                    $('.big_deny').attr("disabled", "disabled");
                    $('.big_deny').css('cursor','none');

                    if (choice === 'accept') {
                        $('.big_deny').addClass('big_deny_clicked');
                        $('.big_deny').removeClass('big_deny');
                        $('.big_deny').removeClass('friend_response');
                        sendFriendResponse(message_id, '/accept');

                    } else if (choice === 'deny') {
                        $('.big_accept').addClass('big_accept_clicked');
                        $('.big_accept').removeClass('big_accept');
                        $('.big_accept').removeClass('friend_response');
                        sendFriendResponse(message_id, '/deny');
                    }
                });
            }

            $('#back_to_requests').unbind('click').bind('click', function () {
                window.location = '/inbox';
            });

            $('#delete_this_request').unbind('click').bind('click', function () {
                $('#delete_this_request').css('cursor','auto');
                $('#delete_this_request').attr("disabled", "disabled");
                $('#delete_this_request').text('deleting...');

                WHOAT.networking.postToServerWithAjax('/inbox/'+(message_id)+'/delete', null, function (response) {
                    if (response) {
                        setTimeout(function () {
                            window.location = '/inbox';
                        }, 1);
                    }
                });
            });
        }

        // Inbox Details Functions
        // --------------------------------------------------------------------------------------------------
        function responseTextarea(state, choice, defaultmsg, textarea) {

            if (state === 'show') {
                $('.inbox_details_buttons').hide();
                $('.inbox_details_instruction').hide();

                if (choice === 'accept' || choice === 'send') {

                    if (choice === 'send') {
                        $('.response_form .accepted_form strong').text('Forwarding');
                        $('.response_form .accepted_form p').text('The Executive will see your forwarded message below.');
                        $('#accept_response_text').val('I thought this would be a good deal for the company.');
                    }

                    $('.response_form .accepted_form').show();

                } else if (choice === 'deny') {
                    $('.response_form .denied_form').show();
                }

                textarea.onfocus = function() { if (this.value === defaultmsg) { this.value = ""; } }
                textarea.onblur  = function() { if (this.value === "") { this.value = defaultmsg; } }

            } else if (state === 'hide') {
                if (choice === 'accept' || choice === 'send') {
                    $('.response_form .accepted_form').hide();
                } else if (choice === 'deny') {
                    $('.response_form .denied_form').hide();
                }

                $('.inbox_details_buttons').show();
                $('.inbox_details_instruction').show();

                textarea.value = defaultmsg;
            }
        }

        // Respond to Intro request
        function sendIntroResponse(text_area, choice, defaultmsg, form, message_id, theBtn, buttonText, route, successmsg, requester, target) {

            // Wire the textarea
            responseTextarea('show', choice, defaultmsg, text_area);

            // Cancel request response
            $('.btn_cancel_message').unbind('click').bind('click', function () {
                responseTextarea('hide', choice, defaultmsg, text_area);
            });

            // SUBMIT THE INTRO RESPONSE FORM
            // =================================================================================================+
            $(form).unbind('submit').bind("submit", function() {

                if (choice === 'accept' || choice === 'send') {
                    var message = $('#accept_response_text').val();
                } else if (choice === 'deny') {
                    var message = $('#deny_response_text').val();
                }
                
                var params  = { 'response':message, 'id':message_id };

                $(theBtn).css('cursor','auto');
                $(theBtn).css('background','#ccc');
                $(theBtn).text(buttonText);
                $(theBtn).attr("disabled", "disabled");

                WHOAT.networking.postToServerWithAjax(('/inbox/'+message_id+route), params, function (response) {

                    if (response) {

                        if (choice === 'accept') {
                            $(theBtn).text(successmsg);
                            location.reload();

                        } else if (choice === 'send') {
                            $(theBtn).text('Request Forwarded');
                            setTimeout(function () {
                                window.location = '/dashboard';
                            }, 2000);

                        } else if (choice === 'deny') {
                            window.location = '/';
                        }

                    } else if (response.statusText === 'error') {
                        // error message...
                    }
                    
                });

                return false;
            });
        }

        // Respond to Friend request
        function sendFriendResponse(message_id, choice) {

            var params = { 'id':message_id, 'response':'Accepted Friend Request' };
            WHOAT.notify.topNotify('success', 'You accepted the Friend Request');

            WHOAT.networking.postToServerWithAjax('/inbox/'+(message_id)+choice, params, function (response) {

                if (response.result === 'success') {

                    if (choice === '/accept') {
                        setTimeout(function () {
                            window.location = '/inbox';
                        }, 4001);

                    } else if (choice === '/deny') {
                        window.location = '/';
                    }
                    
                } else if (response.result === 'error') {
                    WHOAT.notify.topNotify('error', response.message);
                }
            });
        }

        return {
            outboxList: outboxList,
            outboxDetails: outboxDetails,
            inboxList : inboxList,
            inboxDetails : inboxDetails
        };

    }());

    return {
        wire : wire
        // init : init
    };

}(jQuery, window));

// $(document).ready(function () {
//     WHOAT.messaging.init();
// });