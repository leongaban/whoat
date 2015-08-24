## HAND SHAKE
<div class="ftue_1 ftue_block_section">
	<header>
	    <h1>Want Faster Introductions?</h1>
	</header>

	<section class="tour_1_section">
	    <div class="hand_shake_check tour_svg"></div>
	    <div class="tour_1_copy">
	        <h2>Utilize <strong>existing relationships</strong> from your phone and email to get <strong>important introductions.</strong></h2>
	    </div>
	</section>
</div>

## INTRO REQUESTS
<div class="ftue_2 ftue_block_section">
	<header>
	    <h1>Getting Introductions Privately</h1>
	</header>

	<section class="tour_2_section">
	    <div class="heads_intro_arrows tour_svg"></div>

        <h2><strong>Request intros to prospects</strong> by searching your network&rsquo;s contacts. Discover new prospects in your network&rsquo;s relationships. Search all connections not just Who@ members.</h2>
	</section>
</div>

## GLASS BUBBLES
<div class="ftue_3 ftue_block_section">
	<header>
	    <h1>Expand Your Network</h1>
	</header>

	<section class="tour_3_section">
	    <div class="tour_svg">
	    	<div class="glass_tie"></div>
	    	<div class="glass_friends"></div>
	    	<div class="glass_groups"></div>
	    </div>

        <div class="tour_3_copy">
	        <h2>The more friends and colleagues you <strong>invite</strong> to join your network, the more powerful your Who@ experience is.</h2>
	    </div>
	</section>
</div>

## SECURITY LOCK
<div class="ftue_4 ftue_block_section">
    <header>
        <h1>Here's how we handle your data</h1>
    </header>

    <div class="security_lock"></div>

    <div class="tour_4_copy">
        <p>We lock it in a secure vault.</p>

        <table>
            <tr>
                <td>
                    <div class="outbox_details_accepted_icon"></div>
                </td><td>We only show your contacts' name, title and company</td>
            </tr>
            <tr>
                <td>
                    <div class="outbox_details_accepted_icon"></div>
                </td><td>We do not sell contact data or usage data</td>
            </tr>
            <tr>
                <td>
                    <div class="outbox_details_accepted_icon"></div>
                </td><td>We do not reveal you as the contact owner with others until you accept or request an intro</td>
            </tr>
            <tr>
                <td>
                    <div class="outbox_details_accepted_icon"></div>
                </td><td>At any point you can completely remove your account and contacts</td>
            </tr>
        </table>

        <em>To read more about how we handle your data and privacy information, <a href="/terms#privacypolicy" target="_blank">click here.</a></em>
    </div>
</div>

## VIDEO: WHAT GETS UPLOADED?
<div class="ftue_5 ftue_block_section">
    <header>
        <h1>What Gets Uploaded?</h1>
    </header>

    <section class="ajax_in_video"></section>
</div>

