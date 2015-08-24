/**
 * Created with PyCharm.
 * User: jeffregan
 * Date: 2/6/13
 * Time: 8:49 PM
 */

// =========================================================================
//  VALIDATION
// =========================================================================

WHOAT.validation = (function ($, w, undefined) {
    'use strict';
    var letters_regex = /[A-Za-z]/,
        phone_regex = /[0-9{7,}]/,
        emails_regex = /^..*[@]..*[.]..*$/,
        pop_over_options = {'placement': 'right', 'animation': false, 'esc_close': 0, 'trigger': 'manual'};

    var home_user_input_check = false;
    var home_pass_input_check = false;

    // PRIVATE
    // =====================================================================
    function getExtension(filename) {
        var parts = filename.split('.');
        return parts[parts.length - 1];
    }
    function setDataAndClass(object, element, message) {
        var $element = $(element);
        $element.data({'content': message});

        /* Leon's Code */
        // Add orange error border to input

        // console.log(object);
        // console.log('message = '+message);

        switch (object) {

            // Login
            case 'login-email-required':
                $('#msg-username span').text(message);
                $('#msg-username').fadeIn('fast');
                $('.tip-msg').css('text-indent', '-134px');
                break;

            // index
            case 'login-email-invalid':
                $('#msg-username span').text(message);
                $('#msg-username').fadeIn('fast');

                // login
                $('#error-email span').text(message);
                $('#error-email').fadeIn('fast');
                break;

            // login
            case 'login2-password-required':
                $('#error-password span').text(message);
                $('#error-password').fadeIn('fast');
                break;

            // login
            case 'login2-password-invalid':
                $('#error-password span').text(message);
                $('#error-password').fadeIn('fast');
                break;

            // login
            case 'login2-password':
                $('#error-password span').text(message);
                $('#error-password').fadeOut('fast');
                break;
                
            // home
            case 'login-password-required':
                $('#msg-password span').text(message);
                $('#msg-password').fadeIn('fast');
                $('.tip-msg2').css('text-indent', '-163px');
                break;

            // home
            case 'login-password-invalid':
                $('#msg-password span').text(message);
                $('#msg-password').fadeIn('fast');
                $('.tip-msg2').css('text-indent', '-172px');
                break;

            // Register
            case 'email':
                $('#register-form #register-error-email span').text(message);
                $('#register-form #register-error-email').fadeIn('fast');
                break;

            case 'firstname':
                $('#register-form #error-first-name span').text(message);
                $('#register-form #error-first-name').fadeIn('fast');
                break;

            case 'lastname':
                $('#register-form #error-last-name span').text(message);
                $('#register-form #error-last-name').fadeIn('fast');
                break;

            case 'password':
                $('#register-form #register-error-password span').text(message);
                $('#register-form #register-error-password').fadeIn('fast');
                break;

            // FORGOT / RESET
            case 'reset-pass':
                WHOAT.credentials.resetPassword().displayMessage('error', 'Password is required');
                // $('#forgot_password_error_msg').text('Password is required');
                // $('#forgot_password_error').fadeIn('fast');
                break;

            case 'reset-6':
                WHOAT.credentials.resetPassword().displayMessage('error', 'Must be at least 6 characters');
                // $('#forgot_password_error_msg').text('Must be at least 6 characters');
                // $('#forgot_password_error').fadeIn('fast');
                break;

            case 'reset-match':
                WHOAT.credentials.resetPassword().displayMessage('error', 'Passwords must match');
                // $('#forgot_password_error_msg span').text('Passwords must match');
                // $('#forgot_password_error').fadeIn('fast');
                break;
            }
    }


    // PUBLIC
    // =====================================================================
    //BASIC VALIDATION
    var isValidContactSource = function (filename) {        
        var ext = getExtension(filename);
        switch (ext.toLowerCase()) {
        case 'vcf':
        case 'json':
        case 'csv':
            return true;
        }
        return false;
    }
    var isValidEmail = function (email) {
        return emails_regex.test(email) === true;
    }
    var isValidPhone = function (phone) {
        return letters_regex.test(phone) === false && phoneRegex.test(phone) === true;
    }
    var isBlank = function (value) {
        return value.length === 0;
    }

    //FORM VALIDATION
    var validateLoginForm = function (formcheck, form) {

        var $form = $(form);
        var $txt_email = $form.find("input[name='username']"),
            $txt_password = $form.find("input[name='password']"),
            is_valid = true;

        //Email
        if (isBlank($txt_email.val()) === true) {
            setDataAndClass('login-email-required', $txt_email, 'Username not registered');
            $txt_email.css('border-color', '#f58733');
            is_valid = false;

        } else if (isValidEmail($txt_email.val()) === false) {
            setDataAndClass('login-email-invalid', $txt_email, 'Please use a valid email');
            // ^ should be: Please use a valid email
            $txt_email.css('border-color', '#f58733');
            is_valid = false;

        } else if (isValidEmail($txt_email.val()) === true) {
            //$('#msg-username').hide();
        }

        //Password
        if (formcheck === 'home_login') {

            if (isBlank($txt_password.val()) === true) {
                setDataAndClass('login-password-required', $txt_password, 'Password is required');
                is_valid = false;

            } else if ($txt_password.val().length < 6) {
                setDataAndClass('login-password-invalid', $txt_password, '6 characters minimum');
                $txt_password.css('border-color', '#f58733');
                is_valid = false;
            }

        } else if (formcheck === '/login') {

            if (isBlank($txt_password.val()) === true) {
                setDataAndClass('login2-password-required', $txt_password, 'Password is required');
                $txt_password.css('border-color', '#f58733');
                is_valid = false;

            } else if ($txt_password.val().length < 6) {
                setDataAndClass('login2-password-invalid', $txt_password, '6 characters minimum');
                $txt_password.css('border-color', '#f58733');
                is_valid = false;

            } else if ($txt_password.val().length >= 6) {
                setDataAndClass('login2-password', $txt_password, '');
                is_valid = false;
            }
        }
        
        return is_valid;
    }

    var validateRegisterForm = function (form) {
        var $form = $(form);
        var $txt_email = $form.find("input[name='register_email']"),
            $txt_first_name = $form.find("input[name='register_first_name']"),
            $txt_last_name = $form.find("input[name='register_last_name']"),
            $txt_password = $form.find("input[name='register_password']"),
            is_valid = true;

        //email
        if (isBlank($txt_email.val()) === true) {
            setDataAndClass('email', $txt_email, 'Email is required');
            is_valid = false;

        } else if (isValidEmail($txt_email.val()) === false) {
            setDataAndClass('email', $txt_email, 'A valid email is required');
            is_valid = false;
        }

        //first name
        if (isBlank($txt_first_name.val()) === true) {
            setDataAndClass('firstname', $txt_first_name, 'First name is requrired');
            is_valid = false;
        }

        //lastname
        if (isBlank($txt_last_name.val()) === true) {
            setDataAndClass('lastname', $txt_last_name, 'Last name is requrired');
            is_valid = false;
        }

        //password
        if (isBlank($txt_password.val()) === true) {
            setDataAndClass('password', $txt_password, 'Password is requrired');
            is_valid = false;

        } else if ($txt_password.val().length < 6) {
            setDataAndClass('password', $txt_password, 'Minimum 6 Characters');
            is_valid = false;

        } else if ($txt_password.val().length >= 6) {
            setDataAndClass('password', $txt_password, '');
            $('.tip-register_password').hide();
            is_valid = false;
        }

        return is_valid;
    }

    var validateSendForgotPasswordForm = function (form) {
        var $form = $(form);
        var $txt_email = $form.find("input[name='email']"),
            is_valid = true;

        if (isBlank($txt_email.val()) === true) {
            setDataAndClass($txt_email, 'Email is required');
            //alert('no email');
            is_valid = false;
        } else if (isValidEmail($txt_email.val()) === false) {
            setDataAndClass($txt_email, 'Invalid email');
            //alert('invalid email');
            is_valid = false;
        }

        return is_valid;
    }

    var validateForgotPasswordForm = function (form) {

        var $form = $(form);
        var $txt_password = $form.find("input[name='resetPass1']"),
            $txt_repeat_password = $form.find("input[name='resetPass2']"),
            is_valid = true;

        //password
        if (isBlank($txt_password.val()) === true) {
            setDataAndClass('reset-pass', null, 'Password is requrired');
            is_valid = false;

        } else if ($txt_password.val().length < 6) {
            setDataAndClass('reset-6', null, 'Must be at least 6 characters');
            is_valid = false;
        }

        if (isBlank($txt_repeat_password.val()) === true) {
            setDataAndClass('reset-pass', null, 'Password is requrired');
            is_valid = false;

        } else if ($txt_repeat_password.val().length < 6) {
            setDataAndClass('reset-6', null, 'Must be at least 6 characters');
            is_valid = false;
        }

        //repeat password
        if ($txt_password.val() !== $txt_repeat_password.val()) {
            setDataAndClass('reset-match', null, 'Passwords must match');
            is_valid = false;
        }

        return is_valid;
    }

    return {
        isValidContactSource: isValidContactSource,
        isValidEmail : isValidEmail,
        isValidPhone : isValidPhone,
        isBlank : isBlank,
        validateLoginForm : validateLoginForm,
        validateRegisterForm : validateRegisterForm,
        validateSendForgotPasswordForm : validateSendForgotPasswordForm,
        validateForgotPasswordForm : validateForgotPasswordForm
    }
}(jQuery, window));