<%namespace file="../messages/functions.mak" name="functions"/>

<%block name="widgets">

    <div class="top_widget_notification"><ul></ul></div>

    ## ONBOARDING PROGRESS
    ##<%include file="progress.mak"/>

    <div class="expand_widget_top"></div>
    <div class="alerts_widget_top"></div>

    ## YOUR REQUESTS - OUTBOX LIST
    <%include file="../messages/outbox_list.mak"/>
    <div class="outbox_empty_widget"></div>

	## THEIR REQUESTS - INBOX LIST
	<%include file="../messages/inbox_list.mak"/>

    <div class="expand_widget_bot"></div>
    <div class="alerts_widget_bot"></div>

	## HEATMAP
    <section class="heatmap_widget widget green_widget">
        <script type="text/javascript" src="https://api.tiles.mapbox.com/mapbox.js/v1.6.4/mapbox.js"></script>

        <div class="widget_lid">
            <h2>My Heatmap</h2>
            <h4 class="goto_heatmap">View full heatmap</h4>
            <div class="minimize"></div>
        </div>

        <section class="module">
            <div class="widget_content">
            <div class='unique_popup'></div>
                <div id="map-canvas">
                    <iframe id="map-frame" src="" width="100%" height="350"></iframe>
                </div>
            </div>
        </section>
    </section>
    
</%block>