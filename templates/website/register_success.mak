x<%inherit file="../master.mak"/>

<%block name="title">Registered! Next: Verify</%block>

<%block name="head">
    <%include file="includes.mak"/>
</%block>

<%block name="header">

</%block>

<%block name="body">

##	<div id="register_success">
##
##        <div class="register_success_container">
##
##        	<div class="whoat_logo"></div>
##
##            <h1>Success! You have been registered!</h1>
##
##            <hr>
##
##            <h2>Check your email to verify your email address.</h2>
##
##            <div class="register_success_gif">
##                <img src="/static/img/utility/loading-bubbles.svg" width="64" height="64" />
##                ##<img src="/static/img/dashboard/gifs/small_loader.gif" alt="src" />
##            </div>
##        </div>
##
##	</div>

    <script>
        var redirect_url = "../dashboard";
        function redirect(){
            window.location = redirect_url;
        }
        setTimeout(function(){redirect();}, 1);
    </script>

</%block>

<%block name="footer">

</%block>