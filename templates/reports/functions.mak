## For reports/on_board
<%def name="reports_onboarding(dic)">
	
</%def>

<%def name="makerow_org_dropdown(report_result)">
     %if report_result:
            <option value=${report_result['net_id']}>
                %if 'title' in report_result:
                    ${report_result['title']}
                %else:
                    No Result
                %endif
            </option>
     %endif
</%def>

<%def name="make_onboard_report(report_result)">
     %if report_result:
        <tr id="spacer">
            <td class="col">
                %if report_result['registered'] > 0 and report_result['users_w_contacts'] > 0 and report_result['users_w_searches'] > 0 and report_result['users_w_introductions'] > 0:
                    <p class="hideSorter">1</p> <div class="check_green"></div>
                %else:
                    <p class="hideSorter">0</p> <div class="check_red"></div>
                %endif
            </td>
            <td class="col">
                %if 'name' in report_result:
                    ${report_result['name']}
                %else:
                    <p class="hideSorter">0</p>
                %endif
            </td>
            <td class="col">
                %if 'username' in report_result:
                    ${report_result['username']}
                %else:
                    <p class="hideSorter">0</p>
                %endif
            </td>
            <td class="col">
                %if 'registered' in report_result:
                    %if report_result['registered'] > 0:
                        <p class="hideSorter">2</p> <div class="check_green"></div>
                    %else:
                        <p class="hideSorter">0</p> <div class="check_red"></div>
                    %endif
                %else:
                    <p class="hideSorter">0</p> <div class="check_red"></div>
                %endif
            </td>

            <td class="col">
                %if 'users_w_contacts' in report_result:
                    %if report_result['users_w_contacts'] > 0:
                        %if whodat_admin is True:
                            <p class="custom_tooltip" data-member=${report_result['member_id']}>${report_result['users_w_contacts']}</p>
                        %else:
                            <p>${report_result['users_w_contacts']}</p>
                        %endif
                    %else:
                        <p class="hideSorter">0</p> <div class="check_red"></div>
                    %endif
                %else:
                    <p class="hideSorter">0</p> <div class="check_red"></div>
                %endif
            </td>

            <td class="col">
                %if 'users_w_searches' in report_result:
                    %if report_result['users_w_searches'] > 0:
                        <p class="hideSorter">1</p> <div class="check_green"></div>
                    %else:
                        <p class="hideSorter">0</p> <div class="check_red"></div>
                    %endif
                %else:
                    <p class="hideSorter">0</p> <div class="check_red"></div>
                %endif
            </td>

            <td class="col">
                %if 'users_w_introductions' in report_result:
                    %if report_result['users_w_introductions'] > 0:
                        <p class="hideSorter">1</p> <div class="check_green"></div>
                    %else:
                        <p class="hideSorter">0</p> <div class="check_red"></div>
                    %endif
                %else:
                    <p class="hideSorter">0</p> <div class="check_red"></div>
                %endif
            </td>
        </tr>
     %endif
</%def>

## For reports/engagement
<%def name="reports_engagement(dict)">

</%def>

