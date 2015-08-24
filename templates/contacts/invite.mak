<%namespace file="functions.mak" name="functions"/>

<%inherit file="../master.mak"/>

<%block name="title">Invite Coworkers</%block>

<%block name="head">
    <%include file="../dashboard/includes.mak"/>
</%block>

<%namespace file="functions.mak" name="functions"/>

<%block name="header">
    <div class="notification_container"></div>
    <!-- <div class="notification_container">
        <div class="notification-div alert-success" style="">
            <h4>Please be patient, this may take a few minutes</h4>
        </div>
    </div> -->
    <%include file="../dashboard/top_bar.mak"/>
</%block>

<%block name="sidebar">
    <%include file="../dashboard/sidebar.mak"/>
</%block>

<%block name="body">
    <article id="contentWrapper" role="main">
        <section id="content">

            <%block name="my_contact">
                <div class="widget_msg">
                    <p></p><div class="close_widget_msg"></div>
                </div>

                <section id="invite_coworkers" class="widget intro_outbox gray_widget">
                    <div class="widget_lid">
                        <h2>Invite Your Coworkers</h2>
                    </div>

                    <div class="widget_content">

                        %if coworkers:
                        
                            <h1>Coworkers Sharing a Domain With You</h1>

                            <h2>These are all the known co-workers that have been placed into our system by users from your company.</h2>

                            <div id="preview_invite_email" class="btn">Send Me Preview Email</div>

                            <form id="invite_coworkers_form" action="" method="post">

                                <button id="invited_selected_btn" class="btn">Invite Selected</button>
                                
                                <div class="invite_top_bumper"></div>

                                <div class="invite_table_container clearfix">

                                    <table id="table_coworkers" cellspacing="0" cellpadding="0" border="0">

                                        <thead>
                                            <tr>
                                                <td>
                                                    <input class="css-checkbox" type="checkbox" />
                                                    <input id="selectall"
                                                           name="selectall"
                                                           class="select_all_checks css-checkbox css-checkbox-chk"
                                                           type="checkbox"
                                                           value="0">
                                                    <label for="selectall" name="" class="css-label"></label>
                                                </td>
                                                <td>Name</td>
                                                <td>Emails</td>
                                                <td>Title</td>
                                                <td>Company</td>
                                            </tr>
                                        </thead>

                                        <tbody class="my_contacts_tbody">
                                            % for coworker in coworkers:
                                                ${functions.display_coworkers(coworker)}
                                            % endfor
                                        </tbody>
                                    </table>

                                </div>

                            </form>

                        %else:
                            <h1>No Co-worker results</h1>

                            <table id="table_contacts" cellspacing="0" cellpadding="0" border="0">

                                <tr class="no_contact_results">
                                    <td colspan="5">
                                        <p>You may have registered with a personal email.<br/> If you have a work email address, <a href="/sync">please sync</a> with that one now. :)</p>

                                        <p>Once we start processing your contacts you'll receive an email detailing the process. After the contacts are in your vault you will receive stats about your contacts.</p>

                                        <p>If at any time you want your contacts removed simply reach out to
                                            <a href="mailto:support@whoat.net" target="_blank">customer support</a>
                                            and they will be glad to help.</p>
                                    </td>
                                </tr>
                            </table>
                        %endif
                    </div>
                
                </section>
            </%block>
        </section>
    </article>
</%block>

<%block name="footer">
    <%include file="../dashboard/footer.mak"/>
</%block>