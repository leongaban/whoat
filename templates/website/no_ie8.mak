<%inherit file="../master.mak"/>

<%block name="title">We don't support IE8</%block>

<%block name="head">
    <link rel="stylesheet" href="/static/css/dashboard.css" type="text/css">
</%block>

<%block name="header">

</%block>

<%block name="body">

    <div class="verified_container">
    
        <div class="noie8_widget">

            <div class="">
                <a href="/" title="Who@">
                    <img src="/static/img/public/noie8_logo.png" alt="WhoAt"/>
                </a>
            </div>

            <div class="verified_box noie8">

                <h1>We don’t support Internet Explorer 8</h1>

                <p><a href="http://browsehappy.com" target="_blank">Upgrade Your Browser Here</a></p>

                <div class="gray_line"></div>

                <div class="app_choices">

                    <div class="download_iphone_app">
                        <ul>
                            <li>
                                <a href="https://itunes.apple.com/us/app/who-intro/id777717885" alt="app store" target="_blank">
                                    <img src="/static/img/public/app_store_button.png"/>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div class="download_android_app">
                        <ul>
                            <li>
                                <a href="https://itunes.apple.com/us/app/who-intro/id777717885" alt="google play store" target="_blank">
                                    <img src="/static/img/public/google_store_button.png"/>
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>

            </div>

        </div>
    </div>

</%block>

<%block name="footer">

</%block>