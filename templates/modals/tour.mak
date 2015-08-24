<div id="tour_modal">
    <div class="close_tour_x close_ftue"></div>

    <section id="tour_1" class="main_tour_section">
        <header class="tour_1_header">
            <em><p>Want Faster Introductions?</p></em>
        </header>

        <section class="tour_1_section">
            <div class="hand_shake_check tour_svg"></div>
            <div class="tour_1_copy">
                <h1>Utilizes <span>existing relationships</span> from your phone and email to get <span>important introductions.</span></h1>
            </div>
        </section>
        
    </section>

##  Networking SVG
##  ------------------------------------------------
    <section id="tour_2" class="main_tour_section">
        <header class="tour_2_header">
            <p>One Way We Help Requesting Intros</p>
        </header>

        <div class="heads_intro_arrows tour_svg"></div>

        <h1><span>Request intros</span> after searching your colleague&rsquo;s relationships in their phone. You now have access to all relationships, not just Who@ members</h1>
    </section>

##  Heatmap
##  ------------------------------------------------
    <section id="tour_3" class="main_tour_section">
        <header>
            <p>Plus We Provide Analytics</p>
        </header>

        <img src="/static/img/dashboard/ftue/tour_heatmap.gif" alt="Heatmap" />

        <h1>This is a <span>private enterprise</span> search tool.  Search on all contacts in your colleague&rsquo;s phone and Outlook.  The more coworkers who join, the greater value to you, so invite them now!</h1>
    </section>

##  Security Lock
##  ------------------------------------------------
    <section id="tour_4" class="main_tour_section">
        <header>
            <p>Secure and Private</p>
        </header>

        <div class="security_lock"></div>

        <div class="tour_4_copy">
            <p>Here's how we handle your data.</p>

            <ul>
                <li>&bull; We only share name, title and company</li>
                <li>&bull; We do not sell contact data or usage data</li>
                <li>&bull; We do not share contact details with others until you accept or request an intro</li>
                <li>&bull; At any point you can completely remove yourself from our servers</li>
            </ul>

            <em>To read more about how we handle your data and privacy information, <a href="/terms#privacypolicy" target="_blank">click here.</a></em>
        </div>
    </section>

##  Video
##  ------------------------------------------------
    <section id="tour_5" class="main_tour_section">
        <header>
            ##<p>See How To Get Started</p>
            <p>Learn More Video</p>
        </header>

        <div class="tour_video">
            <iframe src="//player.vimeo.com/video/84403777" width="500" height="281" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
        </div>
    </section>

##  Sync Email
##  ------------------------------------------------
    <section id="tour_6" class="main_tour_section">
        <header>
            <p>Sync Your Contacts Securely</p>
        </header>
        <section class="tour_6_section">
            <div class="tour_6_bullets">
                <table>
                    <tr>
                        <td>&#8226;</td>
                        <td>No one will know who owns the contacts that are uploaded.</td>
                    </tr>
                    <tr>
                        <td>&#8226;</td>
                        <td>Only the owner of the contact will be able to see any details (e.g.; phone numbers, emails addresses).</td>
                    </tr>
                    <tr>
                        <td>&#8226;</td>
                        <td>Only you can view that information as they are your contacts.</td>
                    </tr>
                    <tr>
                        <td colspan="2"><p>Read about how we handle contacts in our <a href="/faq" target="_blank">FAQ</a></p></td>
                    </tr>
                </table>
            </div>
            <div class="tour_6_sync_options">
                <ul>
                    <li id="btn_sync_exchange" data-type="exchange" class="snarf_btn_active">
                        <div class="snarf_btn">
                            <div class="check_holder"></div>
                            <div class="exchange_logo"></div>
                        </div>
                        <p>Add Exchange</p>
                        %if len([stream for stream in streams if stream["type"] == "Exchange"]) > 0:
                            %for stream in streams:
                                %if stream['type'] == "Exchange":
                                    <div class="snarfed_exchange_info">
                                        <em>${stream["contacts"]["total"]}</em> contacts
                                    </div>
                                    <div class="snarf_exchange_info"><em>#</em> contacts</div>
                                %endif
                            %endfor
                        %else:
                            <div class="snarf_exchange_info"><em>#</em> contacts</div>
                        %endif
                    </li>
                    <li id="btn_sync_gmail" data-type="gmail" class="snarf_btn_active" href="#modalgmail">
                        <div class="snarf_btn">
                            <div class="check_holder"></div>
                            <div class="gmail_logo"></div>
                        </div>
                        <p>Add Gmail</p>
                        %if len([stream for stream in streams if stream["type"] == "Gmail"]) > 0:
                            %for stream in streams:
                                %if stream['type'] == "Gmail":
                                    <div class="snarfed_gmail_info">
                                        <em>${stream["contacts"]["total"]}</em> contacts
                                    </div>
                                    <div class="snarf_gmail_info"><em>#</em> contacts</div>
                                %endif
                            %endfor
                        %else:

                        %endif
                    </li>
                    <li>
                        <div class="snarf_btn">
                            <div class="hotmail_logo">
                                <!-- <img src="/static/img/dashboard/ftue/hotmail_icon.png"/> -->
                            </div>
                        </div>
                        <p>Hotmail<br>Coming Soon</p>
                    </li>
                    <li>
                        <div class="snarf_btn">
                            <div class="yahoo_logo"></div>
                        </div>
                        <p>Yahoo<br>Coming Soon</p>
                    </li>
                </ul>
            </div>
        </section>
    </section>