<%def name="make_engagement_report(report_result)">
     %if report_result:
        <tr id="spacer">
            <td class="col">
                %if 'name' in report_result:
                    <span class="username_tooltip" data-username=${report_result['username']}>${report_result['name']}</span>
                %else:
                    <p class="hideSorter">0</p>
                %endif
            </td>
            <td class="col">
                %if 'enterprise' in report_result:
                     %if report_result['enterprise'] != 0:
                        ${report_result['enterprise']}
                    %else:
                        <p>Not Listed</p>
                    %endif
                %else:
                    <p class="hideSorter">0</p> <div class="check_red"></div>
                %endif
            </td>

            <td class="col">
                %if report_result['users_w_contacts'] > 0 and report_result['users_w_searches'] > 0 and report_result['users_w_introductions'] > 0:
                    <p class="hideSorter">1</p> <div class="check_green"></div>
                %else:
                    <p class="hideSorter">0</p> <div class="check_red"></div>
                %endif
            </td>

            <td class="col">
                %if 'users_w_contacts' in report_result:
                    %if report_result['users_w_contacts'] > 0:
                        %if whodat_admin is True or 'enterprise' in report_result and report_result['enterprise'] == "Executive":
                            <p class="custom_tooltip" data-member=${report_result['member_id']}>${report_result['users_w_contacts']}</p>
                        %else:
                            <p>${report_result['users_w_contacts']}</p>
                        %endif
                    %else:
                        <p class="hideSorter">0</p> <div class="check_red"></div>
                    %endif
                %else:
                    <p class="hideSorter">0</p> <div class="check_red"></div>
                %endif
            </td>

            <td class="col">
                %if 'users_w_searches' in report_result:
                    %if report_result['users_w_searches'] > 0:
                        <p class="searches_tooltip" data-barSearch=${report_result['bar_searches']} data-browse=${report_result['browse_searches']}>${report_result['users_w_searches']}</p>
                    %else:
                        <p class="hideSorter">0</p> <div class="check_red"></div>
                    %endif
                %else:
                    <p class="hideSorter">0</p> <div class="check_red"></div>
                %endif
            </td>

            <td class="col">
                %if 'users_w_invites' in report_result:
                    %if report_result['users_w_invites'] > 0:
                        <p>${report_result['users_w_invites']}</p>
                    %else:
                        <p class="hideSorter">0</p> <div class="check_red"></div>
                    %endif
                %else:
                    <p class="hideSorter">0</p> <div class="check_red"></div>
                %endif
            </td>

            <td class="col">
                %if 'users_w_introductions' in report_result:
                    %if report_result['users_w_introductions'] > 0:
                        <p>${report_result['users_w_introductions']}</p>
                    %else:
                        <p class="hideSorter">0</p> <div class="check_red"></div>
                    %endif
                %else:
                    <p class="hideSorter">0</p> <div class="check_red"></div>
                %endif
            </td>
            <td class="col hide_show_intros">
                %if 'users_w_accepted_req' in report_result:
                    %if report_result['users_w_accepted_req'] > 0:
                        <p>${report_result['users_w_accepted_req']}</p>
                    %else:
                        <p class="hideSorter">0</p> <div class="check_red"></div>
                    %endif
                %else:
                    <p class="hideSorter">0</p> <div class="check_red"></div>
                %endif
            </td>
            <td class="col hide_show_intros">
                %if 'users_w_pending_req' in report_result:
                    %if report_result['users_w_pending_req'] > 0:
                        <p>${report_result['users_w_pending_req']}</p>
                    %else:
                        <p class="hideSorter">0</p> <div class="check_red"></div>
                    %endif
                %else:
                    <p class="hideSorter">0</p> <div class="check_red"></div>
                %endif
            </td>
            <td class="col hide_show_intros">
                %if 'users_w_declined_req' in report_result:
                    %if report_result['users_w_declined_req'] > 0:
                        <p>${report_result['users_w_declined_req']}</p>
                    %else:
                        <p class="hideSorter">0</p> <div class="check_red"></div>
                    %endif
                %else:
                    <p class="hideSorter">0</p> <div class="check_red"></div>
                %endif
            </td>
            <%
                from datetime import date
                report_date = date(2000, 01, 01)
            %>
            <td class="col hide_show_intros">
                %if 'most_recent_intro' in report_result:
                    %if report_result['most_recent_intro'] != report_date and report_result['most_recent_intro'] > 0:
                        <p>${report_result['most_recent_intro']}</p>
                    %else:
                        <p class="hideSorter">0</p> <div class="check_red"></div>
                    %endif
                %else:
                    <p class="hideSorter">0</p> <div class="check_red"></div>
                %endif
            </td>
            <td class="col hide_show_intros">
                %if 'most_recent_intro_a' in report_result:
                    %if report_result['most_recent_intro_a'] != report_date and report_result['most_recent_intro_a'] > 0:
                        <p>${report_result['most_recent_intro_a']}</p>
                    %else:
                        <p class="hideSorter">0</p> <div class="check_red"></div>
                    %endif
                %else:
                    <p class="hideSorter">0</p> <div class="check_red"></div>
                %endif
            </td>

            <td class="col">
                %if 'users_w_friends' in report_result:
                    %if report_result['users_w_friends'] > 0:
                        <p>${report_result['users_w_friends']}</p>
                    %else:
                        <p class="hideSorter">0</p> <div class="check_red"></div>
                    %endif
                %else:
                    <p class="hideSorter">0</p> <div class="check_red"></div>
                %endif
            </td>
            <td class="col hide_show_friends">
                %if 'users_w_friends_p' in report_result:
                    %if report_result['users_w_friends_p'] > 0:
                        <p>${report_result['users_w_friends_p']}</p>
                    %else:
                        <p class="hideSorter">0</p> <div class="check_red"></div>
                    %endif
                %else:
                    <p class="hideSorter">0</p> <div class="check_red"></div>
                %endif
            </td>
            <td class="col hide_show_friends">
                %if 'most_recent_friend' in report_result:
                    %if report_result['most_recent_friend'] != report_date and report_result['most_recent_friend'] > 0:
                        <p>${report_result['most_recent_friend']}</p>
                    %else:
                        <p class="hideSorter">0</p> <div class="check_red"></div>
                    %endif
                %else:
                    <p class="hideSorter">0</p> <div class="check_red"></div>
                %endif
            </td>
            <td class="col hide_show_friends">
                %if 'most_recent_friend_a' in report_result:
                    %if report_result['most_recent_friend_a'] != report_date and report_result['most_recent_friend_a'] > 0:
                        <p>${report_result['most_recent_friend']}</p>
                    %else:
                        <p class="hideSorter">0</p> <div class="check_red"></div>
                    %endif
                %else:
                    <p class="hideSorter">0</p> <div class="check_red"></div>
                %endif
            </td>
        </tr>
     %endif
