<%namespace file="../functions.mak" name="functions"/>
<%block name="my_contact">
    <div class="widget_msg">
        <p></p><div class="close_widget_msg"></div>
    </div>
    <section class="widget intro_outbox gray_widget">
        <div class="widget_lid">
            <h2>Viewing Reports</h2>
        </div>

        <div class="widget_content_reports">

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

            <div class="btn date_items">Date Selection</div>
            <div id="date_picker">
                <div class="relative_absolute_position">
                    <div class="dropdown_dates_settings">

                        <ul>
                            <li>
                                <p class="date_selection_p">Start Date</p>
                                <p class="date_selection_p">End Date</p>
                            </li>
                        </ul>

                        <ul>
                            <li>
                                <input type="datetime" id="startDate" class="date_range">
                            
                                <input type="datetime" id="endDate" class="date_range">
                            </li>
                        </ul>

                        <div class="execute_button_div">
                            <input type="submit" class="btn execute_button date_selection" data-page="org_contact" value='Submit'>
                        </div>

                        <ul id="date-list">
                            <input type="submit" class="btn date_selection" value="Last Day">
                            <input type="submit" class="btn date_selection" value="Last Week">
                            <input type="submit" class="btn date_selection" value="Last Month">
                            <input type="submit" class="btn date_selection" value="Last Quarter">
                            <input type="submit" class="btn date_selection" value="Year to Date">
                            <input type="submit" class="btn date_selection" value="12 Months">
                        </ul>
                    </div>
                </div>
            </div>

            ## For Future Graph
            ##<div id="sum_introductions"></div>

            <h2 class="report_h2">This report will help you manage your members engagement in your network.</h2>

            <hr>
            <table id="table_reports" cellspacing="0" cellpadding="0" border="0">
                
                <thead>
                    <tr id='spacer'>
                        <td class="no_bottom_border" colspan="6"></td>
                        <td colspan="1" class="display_intro_colspan">
                            <input class="display_checkbox align_checkbox" type="checkbox" value="Introductions"><p class='align_checkbox style_checkbox_p'>Hide / Show Introductions</p>
                        </td>
                        <td colspan="1" class="display_friend_colspan">
                            <input class="display_checkbox align_checkbox" type="checkbox" value="Friends"><p class='align_checkbox style_checkbox_p'>Hide / Show Friends</p>
                        </td>
                    </tr>
                    <tr id="spacer">
                        <td class="no_bottom_border"></td>
                        <td class="no_bottom_border"></td>
                        <td class="no_bottom_border"></td>
                        <td class="col_little_title">${organization['users_w_contacts']}</td>
                        <td class="col_little_title">${organization['users_w_searches']}</td>
                        <td class="col_little_title">${organization['users_w_invites']}</td>
                        <td class="col_little_title">${organization['users_w_introductions']}</td>
                        <td class="col_little_title hide_show_intros">${organization['users_w_accepted_req']}</td>
                        <td class="col_little_title hide_show_intros">${organization['users_w_pending_req']}</td>
                        <td class="col_little_title hide_show_intros">${organization['users_w_declined_req']}</td>
                        <td class="no_bottom_border hide_show_intros"></td>
                        <td class="no_bottom_border hide_show_intros"></td>
                        <td class="col_little_title">${organization['users_w_friend_req']}</td>
                        <td class="col_little_title hide_show_friends">${organization['users_w_friend_req_p']}</td>
                    </tr>
                    <tr id="spacer">
                        <td class="no_bottom_border"></td>
                        <td class="no_bottom_border"></td>
                        <td class="no_bottom_border"></td>
                        <td class="no_bottom_border"></td>
                        <td class="no_bottom_border"></td>
                        <td class="no_bottom_border"></td>
                        <td class="no_bottom_border col_little_title hide_show_intros" colspan="4" id="special_title_styler"> Outgoing Introduction Requests</td>
                        <td class="no_bottom_border col_little_title hide_show_intros" colspan="2" id="special_title_styler"> Days Since Last Introduction Request</td>
                        <td class="no_bottom_border col_little_title hide_show_friends" colspan="2" id="special_title_styler"> Friends</td>
                        <td class="no_bottom_border col_little_title hide_show_friends" colspan="2" id="special_title_styler"> Days Since Last Friend Request</td>
                        
                    </tr>
                    <tr id="spacer">
                        <th class="col_little_title">Name</th>
                        <th class="col_little_title">Enterprise Role</th>
                        <th class="col_little_title">Onboard Complete</th>
                        <th class="col_little_title">Contacts Uploaded</th>
                        <th class="col_little_title">Searches Made</th>
                        <th class="col_little_title">Co-Workers Invited</th>
                        <th class="col_little_title" id="style_side1">Total Intros</th>
                        <th class="col_little_title hide_show_intros">Accepted</th>
                        <th class="col_little_title hide_show_intros">Pending</th>
                        <th class="col_little_title hide_show_intros">Declined</th>
                        <th class="col_little_title hide_show_intros" id="style_side1">Made</th>
                        <th class="col_little_title hide_show_intros">Accepted</th>
                        <th class="col_little_title" id="style_side1">Total Friends</th>
                        <th class="col_little_title hide_show_friends">Pending Requests</th>
                        <th class="col_little_title hide_show_friends" id="style_side1">Made</th>
                        <th class="col_little_title hide_show_friends">Accepted</th>
                    </tr>
                </thead>

                <tbody>
                    %if engagement:
                        % for dict in engagement.keys():
                            <%
                                report_result = engagement[dict]
                            %>
                            ${functions.make_engagement_report(report_result)}
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