## Gmail Patience
    <section id="patience_gmail">
        
    </section>

##  Sync Exchange Snarf Simple
##  ------------------------------------------------
    <section id="tour_6_exchange_snarf" class="main_tour_section">
        <header class="tour_6_header">
            <p>Exchange Access</p>
        </header>

        <section class="tour_6_section">
            <div class="tour_6_bullets">
                <p>We don't download your calendar, notes, emails or any other data besides contacts. At the moment this is only a one way sync, So if you add additional contacts to your exchange, please re-sync with Who@.</p>

                <ul>
                    <li><a href="mailto:support@whoat.net" target="_blank">Contact Support</a></li>
                    <li>&nbsp;&nbsp;|&nbsp;&nbsp;</li>
                    <li><a href="https://whoat.net/terms#privacypolicy" target="_blank">Privacy Policy</a></li>
                    <li>&nbsp;&nbsp;|&nbsp;&nbsp;</li>
                    <li><a href="https://whoat.net/terms" target="_blank">Terms and Condtions</a></li>
                </ul>
            </div>
        </section>

        ## Exchange Simple Form
        <section id="simple_exchange_form">
            <form id="exchange_simple_form" action="" method="post">
                <ul>
                    <li>
                        <input type="email"
                            id="sync_exchange_email" name="sync_exchange_email" value="Username on Exchange"
                            onblur="if (this.value == '') {this.value = 'Username on Exchange';}"
                            onfocus="if (this.value == 'Username on Exchange') {this.value = '';}"/>
                    </li>
                    <li>
                        <input type="password" 
                           id="sync_exchange_password" value="" name="sync_exchange_password"
                           onblur="if (this.value == '') {this.value = '';}"
                           onfocus="if (this.value == 'Exchange Password') {this.value = '';}"
                           placeholder="Exchange Password"
                           autocomplete="off"/>
                    </li>
                    <li>
                        <ul>
                            <li class="exchanged_advanced">Advanced</li>
                            <li class="exchange_continue"><button id="exchange_simple_btn" class="btn">sync contacts</button></li>
                        </ul>
                    </li>
                </ul>
            </form>
        </section>

        <section id="advanced_exchange_form">
            <form id="exchange_advanced_form" action="" method="post">                
                <ul>
                    <li>
                        <input type="text"
                            id="adv_exchange_domain" name="adv_exc_domain" value="domain"
                            onblur="if (this.value == '') {this.value = 'domain';}"
                            onfocus="if (this.value == 'domain') {this.value = '';}"/>
                    </li>
                    <li>
                        <input type="text"
                            id="adv_exchange_username" name="adv_exc_username" value="Username on Exchange"
                            onblur="if (this.value == '') {this.value = 'Username on Exchange';}"
                            onfocus="if (this.value == 'Username on Exchange') {this.value = '';}"/>
                    </li>
                    <li>
                        <input type="password" 
                           id="adv_exchange_password" value="" name="adv_exc_password"
                           onblur="if (this.value == '') {this.value = '';}"
                           onfocus="if (this.value == 'Exchange Password') {this.value = '';}"
                           placeholder="Exchange Password"
                           autocomplete="off"/>
                    </li>
                    <li>
                        <input type="text"
                            id="adv_exchange_server" name="adv_exc_server" value="Server Address"
                            onblur="if (this.value == '') {this.value = 'Server Address';}"
                            onfocus="if (this.value == 'Server Address') {this.value = '';}"/>
                    </li>

                    <li>
                        <ul>
                            <li class="exchanged_simple">Back to Simple</li>
                            <li class="exchange_continue"><button id="exchange_simple_btn" class="btn">sync contacts</button></li>
                        </ul>
                    </li>
                </ul>
            </form>
        </section>

        ## Patience
        <section id="patience_exchange" class="patience_modal">
            <div class="patience_text">
                <p>Please hold tight while we verify your credentials and secure your contacts to your own private vault.</p>

                <p>We hate waiting too!<br> If you're a super connector and have > 5,000 contacts,<br> please be patient while the big dogs secure your data.</p>
            </div>
            
            <div class="gif_spinner">
                <img src="/static/img/dashboard/gifs/loader_logo.gif" alt=""/>
            </div>
        </section>

        <section class="exchange_help_options">
            <p>Find Your Exchange Info:</p>

            <ul>
                <li class="ex_help_iphone">&bull; iPhone</li>
                <li class="ex_help_outlook">&bull; Outlook</li>
                <li class="ex_help_android">&bull; Android</li>
            </ul>
        </section>

    </section>

