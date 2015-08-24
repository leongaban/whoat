//initial google setup
var _gaq = _gaq || [];
_gaq.lang = 'en';
_gaq.push(['_setAccount', 'UA-28028192-1']);
_gaq.push(['_setDomainName', 'whoat.net']);
_gaq.push(['_setAllowLinker', false]);
_gaq.push(['_gat._anonymizeIp']);
_gaq.push(['_trackPageview']);


//GOOGLE ANALYTICS
//======================================================================
WHOAT.analytics = (function ($, w, undefined) {
    'use strict';
    
    function init() {
        (function () {
            var ga = document.createElement('script'); ga.type = 'text/javascript';
            var s = document.getElementsByTagName('script')[0];
            ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'https://www') + '.google-analytics.com/ga.js';
            s.parentNode.insertBefore(ga, s);
        }());
    }

    
    //TRACK PAGE VIEWS
    var trackPageView = function (url) {

        //get the url from the pathname if it wasn't passed in
        if (url === null || url === undefined) {
            url = w.location.pathname;
        }

        //console.log(url);

        //if an id is part of the url, replace the id with 'details'
        url = url.replace(new RegExp(/\/[0-9]+$/), '/details');
        _gaq.push(['_trackPageview', url]);
    };
    
    //TRACK CLICK EVENT
    var trackClickEvent = function (clickedItem) {
        var url = w.location.pathname;
        url = url.replace(new RegExp(/\/[0-9]+$/), '/details');
        _gaq.push(['_trackEvent', 'click', clickedItem, 'url for clicked is ' + url]);

        // console.log('analytics trackSearchEvent: '+searchTerm);
    };
    
    //TRACK SEARCH EVENT
    var trackSearchEvent = function (searchTerm) {
        var url = w.location.pathname;
        url = url.replace(new RegExp(/\/[0-9]+$/), '/details');
        _gaq.push(['_trackEvent', 'search', searchTerm, 'url for search is ' + url]);

        // console.log('analytics trackSearchEvent: '+searchTerm);
    };

    
    //TRACK VIDEO EVENT
    var trackVideoEvent = function (event, videoID, time) {
        var label;
        if (time !== null && time !== undefined) {
            label = 'video id is ' + videoID + " and time is " + time;
        } else {
            label = 'video id is ' + videoID;
        }

        _gaq.push(['_trackEvent', 'video', event, label]);
    };

    //track the page just landed on
    trackPageView();

    return {
        trackPageView : trackPageView,
        trackClickEvent : trackClickEvent,
        trackSearchEvent : trackSearchEvent,
        trackVideoEvent : trackVideoEvent,
        init : init
    };
    
}(jQuery, window));

$(document).ready(function () {
    WHOAT.analytics.init();
});