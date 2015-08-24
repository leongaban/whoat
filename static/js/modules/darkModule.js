// DARK FTUE MODULE
//======================================================================
WHOAT.dark = (function ($, w, undefined) {
    'use strict';

    var first_user = 'false';
    
    // Request for Dark FTUE template
    var loadDarkFtue = function() {
        WHOAT.networking.getToServerWithAjax('/dark/ftue', null, function (response) {
            if (response) {
                // Flag Dark FTUE has been see:
                WHOAT.networking.getToServerWithAjax('/dark/seen', null, function (response) {});
                wireDarkFtue(response);
            }
        });
    };

    var wireSections = function() {

        // Check session for coworker count
        WHOAT.networking.getToServerWithAjax('/api/v1/session', null, function (response) {
            if (response) {
                var coworkers = response.member.coworkers;
                if (coworkers.length > 0) {
                    first_user = 'true';
                } else if (coworkers.length === undefined || coworkers.length === 0) {
                    first_user = 'false';
                }
            }
        });

        $('.dark_btn').unbind('click').bind('click', function (event) {
            var $darkButton = $(this);
            if ($darkButton.hasClass('to_dark_2')) {    
                $('.dark_step_1').hide();
                $('.dark_step_2').show();
            } else if ($darkButton.hasClass('to_dark_3')) {
                $('.dark_step_2').hide();
                $('.dark_step_3').show();
            } else if ($darkButton.hasClass('to_dark_4')) {
                $('.dark_step_3').hide();
                $('.dark_step_4').show();
            } else if ($darkButton.hasClass('to_dark_5')) {
                $('.dark_step_4').hide();
                $('.dark_step_5').show();
            } else if ($darkButton.hasClass('to_dark_6')) {
                $('.dark_step_5').hide();
                $('.dark_step_6').show();
            } else if ($darkButton.hasClass('to_dark_7')) {
                $('.dark_step_6').hide();

                // Get last Dark frame
                WHOAT.networking.getToServerWithAjax('/dark/final', null, function (response) {
                    if (response) {

                        $('.dark_step_7').append(response);

                        // Update final copy
                        if (first_user === 'true') {
                            $('.first_in_company').show();
                        } else if (first_user === 'false') {
                            $('.next_in_company').show();
                        }

                        $('.dark_step_7').show();
                        wireSections();
                    }
                });

            // Finish and close the Dark FTUE:
            } else if ($darkButton.hasClass('dark_finish')) {

                if ($("#not_snarfed").length == 0) {
                  // Widget scripts are loaded.
                } else {
                    // Reload the widget scripts:
                    WHOAT.networking.getToServerWithAjax('/get/scripts', null, function (response) {
                        if (response) {
                            $('.init_widgets').append(response);
                        }
                    });
                }

                $('.dark_step_7').hide();
                $('#dark_ftue').empty();
            }
        });
    }

    // Place response on page and wire sections
    function wireDarkFtue(response) {
        $('#dark_ftue').append(response);
        $('#dark_ftue').show();
        $('.white_cover').hide();
        $('.white_cover').remove();
        wireSections();
    }

    return {
        loadDarkFtue : loadDarkFtue,
        wireSections : wireSections
    };

}(jQuery, window));