##  Mobile Options
##  ------------------------------------------------
    <section id="tour_7" class="main_tour_section">
        <header class="tour_7_header">
            <div class="rock_hand_container">
                <div class="rock_hand"></div>
            </div>
            <div class="rock_words">
                <p>You Rock!</p>
                <p>Just One Last Thing</p>
            </div>
        </header>

        <section class="tour_7_section">

            <div class="tour_7_bullets">
                <table>
                    <tr>
                        <td colspan="2"><p>To get the most out of Who@. Use our other tools to get you ahead of the game. </p></td>
                    </tr>
                    <tr>
                        <td>&#8226;</td>
                        <td>Native Apple app with full functionality. Click below to have it sent to your mobile.</td>
                    </tr>
                    <tr>
                        <td>&#8226;</td>
                        ##<td>Native Android app. Click here to have it sent to your mobile.</td>
                        <td>Native Android app coming soon.</td>
                    </tr>
                    <tr>
                        <td>&#8226;</td>
                        <td>Our bookmarklet lets you easily search Who@ on any website.
                            ##To learn more about the bookmarklet watch our instructional
                            ##<em class="video_bookmarklet">video.</em>
                        </td>
                    </tr>
                    
                </table>
            </div>

            <div class="tour_7_buttons">
                <ul>

                    <li class="app_button">
                        <em>Apple</em>
                        <div class="apple_store_logo"></div>

                        <p class="text_iphone_app">Text It To Me</p>

                        <div id="get_text_iphone_app">
                            <form id="text_request_app" action="" method="post">
                                <input type='tel' pattern='[0-9]{10}' class='' id='text_app_num' name='text_app_num' data-key='' value='' autocomplete='off' maxlength='20' placeholder="# to text app to"/> <button id="text_app_send">send</button>
                            </form>
                        </div>
                        <div class="ios_app_sent">Sent! Check your phone.</div>
                    </li>

                    <li class="app_button">
                        <em>Android</em>
                        <section>
                            <div class="android_store_logo"></div>
                        </section>
                        <p>Coming Soon</p>
                    </li>

                    <li class="app_button">
                        <em>Browser Tool</em>

                        <a class="bookmarklet" href='javascript:d=""+(window.getSelection?window.getSelection():document.getSelection?document.getSelection():document.selection.createRange().text);d=d.replace(/\r\n|\r|\n/g," ,");if(!d)d=prompt("Enter search term:", "");if(d!=null)location="https://whoat.net/search/"+escape(d).replace(/ /g,"+");void(0);' title="Who@ Search"><div class="browser_tool_logo">Who@ Search</div></a>
                        ##<p>Learn More</p> <div class="video_bookmarklet play_bookmarklet_vid"></div>
                    </li>
                    
                </ul>
            </div>

        </section>
    </section>
    
    <div class="tour_footer">
        <div class="back_to_tour_6 tour_direction_btn">Back</div>
        <div class="tour_prev tour_direction_btn">Prev</div>

        <div class="nav_circles">
            <ul>
                ## Couple checkmark
                <li id="tour_btn_1" class="tour_nav_circle">
                    <div class="tour_nav_blue"></div>
                </li>

                ## Networking SVG
                <li id="tour_btn_2" class="tour_nav_circle">
                    <div class="tour_nav_white"></div>
                </li>

                ## Heatmap
                <li id="tour_btn_3" class="tour_nav_circle">
                    <div class="tour_nav_white"></div>
                </li>

                ## Secure Lock
                <li id="tour_btn_4" class="tour_nav_circle">
                    <div class="tour_nav_white"></div>
                </li>

                ## VIDEO
                <li id="tour_btn_5" class="tour_nav_circle">
                    <div class="tour_nav_white"></div>
                </li>

                ## SYNC email options
                <li id="tour_btn_6" class="tour_nav_circle">
                    <div class="tour_nav_white"></div>
                </li>

                ## Mobile options
                <li id="tour_btn_7" class="tour_nav_circle">
                    <div class="tour_nav_white"></div>
                </li>
            </ul>
        </div>

        <div id="next_ftue_btn" class="tour_next tour_direction_btn">Next</div>
        <div id="finish_ftue_btn" class="tour_next tour_direction_btn finish_ftue">Done</div>
    </div>

</div>

<script language="javascript">
    function updateGmailStats(total) {

        // Orange border for snarf complete
        $('#btn_sync_gmail .snarf_btn').addClass('snarf_btn_done');
        // Add Snarf check
        $('#btn_sync_gmail .check_holder').empty();
        $('#btn_sync_gmail .check_holder').append('<div class="snarfed_check"></div>');
        // Hide Previously Snarfed stats
        $('.snarfed_gmail_info').hide();
        // Show New Snarfed stats
        $('.snarf_gmail_info em').text(total);
        $('.snarf_gmail_info').fadeIn('fast');
    }
</script>
