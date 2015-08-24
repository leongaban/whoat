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

                %if whodat_admin is True: 
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
                        %if whodat_admin is True or approved_user is True:
                            <th class="col_little_title">Company</th>
                        %endif
                            <th class="col_little_title">Most Recent Search</th>
                            <th class="col_little_title">Search Term</th>
                            <th class="col_little_title">Number of Times Searched</th>
                        </tr>
                    </thead>

                    <tbody>
                        %if searched:
                            % for dict in searched.keys():
                                <%
                                    report_result = searched[dict]
                                %>
                                ${functions.make_search_report(report_result)}
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