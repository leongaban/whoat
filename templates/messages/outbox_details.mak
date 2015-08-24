##<%namespace file="functions.mak" name="functions"/>

${render_my_message(message)}

<%def name="get_member_emails(response)">
    %if 'emails' in response["member"] and response["member"]["emails"] is not None:
        %for email in response["member"]["emails"]:
            ${email['label']},
        %endfor
    %endif
</%def>

<%def name="get_member_phones(response)">
    %if 'phones' in response["member"] and response["member"]["phones"] is not None:
        %for phone in response["member"]["phones"]:
            ${phone['label']},
        %endfor
    %endif
</%def>

<%def name="get_sender_emails(response)">
    %if 'emails' in response["sender"] and response["sender"]["emails"] is not None:
        %for email in response["sender"]["emails"]:
            ${email['label']},
        %endfor
    %endif
</%def>

<%def name="get_sender_phones(response)">
    %if 'phones' in response["sender"] and response["sender"]["phones"] is not None:
        %for phone in response["sender"]["phones"]:
            ${phone['label']},
        %endfor
    %endif
</%def>

<%def name="render_my_message(message)">
	% if message["type"] == "Introduction":
        <section class="widget intro_inbox orange_widget">
            <div class="widget_lid">
                <h2>
                    My Request for
                    %if message.get("contact", None) is not None:
                        <strong>${message['contact']['label']}</strong>
                    %endif
                </h2>
                %if 'age' in message['header']:
                    <h5>sent ${message['header']['age']} ago</h5>
                %endif
            </div>

            <section id="my_request_details"
                     data-target-id=""
                     data-request-type="intro"
                     class="module">

                <header>

                    <h3>Request Status:</h3>

                    <div class="my_request_meta">
                        <ul>
                            <li>
                            	%if 'accepted' in message['header'] and message['header']['accepted'] == 0:
                                	<div class="outbox_td_status_none_accepted"></div>
                                	<p>0 accepted</p>
                                %elif message['header']['accepted'] > 0:
	                                <div class="outbox_td_status_accepted"></div>
	                                <p>${len(message['accepted'])} accepted</p>
                                %endif
                            </li>
                            <li>
                            	%if 'declined' in message['header'] and message['header']['declined'] == 0:
	                            	<div class="outbox_td_status_none_denied"></div>
	                            	<p>0 declined</p>
	                            %elif message['header']['declined'] > 0:
	                            	<div class="outbox_td_status_denied"></div>
	                                <p>${len(message['declined'])} declined</p>
	                            %endif
                            </li>
                            <li>
                                <div class="outbox_td_status_pending"></div>
                                <p>
                                    %if 'pending' in message['header']:
                                        ${message['header']['pending']} pending
                                    %endif
                                </p>
                            </li>
                        </ul>
                    </div>
                </header>

                <div class="widget_details">

                    <div class="request_details clearfix">
                        <div class="outbox_details_left">

                            <div class="center_outbox_details_left">

                                <div class="who_i_want_to_meet">
                                    <ul>
                                    	<li>I want to meet:</li>
                                        <li>
                                            %if message.get("contact", None) is not None:
                                                ${message['contact']['label']}
                                            %endif
                                        </li>
                                        <li>
                                            %if message.get("contact", None) is not None and message["contact"].get("title", None) is not None:
                                                ${message['contact']['title']}
                                            %else:
                                            %endif
                                        </li>
                                        <li>
                                            %if message.get("contact", None) is not None and message["contact"].get("company", None) is not None:
                                                at ${message['contact']['company']}
                                            %else:
                                            %endif
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </div>

                        <div class="outbox_details_right">
                        	<div class="my_message">
                            	<ul>
                                    <li>Your Message</li>
                                    <li>
                                        %if 'age' in message['header']:
                                            ${message['message']}
                                        %else:
                                            No message
                                        %endif
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    %if 'accepted' in message['header'] and message['header']['accepted'] > 0 or 'declined' in message['header'] and message['header']['declined'] > 0:
	                    <div class="outbox_responses">
	                    	<table>
		                        <thead>
		                            <tr>
		                                <td></td>
		                                <td>
                                            %if 'accepted' in message['header'] and message['header']['accepted'] < 2:
                                                Contact Owner
                                            %elif message['header']['accepted'] > 1:
                                                Contact Owners
                                            %endif
                                        </td>
		                                <td>vCard</td>
                                        <td class="name_game_tr" title="NameGame results"><div class='name_game_bug'></div></td>
		                                <td>Sent</td>
		                                <td>Message</td>
		                            </tr>
		                        </thead>

		                        <!-- Repeat Row -->
		                        <tbody>
	                                ## render accepted messages
	                                %if 'accepted' in message['header'] and message['header']['accepted'] > 0:
	                                    % for response in message['accepted']:
	                                        ${makerow_request_accepted(response)}
	                                    % endfor
	                                %endif

	                                ## render declined messages
	                                %if 'declined' in message['header'] and message['header']['declined'] > 0:
	                                    % for response in message['declined']:
	                                        ${makerow_request_declined(response)}
	                                    % endfor
	                                %endif
		                        </tbody>
		                    </table>
	                    </div>
	                %else:
	                	<div class="outbox_responses">
	                		<table>
	                			<tr><td colspan="5">
	                			<p class="no_responses">You don't have any responses yet</p></td></tr>
	                		</table>
	                	</div>
                    %endif

                    <div class="intro_details_options">
                        <ul>
                            <li id="back_to_requests">&lt; Back to My Requests</li>
                            <li id="delete_this_request">Delete This Request</li>
                        </ul>
                    </div>

                </div>

            </section>

        </section>

    % elif message["type"] == "FriendRequest":
        <section id="my_request_details"
                     data-target-id="${message["contact"]["id"]}"
                     data-request-type="friend"
                     class="widget intro_inbox orange_widget">

            <div class="widget_lid">
                <div class="white_outbox_icon"></div>
                <h2>
                    <strong>You</strong> want to friend 
                    %if message.get("contact", None) is not None:
                        <strong>${message['contact']['label']}</strong>
                    %endif
                </h2>
                <h5>sent
                    %if 'age' in message['header']:
                        ${message['header']['age']} ago
                    %endif
                </h5>
            </div>

            <section class="module">

                <div class="widget_details">

                    <div id="friend_request_message" class="clearfix">

                        <div class="my_friend_details">

                            <div class="my_friend_avatar">
                                <div class="member_badge"></div>
                                <img src="${message["contact"]["avatar"]}" title="Hi ${message["contact"]["label"]}!" alt="${message["contact"]["label"]}"/>
                            </div>

                            <div class="friend_requestor">
                                <ul>
                                    <li class="target_friend_label">
                                        %if message.get("contact", None) is not None:
                                            ${message['contact']['label']}
                                        %endif
                                    </li>
                                    <li class="target_friend_title">
                                        %if message.get("contact", None) is not None and message["contact"].get("title", None) is not None:
                                            ${message['contact']['title']}
                                        %else:

                                        %endif
                                    </li>
                                    <li class="target_friend_company">
                                        %if message.get("contact", None) is not None and message["contact"].get("company", None) is not None:
                                            at ${message['contact']['company']}
                                        %else:

                                        %endif
                                    </li>
