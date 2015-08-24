<div id="sync_modal">
	<div class="close_sync"></div>
	
	<section id="sync_email_choices">
    	<header>
    		<div class="sync_modal_lock"></div>
    		<h1>Sync Your Contacts</h1>
    		<div class="rewatch_tour">View Tour</div>
    		<div class="blue_arrow"></div>

    		<hr>
    		<div class="hr"></div>

        	<p>Once we start processing your contacts you'll receive an email detailing the process. After the contacts are in your vault you will receive stats about your contacts. When you see the confirmation your sync was started, you may close this modal to explore the application further.</p>
    	</header>
    	
		<nav>
			<ul>
				<li>
					<div id="btn_sync_exchange" class="sync_choice_box">
						<div class="exchange_logo"></div>
					</div>
					<span>Microsoft Exchange</span>
				</li>
				<li>
					<div id="btn_sync_gmail" class="gmail-pop sync_choice_box" href="#modalgmail">
						<div class="gmail_logo"></div>
					</div>
					<span>Google Gmail</span>
				</li>
			</ul>
		</nav>
		
		<div class="sync_modal_footer">
			<hr>

			<p>If at any time you want your contacts removed simply reach out to <a href="mailto:support@whoat.net" target="_blank">customer support</a> and they will be glad to help.</p>

			<p>By submitting your info above you are agreeing to our<br> <a href="/terms" target="_blank">Terms and Conditions</a> and <a href="/terms#privacypolicy" target="_blank">Privacy Policy.</a></p>
		</div>
	</section>

	<section id="sync_exchange_snarf">
    	<header>
    		<div class="sync_modal_lock"></div>
    		<h1>Exchange - Outlook</h1>
    		<div class="go_back">Go Back</div>
    		<div class="blue_arrow"></div>

    		<hr/>
    		<div class="hr"></div>

        	<p>Once we start processing your contacts you'll receive an email detailing the process and after the contacts are in your vault you will receive stats about your contacts. When you see the confirmation your sync was started, you may close this modal to explore the application further.</p>

        	<p class="exchange_help">Find Your Exchange Info: <span id="ex_help_iphone">iPhone</span> - <span id="ex_help_outlook">Outlook</span> - <span id="ex_help_android">Android</span></p>
    	</header>
    	
		<div id="exchange_inputs">
			<!-- <form id="exchange-simple-form" action="/sync_contacts" method="post"> -->
			<form id="exchange-simple-form" action="" method="post">				
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
							<li class="exchange_continue"><button id="exchange_simple_btn">sync contacts</button></li>
						</ul>
					</li>
				</ul>
			</form>
		</div>
		
		<div id="exchange_inputs_advanced">
			<form id="exchange-advanced-form" action="/sync_contacts_adv" method="post">
				<ul>
					<li>
						<input type="text"
							id="adv-exchange-domain" name="adv-exc-domain" value="domain"
							onblur="if (this.value == '') {this.value = 'domain';}"
							onfocus="if (this.value == 'domain') {this.value = '';}"/>
					</li>
					<li>
						<input type="text"
							id="adv-exchange-username" name="adv-exc-username" value="username"
							onblur="if (this.value == '') {this.value = 'username';}"
							onfocus="if (this.value == 'username') {this.value = '';}"/>
					</li>
					<li>
						<input type="password" 
                           id="adv-exchange-password" value="" name="adv-exc-password"
                           onblur="if (this.value == '') {this.value = '';}"
                           onfocus="if (this.value == 'password') {this.value = '';}"
                           placeholder="password"
                           autocomplete="off"/>
					</li>
					<li>
						<input type="text"
							id="adv-exchange-server" name="adv-exc-server" value="server address"
							onblur="if (this.value == '') {this.value = 'server address';}"
							onfocus="if (this.value == 'server address') {this.value = '';}"/>
					</li>
					<li>
						<ul>
							<li class="exchanged_simple"><span class="go_back">Simple</span></li>
							<li class="exchange_continue"><button id="exchange-adv-btn">sync contacts</button></li>
						</ul>
					</li>
				</ul>
			</form>
		</div>

		<div class="sync_modal_footer">
			<hr>
			<p>If at any time you want your contacts removed simply reach out to <a href="mailto:support@whoat.net" target="_blank">customer support</a> and they will be glad to help.</p>

			<p>By submitting your info above you are agreeing to our<br> <a href="/terms" target="_blank">Terms and Conditions</a> and <a href="/terms#privacypolicy" target="_blank">Privacy Policy.</a></p>
		</div>
	</section>

	## Patience
	<section id="patience_exchange" class="patience_modal">
		<header>
			<h2>Please hold tight while we verify your credentials and secure your contacts to your own private vault.</h2>

        	<h3>We hate waiting too! If you’re a super connector and <br>have > 5,000 contacts, the big dogs are working to secure your data, so please be patient.</h3>

        	##<p>Make sure you validate your email and check your email for additional status information and analytics on your contacts.</p>
		</header>
		
		<div class="gif_spinner">
        	<img src="/static/img/dashboard/gifs/loader_logo.gif" alt=""/>
        </div>
	</section>

	<section id="patience_gmail" class="patience_modal">
		<h2>Just a moment as we connect with Google to sync your Gmail contacts</h2>
		<div class="gmail_logo"></div>
        <div class="place_iframe"></div>
		##<iframe id="gmail_iframe" width="427" height="40" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="/connect/gmail"></iframe>
	</section>

</div>