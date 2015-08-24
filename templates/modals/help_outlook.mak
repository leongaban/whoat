<!DOCTYPE html>
<html lang="en">
<head>
    <title>Outlook Sync Help</title>
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

    <link rel="shortcut icon" href="/static/img/public/favicon.ico">
    <link rel="apple-touch-icon-precomposed" href="/static/img/public/apple-touch-icon.png">
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="/static/img/public/apple-touch-ipad.png" />
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/static/img/public/apple-touch-iphone4.png" />
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="/static/img/public/apple-touch-ipad-retina.png" />

    <link rel="stylesheet" href="/static/css/dashboard.css" type="text/css">

    <!-- html5.js IE8 -->
    <!--[if lt IE 9]><script src="/static/js/vendor/html5.js"></script><![endif]-->
    <!-- css3-mediaqueries.js IE8 -->
    <!--[if lt IE 9]><script src="/static/js/vendor/css3-mediaqueries.js"></script><![endif]-->
    <script type='text/javascript' src="/static/js/jquery-1.11.1-min.js"></script>
    <script type="text/javascript" src="/static/js/widget.js"></script>

</head>

<body>

	<div id="ex_help_iphone_support">
		 Need help? <a href="mailto:support@whoat.net" target="_blank">support@whoat.net</a> | <a href="https://twitter.com/whoat_net" target="_blank">@whoat_net</a>
	</div>

	<div id="ex_help_iphone_close">
		<img src="/static/img/dashboard/help/exchange-help-x.png" alt="Close" />
	</div>

	<div id="ex_help_outlook_prev">
		<img src="/static/img/dashboard/help/exchange_help_prev.png" alt="Previous" />
	</div>

	<div id="ex_help_outlook_next">
		<img src="/static/img/dashboard/help/excahnge_help_next.png" alt="Next" />
	</div>

	<div id="exchange-helpoutlook-1" class="help_background">
		
	</div>

	<div id="exchange-helpoutlook-2" class="help_background">
		
	</div>

	<script type='text/javascript'>
    	
    	var page = 1;
    	var page_url = window.location.href;

		function close_window(url){
		    var newWindow = window.open('', '_self', ''); //open the current window
			window.close(url);
		}

		$('#ex_help_iphone_close').on('click', function() {
		    close_window(page_url);
		});

		$('#ex_help_outlook_next').on('click', function() {
			if (page === 1) {
				$('#ex_help_outlook_prev').show();
				$('#ex_help_outlook_next').hide();
				$('#exchange-helpoutlook-1').hide();
				$('#exchange-helpoutlook-2').show();
				page = 2;
			}
		});

		$('#ex_help_outlook_prev').on('click', function() {
			if (page === 2) {
				$('#exchange-helpoutlook-2').hide();
				$('#exchange-helpoutlook-1').show();
				$('#ex_help_outlook_prev').hide();
				$('#ex_help_outlook_next').show();
				prev = false;
				page = 1;
			}
		});

    </script>
</body>
</html>