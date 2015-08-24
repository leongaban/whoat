<!DOCTYPE html>
<html lang="en">
<head>
    <title>${self.title()}</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=.5">
    <meta name="description" content="A new and private way of leveraging your contacts to expand your business.">
    <meta name="keywords" content="who, who@, whoat, introductions, networking, sales, business, relationships, fund raising, event, meet, intro">
    <meta name="author" content="WhoAt, LLC">
    <meta name="keywords" content="Who@, Intro">
    <meta property="og:image" content="/static/img/public/whoat-facebook.gif"/>
    <meta property="og:title" content="Who@ - A new and private way of leveraging your contacts to expand your business."/>
    <meta property="og:site_name" content="Who@"/>
    <meta property="og:type" content="Web App"/>


    <link rel="apple-touch-icon-precomposed" href="/static/img/public/apple-touch-icon.png">
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="/static/img/public/apple-touch-ipad.png" />
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/static/img/public/apple-touch-iphone4.png" />
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="/static/img/public/apple-touch-ipad-retina.png" />

    <!-- html5.js IE8 -->
    <!--[if lt IE 9]><script src="/static/js/vendor/html5.js"></script><![endif]-->
    <!-- css3-mediaqueries.js IE8 -->
    <!--[if lt IE 9]><script src="/static/js/vendor/css3-mediaqueries.js"></script><![endif]-->
    <script type='text/javascript' src="/static/js/jquery-1.11.1-min.js"></script>
    <script type='text/javascript' src="/static/js/libs/jquery-ui/jquery-ui.min.js"></script>
    <script type="text/javascript" src="/static/js/widget.js"></script>
    ${self.head()}
</head>

<body>

<%block name="home_modals"/>

## User Not Verified:
%if verified is not none and verified is False:
    <%include file="website/verify.mak"/>

## User Is Verified:
%else:
    <%block name="header"/>
    <%block name="sidebar"/>
    <%block name="modals"/>

    <div id="white_ftue"></div>
    <div id="dark_ftue"></div>
    <div id="ftue_tour"></div>
    <div class="overlay"></div>

    ${self.body()}

    %if member:
        %if (member is not None) or (len(member) > 0):
            
        %else:
            
        %endif
    %endif

    <%block name="scripts"/>
%endif

<footer>
    <%block name="footer"/>
</footer>

</body>

</html>