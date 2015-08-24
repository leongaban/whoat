<%inherit file="../master.mak"/>

<%block name="title">Who@ A new and private way of leveraging your contacts to expand your business.</%block>

<%block name="head">
    <%include file="includes.mak"/>
</%block>

<%block name="body">
<div id="faq_page" class="container">
    <header id="header">
        <div class="whoat_logo" title="Who@"></div>

        <%include file="nav.mak"/>

        <div class="home_login_box">
            <form id="home_login" action="" method="post">

                <div class="error_home_username error_tip"><span>Username not registered</span></div>

                <div class="error_home_password error_tip"><span>Invalid password</span></div>

                <input type="text"
                           id="home_login_email"
                           name="username"
                           placeholder="email"/>

                <input type="password"
                       id="home_login_password"
                       name="password"
                       placeholder="Password"
                       autocomplete="off"/>

                <a href="/forgot/password">Forgot your password?</a>
                
                <button type="submit">login</button>
            </form>
        </div>
    </header>

    <div class="faq_banner"><h1>Frequently Asked Questions</h1></div>

	<div class="faq_container">
		<dl>
			<dt>What does Who@ do?</dt>
			<dd>Who@ makes business networking easier, faster and more private.</dd>
		</dl>

		<dl>
			<dt>Who is it for?</dt>
			<dd>Who@ Intro is a private, enterprise search tool built for b2b mid to large companies and groups who sell, raise money or value trusted introductions to win in business. Individuals will prefer our upcoming WishList and both will want Topferral.  They're coming soon to help you generate leads from outside your business too.  All use the same login credentials and on the same server infrastructure.</dd>
		</dl>

		<dl>
			<dt>What problem does it solve?</dt>
			<dd>Who@ answers the age old question "Who do we know at?" for businesses, private groups and individuals who friend other accounts they have a close relationship with, but does it in a private way so the contact owner is never ever put in an uncomfortable situation and retains 100% control of the contact data in their private address book. Who@ is turning your smartphone and Outlook/Gmail into your own private business development assistant, proactively bringing you more relevant leads and client referrals, even if those contacts aren't Who@ members, or found on any social media site. </dd>
		</dl>

		<dl>
			<dt>How?</dt>
			<dd>Who@ Intro allows you to search on the contact data of your colleagues' phone, Exchange or Gmail, but they remain private until they accept a request and the contact data is never shared inside Who@. And when you leave your company or opt out of a group, your contacts do too with a zero footprint you were ever there. </dd>
		</dl>

		<dl>
			<dt>Does the prospect (we call them Prospects) have to be a Who@ member?</dt>
			<dd>Nope. That's one of the beauties of Who@.  It is not a social media site which depends entirely on members connecting. You will find it to be like no other business development tool on the internet.</dd>
		</dl>

		<dl>
			<dt id="source_of_the_search_results">What's the source of the search results when I search?  I don't want randoms to search on my contacts.  Who can?</dt>
			<dd>Only coworkers from your company, common groups you've opted into and accounts you friend in Who@ (friending coming soon). No one else. Unlike social media sites, this is not a public database and no outsiders are allowed to search your relationships.</dd>
		</dl>

		<dl>
			<dt>If I decide I'm outta here, can I remove my account and all of my contacts from Who@?</dt>
			<dd>Yes, completely in fact.  You own your data, we don't.  You can remove it at any time with a zero footprint you or your contacts were ever in our systems.  Contact <a href="mailto:support@whoat.net" target="_blank">support@whoat.net</a> if you want us to clear your account.  Soon you'll have a self service tool with a red nuke button you push yourself.</dd>
		</dl>

		<dl>
			<dt>Why is it worth my time?</dt>
			<dd>Who@ customers say it saves  20% to 40% of the time they spend looking for an intro or direct customer referral.  If relationships are important to you, Who@ will be a service you use daily.</dd>
		</dl>

		<dl>
			<dt>How it is different?</dt>
			<dd>Complete privacy and no dependency on the social graphs of any social media site are a couple to begin with.  Consumer sites vs. Who@'s enterprise products with Exchange Server integration to name a few.  Who@ leverages the people you really know from your phone and address book of Exchange and/or Gmail. You don't need to friend or link with anyone if you don't want to. Our Enterprise Version has workflow rules that recognize the politics, complexities and system requirements of large enterprises. See the <a href="#header" class="open_guides">Getting Started Guide</a></dd>
		</dl>

		<dl>
			<dt>Can I connect my Facebook, Twitter, Linkedin, Tencent, vkontakte (insert social site here) account?</dt>
			<dd>No.  We told you it was different and like none other didn't we?  We love and use those services, but they were built for a different purpose than Who@ and, while we may allow you to do some things with a few social services someday, we won't allow you to import those social graphs.  They're more polluted than the city dump as most people who friend or link with each other have never even met.  Who you really know is who's in your phone and email address book.  Even more so if that person spent the time to put you in their phone too.  That's the gold we help you mine.</dd>
		</dl>

		<dl>
			<dt>How do you protect my contacts?</dt>
			<dd>All communications are SSL encrypted and we use a salted hash for your password so even we can't see your password.  Only you can. Our brand promise is trust.  If we don't trust a site, then we're not going to share our contacts.  We're building to our standards.  <a href="mailto:support@whoat.net" target="_blank">Contact us</a> for our security white paper.</dd>
		</dl>

		<dl>
			<dt>Do you accept advertising or share my data with third parties?</dt>
			<dd>Nope.  We're an enterprise tool and not a social media site so advertising is not part of our revenue model and neither is sharing that data with any 3rd party unless the law compels us to. <a href="https://whoat.net/terms#privacypolicy" target="_blank">Click here for our privacy policy</a>.</dd>
		</dl>

		<dl>
			<dt id="i_dont_want_you_touching_notes">I don't want you touching the Notes section of my address book. Do you upload my notes?</dt>
			<dd>Nope.  We don't touch them.  We store very private info there too and don't want anyone else to have access either.</dd>
		</dl>

		<dl>
			<dt>Do you monitor my calls, texts emails or other communication to see "who has the best relationship?"</dt>
			<dd>Nope.  That's creepy big brother and pretty much useless anyway.  The context of what is being asked, and when, makes it impossible to determine "strength of a relationship."   To ask someone for money vs. asking them to be a speaker at a prestigious conference uses entirely different political capital.  You can't measure that, plus who you email back and for with creates a lot of "false positives" as a data scientist would say.  Furthermore, we all  have fabulous relationships with people we're not emailing or texting on a regular basis.</dd>
		</dl>

		<dl>
			<dt>I don't want to create another social network.  Do I have to friend or link to other members?</dt>
			<dd>Nope.  Neither do we.  We've spent our careers building our network and they're already stored in our phone, Gmail and Exchange.  While it is best to invite your coworkers now so they join, all they need to do is validate their business email and synch their contacts.  Every coworker who validates the same business email address goes into a common pool.  Now you all have your own private company pool to search.  No one else has access, including your competitors.</dd>
		</dl>

		<dl>
			<dt>Whoa there, you don't understand, my coworkers are also my competitors and might steal my leads or relationships.</dt>
			<dd>We know and we've got you covered.  We used to work in those industries too. <a href="https://s3.amazonaws.com/whoat_docs/WhoAt+Intro+Getting+Started-Enterprise+Version.pdf" target="_blank">Click here</a> for the Enterprise Version PDF that has unique features recognizing your coworkers can be your biggest competitors too, or the fact you don't want to share with them or your political enemies in your company.  Who@ is being used in the sales-shark infested waters of some of the largest real estate and financial service companies in the world. </dd>
		</dl>

		<dl>
			<dt>If I'm willing to share a portion of my commission, can I let the contact owner know that to incent them to help me?</dt>
			<dd>Yes.  It is a standard feature and all you have to do is click 1 button and they'll know you're willing to discuss commission sharing.  And yes, Mr./Ms. Compliance Officer, that feature can be removed or altered in our Enterprise Version that is SEC friendly.  Click here and we'll reach out to discuss.</dd>
		</dl>

		<dl>
			<dt>I see you have a Profile section.  Who can see that?</dt>
			<dd>Only other members see your Profile and only after you make a request or accept one. If you decline, then your ID, profile, nor anything else is shared.  Nothing is searchable by the big bad Google, Microsoft, etc. empire search engines.  You remain completely private.  No one can search to see if you are a member of Who@.</dd>
		</dl>

		<dl>
			<dt>If I accept a request, do you share the contact information I have for the target?</dt>
			<dd>Nope. There is no contact sharing capability in Who@. Only you decide to do that and only outside the application.  You can't have an "Anthony Weiner moment" and think you're sharing something privately and get "exposed!"</dd>
		</dl>

		<dl>
			<dt>As a requester, can I send an email to a prospect?</dt>
			<dd>Nope. That would violate all of our principles of trust and privacy. Unlike other services, there is no spamming of prospects, no matter what you want to call it or "mail it in." Shoot, some of those linking services even charge you to spam their members when you see their resume.  How insane is that?  Random people requesting to link to me because I'm "someone they trust" is creepy and degrades the value of real relationships. </dd>
		</dl>

		<dl>
			<dt>A Requester, Contact Owner or Prospect, explain?</dt>
			<dd>The Requester can only request an intro from the Contact Owner. And the Contact Owner can't communicate with the prospect, or Prospect, inside the app. It must go through your own email service. If you're in the financial services industry, your Compliance Officer will like that, a lot.</dd>
		</dl>

		<dl>
			<dt>Wait, you are Compliance Officer friendly?</dt>
			<dd>Yes.  <a href="mailto:support@whoat.net" target="_blank">Contact us</a> to discuss a completely different version of Who@ that your Compliance Officer and the Security Exchange Commission will be ok with.</dd>
		</dl>

		<dl>
			<dt>What's the catch?  If it is free, how does Who@ make money?</dt>
			<dd>No catch.  Individuals, say a sales team or specific department / region / account, can start and continue to use Who@ for free.  The only limitation is you get 5 free accepted intro requests a month.  Need more?  Once we turn on the paywall, you pay for unlimited monthly use on your credit card for < $50/month.  Volume discounts are available to your company and we can discuss implementation of our Enterprise Version for either that small team or the entire company. But let's not get ahead of ourselves.  Get started now for free and see if we add value to your day.</dd>
		</dl>

		<dl>
			<dt>What does whoat.net offer that this app does not?</dt>
			<dd>The mobile app is fully featured but there are some differences. Items like: detailed reports, interactive relationship mapping and a really cool <a class="bookmarklet_link" href='javascript:d=""+(window.getSelection?window.getSelection():document.getSelection?document.getSelection():document.selection.createRange().text);d=d.replace(/\r\n|\r|\n/g," ,");if(!d)d=prompt("Enter the words:", "");if(d!=null)location="/search/"+escape(d).replace(/ /g,"+");void(0);'>bookmarklet</a> that goes on your browser toolbar to bring our search power to any term you read on the web are about it for now.</dd>
		</dl>

		<dl>
			<dt>How to get my team started?</dt>
			<dd>Simple.  Just a few minutes.  Since you're on our mobile product now, <a href="https://s3.amazonaws.com/whoat_docs/WhoAt+Intro+Getting+Started.pdf" target="_blank">Click here</a> for the Getting Started Guide in PDF form to share with your team. </dd>
		</dl>

		<dl>
			<dt>How can I get more information about your enterprise features?</dt>
			<dd>Glad you asked as that's simple too!  Check out the <a href="#top-bar" class="open_guides">getting started guides</a> or <a href="mailto:support@whoat.net" target="_blank">contact us</a> if you would like to schedule a demonstration for you.</dd>
		</dl>

		<dl>
			<dt>Lastly, I see your NameGame on a bunch of affiliate sites in various industries like: crowdfunding, job boards, dating sites, Over The Top (OTT) phone services and vertical professional networks.  What's with that?</dt>
			<dd>- It is our affiliate program.  Our NameGame is a suite of revenue sharing APIs that brings a unique and private social structure to a partner site.  It increases trust between two members of a community based on who they know in common, and, unlike any social media site, knows who you know in common even if that common contact isn't apartner site member, Who@ member or even if they have a zero footprint on any social media site.  Uniquely, you can remain anonymous with that other person, but still be able to see the folks in your address book whom that other person knows as well.   It adds 100% value on a 1x1 basis and is not dependent upon how many users Who@ has worldwide.  It also helps in fraudulent account prevention and increases the partner site's viral coefficient.  <a href="mailto:support@whoat.net" target="_blank">Contact us</a> if you believe your site can benefit and we'll reach out to chat.</dd>
		</dl>
	</div>
</div>
</%block>

<%block name="footer">
    <%include file="footer.mak"/>
</%block>