// =========================================================================
//  MY REPORTS MODULE
// =========================================================================
WHOAT.reports = (function ($, w, undefined) {
    'use strict';

    var loc = location.pathname;
    
    function init() {

        $("#orgDropdown").on("change", function(e) {
            var optSelection = {}
            optSelection["optionSelected"] = $("#orgDropdown").val();
            WHOAT.networking.postToServer(loc, optSelection);
        });
        $("#getRoute").on("change", function(e) {
            var routeLoc = "";
            var optSelection = {}
            optSelection["optionSelected"] = $("#getRoute").val();
            var opt = $(this).find(':selected').text();
            switch(opt){
                case "Onboarding":
                    routeLoc = "/reports/on_board";
                    break;
                case "Engagement":
                    routeLoc = "/reports/engagement";
                    break;
                case "Unregistered":
                    routeLoc = "/reports/unregistered";
                    break;
                case "Popular Searches":
                    routeLoc = "/reports/searches";
                    break;
                default:
                    routeLoc = "/reports/on_board";
                    break;
            }
            WHOAT.networking.postToServer(routeLoc, optSelection);
        });

        $('.date_items').on("click", function(e) {
            $('#date_picker').fadeToggle('fast');
            $('.dropdown_dates_settings').fadeToggle('fast');
        });
    };

    var wireReports = function () {
        //put the page selector (onboard, engagement.. etc.) on the current page
        var $route = $("#getRoute");
        switch(loc){
            case "/reports/on_board":
                WHOAT.helper.selectOptionByValue($route[0], "Onboarding");
                break;
            case "/reports/engagement":
                WHOAT.helper.selectOptionByValue($route[0], "Engagement");
                break;
            case "/reports/unregistered":
                WHOAT.helper.selectOptionByValue($route[0], "Unregistered");
                break;
            case "/reports/searches":
                WHOAT.helper.selectOptionByValue($route[0], "Popular Searches");
                break;
            default:
                break;
        }
        //don't put pagination on the table if it has no content
        var rowCheck = $('#table_reports tbody').find('td');
        if (rowCheck.length > 1) {   
            $("#table_reports").dataTable({
                'iDisplayLength' : 100
            });
        }

        //sort the dropdown of organizations
        var my_options = $("#orgDropdown option");
        WHOAT.helper.optionSort(my_options)
        $("#orgDropdown").empty().append(my_options);
        $("#orgDropdown").chosen();

        //--------------------     TOOL TIP FOR THE CONTACTS     --------------------
        $('.custom_tooltip').tooltip({ 
            items: "[data-member]",
            position: {
                my: "center bottom-20", // the "anchor point" in the tooltip element
                at: "center top", // the position of that anchor point relative to selected element
                collision:'fit',
                using: function( position, feedback ) {
                  $( this ).css( position );
                  $( "<div>" )
                    .addClass( "arrow" )
                    .addClass( feedback.vertical )
                    .addClass( feedback.horizontal )
                    .appendTo( this );
                }
            },
            // template: '<div class="tooltip tooltip_styling"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
            content: function(){
                var el = $(this),
                    content = el.data('ajax-content');
                if(content){
                    return content;
                }    
                return '<img src="/static/img/dashboard/gifs/small_loader.gif">';
            },
            open: function(event, ui){
                var elem = $(this),
                label = elem.data('ajax-content');
                if (typeof(event.originalEvent) === 'undefined')
                {
                    return false;
                }

                var $id = $(ui.tooltip).attr('id');

                // close any lingering tooltips
                $('div.ui-tooltip').not('#' + $id).remove();

                if (label) {
                  elem.tooltip('option', 'content', label);
                } else {
                    var id = elem.data('member');
                    WHOAT.networking.getToServerWithAjax('/api/v1/admin/member_details/' + id + '?query=contact_streams', null, function (res) {
                        var $data = setToolTipData(res)
                        if ($data == ""){
                            $data = "No Recognized Contacts";
                        }
                        elem.data('ajax-content', $data);
                        elem.tooltip("close");
                        elem.tooltip("open");
                    });
                }
            },
            close: function(event, ui){
                ui.tooltip.hover(function()
                {
                    $(this).stop(true).fadeTo(400, 1); 
                },
                function()
                {
                    $(this).fadeOut('400', function()
                    {
                        $(this).remove();
                    });
                });
            }
        });
        var setToolTipData = function(param){
            if(param){
                var $str ="";
                for (var i = 0; i < param.length; i++) {
                    var thingy = param[i];
                    if(thingy['type'] =="Exchange"){
                        var $eStr = '<table class="unique_class">' +
                            '<tr>' +
                                '<td><div><img src="/static/img/reports/exchange.png"></div></td>' +
                                '<td class="raise_td">' + thingy.contacts.unique + '</td>' +
                            '</tr>' +
                        '</table> ';
                    }
                    else if (thingy['type'] == "Device") {
                        var $dStr = '<table class="unique_class">' +
                            '<tr>' +
                                '<td><div><img src="/static/img/reports/iphone.png"></div></td>' +
                                '<td class="raise_td">' + thingy.contacts.unique + '</td>' +
                            '</tr>' +
                        '</table> ';
                           
                    }
                    else if (thingy['type'] == "Gmail"){
                        var $gStr = '<table class="unique_class">' +
                            '<tr>' +
                                '<td><div><img src="/static/img/reports/gmail.png"></div></td>' +
                                '<td class="raise_td">' + thingy.contacts.unique + '</td>' +
                            '</tr>' +
                        '</table> ';
                    }
                    else{
                        $str = '<span>No Contacts</span>'
                    }
                };
                if($eStr){
                    $str = $str + $eStr;
                }
                if($dStr){
                    $str = $str + $dStr;
                }
                if($gStr){
                    $str = $str + $gStr;
                }
                return $str;
            }
        }

    }

    var wireOnboardingReport = function () {
        
    }

    var wireEngagementReport = function () {

        $("#endDate").datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: 'yy-mm-dd',
            showOtherMonths: true,
            selectOtherMonths: true,
        });
        $("#startDate").datepicker({
            changeMonth: true,
            changeYear: true,
            showOtherMonths: true,
            selectOtherMonths: true,
            dateFormat: 'yy-mm-dd',
        });
        
        $('.display_checkbox').on('change', function(e){
            var $checkBox = e.target.value;
            if(this.checked){
                if($checkBox == "Introductions"){
                    $('.hide_show_intros').fadeIn(1000);
                    $(".display_intro_colspan").attr('colspan', 6);
                }else if ($checkBox == "Friends"){
                    $('.hide_show_friends').fadeIn(1000);
                    $(".display_friend_colspan").attr('colspan', 4);
                }
            }else{
                if($checkBox == "Introductions"){
                    $('.hide_show_intros').css('display' , 'none');
                    $(".display_intro_colspan").attr('colspan', 1);
                }else if ($checkBox == "Friends"){
                    $('.hide_show_friends').css('display' , 'none');
                    $(".display_friend_colspan").attr('colspan', 1);
                }
            }//$(".display_intro_colspan")
        });
        //populating the date fields with presets
        $('.date_selection').on('click', function(e){
            var d = new Date();
            var myMonth = d.getMonth();
            var myYear = d.getFullYear();
            var $btnText = e.target.value;
            if ($btnText == "Last Day") {
                $btnText = 'Submit Button'
                var myStartDay = d.getDate() - 1;
                var myEndDay = d.getDate();
                var myStartDate = new Date(myYear, myMonth, myStartDay);
                var myEndDate = new Date(myYear, myMonth, myEndDay);

            } else if ($btnText == "Last Week") {
                $btnText = 'Submit Button'
                var myStartDay = d.getDate() - d.getDay() - 7; //GET TO THE FIRST DAY OF THE WEEK THEN GO BACK ANOTHER WEEK
                var myEndDay = myStartDay + 6; //GET TO THE LAST DAY OF THE PREVIOUS WEEK
                
                var myStartDate = new Date(myYear, myMonth, myStartDay);
                var myEndDate = new Date(myYear, myMonth, myEndDay);

            } else if ($btnText == "Last Month") {
                $btnText = 'Submit Button'
                var myStartMonth = d.getMonth() - 1;
                var myEndMonth = d.getMonth();
                var myStartDate = new Date(myYear, myStartMonth, 1);
                var myEndDate = new Date(myYear, myEndMonth, 0);

            } else if ($btnText == "Last Quarter") {
                $btnText = 'Submit Button'
                var h = d.getMonth();
                if (h < 3) {
                    var myStartMonth = d.getMonth() - d.getMonth() - 3;
                    var myEndMonth = myStartMonth + 3;
                } else if ((h >= 3) && (h < 6)) {
                    var myStartMonth = d.getMonth() - d.getMonth();
                    var myEndMonth = myStartMonth + 3;
                } else if ((h >= 6) && (h < 9)) {
                    var myStartMonth = d.getMonth() - d.getMonth() + 3;
                    var myEndMonth = myStartMonth + 3;
                } else if (h > 8) {
                    var myStartMonth = d.getMonth() - d.getMonth() + 6;
                    var myEndMonth = myStartMonth + 3;
                }
                var myStartDate = new Date(myYear, myStartMonth, 1);
                var myEndDate = new Date(myYear, myEndMonth, 0);

            } else if ($btnText == "Year to Date") {
                $btnText = 'Submit Button'
                var myDay = d.getDate();
                var myStartDate = new Date(myYear, 0, 1);
                var myEndDate = new Date(myYear, myMonth, myDay);

            } else if ($btnText == "12 Months") {
                $btnText = 'Submit Button'
                var myDay = d.getDate();
                var myStartMonth = d.getMonth() - 12;
                var myEndMonth = d.getMonth();
                var myStartDate = new Date(myYear, myStartMonth, myDay);
                var myEndDate = new Date(myYear, myEndMonth, myDay);
            } else if($btnText == "Submit"){
                $btnText = 'Submit Button'
                var dd = d.getDate();
                var mm = d.getMonth()+1; //January is 0!

                var yyyy = d.getFullYear();
                if(dd<10){
                    dd='0'+dd
                } if(mm<10){
                    mm='0'+mm
                } 
                var today = yyyy+'-'+mm+'-'+dd;

                var myStartDate = $("#startDate").val();
                var myEndDate = $("#endDate").val();
            }

            $('#startDate').datepicker('setDate', myStartDate);
            $('#endDate').datepicker('setDate', myEndDate);

            var dictOfDates = {};
            var startFrom = $("#startDate").val();
            var endWith = $("#endDate").val();

            if (startFrom === ""){
                startFrom = "2012-01-01";
            }
            if(endWith === ""){
                endWith = today;
            }

            dictOfDates["start"] = startFrom;
            dictOfDates["end"] = endWith;

            if($btnText == "Submit Button"){
                WHOAT.networking.postToServer("/reports/engagement", dictOfDates); 
            }

        });
        //tooltip for the searches made
        $('.searches_tooltip').tooltip({
            items: "[data-barSearch], [data-browse]",
            position: {
                my: "center bottom-20", // the "anchor point" in the tooltip element
                at: "center top", // the position of that anchor point relative to selected element
                using: function( position, feedback ) {
                  $( this ).css( position );
                  $( "<div>" )
                    .addClass( "arrow" )
                    .addClass( feedback.vertical )
                    .addClass( feedback.horizontal )
                    .appendTo( this );
                }
            },
            // template: '<div class="tooltip tooltip_styling"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
            content: function(){
                var el = $(this);
                var $str = '<table class="unique_class">' +
                            '<tr>' +
                                '<td>Searches: </td>' +
                                '<td>' + el.data('barsearch') + '</td>' +
                            '</tr>' +
                            '<tr>' +
                                '<td>Browses: </td>' +
                                '<td>' + el.data('browse') + '</td>' +
                            '</tr>' +
                            '</table>';
                return $str;
            }
        });

        //tooltip to show the unsername associated with each user
        $('.username_tooltip').tooltip({
            items: "[data-username]",
            position: {
                my: "center bottom-20", // the "anchor point" in the tooltip element
                at: "center top", // the position of that anchor point relative to selected element
                using: function( position, feedback ) {
                  $( this ).css( position );
                  $( "<div>" )
                    .addClass( "arrow" )
                    .addClass( feedback.vertical )
                    .addClass( feedback.horizontal )
                    .appendTo( this );
                }
            },
            // template: '<div class="tooltip tooltip_styling"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
            content: function(){
                var el = $(this);
                return el.data('username');
            }
        });
    }

    var wireUnregisteredReport = function (){
        //invite coworkers 
        $('.btn_invite').on("click", function(event) {
            var theBtn = $(this);
            var id = theBtn.data('contact-id');
            var contacts = [];
            contacts.push(id);
            

            $(theBtn).css('cursor','auto');
            $(theBtn).removeClass('btn_invite');
            $(theBtn).addClass('btn_inviting');
            $(theBtn).text('Invited');
            $(theBtn).css('background','#bdc7c7');
            $(theBtn).attr("disabled", "disabled");

            WHOAT.networking.postToServerWithAjax('/invite_coworkers', contacts, function (response) {
                // notification.setStatusAndFadeStatus(response);
            });
            return false;
        });
    }

    return {
        wireReports : wireReports,
        wireOnboardingReport : wireOnboardingReport,
        wireEngagementReport : wireEngagementReport,
        wireUnregisteredReport : wireUnregisteredReport,
        init : init
    };

}(jQuery, window));

$(document).ready(function () {
    WHOAT.reports.init();
});