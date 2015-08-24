<%inherit file="../master.mak"/>

<%block name="title">
    The RecruitMilitary Networking Group - Who@
</%block>

<%block name="head">
    <%include file="../3rdparty/includes.mak"/>
</%block>

<%block name="header">

</%block>

<%block name="body">
	## USES THE PERSPECTIVES14 css file
	<script type='text/javascript' src="/static/3rdparty/recruitmilitary/js/recruitmilitary-min.js"></script>

	<div class="landing_container">

	    <header>
	    	<div class="header_contents">
	    		<div class="whoat_logo"></div>
		    	<nav>
		    		<ul>
		    			<li id="getting_started_guides" class="hide_mobile"><a href="#">how to get started</a></li>
		    			<li class="hide_mobile"><a href="/faq">faq</a></li>
		    			<li class="hide_mobile"><a href="mailto:support@whoat.net">support</a></li>
		    			<li class="hide_mobile"><a href="/register">register</a></a></li>
		    			<li class="login_button hide_mobile"><a href="/login">login</a></li>
		    		</ul>
					<div id="pdf_dropdown">
						<ul id="pdf_dropdown_ul">
							<li id="pdf_standard"><a href="https://s3.amazonaws.com/whoat_docs/WhoAt+Intro+Getting+Started.pdf" target="_blank">Standard Version</a></li>
							<li id="pdf_enterprise"><a href="https://s3.amazonaws.com/whoat_docs/WhoAt+Intro+Getting+Started-Enterprise+Version.pdf" target="_blank">Enterprise Version</a></li>
							<li id="pdf_groups"><a href="https://s3.amazonaws.com/whoat_docs/WhoAt+Intro+Getting+Started-Groups+Version.pdf" target="_blank">Groups</a></li>
						</ul>
					</div>
		    	</nav>
	    	</div>
	    	
	    </header>
		

		<div class="container">
		    <section class="hero">
		    	<div class="recruit_military"></div>

		    	<h1>The RecruitMilitary Networking Group</h1>

		    	<p>
		    		Recruit Military has teamed up with Who@ to bring veterans a new way of helping each other. The <em>RecruitMilitary Networking Group</em> allows veterans to share who they know in a private way. This allows you to search for introductions to get the job you’ve always wanted. To get started, please use the guide below.
		    	</p>
		    </section>
		</div>

		<section class="get_guides">
			<div class="get_guides_content">
				<div class="get_guides_left">
		    		<div class="handshake"></div>
				</div>
		    	<div class="get_guides_right">
		    		<div class="download_types">
		    			<h1>Getting Started Guides</h1>
		    			<ul>
		    				<li class="iphone_button">
		    					<div class="iphone_white"></div>
		    					<p>iPhone</p>
		    					<div class="pdf_icon"></div>
		    				</li>
		    				<li class="browser_button">
		    					<div class="macbook_icon"></div>
		    					<p>Browser</p>
		    					<div class="pdf_icon"></div>
		    				</li>
		    			</ul>
		    		</div>

		    		<div class="download_on_mobile">
		    			<h1>Getting Started Guides</h1>
		    			<ul>
		    				<li class="iphone_button">
		    					<div class="iphone_white"></div>
		    					<p>iPhone</p>
		    					<div class="pdf_icon"></div>
		    				</li>
		    			</ul>
		    		</div>
		    	</div>
			</div>
	    </section>

	    <section class="get_guides_small">
			<ul>
				<li class="iphone_button_small">
					<div class="iphone_white"></div>
					<p>iPhone</p>
					<div class="pdf_icon_small"></div>
				</li>
				<li class="browser_button_small">
					<div class="macbook_icon"></div>
					<p>Browser</p>
					<div class="pdf_icon_small"></div>
				</li>
			</ul>
	    </section>

	    <section class="call_to_action">
	    	<div class="call_to_action_content">
		    	<div class="call_to_action_left">
		    		<ul>
		    			<li><div class="app_store"></div></li>
		    			<li class="register_online"><a href="https://whoat.net/register">or Register Online</a></li>
		    		</ul>
		    	</div>
		    	<div class="call_to_action_right">
		    		<p>
		    			Use the <em>RecruitMilitary Networking Group</em> code <em>&#8220;rmvng&#8221;</em> to allow those affiliated with a common purpose to pool their contacts into a search able database to help fellow group memebers.
		    		</p>
		    	</div>
	    	</div>
	    </section>

	    <footer class="footer_desktop">
	    	<span>Copyright &copy; <script type="text/javascript" async="" src="http://www.google-analytics.com/ga.js"></script><script>document.write(new Date().getFullYear())</script> WhoAt LLC. All rights reserved. <a href="/terms" id="footer-terms" target="_blank">Terms of Use</a>&nbsp; | &nbsp;<a href="/terms#privacypolicy" id="footer-privacy" target="_blank">Privacy Policy</a>&nbsp; | &nbsp;<a href="mailto:support@whoat.net" target="_blank">Support</a></span>
	    </footer>

    </div>

</%block>

<%block name="footer"></%block>