## SNARF: EXCHANGE SYNC
<div class="ftue_6 ftue_block_section">
	<header class="ftue_7_header">
        <div class="exchange_logo"></div> <h1>Exchange Access</h1>
    </header>

	## Exchange Simple
    <div class="ftue_exchange_snarf_simple">

        <div class="ftue_exchange_error">Please verify that all your info is correct, or <a href="mailto:support@whoat.net" target="_blank">contact support</a> for help</div>

    	<p>We <strong>don't</strong> download your calendar, notes, emails or any other data besides contacts. For your protection we don't save your Exchange password. If you add additional contacts to your Exchange, please re-sync with Who@.</p>
        
        <form id="ftue_exchange_simple" action="" method="post">
            <ul>
                <li>
                    <input type="email"
                        id="sync_exchange_email" name="sync_exchange_email" placeholder="Username on Exchange" autocomplete="off"/>
                </li>
                <li>
                    <input type="password" 
                       id="sync_exchange_password" value="" name="sync_exchange_password" placeholder="Exchange Password" autocomplete="off"/>
                </li>
                <li>
                    <ul>
                        <li class="exchanged_advanced">Advanced</li>
                        <li class="exchange_continue"><button id="exchange_simple_btn" class="btn">sync contacts</button></li>
                    </ul>
                </li>
            </ul>
        </form>
    </div>

    ## Patience
    <section id="patience_exchange" class="patience_modal">
        <div class="patience_text">
            <p>Please hold tight while we verify your credentials and secure your contacts to your own private vault.</p>

            <p>We hate waiting too!<br> If you're a super connector and have > 5,000 contacts,<br> please be patient while the big dogs secure your data.</p>
        </div>

        <div id="spinner">
            <div id="whoat-spinner-logo">
                <img src="/static/img/dashboard/loader-logo.png" alt=""/>
            </div>
            <div id="whoat-gear" class="spin">
                <img src="/static/img/dashboard/loader-gear.png" alt=""/>
            </div>
        </div>
    </section>

    <section class="ftue_exchange_snarfed">
        <span><strong></strong> Contacts Synced!</span>

        <p class="resolver_comment">Our snazzy resolver will determine the correct number of contacts and total resolved contacts. We define a contact as containing at least a first name, last lame and has either a phone number or email address.</p>
    </section>

	## Exchange Advanced
    <div class="ftue_exchange_snarf_advanced">
        <p>This is the advanced sync form. <a href="/faq" target="_blank">Click here</a> for additional guidance.<br/>
        Or <a href="mailto:support@whoat.net">contact support</a> at WhoAt</p>
        <form id="exchange_advanced_form" action="" method="post">
            <ul>
                <li>
                    <input type="text"
                        id="adv_exchange_domain" name="adv_exc_domain" placeholder="domain" autocomplete="off"/>
                </li>
                <li>
                    <input type="text"
                        id="adv_exchange_username" name="adv_exc_username" placeholder="Username on Exchange" autocomplete="off"/>
                </li>
                <li>
                    <input type="password" 
                       id="adv_exchange_password" value="" name="adv_exc_password" placeholder="Exchange Password" autocomplete="off"/>
                </li>
                <li>
                    <input type="text"
                        id="adv_exchange_server" name="adv_exc_server" placeholder="Server Address" autocomplete="off"/>
                </li>

                <li>
                    <ul>
                        <li class="exchanged_simple">Back to Simple</li>
                        <li class="exchange_continue"><button id="exchange_simple_btn" class="btn">sync contacts</button></li>
                    </ul>
                </li>
            </ul>
        </form>
    </div>
</div>

## SNARF: GMAIL SYNC
<div class="ftue_7 ftue_block_section">
    <header class="ftue_7_header">
        <div class="gmail_logo"></div>
        <h1>Gmail Contacts</h1>
    </header>

    <header class="last_tour_fail">
        <h1>You’ve Missed a Step!</h1>
        <h3>In order to use Who@ you have to upload contacts</h3>
    </header>

    <div class="last_tour_fail ftue_email_icons">
        <ul>
            <li><div class="exchange_logo back_to_exchange"></div></li>
            <li><div class="gmail_logo back_to_gmail"></div></li>
            ##<li><div class="hotmail_logo_100"><img src="/static/img/dashboard/ftue/hotmail_icon_100.png" title="Hotmail coming soon" alt="Hotmail"/></div></li>
        </ul>
    </div>

    <div class="last_tour_fail ftue_last_message">
        If you don't have <em class="back_to_exchange">Exchange</em> or <em class="back_to_gmail">Google</em> email account, please download our app to get your contacts synced that way.
    </div>

    <div class="last_tour_fail ftue_10_buttons">
        <ul>
            <li class="app_button">
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
                <section>
                    <div class="android_store_logo"></div>
                </section>
                <em>Coming Soon</em>
            </li>
        </ul>
    </div>

    <div class="ftue_gmail_snarf">

        <div class="gmail_snarf_content">
            <p>We <strong>don't</strong> download your calendar, notes, emails or any other data besides contacts. If you add additional contacts to Gmail, please re-sync with Who@.</p>
            <div class="gmail_ftue_snarf btn">sync with google</div>
        </div>

        <section class="ftue_gmail_snarfed">
            <span><strong></strong> Contacts Synced!</span>

            <p class="resolver_comment">Our snazzy resolver will determine the correct number of contacts and total resolved contacts. We define a contact as containing at least a first name, last lame and has either a phone number or email address.</p>
        </section>
    </div>
