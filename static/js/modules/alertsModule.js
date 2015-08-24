//======================================================================
// ALERT TRIGGERS MODULE
//======================================================================
WHOAT.alerts = (function ($, w, undefined) {
    'use strict';
    
    function init() {};
    
    var wireAlerts = function (position, type) {
        position   = position || '';
        type       = type     || 'widget';

        var get_html = '/get/alerts',
            path     = '/add/alert/row';

        function wireAlertFunctions() {

            var curr_val = "",
                updated_val = "",
                alerts_added = false;

            // ADD ALERT:
            function wireAddAlert() {
                $('.alerts_widget').unbind('click').bind("click", function() {
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

                    WHOAT.networking.postToServerWithAjax(path, params, function (response) {

                        if (response) {
                            if (response.result === "error") {
                                WHOAT.notify.topNotify('error', response.message);
                            } else {
                                $('.added_alert_row').append(response);
                                $('.ftue_added_companies').fadeIn('fast');
                                alerts_added = true;
                                wireRemoveCompanyAlert();
                            }
                        }

                    });
                });
            }

            // REMOVE ALERT:
            function wireRemoveCompanyAlert() {
                $('.blue_delete').unbind('click').bind("click", function() {
                    var theBtn = $(this),
                    $tr        = $(this).closest("tr"),
                    trigger_id = $(theBtn).parents('tr:first').data('trigger-id'),
                    params     = { 'id' : trigger_id };

                    $(theBtn).css('cursor','auto');
                    $(theBtn).attr("disabled", "disabled");
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

            // LOAD SAVED ALERTS:
            WHOAT.networking.getToServerWithAjax('/show/all/alerts', null, function (response) {
                if (response) {
                    $('.ajax_added_company').append(response);
                    $('.ftue_added_companies').fadeIn('fast');
                    wireRemoveCompanyAlert();
                }
            });

            // Typeahead: Searching for Company to add alert for:
            $("#alert_widget_input" ).on("keyup", function () {
                curr_val = $('#alert_widget_input').val();
                $('.company_alert_error').hide();
                if(curr_val === ""){
                    $('.ajax_company_results').empty();
                    $('.ftue_company_results').hide();
                }

                // wait .2 secs before returning results:
                setTimeout(function () {
                    updated_val = $('#alert_widget_input').val();
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

            if (type === 'widget') {
                // setup minimize for alerts widget
                WHOAT.helper.wireMinimize(".alerts_widget");
            }
        }

        // Widget Functions
        // -------------------------------------------------------------------
        var positionWidgets = function(widget, response, position) {
            var div_top = $('.'+widget+'_widget_top');
            var div_bot = $('.'+widget+'_widget_bot');

            if (position === 'top') {
                $(div_top).empty();
                $(div_top).append(response);
                $(div_top).fadeIn('fast');
            } else if (position === 'bot') {
                $(div_bot).empty();
                $(div_bot).append(response);
                $(div_bot).fadeIn('fast');
            }
        }

        function setupAlertsWidget(response) {
            positionWidgets('alerts', response, position);
            wireAlertFunctions();
        }

        function manageResponse(response) {
            if (type === 'widget') {
                setupAlertsWidget(response);
            } else if (type === 'page') {
                wireAlertFunctions();
                removeAlerts();
            }
        }

        function removeAlerts() {
            $('.blue_delete').unbind('click').bind("click", function() {
                var theBtn = $(this),
                $tr        = $(this).closest("tr"),
                trigger_id = $(theBtn).parents('tr:first').data('trigger-id'),
                params     = { 'id' : trigger_id };

                $(theBtn).css('cursor','auto');
                $(theBtn).attr("disabled", "disabled");
                $tr.fadeOut('fast');

                WHOAT.networking.postToServerWithAjax('/delete/company/alert', params, function (response) {
                    if (response.result === "success") {
                        WHOAT.notify.topNotify('success', 'Alert Removed');
                    } else if (response.result === "error") {
                        WHOAT.notify.topNotify('error', response.message);
                    }
                });
            });
        }

        /*
            Get Alert Widget or Alert Page HTML:
        */
        WHOAT.networking.getToServerWithAjax(get_html, null, function (response) {
            if (response) {
                manageResponse(response);
            }
        });

        return {
            positionWidgets : positionWidgets
        }
    }

    return {
        wireAlerts : wireAlerts,
        init : init
    };

}(jQuery, window));

$(document).ready(function () {
    WHOAT.alerts.init();
});