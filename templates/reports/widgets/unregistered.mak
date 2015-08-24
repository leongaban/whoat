<%namespace file="../functions.mak" name="functions"/>
<%block name="my_contact">
    <div class="widget_msg">
        <p></p><div class="close_widget_msg"></div>
    </div>
    <section class="widget intro_outbox gray_widget">
    <div class="widget_lid">
        <h2>Viewing Reports</h2>
    </div>
    <div class="widget_content">

        <section class="change_reports_bar">
            <div class="select_view">View: </div>

            <select id="getRoute">
                <option class="routeSelector" value=${organization['net_id']}>Onboarding</option> 
                <option class="routeSelector" value=${organization['net_id']}>Engagement</option>
                <option class="routeSelector" value=${organization['net_id']}>Popular Searches</option>
                <option class="routeSelector" value=${organization['net_id']}>Unregistered</option>
            </select>

            <div class="select_copy">Report for ${organization['title']}</div>

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
           
            %endif
        </section>

        <div class="table-container">
            <table class="tablesorter" id="table_reports" cellspacing="0" cellpadding="0" border="0">
                
                <thead>
                    <tr id="spacer">
                        <td class="col_little_title">${organization['not_invited']}</td>
                        <td class="no_bottom_border"></td>
                        <td class="no_bottom_border"></td>
                        <td class="no_bottom_border"></td>
                    </tr>
                    <tr id="spacer">
                        <th class="col_little_title">Invite Status</th>
                        <th class="col_little_title">Name</th>
                        <th class="col_little_title">Email</th>
                        <th class="col_little_title">Registered</th>
                    </tr>
                </thead>

                <tbody>
                    %if onboard:
                        % for dict in onboard.keys():
                            <%
                                report_result = onboard[dict]
                            %>
                            ${functions.make_unregistered_report(report_result)}
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
    </div>
</section>
</%block>