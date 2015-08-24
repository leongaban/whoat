<div id="ftue_tour_screens">

    <div class="ftue_block">

    	<div class="ftue_sections">
	        <%include file="ftue_sections.mak"/>
	    </div>

        <div class="ftue_footer">
	        <div class="ftue_prev ftue_direction_btn">Prev</div>

	        <div class="ftue_circles">
	            <ul>
	                ## Hand Shake
	                <li id="ftue_btn_1" class="tour_nav_circle">
	                    <div class="nav_circle tour_nav_orange"></div>
	                </li>

	                ## Intro Graphic
	                <li id="ftue_btn_2" class="tour_nav_circle">
	                    <div class="nav_circle tour_nav_blue"></div>
	                </li>

	                ## Glass Bubbles
	                <li id="ftue_btn_3" class="tour_nav_circle">
	                    <div class="nav_circle tour_nav_blue"></div>
	                </li>

	                ## Secure Lock
	                <li id="ftue_btn_4" class="tour_nav_circle">
	                    <div class="nav_circle tour_nav_blue"></div>
	                </li>

	                ## Video: What Gets Uploaded?
	                <li id="ftue_btn_5" class="tour_nav_circle">
	                    <div class="nav_circle tour_play_blue"></div>
	                </li>

	                ## SNARF
	                <div class="snarf_lock_hover">
                    	<div class="small_exchange_icon"></div>
                    	<div class="small_gmail_icon"></div>
                    </div>
	                <li id="ftue_btn_6" class="tour_nav_circle">
	                    <div class="icon_snarf_lock tour_lock_blue"></div>
	                </li>

	                ## Create Custom Alerts
	                <li id="ftue_btn_8" class="tour_nav_circle">
	                    <div class="nav_circle tour_alerts_blue"></div>
	                </li>

	                ## Expand Your Network
	                <li id="ftue_btn_9" class="tour_nav_circle">
	                    <div class="nav_circle tour_expand_blue"></div>
	                </li>

	                ## You Rock / Fail
	                <li id="ftue_btn_10" class="tour_nav_circle">
	                    <div class="icon_cloud tour_cloud_blue"></div>
	                </li>

	            </ul>
	        </div>

	        <div class="ftue_next ftue_direction_btn">Next</div>
	        <div class="ftue_continue ftue_direction_btn">Continue</div>
	        <div class="ftue_last ftue_direction_btn">Finish</div>
	    </div>

    </div>

    <script language="javascript">
##		Hack
##    	WHOAT.ftue.setSnarf('true');

    	function updateGmailStats(total) {
	        WHOAT.ftue.setSnarf('true');
	        // Hide Previously Snarfed stats
	        $('.gmail_snarf_content').hide();
	        // Show New Snarfed stats
	        $('.ftue_gmail_snarfed strong').text(total);
	        $('.ftue_gmail_snarfed').fadeIn('fast');
	    }
    </script>

</div>