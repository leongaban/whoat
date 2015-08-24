<%namespace file="../functions.mak" name="functions"/>
<%block name="my_contact">
    <div class="widget_msg">
        <p></p><div class="close_widget_msg"></div>
    </div>

    <section id="reports_widget" class="widget intro_outbox gray_widget">
        <div class="widget_lid">
            <h2>Viewing Reports</h2>
        </div>

        <div class="widget_content">

            <section class="change_reports_bar">
                <h2>
                    <div class="select_view">View: </div>
                    <select id="getRoute" class="clearfix">
                        <option class="routeSelector" value=${organization['net_id']}>Onboarding</option>
                        <option class="routeSelector" value=${organization['net_id']}>Engagement</option>
                        <option class="routeSelector" value=${organization['net_id']}>Popular Searches</option>
                        <option class="routeSelector" value=${organization['net_id']}>Unregistered</option>
                    </select>
                    <!-- <div class="select_bg"></div> -->
                    <div class="select_copy">Report for ${organization['title']}</div>
                </h2>

                %if whodat_admin is True or approved_user is True:
                    <select id="orgDropdown" data-placeholder="Choose an Organization">
                    <option></option>
                    %if org_drop_down:
                        % for dict in org_drop_down.keys():
                            <%
                                report_result = org_drop_down[dict]
                            %>
                            ${functions.makerow_org_dropdown(report_result)}
                        % endfor
                    %else:
                        <option> No Organizations</option>
                    %endif
                    </select>

                %else:
                    <div class="widget_lid_icon"></div>
                %endif
            </section>

            <h2 class="report_h2">This report will help you manage the onboarding process for members on your network.</h2>

            <hr>

            <table id="table_reports" cellspacing="0" cellpadding="0" border="0">
                <thead>
                    <tr id="spacer">
                        <td class="no_bottom_border"></td>
                        <td class="no_bottom_border"></td>
                        <td class="no_bottom_border"></td>
                        <td class="col_little_title">${organization['registered']}</td>
                        <td class="col_little_title">${organization['users_w_contacts']}</td>
                        <td class="col_little_title">${organization['users_w_searches']}</td>
                        <td class="col_little_title">${organization['users_w_introductions']}</td>
                    </tr>
                    <tr id="spacer">
                        <th class="col_little_title">Onboard Complete</th>
                        <th class="col_little_title">Name</th>
                        <th class="col_little_title">Email</th>
                        <th class="col_little_title">Registered</th>
                        <th class="col_little_title">Contacts</th>
                        <th class="col_little_title">Searches</th>
                        <th class="col_little_title">Intro Requests</th>
                    </tr>
                </thead>

                <tbody>
                    %if onboard:
                        % for dict in onboard.keys():
                            <%
                                report_result = onboard[dict]
                            %>
                            ${functions.make_onboard_report(report_result)}
                        % endfor
                    %else:
                        <tr>
                            <td colspan="11">
                                <p class="no_result">No results yet, please try again when there is more activity on your account.</p>
                            </td>
                        </tr>
                    %endif
                </tbody>
            </table>
        </div>
    </section>
</%block>