$(function() {

    var pdf_open = false;

    $('.whoat_logo').unbind('click').bind('click', function () {
        window.location = 'https://whoat.net';
    });

    // iPhone PDF
    $('.iphone_button').unbind('click').bind('click', function () {
        window.location = 'https://s3.amazonaws.com/whoat_docs/WhoAt+Intro+Getting+Started-Perspectives14-Mobile.pdf';
    });

    $('.iphone_button_small').unbind('click').bind('click', function () {
        window.location = 'https://s3.amazonaws.com/whoat_docs/WhoAt+Intro+Getting+Started-Perspectives14-Mobile.pdf';
    });

    // Browser PDF
    $('.browser_button').unbind('click').bind('click', function () {
        window.location = 'https://s3.amazonaws.com/whoat_docs/WhoAt+Intro+Getting+Started-Perspectives14-Web.pdf';
    });

    $('.browser_button_small').unbind('click').bind('click', function () {
        window.location = 'https://s3.amazonaws.com/whoat_docs/WhoAt+Intro+Getting+Started-Perspectives14-Web.pdf';
    });

    // Get iPhone App
    $('.app_store').unbind('click').bind('click', function () {
        window.location = 'https://itunes.apple.com/us/app/who-intro/id777717885';
    });
    
    // Getting Started Guides dropdown
    $('#getting_started_guides').unbind('click').bind('click', function() {
        if (pdf_open === false) {
            $('#pdf_dropdown').fadeIn('fast');
            pdf_open = true;

        } else {
            $('#pdf_dropdown').hide();
            pdf_open = false;
        }
    });

});