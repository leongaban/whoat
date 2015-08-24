<%namespace file="functions.mak" name="functions"/>

<%inherit file="../master.mak"/>

<%block name="title">My Contacts</%block>

<%block name="head">
    <%include file="../dashboard/includes.mak"/>
</%block>

<%namespace file="functions.mak" name="functions"/>

<%block name="header">
    <div class="notification_container"></div>
    <%include file="../dashboard/top_bar.mak"/>
</%block>

<%block name="sidebar">
    <%include file="../dashboard/sidebar.mak"/>
</%block>

<%block name="modals">
    <%include file="../modals/intro_vcard.mak"/>
</%block>

<%block name="body">
    <article id="contentWrapper" role="main">
        <section id="content">

            <%block name="my_contact">
                <div class="widget_msg">
                    <p></p><div class="close_widget_msg"></div>
                </div>

                <section class="widget intro_outbox green_widget">
                    <div class="widget_lid">
                        <h2>My Contacts</h2>
                        %if contacts:
                            <h5>you have ${len(contacts)} contacts</h5>
                        %endif
                    </div>

                    <div class="widget_content">

                        <table id="table_contacts" cellspacing="0" cellpadding="0" border="0">
                            %if contacts:
                            <thead>
                                <tr>
                                    <th class="hide_input first_hidden_input"></th>
                                    <th></th>
                                    <th class="subheads">Name</th>
                                    <th class="subheads">Title</th>
                                    <th class="subheads">Company</th>
                                    <th></th>
                                </tr>
                                <tr><td colspan="6" height="1"></td></tr>
                            </thead>
                        
                            <tbody class="my_contacts_tbody">
                                % for contact in contacts:
                                    ${functions.make_contact_row(contact)}
                                % endfor
                            </tbody>

                            %else:
                                <tr class="no_contact_results">
                                    <td colspan="6">
                                        <p class="you_no_sync">If you haven't synced your contacts, <a href="/sync">please sync now</a> :)</p>

                                        <div class="security_lock"></div>

                                        <div class="no_contacts_copy">
                                            <p>Once we start processing your contacts you'll receive an email detailing the
                                                process. After the contacts are in your vault you will receive stats
                                                about your contacts.</p>

                                            <p>If at any time you want your contacts removed simply reach out to
                                                <a href="mailto:support@whoat.net" target="_blank">customer support</a>
                                                and they will be glad to help.</p>
                                        </div>

                                    </td>
                                </tr>
                            %endif

                        </table>
                    </div>
                
                </section>
            </%block>
        </section>
    </article>
</%block>

<%block name="footer">
    <%include file="../dashboard/footer.mak"/>
</%block>