##                                    <li data-avatar="${message['contact']['avatar']}"
##                                        data-member-id="${message['contact']['id']}"
##                                        data-get-emails="${get_sender_emails(message)}"
##                                        data-get-phones="${get_sender_phones(message)}">
##
##                                        <div class="vcard_button">
##                                            <div class="vcard orange open_modal"><p>Contact details</p></div>
##                                        </div>
##                                    </li>
                                </ul>
                            </div>

                        </div>

                        <div class="friend_my_status">
                            <div class="centered_my_message">
                                %if 'pending' in message['header'] and message['header']['pending'] == 1:
                                    <div class="friend_big_pending"></div> <p>Your Request is Pending</p>
                                %elif 'accepted' in message['header'] and message['header']['accepted'] == 1:
                                    <div class="big_accepted_check"></div> <p>Your Request was Accepted</p>
                                %endif
	                        </div>
                        </div>
                    </div>

                    <div class="intro_details_options">
                        <ul>
                            <li id="back_to_requests">&lt; Back to My Requests</li>
                            <li id="delete_this_request">Delete This Request</li>
                        </ul>
                    </div>
                </div>
			</section>

        </section>
    % endif
</%def>

<%def name="makerow_request_accepted(response)">
    <tr class="response_row outbox_accepted_row"
        data-member-id="${response['member']['id']}"
        data-get-emails="${get_member_emails(response)}"
        data-get-phones="${get_member_phones(response)}"
        data-avatar="${response['member']['avatar']}"
        %if 'title' in response['member']:
            data-title="${response['member']['title']}"
        %else:
            data-title=""
        %endif
        %if 'organization' in response['member']:
            data-company="${response['member']['organization']}"
        %else:
            data-company=""
        %endif
        >

        <td class="response_icon"><div class="outbox_details_accepted_icon"></div></td>
        <td class="response_name">
            ${response['member']['label']}
        </td>
        <td class="response_vcard">
        	<div class="vcard orange open_modal"></div>
        </td>
        <td class="name_game">
            <p data-member-id="${response['member']['id']}" title="Total common contacts"></p>
        </td>
        <td class="response_date">${response['date']} ago</td>
        <td colspan="2">${response['message']}</td>
        <!-- <td class="expand"></td> -->
    </tr>
</%def>

<%def name="makerow_request_declined(response)">
    <tr class="response_row delcined_row">
        <td class="response_icon"><div class="outbox_details_declined_icon"></div></td>
        <td class="response_name"></td>
        <td class="response_vcard"></td>
        <td></td>
        <td class="response_date">${response['date']} ago</td>
        <td colspan="2">${response['message']}</td>
        <!-- <td class="expand"></td> -->
    </tr>
</%def>

<%!
    import simplejson as json

    def to_json( d ):
        return json.dumps(d)
%>