<%inherit file="../master.mak"/>

<%block name="title">Who@ A new and private way of leveraging your contacts to expand your business.</%block>

<%block name="head">
    <%include file="includes.mak"/>
</%block>

<%block name="body">
<div id="about_page" class="container">
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

    <div class="about_banner"><h1>Relationships As A Service</h1></div>

    <div class="about_container">

    	<div class="inside_about_content">
    		
    		<div class="about_block_1">

				<div class="about_hand_shake"></div>

				<div class="about_copy_1">
					<h2>Who@ makes business networking easier, faster and more private.</h2>

					<p>In business it's not always what you know, but who you know. Networking through “who you know” is the best way to get the kind of introductions that lead to the business you're really after. Who@ helps you leverage who you know in a unique manner.</p>

					<p>Who@ joins personal contacts in a private network and allows network members to see company names and titles, but not contact names and not the names of the people that own those contacts.</p>
				</div>
			</div>

			<div class="about_block_2">

				<div class="about_phone_bubbles"></div>
				<div class="about_copy_2">
					<h2>How does Who@ work?</h2>

					<p>Who@ allows network members to request an introduction to other member's contacts. Request granted, great. Request denied because requestee doesn't personally care for requestor no harm, no foul between network members since the requestee never knew who the owner of the contact was.</p>

					<p>Who@ allows network members to request an introduction to other member's contacts. Request granted, great. Request denied because requestee doesn't personally care for requestor no harm, no foul between network members since the requestee never knew who the owner of the contact was.</p>

					<p>Who@ allows network members to leverage each other's contacts without leveraging personal relationships!</p>
				</div>

			</div>

    	</div>
    </div>

</div>
</%block>

<%block name="footer">
    <%include file="footer.mak"/>
</%block>