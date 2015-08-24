WHOAT.events=function(e,t,n){"use strict";function r(t){var r=JSON.parse(t),i=r.result==="success",s=e("<div>"),o;i?s.addClass("alert alert-success"):s.addClass("alert alert-error");r.message!==n?o=r.message:i?o="Success":o="There was an error. Please try again later.";s.html(e("<h4>").html(o));s.hide();s.appendTo(".notification-container");s.show("slow");return s}function i(t){var n=r(t);setTimeout(function(){e(n).slideUp("slow",function(){e(n).remove()})},5e3)}function s(t){var n=e("tr[data-message-id='"+t+"']");n&&n.remove()}function o(t){var n=e("tr[data-message-id='"+t+"']"),r;if(n){r=n.find("td:first");r.removeClass("pending-cell");r.addClass("accepted-cell");r.find("p").html("Accepted")}}function u(t){var n=e(t),r=n.find("td:first");n.hasClass("unread-row")&&n.removeClass("unread-row");if(r.hasClass("unread-cell")){r.removeClass("unread-cell");r.addClass("pending-cell");r.html("");r.append("<div><span></span></div>");r.append("<p>Pending</p>")}}var a=function(t){var n=e(t);n.unbind("submit").bind("submit",function(){WHOAT.validation.validateLoginForm(this)&&WHOAT.networking.postToServerWithForm(this);return!1});n.find("input[name='password']").unbind("keyup").bind("keyup",function(e){e.keyCode===13&&n.find("button").click()})},f=function(t,n){var r=e(t);r.unbind("click").bind("click",function(){WHOAT.animations.animateLoginContainer(n)})},l=function(t,n){var r=e(t);r.unbind("click").bind("click",function(){WHOAT.networking.postToServer("/logout")})},c=function(t){var n=e(t);n.find("input[name='register_password']").unbind("keyup").bind("keyup",function(e){e.keyCode===13&&this.find("button").click()})},h=function(){var t=e("#register-email").val();e("#body-login .login-logo img").animate({top:"-=15"},1e3,function(){});e("#alert-user-email").text(t);e("#body-login .login-logo p").fadeIn("slow");e("#register-form").hide();e("#form-background").animate({height:273},200);e("#login-form").fadeToggle();e(".login-unselected").removeClass("login-unselected").addClass("login-selected");e(".login-selected").parent().find("#tab-register").removeClass("register-selected").addClass("register-unselected")},p=function(t){var n=e(t);n.unbind("submit").bind("submit",function(){WHOAT.validation.validateSendForgotPasswordForm(n);return!1});n.find("input[name='email']").unbind("keyup").bind("keyup",function(e){e.keyCode===13&&n.find("button").click()})},d=function(n){var r=e(n);r.find("a").unbind("click").bind("click",function(){WHOAT.networking.redirectToURL("/login")});r.unbind("submit").bind("submit",function(){if(WHOAT.validation.validateForgotPasswordForm(this)){var n=t.location.search;e(this).attr("action",e(this).attr("action")+n);WHOAT.networking.postToServerWithForm(this)}return!1});r.find("input[name='email']").unbind("keyup").bind("keyup",function(e){e.keyCode===13&&r.find("button").click()})},v=function(t,n){var r=e(t),i=!1;r.find("> tr:not(.footable-row-detail) td").unbind("click").bind("click",function(t){var s=e(this),o=e(this).parents("tr:first");if(i)return;i=!0;if(s.index()===0&&r.is(".breakpoint"))return;var a=o.data("message-id"),f="",l;n===WHOAT.enums.tableEnum.INCOMING?f="/incoming/"+a:n===WHOAT.enums.tableEnum.MY_REQUESTS&&(f="/myrequests/"+a);l={id:a};WHOAT.networking.postToServerWithAjax(f,l,function(t){WHOAT.animations.pushAndHideContent(t,e("#dashboard-body"));i=!1;u(o)})})},m=function(t,n){var r=e(t);r.find("tr button").unbind("click").bind("click",function(t){var n=e(this).parents("tr:first").data("user-details"),r=e("#contactModal"),s=e("#tmpl-contact-details").html(),o=e("#tmpl-intro-request").html(),u,a,f,l;if(n.userNetworks.inPersonal===0){e("#contactDetails").hide();r.find(".close:last").show()}else{u=Handlebars.compile(s);a=u(n);f=e("#contactDetails").find(".modal-body");f.empty();e(a).appendTo(f);f.find(".close:last").hide();e("#contactDetails").show()}if(n.userNetworks.inGroup>0||n.userNetworks.inOrganization>0||n.userNetworks.inFriends>0){u=Handlebars.compile(o);a=u(n);l=e("#requestIntro").find(".modal-body");l.empty();e(a).appendTo(l);e("#requestIntro").show()}else e("#requestIntro").hide();r.modal("show");r.find(".btn-primary").unbind("click").bind("click",function(){e(this).button("loading");var t=r.find("textarea"),s=t.val(),o=n.guid,u=[],a;s===""&&(s=t.attr("placeholder"));for(var f=0;f<n.networks.length;f++)u[f]=n.networks[f].guid;a={message:s,networks:u,target:o};WHOAT.networking.postToServerWithAjax("/createrequest",a,function(e){r.modal("hide");i(e);r.find(".btn-primary").button("reset")})})})},g=function(t){var n=e(t),r=n.find(".accept-decline-select-container"),u=n.find(".accept-decline-reply-container:first"),a=n.find(".accept-decline-reply-container:last"),f=r.find(".btn-accept"),l=r.find(".btn-decline"),c=n.find(".dashboard-message-details-response-container");f.unbind("click").bind("click",function(){r.fadeOut("normal",function(){u.fadeIn("normal")})});l.unbind("click").bind("click",function(){r.fadeOut("normal",function(){a.fadeIn("normal")})});c.find(".accept-decline-reply-container a").unbind("click").bind("click",function(){e.when(c.find(".accept-decline-reply-container").fadeOut("normal")).done(function(){r.fadeIn("normal")});return!1});u.find('form[name="acceptForm"]').unbind("submit").bind("submit",function(){var e=u.find("textarea").val();e==""?e=u.find("textarea").attr("placeholder"):e=WHOAT.utility.trimFromBeginningAndEnd(e);var t=n.data("message-id"),r={message:e,id:t},s="/incoming/"+t+"/accept";WHOAT.networking.postToServerWithAjax(s,r,function(e){i(e);o(t);n.find(".btn-back").click()});return!1});a.find('form[name="declineForm"]').unbind("submit").bind("submit",function(){var e=a.find("textarea").val();e&&e!==""&&(e=WHOAT.utility.trimFromBeginningAndEnd(e));var t=n.data("message-id"),r={message:e,id:t},o="/incoming/"+t+"/decline";WHOAT.networking.postToServerWithAjax(o,r,function(e){i(e);s(t);n.find(".btn-back").click()});return!1})},y=function(t){var n=e(t);n.find(".last-child a:last").unbind("click").bind("click",function(){var e=n.data("message-id"),t={id:e},r="/myrequests/"+e+"/delete";WHOAT.networking.postToServerWithAjax(r,t,function(t){i(t);s(e);n.find(".btn-back").click()});return!1})},b=function(t,n){e(t).unbind("click").bind("click",function(){if(e(n).find("> div:hidden").length>0){WHOAT.animations.popAndPushContent(n);return!1}WHOAT.networking.redirectToURL(e(this).attr("href"))})},w=function(t){var n=e(t);setTimeout(function(){n.slideUp("slow",function(){n.html("")})},5e3)},E=function(n){var r=e(n),i=t.location.pathname.replace(new RegExp("//[0-9]+/"),""),s=new RegExp(i.replace(/\/$/,""));r.find("a").each(function(){s.test(this.href.replace(/\/$/,""))&&e(this).addClass("active")})},S=function(t){var n=e(t);n.find("a").unbind("click").bind("click",function(){e(".popover").remove()})};return{wireLoginForm:a,wireMultipleForms:S,wireDashboardNav:E,wireNotificationContainer:w,wireBackButtonToPopContents:b,wireMyRequestDetailsForm:y,wireIncomingDetailsForm:g,wireSearchTableBody:m,wireMessageTableBody:v,wireResetPasswordForm:d,wireSendPasswordResetForm:p,wireRegisterForm:c,wireLogoutButton:l,wireLoginButton:f}}(jQuery,window);