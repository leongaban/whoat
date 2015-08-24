<%namespace file="functions.mak" name="functions"/>

<%inherit file="../master.mak"/>

<%block name="title">Search for: 
    %if search_label is None:
        ${query}
    %else:
        ${search_label}
    %endif
</%block>

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

            <%block name="search_results">
                <div class="widget_msg">
                    <p></p><div class="close_widget_msg"></div>
                </div>

                <section class="widget intro_outbox orange_widget">
                    <div class="widget_lid">
                        <h2>
                            %if search_count < 200:
                                ${search_count}
                            %endif

                            Search Results for:

                            <em id="search_query">
                                %if search_label is None:
                                    ${query}
                                %else:
                                    ${search_label}
                                %endif
                            </em>
                        </h2>
                    </div>

                    <section id="search_results" class="module">

                        <div class="widget_content">
                            <table>
                                <thead>
                                     <tr>
                                        <td></td>
                                        <td>Name</td>
                                        <td>Title</td>
                                        <td>Company</td>
                                        <td class="subhead_icon">
                                            %if has_personal:
                                                <div class="tooltip">
                                                    <div class="tooltip-msg">My Contacts</div>
                                                    <div class="icon_contacts_on"></div>
                                                </div>
                                            %else:
                                                <div class="tooltip">
                                                    <div class="tooltip-msg">My Contacts</div>
                                                    <div class="icon_contacts_off"></div>
                                                </div>
                                            %endif
                                        </td>

                                        <td class="subhead_icon">
                                            %if has_organization:
                                                <div class="tooltip">
                                                    <div class="tooltip-msg">Coworkers</div>
                                                    <div class="icon_company_on"></div>
                                                </div>
                                            %else:
                                                <div class="tooltip">
                                                    <div class="tooltip-msg">Coworkers</div>
                                                    <div class="icon_company_off"></div>
                                                </div>
                                            %endif
                                        </td>

                                        <td class="subhead_icon">
                                            %if has_group:
                                                <div class="tooltip">
                                                    <div class="tooltip-msg">Groups<br/></div>
                                                    <div class="icon_groups_on"></div>
                                                </div>
                                            %else:
                                                <div class="tooltip">
                                                    <div class="tooltip-msg">Groups<br/></div>
                                                    <div class="icon_groups_off"></div>
                                                </div>
                                            %endif
                                        </td>

                                        <td class="subhead_icon">
                                            %if has_friend:
                                                <div class="tooltip">
                                                    <div class="tooltip-msg">Friends<br/></div>
                                                    <div class="icon_friends_on"></div>
                                                </div>
                                            %else:
                                                <div class="tooltip">
                                                    <div class="tooltip-msg">Friends<br/></div>
                                                    <div class="icon_friends_off"></div>
                                                </div>
                                            %endif
                                        </td>
                                    </tr>
                                </thead>

                                <tbody class="wire_td_highlighting">
                                    %if len(contacts) == 0:
                                        <tr>
                                            <td style="padding:20px 0; font-size:1em; line-height: 1.25em;" colspan="8">
                                                Search results may still be resolving, try again later.<br/>
                                                Also you can <a href="/invite">invite coworkers</a> and <a href="/sync">sync your contacts</a> to increase your network value.
                                            </td>
                                        </tr>
                                    %else:
                                        % for contact in contacts:
                                            ${functions.make_search_row(contact)}
                                        % endfor
                                    %endif
                                </tbody>
                            </table>
                        </div>

                    </section>
                </section>
            </%block>

        </section>
    </article>
</%block>

<%block name="footer">
    <%include file="../dashboard/footer.mak"/>
</%block>
