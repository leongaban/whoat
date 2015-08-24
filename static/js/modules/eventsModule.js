// =========================================================================
//  EVENTS
// =========================================================================

WHOAT.events = (function ($, w, undefined) {
    'use strict';

    function setStatus(serverResponse) {
        var response = JSON.parse(serverResponse),
            is_success = response.result === 'success',
            $container = $('<div>'),
            message;

        //change the alert class based on success or error
        if (is_success) {
            $container.addClass('alert alert-success');
        } else {
            $container.addClass('alert alert-error');
        }

        //add the content
        if (response.message !== undefined) {
            message = response.message;
        } else if (is_success) {
            message = "Success";
        } else {
            message = "There was an error. Please try again later.";
        }
        $container.html($('<h4>').html(message));

        //add the container to the screen
        $container.hide();
        $container.appendTo('.notification-container');
        $container.show('slow');
        return $container;
    }

    function setStatusAndFadeStatus(serverResponse) {
        var status_container = setStatus(serverResponse);

        setTimeout(function () {
            $(status_container).slideUp('slow', function () {
                $(status_container).remove();
            });
        }, 5000);
    }

    function removeTableRowIfExists(dataID) {
        var $tr = $("tr[data-message-id='" + dataID + "']");

        if ($tr) {
            $tr.remove();
        }
    }

    function updateTableRowWithAcceptedIfExists(dataID) {
        var $tr = $("tr[data-message-id='" + dataID + "']"),
            $td;

        if ($tr) {
            //change the cell from a pending cell to an accepted cell
            $td = $tr.find('td:first');
            $td.removeClass('pending-cell');
            $td.addClass('accepted-cell');
            $td.find('p').html('Accepted');
        }
    }

    //mark the row as read if it was unread
    function markRowAsRead(tr) {
        var $tr = $(tr);
        var $td = $tr.find('td:first');

        if ($tr.hasClass('unread-row')) {
            $tr.removeClass('unread-row');
        }

        if ($td.hasClass('unread-cell')) {
            $td.removeClass('unread-cell');
            $td.addClass('pending-cell');

            $td.html('');
            $td.append('<div><span></span></div>');
            $td.append('<p>Pending</p>');
        }
    }

    //LOGIN
    //===========================================================
    var wireLoginForm = function (form) {

        var $form = $(form);

        //form being submitted
        $form.unbind('submit').bind('submit', function () {
            if (WHOAT.validation.validateLoginForm(this)) {
                WHOAT.networking.postToServerWithForm(this);
            }
            //stop the form submit //do it with js instead
            return false;
        });

        //enter clicked from password box
        $form.find("input[name='password']").unbind('keyup').bind('keyup', function (event) {
            if (event.keyCode === 13) {
                $form.find("button").click();
            }
        });
    }
    
    var wireLoginButton = function (button, login_container) {
        var $button = $(button);

        $button.unbind('click').bind('click', function () {
            WHOAT.animations.animateLoginContainer(login_container);
        });
    }
    
    var wireLogoutButton = function (button, login_container) {
        var $button = $(button);

        $button.unbind('click').bind('click', function () {
            WHOAT.networking.postToServer('/logout');
        });
    }
    
    //REGISTER
    //===========================================================
    var wireRegisterForm = function (form) {
        var $form = $(form);

        //form being submitted
        // $form.unbind('submit').bind('submit', function () {
            
        //     if (WHOAT.validation.validateRegisterForm($form)) {
        //         // var params = {
        //         //     "email":$form.find('#register-email').val(),
        //         //     "firstName":$form.find('#register-firstname').val(),
        //         //     "lastName":$form.find('#register-lastname').val(),
        //         //     "password":$form.find('#register-password').val()
        //         // };

        //         //fill params with parameters from form
        //         //WHOAT.networking.postToServerWithForm($form);
        //         return true;
        //     }

        //     return false;

        //     //stop the form submit
        //     //return false;
        // });

        //enter clicked from password box
        $form.find("input[name='register_password']").unbind('keyup').bind('keyup', function (event) {
            if (event.keyCode === 13) {
                this.find("button").click();
            }
        });
    }

    var loginSuccess = function(){

        var userEmail = $('#register-email').val();

        // Animate Logo
        $('#body-login .login-logo img').animate({
            top: '-=15'
        }, 1000, function() {
            // Animation complete.
        });

        // Fade in alert message
        $('#alert-user-email').text(userEmail);
        $('#body-login .login-logo p').fadeIn('slow');

        // Swap Tabs
        $('#register-form').hide();
        $("#form-background").animate({height:273},200);
        $('#login-form').fadeToggle();

        // Show Login Tab as selected
        $('.login-unselected')
            .removeClass('login-unselected')
            .addClass('login-selected');

        // Show Register Tab as unselected
        $('.login-selected').parent().find('#tab-register')
            .removeClass('register-selected')
            .addClass('register-unselected');

    }

    //SEND FORGOT PASSWORD
    //===========================================================
    var wireSendPasswordResetForm = function (form) {
        var $form = $(form);

        //form being submitted
        $form.unbind('submit').bind('submit', function () {

            if (WHOAT.validation.validateSendForgotPasswordForm($form)) {
                //WHOAT.networking.postToServerWithAjax($form);
            }

            //stop the form submit//do it with js instead
            return false;
        });

        //enter clicked from password box
        $form.find("input[name='email']").unbind('keyup').bind('keyup', function (event) {
            if (event.keyCode === 13) {
                $form.find("button").click();
            }
        });
    }

    //RESET PASSWORD
    //===========================================================
    var wireResetPasswordForm = function (form) {
        var $form = $(form);

        //login
        $form.find("a").unbind('click').bind('click', function () {
            WHOAT.networking.redirectToURL('/login');
        });

        //form being submitted
        $form.unbind('submit').bind('submit', function () {
            if (WHOAT.validation.validateForgotPasswordForm(this)) {
                var query_string = w.location.search;
                $(this).attr("action", $(this).attr('action') + query_string);
                WHOAT.networking.postToServerWithForm(this);
            }

            //stop the form submit//do it with js instead
            return false;
        });

        //enter clicked from password box
        $form.find("input[name='email']").unbind('keyup').bind('keyup', function (event) {
            if (event.keyCode === 13) {
                $form.find("button").click();
            }
        });
    }

    //SEARCH BOX
    //===========================================================


    //WIRE MESSAGE TABLES
    //===========================================================
    var wireMessageTableBody = function (table_body, table_enum) {
        var $table_body = $(table_body),
            message_table_clicking = false;

        $table_body.find('> tr:not(.footable-row-detail) td').unbind('click').bind('click', function (e) {
            var $td = $(this),
                $tr = $(this).parents('tr:first');

            if (message_table_clicking) {
                return;
            }

            //stop clicks for this row//used so double clicks won't kick off two events
            message_table_clicking = true;

            //don't show details if the first td is selected and the table is collapsed enough to show the expand button
            if ($td.index() === 0 && $table_body.is('.breakpoint')) {
                return;//the cell selected is the expand/collapse cell
            }

            //get the data from the tr to populate the details
            var id = $tr.data('message-id'),
                url = '',
                params;

            //set the url based on the type of details (table clicked) that is needed
            if (table_enum === WHOAT.enums.tableEnum.INCOMING) {
                url = '/incoming/' + id;
            } else if (table_enum === WHOAT.enums.tableEnum.MY_REQUESTS) {
                url = '/myrequests/' + id;
            }

            //get the details and push it in the screen
            params = {'id': id};
            WHOAT.networking.postToServerWithAjax(url, params, function (response) {
                WHOAT.animations.pushAndHideContent(response, $("#dashboard-body"));
                //enable clicks for this row again
                message_table_clicking = false;
                markRowAsRead($tr);
            });
        });
    }

    //WIRE SEARCH TABLES
    //===========================================================
    var wireSearchTableBody = function (table_body, table_enum) {
        var $table_body = $(table_body);

        //request intro button clicked
        $table_body.find('tr button').unbind('click').bind('click', function (e) {
            var details = $(this).parents('tr:first').data('user-details'),
                $contact_modal = $("#contactModal"),
                details_source = $("#tmpl-contact-details").html(),
                contact_source = $("#tmpl-intro-request").html();
            var template, // = Handlebars.compile(source);
                html, //= template(details),
                $contact_details,
                $request_body;

            //determine what to show in the modal and populate those regions
            if (details.userNetworks.inPersonal === 0) {
                $("#contactDetails").hide();
                $contact_modal.find(".close:last").show();
            } else {
                template = Handlebars.compile(details_source);//build the contact details template
                html = template(details);
                $contact_details = $("#contactDetails").find(".modal-body");
                $contact_details.empty();
                $(html).appendTo($contact_details);
                $contact_details.find(".close:last").hide();
                $("#contactDetails").show();
            }

            if (details.userNetworks.inGroup > 0 || details.userNetworks.inOrganization > 0 || details.userNetworks.inFriends  > 0) {
                template = Handlebars.compile(contact_source);//build the request intro template
                html = template(details);
                $request_body = $("#requestIntro").find(".modal-body");
                $request_body.empty();
                $(html).appendTo($request_body);
                $("#requestIntro").show();
            } else {
                $("#requestIntro").hide();
            }

            $contact_modal.modal('show');

            $contact_modal.find(".btn-primary").unbind('click').bind('click', function () {
                $(this).button('loading');
                var $text_area = $contact_modal.find('textarea');
                var message = $text_area.val(),
                    target = details.guid,
                    networks = [],
                    params;

                //if the message was blank, use the placeholder
                if (message === "") {
                    message = $text_area.attr("placeholder");
                }

                for (var i = 0; i < details.networks.length; i++) {
                    networks[i] = details.networks[i].guid;
                }
                params = {'message': message, 'networks': networks, 'target': target};
                WHOAT.networking.postToServerWithAjax('/createrequest', params, function (response) {
                    $contact_modal.modal('hide');
                    setStatusAndFadeStatus(response);
                    $contact_modal.find(".btn-primary").button('reset');
                });
            });
        });
    }

    //WIRE INCOMING DETAILS
    //===========================================================
    var wireIncomingDetailsForm = function (container) {
        var $container = $(container);
        var $accept_deny_select_container = $container.find(".accept-decline-select-container");
        var $accept_container = $container.find(".accept-decline-reply-container:first");//will probably have to do something else ************
        var $decline_container = $container.find(".accept-decline-reply-container:last");//to select these in the future************
        var $btn_accept_select = $accept_deny_select_container.find(".btn-accept");
        var $btn_decline_select = $accept_deny_select_container.find(".btn-decline");
        var $response_container = $container.find(".dashboard-message-details-response-container");

        //show accept
        $btn_accept_select.unbind('click').bind('click', function () {
            $accept_deny_select_container.fadeOut('normal', function () {
                $accept_container.fadeIn('normal');
            });
        });

        //show decline
        $btn_decline_select.unbind('click').bind('click', function () {
            $accept_deny_select_container.fadeOut('normal', function () {
                $decline_container.fadeIn('normal');
            });
        });

        //return to accept/decline
        $response_container.find(".accept-decline-reply-container a").unbind('click').bind('click', function () {
            $.when($response_container.find(".accept-decline-reply-container").fadeOut('normal')).done(function () {
                $accept_deny_select_container.fadeIn("normal");
            });
            return false;
        });

        //accept request
        $accept_container.find('form[name="acceptForm"]').unbind('submit').bind('submit', function () {
            //get the message if it exists or the placeholder if a message wasn't entered
            var message = $accept_container.find('textarea').val();
            if (message == "") {
                message = $accept_container.find('textarea').attr('placeholder');
            } else {
                message = WHOAT.utility.trimFromBeginningAndEnd(message);
            }

            var id = $container.data('message-id');
            var params = { 'message': message, 'id': id };

            var url = '/incoming/' + id + '/accept';
            WHOAT.networking.postToServerWithAjax(url, params, function (response) {
                setStatusAndFadeStatus(response);
                updateTableRowWithAcceptedIfExists(id);
                $container.find(".btn-back").click();//click the back button and let that work flow handle leaving this frame
            });
            return false;
        });

        //decline request
        $decline_container.find('form[name="declineForm"]').unbind('submit').bind('submit', function () {
            var message = $decline_container.find('textarea').val();
            if (message && message !== "") {
                message = WHOAT.utility.trimFromBeginningAndEnd(message);
            }
            var id = $container.data('message-id');
            var params = { 'message': message, 'id': id };

            var url = '/incoming/' + id + '/decline';
            WHOAT.networking.postToServerWithAjax(url, params, function (response) {
                setStatusAndFadeStatus(response);
                removeTableRowIfExists(id);
                $container.find(".btn-back").click();//click the back button and let that work flow handle leaving this frame
            });
            return false;
        });
    }

    //WIRE MY REQUEST DETAILS
    //===========================================================
    var wireMyRequestDetailsForm = function (container) {
        var $container = $(container);

        $container.find('.last-child a:last').unbind('click').bind('click', function () {
            var id = $container.data('message-id');
            var params = { 'id': id },
                url = '/myrequests/' + id + '/delete';

            WHOAT.networking.postToServerWithAjax(url, params, function (response) {
                setStatusAndFadeStatus(response);
                removeTableRowIfExists(id);
                $container.find(".btn-back").click();//click the back button and let that work flow handle leaving this frame
            });
            return false;
        });
    }

    //BACK BUTTONS TO POP CONTENTS
    //===========================================================
    var wireBackButtonToPopContents = function (btn, container) {
        //only pop contents if there is something hidden
        //otherwise, the url redirect of the a tag should be the back

        $(btn).unbind('click').bind('click', function () {
            if ($(container).find('> div:hidden').length > 0) {
                WHOAT.animations.popAndPushContent(container);
                return false;//stop the a tag redirect if the back will be an ajax back
            } else {
                WHOAT.networking.redirectToURL($(this).attr('href'));
            }
        });
    }

    //WIRE NOTIFICATION CONTAINER
    //===========================================================
    var wireNotificationContainer = function (container) {
        var $container = $(container);

        //if there are elements in the notification container when the page loads,
        //remove all the elements after a set time
        setTimeout(function () {
            $container.slideUp('slow', function () {
                $container.html('');
            });
        }, 5000);
    }

    //WIRE DASHBOARD NAV
    //nav is the ul holding all the navigation elements
    //===========================================================
    var wireDashboardNav = function (nav) {
        var $nav = $(nav);
        var url = w.location.pathname.replace(new RegExp("/\/[0-9]+/"), '');
        var url_regex = new RegExp(url.replace(/\/$/,''));

        // now grab every link from the navigation
        $nav.find('a').each(function () {
            // and test its normalized href against the url pathname regexp
            if (url_regex.test(this.href.replace(/\/$/,''))) {
                $(this).addClass('active');
            }
        });
    }

    //WIRE MULTIPLE FORM PAGE
    //hide/show errors based on which form is being show
    //===========================================================
    var wireMultipleForms = function (tab_list) {
        var $tab_list = $(tab_list);
        $tab_list.find('a').unbind('click').bind('click', function () {
            $('.popover').remove();
        });
    }

    return {
        wireLoginForm: wireLoginForm,
        wireMultipleForms : wireMultipleForms,
        wireDashboardNav : wireDashboardNav,
        wireNotificationContainer : wireNotificationContainer,
        wireBackButtonToPopContents : wireBackButtonToPopContents,
        wireMyRequestDetailsForm : wireMyRequestDetailsForm,
        wireIncomingDetailsForm : wireIncomingDetailsForm,
        wireSearchTableBody : wireSearchTableBody,
        wireMessageTableBody : wireMessageTableBody,
        wireResetPasswordForm : wireResetPasswordForm,
        wireSendPasswordResetForm : wireSendPasswordResetForm,
        wireRegisterForm : wireRegisterForm,
        wireLogoutButton : wireLogoutButton,
        wireLoginButton : wireLoginButton
    }
}(jQuery, window));