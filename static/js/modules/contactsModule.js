// =========================================================================
//  MY CONTACTS MODULE
// =========================================================================
WHOAT.contacts = (function ($, w, undefined) {
    'use strict';

    // /sync view
    var wireSyncContacts = function () {

        // Go to iTunes store
        $('.goto_itunes').unbind('click').bind('click', function () {
            WHOAT.networking.redirectToURL('https://itunes.apple.com/us/app/who-intro/id777717885', '_blank');
        });

        // Start Exchange Snarf
        $('.start_exchange_snarf').unbind('click').bind('click', function () {
            $.get("/show/ftue", function(data) {
                $("#ftue_tour").html(data);
                WHOAT.modal.wireTourSyncModal().startTour("exchange", "withClose");
            });
        });

        $('.exchange_stats .td_help').unbind('mouseover').bind('mouseover', function() {
            $('.exchange_stats .help_bubble').fadeIn('fast');
        });

        $('.exchange_stats .td_help').unbind('mouseout').bind('mouseout', function() {
            $('.exchange_stats .help_bubble').hide();
        });

        $('.gmail_stats .td_help').unbind('mouseover').bind('mouseover', function() {
            $('.gmail_stats .help_bubble').fadeIn('fast');
        });

        $('.gmail_stats .td_help').unbind('mouseout').bind('mouseout', function() {
            $('.gmail_stats .help_bubble').hide();
        });
    }

    // /my contacts view
    var wireContacts = function () {

        // Open vCard modal
        $('#table_contacts .open_modal').unbind('click').bind('click', function () {
            var row = $(this),
            params,
            trow          = row.parents('tr:first'),
            contactID     = row.parents('tr:first').data('user-id'),
            friendStatus  = row.parents('tr:first').data('friend'),
            invitedStatus = row.parents('tr:first').data('invited'),
            hiddenStatus  = row.parents('tr:first').data('hidden'),
            contact_id    = $.trim(contactID),
            friend        = $.trim(friendStatus),
            invited       = $.trim(invitedStatus),
            params        = { 'id' : contact_id };

            WHOAT.modal.generateModal('contact', contact_id, params, 'vcard', false, null, null, null, "on", trow);
        });

        // vCard hover
        $('.td_contacts_vcard vcard_gray').unbind('hover').bind('hover', function() {
            $(this).css('background-position', '-448px -9px');
        });

        // Add Friend from contacts list:
        $('.my_contacts_tbody .add_friend').unbind('click').bind('click', function() {
            var theBtn = $(this),
                $tr    = $(this).closest("tr"),
                userID = theBtn.parents('tr:first').data('user-id'),
                id     = $.trim(userID);

            var params = { 'id' : id };

            $(theBtn).text('Sending...');
            $(theBtn).addClass('btn_inviting');
            $(theBtn).removeClass('add_friend');
            $(theBtn).css('cursor','auto');
            $(theBtn).attr("disabled", "disabled");

            WHOAT.notify.topNotify("success", "Friend request sent!");
            WHOAT.networking.postToServerWithAjax('/add_friend', params, function (response) {

                if (response.result === 'success') {
                    $(theBtn).text('Sent');
                    $(theBtn).css('padding', '10px 19px');
                    $(theBtn).removeClass('btn_inviting');
                    $(theBtn).addClass('Unfriend');
                    $(theBtn).removeAttr("disabled");
                    $tr.data('invited', '1');

                } else if (response.result === 'error') {
                    $(theBtn).css('cursor','pointer');
                    $(theBtn).removeAttr("disabled");
                    $(theBtn).addClass('add_friend');
                    $(theBtn).removeClass('unfriend');
                    $(theBtn).removeAttr("disabled");
                    $(theBtn).text('Add Friend');
                    $tr.data('invited', ' ');
                    WHOAT.notify.topNotify(response.result, response.message);
                }

            });
        });

        // Unfriend from contacts list:
        $('.my_contacts_tbody .unfriend').unbind('click').bind('click', function() {

            var theBtn = $(this),
                $tr = $(this).closest("tr"),
                id = $.trim($tr.data('user-id'));

            var params = { 'id' : id };

            $(theBtn).text('.....');

            WHOAT.networking.postToServerWithAjax('/un_friend', params, function (response) {

                if (response.result === 'success'){
                    $(theBtn).removeClass('unfriend');
                    $(theBtn).addClass('add_friend');
                    $(theBtn).text('Add Friend');

                } else if (response.result === 'error') {
                    $(theBtn).addClass('unfriend');
                    $(theBtn).removeClass('add_friend');
                    $(theBtn).text('Unfriend');
                }
            });
        });
    };

    // /invite view
    var wireInviteCoworkers = function () {

        var contacts = [];
        var preview = { 'preview':true };
        var selectAll = false;

        $(":checkbox").unbind('click').bind('click', function () {
            // var isChecked = $(this).attr('checked');
            var isChecked = $(this).is(':checked');
            var id = parseInt($(this).attr('id'));

            if (isChecked) {
                contacts.push(id);

            } else {
                var obj;
                contacts = contacts.filter(function (o,i) {
                    return o !== id ? ((obj = o), true) : false;
                });
            }
        });

        function pushInContacts(check_val) {
            contacts.push(check_val);
        }

        // add multiple select / deselect functionality
        $("#selectall").click(function () {
            if (selectAll === false) {

                $('.invite-check-val').each(function() { //loop through each checkbox
                    this.checked = true;  //select all checkboxes        
                    // contacts.push($('.invite-check-val').val());
                });

                // $('.invite-check-val').each(function() {
                //     contacts.push($('.invite-check-val').val());
                // });

                $(".invite-check-val").each( function( i, el ) {
                    var elem = $( el );
                    var check_val = elem.val();
                    pushInContacts(check_val);
                });

                selectAll = true;

            } else if (selectAll === true) {
                $('.invite-check-val').attr('checked', this.checked).each(function() {
                    $('.invite-check-val').removeAttr('checked');
                });
                contacts = [];
                contacts.length = 0;
                selectAll = false;
            }

            // Pop NaN
            contacts.shift();
        });

        $('#preview_invite_email').unbind('click').bind('click', function () {

            var theBtn = $('#preview_invite_email');
            $(theBtn).css('cursor','auto');
            $(theBtn).css('background','#ccc');
            $(theBtn).text('sending...');
            $(theBtn).attr("disabled", "disabled");

            var resetPreviewButton = function() {
                $(theBtn).css('cursor','pointer');
                $(theBtn).css('background','#f58733');
                $(theBtn).text('Preview Email');
                $(theBtn).removeAttr("disabled");
            }

            WHOAT.networking.postToServerWithAjax('/preview/invite', null, function (response) {

                if (response.result === 'success') {
                    $(theBtn).css('background','#666');
                    $(theBtn).text('sent');


                    setTimeout(function () {
                        resetPreviewButton();
                    }, 2000);

                } else if (response.result === 'error') {
                    WHOAT.notify.topNotify('error', response.message);
                    resetPreviewButton();
                }
            })
        });

        function cleanArray(actual){
            var newArray = new Array();

            for(var i = 0; i<actual.length; i++) {
                if (actual[i]){
                    newArray.push(actual[i]);
                }
            }

            return newArray;
        }

        $('#invite_coworkers_form').unbind('submit').bind("submit", function() {
            
            var params = {}
            var cleanedContacts = cleanArray(contacts);
            
            for(var i = 0; i < cleanedContacts.length; i++){
                params[i] = cleanedContacts[i];
            }

            var theBtn = $('#invited_selected_btn');
            $(theBtn).css('cursor','auto');
            $(theBtn).css('background','#ccc');
            $(theBtn).text('Sending ...');
            $(theBtn).attr("disabled", "true");

            var resetInviteButton = function() {
                $(theBtn).css('cursor','pointer');
                $(theBtn).text('Invite Selected');
                $(theBtn).removeAttr("disabled");
                $(theBtn).css('background','#f58733');
            }

            WHOAT.notify.topNotify('success', 'Thanks for inviting your coworkers!');
            WHOAT.networking.postToServerWithAjax('/invite/coworkers', params, function (response) {

                if (response.result === 'success') {
                    resetInviteButton();

                } else if (response.result === 'error') {
                    WHOAT.notify.topNotify('error', response.message);
                    resetInviteButton();
                }

            });

            return false;
        });
    };

    var reWireFriendbutton = function(value, user_id) {

        var params = { 'id' : user_id };

        function showFriendButton() {
            return "<div class='show_friend_button'><button class='btn add_friend friending_btn'>Friend</button></div>"
        }

        function showPendingButton() {
            return "<div class='show_friend_button'><button class='btn pending'>Pending</button></div>"
        }

        function showUnfriendButton() {
            return "<div class='show_unfriend_button'><button class='btn unfriend friending_btn'>Unfriend</button></div>"
        }

        if (value === "Friend") {
            $('.friend_btn_container').empty();
            $('.friend_btn_container').append(showPendingButton);
            WHOAT.modal.wireModals().wireVCardButtons(user_id);
            WHOAT.networking.postToServerWithAjax('/add_friend', params, function (response) {

                if (response.result === 'success') {

                } else if (response.result === 'error') {
                    $('.friend_btn_container').empty();
                    $('.friend_btn_container').append(showFriendButton);
                }

                WHOAT.notify.topNotify(response.result, response.message);
            });

        } else if (value === "Unfriend") {
            $('.friend_btn_container').empty();
            $('.friend_btn_container').append(showFriendButton);
            WHOAT.modal.wireModals().wireVCardButtons(user_id);
            WHOAT.networking.postToServerWithAjax('/un_friend', params, function (response) {

                if (response.result === 'success') {

                } else if (response.result === 'error') {
                    $('.friend_btn_container').empty();
                    $('.friend_btn_container').append(showUnfriendButton);
                }

                WHOAT.notify.topNotify(response.result, response.message);
            });
        }
    };

    var reWireShowHide = function(value, user_id, contact_row) {

        var params = { 'id' : user_id }

        function showContactButton() {
            return "<div class='show_contact_button'><button class='btn btn_show hiding_btn' title='Allow this contact to be searchable'>Show contact</button></div>"
        }

        function hideContactButton() {
            return "<div class='hide_contact_button'><button class='btn btn_hide hiding_btn' title='Hide this contact from your network's search'>Hide contact</button></div>"
        }

        if (value === "Hide contact") {
            contact_row.addClass('contact_hidden');
            $('.hidden_btn_container').empty();
            $('.hidden_btn_container').append(showContactButton);
            $('.show_contact_button').show();
            WHOAT.modal.wireModals().wireVCardButtons(user_id, contact_row);
            WHOAT.networking.postToServerWithAjaxJSON('/contact/hide', params, function (response) {

                if (response.result === 'success') {

                } else if (response.result === 'error') {
                    $('.hidden_btn_container').empty();
                    $('.hidden_btn_container').append(hideContactButton);
                }

                WHOAT.notify.topNotify(response.result, response.message);
            });

        } else if (value === "Show contact") {
            contact_row.removeClass('contact_hidden');
            $('.hidden_btn_container').empty();
            $('.hidden_btn_container').append(hideContactButton);
            $('.hide_contact_button').show();
            WHOAT.modal.wireModals().wireVCardButtons(user_id, contact_row);
            WHOAT.networking.postToServerWithAjaxJSON('/contact/show', params, function (response) {

                if (response.result === 'success') {

                } else if (response.result === 'error') {
                    $('.hidden_btn_container').empty();
                    $('.hidden_btn_container').append(showContactButton);
                }

                WHOAT.notify.topNotify(response.result, response.message);
            });
        }
    };

    return {
        wireSyncContacts : wireSyncContacts,
        wireContacts : wireContacts,
        wireInviteCoworkers : wireInviteCoworkers,
        reWireFriendbutton : reWireFriendbutton,
        reWireShowHide : reWireShowHide
    };

}(jQuery, window));