</%def>

## For reports/searches
<%def name="reports_searches(dict)">

</%def>

<%def name="make_search_report(report_result)">
     %if report_result:
        <tr id="spacer">
        %if whodat_admin is True: 
            <td class="col">
                %if 'organ' in report_result:
                    ${report_result['organ']}
                %else:
                    <p class="hideSorter">0</p>
                %endif
            </td>
        %endif
            <td class="col">
                %if 'most_recent' in report_result:
                    ${report_result['most_recent']}
                %else:
                    <p class="hideSorter">0</p>
                %endif
            </td>
            <td class="col">
                %if 'searched_for' in report_result:
                    <a href="/search/${report_result['searched_for']}" class="browse_to_search">${report_result['searched_for']}</a>
                    
                %else:
                    <p class="hideSorter">0</p>
                %endif
            </td>
            <td class="col">
                %if 'num_searches' in report_result:
                    ${report_result['num_searches']}
                %else:
                    <p class="hideSorter">0</p>
                %endif
            </td>
            
        </tr>
     %endif
</%def>

## For reports/unregistered
<%def name="reports_unregistered(dict)">

</%def>

<%def name="make_unregistered_report(report_result)">
     %if report_result:
        <tr id="spacer">
            <td class="col td_contacts_invite">
                %if 'c_invited' in report_result and report_result['c_invited'] > 0:
                    <p class="hideSorter">0</p>
                    <button data-contact-id=${report_result['contact_id']} class="btn_inviting btn" disabled>Invited</button>
                %else:
                    <p class="hideSorter">1</p>
                    <button data-contact-id=${report_result['contact_id']} class="btn_invite btn">Invite</button>
                %endif
            </td>
            <td class="col">
                %if 'name' in report_result:
                    ${report_result['name']}
                %else:
                    <p class="hideSorter">0</p>
                %endif
            </td>
            <td class="col">
                %if 'username' in report_result:
                    ${report_result['username']}
                %else:
                    <p class="hideSorter">0</p>
                %endif
            </td>
            <td class="col">
                %if 'registered' in report_result:
                    %if report_result['registered'] > 0:
                        <p class="hideSorter">2</p> <div class="check_green"></div>
                    %else:
                        <p class="hideSorter">0</p> <div class="check_red"></div>
                    %endif
                %else:
                    <p class="hideSorter">0</p> <div class="check_red"></div>
                %endif
            </td>
        </tr>
     %endif
</%def>

<%def name="make_analytics_report(report_result)">
     %if report_result:
        <tr id="spacer">
            <td class="col">
                %if 'month_year' in report_result:
                    ${report_result['month_year']}
                %else:
                    <p class="hideSorter">0</p>
                %endif
            </td>
            <td class="col">
                %if 'downloads' in report_result:
                    ${report_result['downloads']}
                %else:
                    <p class="hideSorter">0</p>
                %endif
            </td>
            <td class="col">
                %if 'members' in report_result:
                    ${report_result['members']}
                %else:
                    <p class="hideSorter">0</p>
                %endif
            </td>
            
        </tr>
     %endif
</%def>
