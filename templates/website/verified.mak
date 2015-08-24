<%inherit file="../master.mak"/>

<%block name="title">Success! You have been verified!</%block>

<%block name="head">
    <meta name="apple-itunes-app" content="app-id=777717885">
    <%include file="../dashboard/includes.mak"/>
</%block>

<%block name="header">

</%block>

<%block name="body">

    <div class="verified_container">
    
        <div class="verified_widget">

            <div class="center_logo">
                <a href="/" title="Who@"><div class="whoat_logo_svg"></div></a>
            </div>

            <div class="verified_box">

                <h1>Thank You For Verifying</h1>
                <h2>
                    (${username})
                </h2>

                <p>If you haven't already, please download one of our apps,</p>
                <p>or visit us at <strong><a href="/">whoat.net</a></strong> on a desktop<br/> or mobile device.</p>

                <div class="gray_line"></div>

                <div class="app_choices">

                    <div class="download_iphone_app">
                        <ul>
                            <li>Apple</li>
                            <li><div class="apple_store_logo"></div></li>
                            <li>
                                <p class="text_iphone_app">Text It To Me</p>

                                <div id="get_text_iphone_app">
                                    <form id="text_request_app" action="" method="post">
                                        <input type='tel' pattern='[0-9]{10}' class='' id='text_app_num' name='text_app_num' data-key='' value='' autocomplete='off' maxlength='20' placeholder="Your number"/> <button id="text_app_send">send</button>
                                    </form>
                                </div>
                                <div class="ios_app_sent">Sent! Check your phone.</div>
                            </li>
                        </ul>
                    </div>
                    <div class="download_android_app">
                        <ul>
                            <li>Android</li>
                            <li>
                                <section>
                                    <div class="android_store_logo"></div>
                                </section>
                            </li>
##                            <li><p class="text_android_app">Text It To Me</p></li>
                            <li><p class="text_android_app">Coming Soon.</p></li>
                        </ul>
                    </div>

                </div>

            </div>
        </div>
    </div>

    <script language="javascript">
        $('.apple_store_logo').unbind('click').bind('click', function (event) {
            WHOAT.networking.redirectToURL('https://itunes.apple.com/us/app/who-intro/id777717885', '_blank');
        });

        $('.android_store_logo').unbind('click').bind('click', function (event) {
            // WHOAT.networking.redirectToURL('https://itunes.apple.com/us/app/who-intro/id777717885', '_blank');
        });

        // Show input for number to recieve iPhone app:
        $('.text_iphone_app').unbind('click').bind('click', function (event) {
            $('.text_iphone_app').hide();
            $('#get_text_iphone_app').show();
        });

        // Request to get iPhone app:
        $('#text_request_app').unbind('submit').bind("submit", function(event) {
            var params = { text_app_num : '' };
            params.text_app_num = $('#text_app_num').val();

            WHOAT.networking.postToServerWithAjax('/send_sms_ios', params, function (response) {
                $('#get_text_iphone_app').hide();
                if (response.message === "success") {
                } else if (response.message === "error") {
                    $('.ios_app_sent').text("Error :( Try again later");
                }
                $('.ios_app_sent').show();
            });
            return false;
        });
    </script>

</%block>

<%block name="footer">
##    <script>
##        var redirect_url = "../dashboard";
##        function redirect(){
##            window.location = redirect_url;
##        }
##        setTimeout(function(){redirect();}, 2000);
##    </script>
</%block>
