// =========================================================================
//  NETWORKING
// =========================================================================
WHOAT.networking = (function ($, w, undefined) {
    'use strict';

    var invokeServerParams = function(url, params, callback, postMethod) {

        WHOAT.analytics.trackPageView(url);
        jQuery.ajax({
            type: postMethod,
            url: url,
            cache: false,
            data: params,
            // dataType: 'JSON',
            statusCode: {
                200: function (data, textStatus, jqXHR) {
                    callback(data);
                },
                201: function (data, textStatus, jqXHR) {
                    callback(data);
                },
                400: function (data, textStatus, jqXHR) {
                    callback(data);
                }
            }
        });
    }

    // JSON server call
    var invokeServerWithJSON = function(url, params, callback, postMethod) {

        WHOAT.analytics.trackPageView(url);
        $.ajax({
            type: postMethod,
            url: url,
            cache: false,
            data: JSON.stringify({'params': params}),
            contentType: "application/json",
            statusCode: {
                200: function (data, textStatus, jqXHR) {
                    callback(data);
                },
                201: function (data, textStatus, jqXHR) {
                    callback(data);
                },
                400: function (data, textStatus, jqXHR) {
                    callback(data);
                }
            }
        });
    }

    //ajax post to server
    //action gets recorded with google analytics
    var postToServerWithAjax = function (url, params, callback) {
        invokeServerParams(url, params, callback, 'POST');
    }

    var postToServerWithAjaxJSON = function (url, params, callback) {
        invokeServerWithJSON(url, params, callback, 'POST');
    }

    var getToServerWithAjax = function (url, params, callback) {
        invokeServerParams(url, params, callback, 'GET');
    }

    //Posts a form to the server
    //records the action using google analytics
    var postToServerWithForm = function (form) {
        var $form = $(form);
        var url = $form.attr('action');
        WHOAT.analytics.trackPageView(url);
        //remove the submit validation
        //the form should have already been validated
        //if the click event isn't unbound, it will kick of the submit validation which in turn will call this method (infinite loop)
        $form.unbind('submit');
        $form.submit();
    }

    //Creates a form and submits the form using the values passed in
    //url is the url that will be posted to
    //params is a dictionary with the values getting posted
    var postToServer = function (url, params) {
        WHOAT.analytics.trackPageView(url);
        //creates a form and submits the form with the params passed in
        var map_form = $('<form id="mapform" action="' + url + '" method="post"></form>');
        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                map_form.append('<input type="hidden" name="' + key + '" id="' + key + '" value="' + params[key] + '" />');
            }
        }
        $('body').append(map_form);
        map_form.submit();
    }

    //redirect to another page... as the name suggests
    var redirectToURL = function (url, target) {
        target = target || "_self";

        WHOAT.analytics.trackPageView(url);
        
        if (target === '_blank') {
            window.open(url);
        } else {
            window.location = url;
        }
    }

    return {
        postToServerWithAjax : postToServerWithAjax,
        postToServerWithAjaxJSON : postToServerWithAjaxJSON,
        postToServerWithForm : postToServerWithForm,
        getToServerWithAjax  : getToServerWithAjax,
        postToServer : postToServer,
        redirectToURL : redirectToURL
    }
}(jQuery, window));