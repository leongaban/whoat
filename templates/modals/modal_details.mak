## The vCard section
<section id="intro_vcard">
	<header>

		<div id="intro_contact_details">

			<div class="intro_modal_avatar"></div>

			<ul>
				<li class="username"></li>
				<li class="title"></li>
				<li class="company"></li>
			</ul>

			<div class="contact_details_actions">

##            	<div class="friend_btn_container">
##                    <div class="show_unfriend_button">
##                        <button class="btn unfriend friending_btn">Unfriend</button>
##                    </div>
##
##                    <div class="show_friend_button">
##                        <button class="btn add_friend friending_btn">Friend</button>
##                    </div>
##            	</div>
##
##                <div class="invited">Pending Friend</div>

				## Hide if not a contact:
				<div class="hidden_btn_container">
			        <div class="show_contact_button">
					    <button class="btn btn_show hiding_btn" title="Allow this contact to be searchable">Show contact</button>
				    </div>

				    <div class="hide_contact_button">
					    <button class="btn btn_hide hiding_btn" title="Hide this contact from your network's search">Hide contact</button>
				    </div>
				</div>

			</div>

		</div>

		<div class="vcard_details_section">
			<table id="vcard_table"><tbody id="modal_vcard_row"></tbody></table>
		</div>
		
	</header>
</section>

## The Intro section
<section id="intro_network_selection">
	<div class="target_copy clearfix">
		<p class="fl">Prospect:</p>
		<p class="fr">Select your networks to send request to:</p>
		<hr/>
	</div>

	<div class="target_info">
		<ul>
			<li class="username">Prospect Name</li>
			<li class="title">Prospect title</li>
			<li class="company">Prospect company</li>
		</ul>
	</div>

	<div class="select_networks">
    	<ul>
    		<li id="network_friends" class="network_btn">
    			<div class="icon_friends_on"></div>
    			<span class="friend_count"></span>
    			<p>Friends</p>
    		</li>

    		<li id="network_groups" class="network_btn">
    			<div class="icon_groups_on"></div>
    			<span class="group_count"></span>
    			<p>Groups</p>
    		</li>

    		<li id="network_company" class="network_btn">
    			<div class="icon_company_on"></div>
    			<span class="organization_count"></span>
    			<p>Company</p>
    		</li>
    	</ul>
	</div>
</section>

<section id="sub_groups">
	<div class="orange_hr_line"></div>
	<div class="groups_check_row">
		<ul></ul>
	</div>
	<button class="close_sub_groups">OK</button>
</section>

<section class="intro_request_message">
	<hr>
	<form action="" id="intro_request_form" method="post">

		<div id="intro_text_area">
			<textarea name="comments" cols="25" rows="5" placeholder="I would like to get an introduction. Could you help me?"></textarea>
		</div>

		<div id="comission_sharing">

			<input id="check_comission_1"
					class="css-checkbox"
					type="checkbox" />

			<input id="check_comission_2"
					class="css-checkbox css-checkbox-chk"
					type="checkbox"
					name="commission_share"
					value="commission_share"/>

			<label for="check_comission_2" name="commission_sharing" class="css-label"/>

			<div class="commision_tag">&nbsp; Commission Sharing</div>
		</div>

		<button id="btn_send_request" class="btn">Send Request</button>

	</form>
</section>