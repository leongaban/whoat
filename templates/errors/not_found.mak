<%inherit file="../master.mak"/>

<%block name="title">
    Oops! Page Not Found - Who@
</%block>

<%block name="head">
    <%include file="../dashboard/includes.mak"/>
</%block>

<%block name="header">

</%block>

<%block name="body">


	<div class="error_page">

		<div class="error_container">
			
			<header>
				<div class="whoat_logo_svg" title="Who@"></div>
			</header>

			<h1>Whoops! Link not found, what were you trying to find?</h1>

			<section class="error_bullets">
				<ul>
					<li><a href="/faq" target="_blank">What is Who@?</a></li>
					<li><a href="/dashboard" target="_blank">My Dashboard</a></li>
					<li><a href="/outbox" target="_blank" title="Go to my Outbox">My Requests</a></li>
					<li><a href="/inbox" target="_blank" title="Go to my Inbox">Their Requests</a></li>
					<li><a href="/contacts" target="_blank">My Contacts</a></li>
				</ul>

				<div class="lost_man"></div>
			</section>

			<div class="our_apps">

				<h2>If you haven’t yet, try one of our apps!</h2>

				<a href="https://itunes.apple.com/us/app/who-intro/id777717885" target="_blank">
					<div class="apple_store_logo"></div>
				</a>

				<div class="app_button">
					<section>
						<div class="android_store_logo" title="Coming soon"></div>
						<div class="b">coming soon</div>
					</section>
				</div>
			</div>

        </div>

    </div>

</%block>

<%block name="footer">
	<%include file="../dashboard/footer.mak"/>
</%block>