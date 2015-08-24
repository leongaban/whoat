var settings = {
    url: "",
    debug: false
};

$(function() {
    /*
    //alert("LOADED!");

    var data = $("#inject").html();
    //alert(data);

    var obj = jQuery.parseJSON(data);
    console.log(obj);
    settings.url = obj.url;
    settings.debug = obj.debug;
    console.log(settings);
    //var url = settings.url + "login?json=true";
    //alert(url);
    post("login?json=true", {username: "ron@whoat.net", password: "dallas"}, function(o){
       alert("DONE!");
        console.log(o);
    });
    */

    // Obviously need to refactor this later...
    var timeoutHandle;

    // Logout
    $('#log_out').unbind('click').bind('click', function () {
        window.location = 'logout';
    });

    // Go to Intro Section
    $('.learn_more').unbind('click').bind('click', function () {
        // window.location = '#intro_app_area';
        $("html, body").animate({ scrollTop: $('#intro_app_area').offset().top }, 1000);
    });

    // Go to Name Game
    $('.arrow_to_namegame').unbind('click').bind('click', function () {
        // window.location = '#intro_app_area';
        $("html, body").animate({ scrollTop: $('#namegame_area').offset().top }, 1000);
    });

    $('#open_login').unbind('click').bind('click', function () {
        $('.home_login_box').slideToggle('fast');
    });

    // $('.home_login_box').unbind('mouseleave').bind('mouseleave', function() {
    //     timeoutHandle = setTimeout(function() {
    //         $('.home_login_box').slideToggle('fast');
    //     }, 1500);
    // });

    $('.gradient').unbind('click').bind('click', function() {
        $('.home_login_box').fadeOut('fast');
        window.clearTimeout(timeoutHandle);
    });

    // $('.home_login_box').unbind('mouseover').bind('mouseover', function(event) {
    //     window.clearTimeout(timeoutHandle);
    // });

});


function inject(e){
    var children = $(e).children();
    var url = null;
    if(children.length > 0){
        var child = children[0];
        url = $(child).html();
        alert(url);
    }


    $.get(url, function(data) {
        alert(data);
        $(e).html(data);
    });
}


function post(service, params, callback){
    var url = service;
    invoke("POST", url, params, callback);

    //console.log("GET!");
}


function invoke(method, url, data, callback){
    method = method.toUpperCase();
    $.ajax({
        type: method,
        contentType: "application/json; charset=utf-8",
        url: url,
        data: data,
        success: function (o) {
            alert(o);
        }
    });
};

//$.ajax({
//    type: "GET",
//    contentType: "application/json; charset=utf-8",
//    url: "Webservice.asmx/HelloWorld",
//    data: { param1: "aaa" },
//    success: function (msg) {
//        alert(msg.d);
//    }
//});
//$.get(url, function(data) {
//    alert(data);
//});