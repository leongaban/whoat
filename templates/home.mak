<%inherit file="master.mak"/>

<%block name="title">Who@ A new and private way of leveraging your contacts to expand your business.</%block>

<%block name="head">
    <!--[if IE 8]>
    <script type="text/javascript">
        location.assign("/noie8");
    </script>
    <![endif]-->
    <%include file="website/includes.mak"/>
</%block>

<%block name="home_modals">
    <div id="what_is_whoat" class="video_holder">
        <div class="big_x"></div>
        <iframe id="video-home" class="video" src="https://vimeo.com/84403777?autoplay=1" width="600" height="377" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
        ##<iframe id="video-home" class="video" src="https://www.youtube.com/watch?v=4EUMGtLWf8U?autoplay=true" width="600" height="377" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
    </div>
</%block>

<%block name="body">
    <div class="container">
        <header>
            <div class="whoat_logo" title="Who@"></div>
            <div class="beta"></div>

            <%include file="website/nav.mak"/>

            <div class="home_login_box">
                <form id="home_login" action="" method="post">

                    <div class="error_home_username close_errs"><span>Username not registered</span></div>

                    <div class="error_home_password close_errs"><span>Invalid password</span></div>

                    <input type="text"
                               id="home_login_email"
                               class="home_login_input"
                               name="username"
                               placeholder="email"/>

                    <input type="password"
                           id="home_login_password"
                           class="home_login_input"
                           name="password"
                           placeholder="Password"
                           autocomplete="off"/>

                    <a href="/forgot/password">Forgot your password?</a>
                    
                    <button id="home_login_submit" type="submit">login</button>
                </form>
            </div>
        </header>

        <main>
            <div class="gradient">
                <div class="testing"></div>

                <div class="hero close_errs">
                    <div class="hero_glow"></div>
                </div>
            </div>

            <section class="tagline">
                <h1>A <em>new and private</em> way of leveraging<br/> your contacts to <em>expand your business.</em></h1>
                <button class="learn_more" href="#what_is_whoat">Learn More</button>
                <div class="arrow_to_intro learn_more"></div>
            </section>
        </main>

        <section id="intro_app_area">
            <div class="intro_container close_errs">
                <div data-id="777717885" class="iphone get_ios_app go_appstore" title="Get the Intro app!">
                    <img src="/static/img/public/white_iphone.png" alt="Who@ Intro app"/>
                </div>
                <div class="intro_details">
                    <ul>
                        <li>
                            <div class="intro_logo"></div>
                        </li>
                        <li>
                            <h1>Get introductions to people you need, while respecting your network’s contacts.</h1>
                        </li>
                        <li>
                            <h2 class="see_it_works">See how it works here.</h2>
                        </li>
                        <li>
                            <h3>
                                <div data-id="777717885" class="app_store go_appstore" title="Get the Intro app!"></div>
                                <p>Android App Coming Soon</p>
                            </h3>
                        </li>
                    </ul>
                </div>
            </div>
            ##<div class="arrow_to_namegame"></div>
        </section>

##        <section id="namegame_area">
##            <div class="namegame_container">
##                <div class="namegame_couple">
##                    <img src="/static/img/public/namegame_couple.svg" title="See who you know in common" alt="Name Game"/>
##                </div>
##
##                <div class="namegame_details">
##                    <ul>
##                        <li><div class="namegame_logo"></div></li>
##                        <li>
##                            <h1>Finding common ground has never been easier, see who you know in common to help make new meaningful relationships.</h1>
##                        </li>
##                        <li>
##                            <h2>Use our NameGame APIs in your application now.</h2>
##                        </li>
##                    </ul>
##                </div>
##            </div>
##        </section>
    </div>
</%block>

<%block name="footer">
    <%include file="website/footer.mak"/>
</%block>