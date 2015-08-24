// =========================================================================
//  PROFILE MODULE
// =========================================================================
WHOAT.profile = (function ($, w, undefined) {
    'use strict';
    
    function init() {
        
    };
    
    var wireProfile = function (profileData) {

        // VARS
        var params          = {},
            deletedArray    = [],
            new_primary;
            params          = profileData,
            params.deleted  = deletedArray;
            
        var company_deleted = false,
            title_deleted   = false,
            phonesInputMask = [{ "mask": "(###) ###-####"}, { "mask": "(###) ###-##############"}];

        // Email Subscribe Toggle:
        $('.onoffswitch-label').unbind('click').bind('click', function (event) {
            console.log('clicked');
            WHOAT.networking.getToServerWithAjax('/email_status', null, function (response) {
                if (response) {
                    console.log(response);
                    if (response.result === 'success') {
                        WHOAT.notify.topNotify('success', response.message);
                    } else if (response.result === 'error') {
                        WHOAT.notify.topNotify('error', response.message);
                    }
                }
            });
        });

        function adjustHoverUpload() {
            // Unhide filename on file input
            if (navigator.appVersion.indexOf("Win")!=-1) {
                $('#hover_upload').css('width','110px');
            } else {
                $('#hover_upload').css('width', '100px');
            }
        }

        // Event listeners for file upload
        document.querySelector("#current_avatar").addEventListener("click", function() {
            var clickEvent = document.createEvent('MouseEvents');
            clickEvent.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            document.querySelector("#choose_file").dispatchEvent(clickEvent);
            adjustHoverUpload();
        });

        document.querySelector("#hover_upload").addEventListener("click", function() {
            var clickEvent = document.createEvent('MouseEvents');
            clickEvent.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            document.querySelector("#choose_file").dispatchEvent(clickEvent);
            adjustHoverUpload();
        });

        // Wire jCropModule
        WHOAT.jcrop.wirejCrop();

        // Input Fields for additional contact info:
        function createPhoneInput(labelText, nameText) {
            return $("<div class='removeable'><li class='added_phone'><label>" +labelText+ "</label><span> Phone</span><br/><input class='new_phone' type='tel' pattern='[0-9]{10}' name='" +nameText+ "' value='' autocomplete='off' maxlength='20' /><div class='remove_info'></div></li></div>");
        }

        function createEmailInput(labelText, nameText) {
            return $("<div class='removeable'><li class='added_email'><label>" +labelText+ "</label><span> Email</span><br/><input class='new_email' type='email' name='" +nameText+ "' data-key='' value='' autocomplete='off' /><div class='remove_info'></div></li></div>");
        }

        // function validateEmail($input, $email) {
        //     var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        //     if (!emailReg.test($email)) {
        //         $($input).css('border', '2px solid #f58733');
        //         $('#msg-work-email').fadeIn('slow');
        //         return false;
        //     } else {
        //         $($input).css('border', '2px solid #e8e8e8');
        //         $('#msg-work-email').hide();
        //         return true;
        //     }
        // }

        // Validation Phone Number
        // $('.new_phone').blur(function() {
        //     WHOAT.validation.isValidPhone(this);
        // });

        // Remove Added Contact Details
        function addRemoveFunction(){
            $('.remove_info').on("click", function(event) {
                var key = ($(this).siblings('.profile_contact_info').data('key'));

                if ($.inArray(key, deletedArray) < 0) deletedArray.push(key);
                params.deleted = deletedArray;

                // Remove input field from DOM
                $(this).closest('.removeable').fadeOut('slow', function() {});

                // $('.save_warning').fadeIn('fast');
                // $('.save_warning').animate({ left:'144px' });
                $("#btn_save_profile").click();
            });
        }

        // ADD PHONES - dropdown
        $('#contact_options_phones').unbind('change').bind('change', function() {
            var v = $(this).val();
            switch (v) {
                case 'mobile phone':
                    $('.new_option').append(createPhoneInput("Mobile", "mobilephone"));
                    // $('.new_phone').inputmask({ 
                    //     mask: phonesInputMask, 
                    //     greedy: false, 
                    //     definitions: { '#': { validator: "[0-9]", cardinality: 1}} });
                    break;
                case 'work phone':
                    $('.new_option').append(createPhoneInput("Work", "workphone"));
                    // $('.new_phone').inputmask({ 
                    //     mask: phonesInputMask, 
                    //     greedy: false, 
                    //     definitions: { '#': { validator: "[0-9]", cardinality: 1}} });
                    break;
                case 'home phone':
                    $('.new_option').append(createPhoneInput("Home", "homephone"));
                    // $('.new_phone').inputmask({ 
                    //     mask: phonesInputMask, 
                    //     greedy: false, 
                    //     definitions: { '#': { validator: "[0-9]", cardinality: 1}} });
                    break;
            }

            addRemoveFunction();

            //Disable new input after selection
            // $(this).find("option:selected").prop("disabled", true);
        });

        // ADD EMAILS - dropdown
        $('#contact_options_emails').unbind('change').bind('change', function() {
            var v = $(this).val();
            switch (v) {
                case 'work email':
                    $('.new_option').append(createEmailInput("Work", "workemail"));
                    // $('.added_email').blur('blur', function() {
                    //     if (this.value.length > 0) {
                    //         validateEmail('.added_email', this.value);
                    //     }
                    // });
                    break;
                case 'personal email':
                    $('.new_option').append(createEmailInput("Personal", "personalemail"));
                    // $('.added_email').blur('blur', function() {
                    //     if (this.value.length > 0) {
                    //         validateEmail('.added_email', this.value);
                    //     }
                    // });
                    break;
            }

            addRemoveFunction();

            //Disable new input after selection
            // $(this).find("option:selected").prop("disabled", true);
        });

        addRemoveFunction();

        // Make Primary Email Modal
        $('.make_primary').unbind('click').bind('click', function () {
            $('.overlay').show();
            $('.make_primary_email').show();

            // new_primary = $(this).parents().siblings('li').find('.profile_contact_info').val();
            new_primary = $(this).parent().next().find('.profile_contact_info').val();
            $('#confirm_primary_email').val(new_primary);

            $('.close_make_primary_modal').unbind('click').bind('click', function () {
                $('.overlay').hide();
                $('.make_primary_email').hide();
            });
        });
        
        // Reset Password Modal
        $('.password_reset').unbind('click').bind('click', function () {
            $('.overlay').show();
            $('.reset_password_modal').show();

            $('.close_reset_pass_modal').unbind('click').bind('click', function () {
                $('.overlay').hide();
                $('.reset_password_modal').hide();
            });
        });

        // Change Primary Email
        $('#make_primary_form').unbind('submit').bind("submit", function(event) {

            var params = {},
            theBtn = $('#make_primary_btn'), titleVar, orgVar;

            params.primary_email = new_primary,
            params.current_pass = $('#enter_current_password').val();

            $(theBtn).css('cursor','auto');
            $(theBtn).css('background','#ccc');
            $(theBtn).text('updating...');
            $(theBtn).attr("disabled", "disabled");
            
            WHOAT.dashboard.hideKeyboard($());
            WHOAT.networking.postToServerWithAjax('/make/primary', params, function (response) {

                if (response.result === 'success') {

                    WHOAT.notify.topNotify('success', response.message);
                    $(theBtn).css('cursor','pointer');
                    $(theBtn).text('change primary');
                    $(theBtn).css('background','#f58733');
                    $(theBtn).removeAttr("disabled");

                } else if (response.result === 'error') {
                    WHOAT.notify.topNotify('error', response.message);
                }

            });

            return false;
        });

        // Save new Profile Info
        $('.profile-info-form').unbind('submit').bind("submit", function(event) {
            
            WHOAT.dashboard.hideKeyboard($());
            $('.save_warning').hide();

            var theBtn = $('#btn_save_profile'), titleVar, orgVar;
            $(theBtn).css('cursor','auto');
            $(theBtn).css('background','#ccc');
            $(theBtn).text('saving...');
            $(theBtn).attr("disabled", "disabled");

            params.firstName = $('#profile-firstname').val();
            params.firstName = WHOAT.helper.htmlEscape(params.firstName);
            params.lastName = $('#profile-lastname').val();
            params.lastName = WHOAT.helper.htmlEscape(params.lastName);

            if (title_deleted) {
                params.title = '';
            } else {
                params.title = $('#the-title').val();
                params.title = WHOAT.helper.htmlEscape(params.title);
            }

            if (company_deleted) {
                params.organization = '';
            } else {
                params.organization = $('#profile-company').val();
                params.organization = WHOAT.helper.htmlEscape(params.organization);
            }

            // params.proxy_label = $('#admin_proxy_label').val();
            // params.proxy = $('#admin_proxy_email').val();

            // if (params.proxy == 'Enter email here' ) {
            //  params.proxy = 'None';
            // }

            // if (params.proxy_label == 'Admin name' ) {
            //  params.proxy_label = 'None';
            // }
            
            // Added Phones & Emails:
            var phoneObjs = {},
            emailObjs     = {},
            addedPhones   = $('.added_phone'),
            addedEmails   = $('.added_email');

            addedPhones.each( function(i) {
                var tag = $(this).children("label").text();
                var value = $(this).children("input").val();
                phoneObjs = $(this).map(function(i,el) {
                    var $el = $(el);
                    return {
                        label: value,
                        tag: tag
                    }
                }).get();
                params.phones = params.phones.concat(phoneObjs);
            });

            addedEmails.each( function(i) {
                var tag = $(this).children("label").text();
                var value = $(this).children("input").val();
                var key = $(this).children("input").data('key');

                emailObjs = $(this).map(function(i,el) {
                    var $el = $(el);
                    return {
                        key: key,
                        label: value,
                        tag: tag
                    }
                }).get();
                params.emails = params.emails.concat(emailObjs);
            });

            WHOAT.networking.postToServerWithAjaxJSON('/save/profile', params, function (response) {

                if (response) {
                    $(theBtn).css('cursor','pointer');
                    $(theBtn).text('save profile');
                    $(theBtn).css('background','#f58733');
                    $(theBtn).removeAttr("disabled");
                }

                if (response.result === 'success') {

                    WHOAT.notify.topNotify('success', response.message);

                    $('.user_name').fadeOut('fast', function() {
                        $('.user_name').empty();
                        $('.user_name').append(params.firstName+' '+params.lastName);
                        $('.user_name').fadeIn('fast');
                    });

                    $('.user_title').fadeOut('fast', function() {
                        $('.user_title').empty();
                        $('.user_title').append(params.title);
                        $('.user_title').fadeIn('fast');
                    });

                    $('.user_company').fadeOut('fast', function() {
                        $('.user_company').empty();
                        $('.user_company').append(params.organization);
                        $('.user_company').fadeIn('fast');
                    });

                } else if (response.result === 'error') {
                    WHOAT.notify.topNotify('error', response.message);
                }

            });

            return false;
        });

        // Update Password
        $('#update_pass_form').unbind('submit').bind("submit", function(event) {
            
            var params = {},
            newPass1 = $('#reset_new_password1').val(),
            newPass2 = $('#reset_new_password2').val(),
            theBtn = $('#reset_pass_btn');

            $(theBtn).css('cursor','auto');
            $(theBtn).css('background','#ccc');
            $(theBtn).text('resetting...');
            $(theBtn).attr("disabled", "disabled");

            if (newPass1 === newPass2) {
                params.old_password = $('#reset_current_password').val();
                params.new_password = newPass2;

                WHOAT.dashboard.hideKeyboard($());
                WHOAT.networking.postToServerWithAjax('/update/password', params, function (response) {
                    if (response.result === 'success') {
                        $(theBtn).css('cursor','pointer');
                        $(theBtn).text('reset password');
                        $(theBtn).css('background','#f58733');
                        $(theBtn).removeAttr("disabled");
                        $('.overlay').hide();
                        $('.reset_password_modal').hide();
                        WHOAT.notify.topNotify('success', response.message);
                        
                    } else if (response.result === 'error') {
                        WHOAT.notify.topNotify('error', response.message);
                    }
                });

                return false;

            } else {
                WHOAT.notify.topNotify('error', 'Your new passwords did not match.');
                return false;
            }
        });

        // Save Groups Info
        $('#add-group-form').unbind('submit').bind("submit", function(event) {

            var newGroup = $('#group-code').val();

            WHOAT.networking.postToServerWithAjax('/groups/join', newGroup, function (response) {

                if (response.result === 'success') {
                    location.reload();
                    // WHOAT.notify.topNotify('success', response.message);

                    // $.get("/groups/show", function(data) {
                    //     $("#added_groups").html(data);
                    //     addRemoveFunction();
                    // });

                } else if (response.result === 'error') {
                    WHOAT.notify.topNotify('error', response.message);
                }
            });

            return false;
        });

        $('#add-email-proxy-form').unbind('submit').bind("submit", function(event) {

            var newEmail = $('#email-proxy').val();
            newEmail = WHOAT.helper.htmlEscape(newEmail);

            WHOAT.networking.postToServerWithAjax('/add/proxy', {'proxy': newEmail}, function (response) {

                if (response.result === 'success') {
                    location.reload();

                    // Ajax in saved Proxy Email here:
                    // WHOAT.notify.topNotify('success', response.message);

                    // $.get("/groups/show", function(data) {
                    //     $("#added_groups").html(data);
                    //     addRemoveFunction();
                    // });

                } else if (response.result === 'error') {
                    WHOAT.notify.topNotify('error', response.message);
                }
            });

            return false;
        });
        
        $('.remove_proxy').on("click", function(event) {
                var $li = $(this).closest("li");

                // Send deletedArray to Server
                WHOAT.networking.getToServerWithAjax('/add/proxy', null, function (response) {

                    if (response.result === 'success') {
                        $li.hide();
                        WHOAT.notify.topNotify('success', response.message);

                    } else if (response.result === 'error') {
                        $li.show();
                        WHOAT.notify.topNotify('error', response.message);
                    }
                });
            });

        // REMOVE GROUP
        // function addRemoveFunction(){
        //     $('.remove_group').on("click", function(event) {
        //         var key = ($(this).siblings('.profile_group_info').data('key')),
        //             $li = $(this).closest("li"),
        //             groupId = $li.data('group-id'),
        //             params = { 'id':groupId };

        //         // Send deletedArray to Server
        //         WHOAT.networking.getToServerWithAjax('/groups/leave', params, function (response) {

        //             if (response.result === 'success') {
        //                 $li.hide();
        //                 WHOAT.notify.topNotify('success', response.message);

        //             } else if (response.result === 'error') {
        //                 $li.show();
        //                 WHOAT.notify.topNotify('error', response.message);
        //             }
        //         });
        //     });
        // }

        // Need additional refactor later
        $('.remove_group').on("click", function(event) {
            var key = ($(this).siblings('.profile_group_info').data('key'));
            var $li = $(this).closest("li");
            var groupId = $li.data('group-id');

            var params = { 'id':groupId };

            // Fade out input field from DOM
            $(this).closest('li').hide();

            // Send deletedArray to Server
            WHOAT.networking.getToServerWithAjax('/groups/leave', params, function (response) {
                // if (response.result === 'success') {
                //     WHOAT.notify.topNotify('success', response.message);

                // } else if (response.result === 'error') {
                //     WHOAT.notify.topNotify('error', response.message);
                // }
            });
        });

    };

    return {
        wireProfile: wireProfile,
        init : init
    };

}(jQuery, window));

$(document).ready(function () {
    WHOAT.profile.init();
});