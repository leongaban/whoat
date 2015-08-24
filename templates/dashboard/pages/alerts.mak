<%inherit file="../../master.mak"/>

<%block name="title">My Alerts</%block>

<%block name="head">
    <%include file="../includes.mak"/>
</%block>

<%block name="header">
    <div class="notification_container"></div>
    <%include file="../top_bar.mak"/>
</%block>

<%block name="sidebar">
    <%include file="../sidebar.mak"/>
</%block>

<%block name="body">
    <article id="contentWrapper" role="main">
        <section id="content">

            <div class="widget_msg">
                <p></p><div class="close_widget_msg"></div>
            </div>

            <section class="widget alerts_widget orange_widget">
                <div class="widget_lid">
                    <div class="alerts_widget_icon"></div>
                    <h2>Your Alerts</h2>

                    <div class="alerts_page_holder">
                        <form id="alert_triggers_form" class="noEnterSubmit" action="" method="post">
                            <input type="text" id="alert_widget_input" name="custom_alert" placeholder="Enter Company Name" autocomplete="off"/>
                        </form>
                    </div>
                </div>

                <section id="alerts_section" class="module">
                    <div class="widget_content">

                        <div class="alerts_head_icon"></div>

                        <div class="add_alert_area">
                            <p class="alert_p">Add companies you want alerts for, and we’ll do the work for you. You'll get a notice when they become available.</p>

                            <div class="ftue_company_results">
                                <div class="ajax_company_results">
                                    <!-- <tbody class="added_alert_row"></tbody> -->
                                </div>
                            </div>

                            <div class="company_alert_error"></div>

                            <div class="ftue_added_companies">
                                <div class="ajax_added_company"></div>
                            </div>
                        </div>
                    </div>
                </section>

            </section>
    </article>

    <script language="javascript">
        WHOAT.alerts.wireAlerts('null', 'page');
    </script>
</%block>

<%block name="footer">
    <%include file="../footer.mak"/>
</%block>