</div>

## CUSTOM ALERTS
<div class="ftue_8 ftue_block_section">
    <header>
        <div class="alerts_head_icon"></div>
        <h1>Create Custom Alerts</h1>
    </header>

    <section class="ftue_8_content">
        <p>Add companies you want alerts for, and we’ll do the work for you. You'll get a notice when they become available.</p>

        <div class="ftue_custom_input">
            <form id="alert_triggers_form" class="noEnterSubmit" action="" method="post">
                <input type="text" id="ftue_alert_input" name="custom_alert" placeholder="Enter Company Name" autocomplete="off"/>
            </form>
        </div>

        <div class="ftue_company_results">
            <div class="ajax_company_results"></div>
        </div>

        <div class="company_alert_error"></div>

        <div class="ftue_added_companies">
            <div class="ajax_added_company"></div>
        </div>

    </section>
</div>

## EXPAND YOUR NETWORK
<div class="ftue_9 ftue_block_section">
    <header>
        <div class="nerd"></div>
        <h1>Expand Your Network</h1>
    </header>

    <section class="ftue_9_content">

        <div id="spinner">
            <div id="whoat-spinner-logo">
                <img src="/static/img/dashboard/loader-logo.png" alt=""/>
            </div>
            <div id="whoat-gear" class="spin">
                <img src="/static/img/dashboard/loader-gear.png" alt=""/>
            </div>
        </div>

        <div class="expand_invite">
            <h2>Invite Coworkers</h2>
            <div class="ajax_in_invite"></div>
        </div>

        <div class="expand_friend">
            <h2>Invite 5 of Your Friends</h2>
            <div class="ajax_in_friends"></div>
        </div>

    </section>
</div>

## YOU ROCK!
<div class="ftue_10 ftue_block_section">

    <header class="last_tour_fail">
        <h1>You’ve Missed a Step!</h1>
        <h3>In order to use Who@ you have to upload contacts</h3>
    </header>

	<header class="last_tour_ok">
        <div class="rock_hand_container">
            <div class="rock_hand"></div>
        </div>
        <div class="rock_words">
            <p>You Rock!</p>
            <p>Just One Last Thing</p>
        </div>
    </header>

    <section class="ftue_10_section">

    	##<p class="last_tour_ok">To get the most out of Who@. Use our other tools to get you ahead of the game.</p>

        <div class="last_tour_fail ftue_email_icons">
            <ul>
                <li><div class="exchange_logo back_to_exchange"></div></li>
                <li><div class="gmail_logo back_to_gmail"></div></li>
                ##<li><div class="hotmail_logo_100"><img src="/static/img/dashboard/ftue/hotmail_icon_100.png" title="Hotmail coming soon" alt="Hotmail"/></div></li>
            </ul>
        </div>

        <div class="last_tour_fail ftue_last_message">
            If you don't have <em class="back_to_exchange">Exchange</em> or <em class="back_to_gmail">Google</em> email account, please download our app to get your contacts synced that way.
        </div>

    	<h2 class="last_tour_ok">Use Who@ on the go with our mobile apps!</h2>

        <div class="ftue_10_buttons">
            <ul>
                <li class="app_button">
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
                    <section>
                        <div class="android_store_logo"></div>
                    </section>
                    <em>Coming Soon</em>
                </li>
            </ul>
        </div>

    </section>
</div>
