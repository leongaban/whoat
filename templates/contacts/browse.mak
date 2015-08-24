<%namespace file="functions.mak" name="functions"/>

<%inherit file="../master.mak"/>

<%block name="title">Viewing ${tab} in your Network</%block>

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

<%block name="body">
    <article id="contentWrapper" role="main">
        <section id="content">

            <script type='text/javascript' src="/static/js/libs/data-tables/jquery.dataTables.js"></script>

            <div class="widget_msg">
                <p></p><div class="close_widget_msg"></div>
            </div>

            <section class="widget intro_outbox orange_widget">
                <div class="widget_lid">
                    <h2>View All Results For:</h2>
                </div>

                <div class="widget_content">
                    <table id="browse_results" cellspacing="0" cellpadding="0" border="1">
                        <thead>
                            <tr>
                                <th id="browse_tabs" data-tab="${tab}">
                                    <ul>
                                        <li id="tab_companies" class="browse_tab_btn">Companies</li>
                                        <li id="tab_titles" class="browse_tab_btn">Titles</li>
                                        <li id="tab_regions" class="browse_tab_btn">Regions</li>
                                    </ul>
                                </th>
                                <th class="network_size">Network Size</th>
                            </tr>
                        </thead>

                        <tbody>
                            %if tab is 'companies':

                                %if companies:
                                    % for company in companies:
                                        ${functions.display_companies(company)}
                                    % endfor
                                %else:
                                    <tr><td colspan="2">
                                        <p class="no-requests">No results yet, your coworkers or network members may not have <a href="/sync">synced</a> yet, or no one has this contact. You can also try browsing by <a href="#!/browse/titles" style="color:#f58733">titles</a> or <a href="#!/browse/regions" style="color:#f58733">regions.</a></p>
                                    </td></tr>
                                %endif

                            %elif tab is 'titles':

                                %if titles:
                                    % for title in titles:
                                        ${functions.display_titles(title)}
                                    % endfor
                                %else:
                                    <tr><td colspan="2">
                                        <p class="no-requests">No results yet, your coworkers or network members may not have <a href="/sync">synced</a> yet, or no one has this contact. You can also try browsing by <a href="#!/browse/companies" style="color:#f58733">companies</a> or <a href="#!/browse/regions" style="color:#f58733">regions.</a></p>
                                    </td></tr>
                                %endif

                            %elif tab is 'regions':

                                %if regions:
                                    % for region in regions:
                                        ${functions.display_regions(region)}
                                    % endfor
                                %else:
                                    <tr><td colspan="2">
                                        <p class="no-requests">No results yet, your coworkers or network members may not have <a href="/sync">synced</a> yet, or no one has this contact. You can also try browsing by <a href="#!/browse/companies" style="color:#f58733">companies</a> or <a href="#!/browse/titles" style="color:#f58733">titles</a></p>
                                    </td></tr>
                                %endif

                            %endif
                        </tbody>
                    </table>
                </div>
            </section>

        </section>
    </article>
</%block>

<%block name="footer">
    <%include file="../dashboard/footer.mak"/>
</%block>