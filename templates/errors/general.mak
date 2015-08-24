<%inherit file="../master.mak"/>

<%block name="title">
    Oops! An error occured :'( - Who@
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

			<h1>Oops something when wrong :'(</h1>

			<section class="general_error">
				<ul>
					<li><a href="/login" target="_blank">Were you logged in to Who@?</a> (login)</li>
					<li><a href="/faq" target="_blank">What is Who@?</a> (faq)</li>
					<li>Let us help you! Please <a href="mailto:support@whoat.net" target="_blank">Contact Support</a></li>
				</ul>
			</section>

			<div class="our_apps">

				<h2>If you haven’t yet, try one fo our apps!</h2>

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