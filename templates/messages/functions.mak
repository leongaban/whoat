
## For the Outbox List view
<%def name="make_outbox_row(message)">
	<tr class="a_outbox_row" data-message-id="${message['id']}">
        <td class="td_outbox_icon row_outbox">
            <a href="/outbox/${message['id']}">
                <div class="td_a">
                    %if 'header' in message and message['header']['status'] == 'Declined':
                        <p>Intro</p>
                        <div class="outbox_declined"></div>
                        <p>Declined</p>

                    %elif 'header' in message and message['header']['status'] == 'Accepted':
                        <p>Intro</p>
                        <div class="outbox_accepted"></div>
                        <p>Accepted</p>

                    %else:
                        <p>Intro</p>
                        <div class="outbox_pending"></div>
                        <p>Pending</p>
                    %endif
                </div>
            </a>
        </td>

        <td class="outbox_td_name row_outbox">
            <a href="/outbox/${message['id']}">
                <div class="td_a">
                    <p class="latoregular">${message['contact']['label']}</p>
                    <p class="timestamp">Sent ${message['header']['age']} ago</p>
                </div>
            </a>
        </td>

        <td class="outbox_td_message row_outbox">
            <a href="/outbox/${message['id']}">
                <div class="td_a">
                    % if "subject" in message and message["subject"] is not None:
                        ${message['subject']}
                    % endif
                </div>
            </a>
        </td>

        <td class="outbox_td_status">
            <div class="center_icons_outbox">
                <a href="/outbox/${message['id']}">
                    <div class="td_a">
                        <ul>
                            % if 'accepted' in message['header'] and message['header']['accepted'] > 0:
                                <li>
                                    <em>${message['header']['accepted']}</em>
                                    <div class="outbox_td_status_accepted status_icon" title="${message['header']['accepted']} accepted"></div>
                                </li>
                            % elif 'accepted' in message['header'] and message['header']['accepted'] == 0:
                                <li>
                                    <em>0</em>
                                    <div class="outbox_td_status_none_accepted status_icon" title="0 accepted"></div>
                                </li>
                            % endif

                            % if 'declined' in message['header'] and message['header']['declined'] > 0:
                                <li>
                                    <em>${message['header']['declined']}</em>
                                    <div class="outbox_td_status_denied status_icon" title="${message['header']['declined']} declined"></div>
                                </li>
                            % elif 'declined' in message['header'] and message['header']['declined'] == 0:
                                <li>
                                    <em>0</em>
                                    <div class="outbox_td_status_none_denied status_icon" title="0 declined"></div>
                                </li>
                            % endif

                            % if 'pending' in message['header']:
                                <li>
                                    <em>${message['header']['pending']}</em>
                                    <div class="outbox_td_status_pending status_icon" title="${message['header']['pending']} pending"></div>
                                </li>
                            % endif
                        </ul>
                    </div>
                </a>
            </div>
            <div class="trashcan_mask">
                <div class="trashcan delete_my_request"></div>
            </div>
        </td>
    </tr>
</%def>

## For the Outbox Friends List view
<%def name="make_outbox_friends_row(message)">
    <tr class="a_outbox_row" data-message-id="${message['id']}">

        <td class="td_outbox_icon">
            <a href="/outbox/${message['id']}">
                <div class="td_a">
                    %if 'header' in message and message['header']['status'] == 'Declined':
                        <p>Friend</p>
                        <div class="outbox_friend_pending"></div>
                    %elif 'header' in message and message['header']['status'] == 'Accepted':
                        <p>Friend</p>
                        <div class="outbox_friend_accepted"></div>
                    %else:
                        <p>Friend</p>
                        <div class="outbox_friend_pending"></div>
                    %endif
                </div>
            </a>
        </td>

        <td class="i_want_to_meet row_outbox">
            <a href="/outbox/${message['id']}">
                <div class="td_a">
                    <p class="latoregular">${message['contact']['label']}</p>
                    <p class="timestamp">Sent ${message['header']['age']} ago</p>
                </div>
            </a>
        </td>

        <td class="outbox_td_message row_outbox">
            <a href="/outbox/${message['id']}">
                <div class="td_a">
                    % if "subject" in message and message["subject"] is not None:
                        ${message['subject']}
                    % endif
                </div>
            </a>
        </td>

        <td class="outbox_td_status friend_outbox_status">

            <a href="/outbox/${message['id']}">
                <div class="td_a">
                    <div class="center_icons_friend">
                    % if message['header']['status'] == 'Accepted':
                        <div class="outbox_td_status_accepted status_icon" title="accepted"></div>
                        <p class="orange">Accepted</p>
                    % elif message['header']['status'] == 'Declined':
                        <div class="outbox_td_status_denied status_icon" title="declined"></div>
                        <p>Declined</p>
                    % elif message['header']['status'] == 'Pending':
                        <div class="outbox_td_status_pending status_icon" title="pending"></div>
                        <p>Pending</p>
                    % endif
                    </div>
                </div>
            </a>

            <div class="trashcan_mask">
                <div class="trashcan delete_my_request"></div>
            </div>

        </td>
    </tr>
</%def>

## For the Inbox List View
<%def name="make_inbox_row(message)">
    %if 'header' in message and message['header']['status'] != 'Declined':

        ## Normal Message
        %if 'relay' not in message:

            %if 'header' in message and message['header']['status'] == 'Accepted':
                <tr class="tr_inbox_row" data-message-id="${message['id']}">
                    <td class="td_inbox_icon row_inbox">
                        <a href="/inbox/${message['id']}">
                            <div class="td_a">
                                <div class="inbox_icon_accepted"></div>
                                <p>Intro</p>
                            </div>
                        </a>
                    </td>
            %else:
                <tr class="tr_inbox_row
                    %if 'unread' in message and message['unread'] is True:
                        unread_inbox
                    %else:

                    %endif
                "
                data-message-id="${message['id']}">
                    <td class="td_inbox_icon row_inbox">
                        <a href="/inbox/${message['id']}">
                            <div class="td_a">
                                <div class="inbox_icon_new"></div>
                                <div class="inbox_icon_container">
                                    <div class="inbox_icon"></div>
                                    <p>Intro</p>
                                </div>
                            </div>
                        </a>
                    </td>
            %endif

        ## Curated and Managed Message
        %elif 'relay' in message:
            <tr class="tr_inbox_row" data-message-id="${message['id']}">
                <td class="td_inbox_icon row_inbox">
                    <a href="/inbox/${message['id']}">
                        <div class="td_a">
                            <div class="inbox_icon_send"></div>
                            <p>Forward</p>
                        </div>
                    </a>
                </td>
        %endif

            <td class="inbox_td_requestor row_inbox">

                <a href="/inbox/${message['id']}">
                    <div class="td_a">
                        <ul>
                            <li class="latoregular">${message['sender']['label']}</li>
                            <li>
                                % if "title" in message["sender"] and message["sender"]["title"] is not None:
                                    ${message['sender']['title']}
                                % endif
                            </li>
                            <li>
                                % if "company" in message["sender"] and message["sender"]["company"] is not None:
                                    ${message['sender']['company']}
                                % endif
                            </li>
                        </ul>
                    </div>
                </a>

            </td>

            <td class="inbox_td_target row_inbox">

                <a href="/inbox/${message['id']}">
                    <div class="td_a">
                        <ul>
                            <li class="latoregular">${message['contact']['label']}</li>
                            <li>
                                % if "title" in message["sender"] and message["sender"]["title"] is not None:
                                    ${message['sender']['title']}
                                % endif
                            </li>
                            <li>
                                %if 'company' in message['contact'] and message['contact']['company'] is not None:
                                    ${message['contact']['company']}
                                %endif
                            </li>
                        </ul>
                    </div>
                </a>

            </td>

            <td class="inbox_td_message row_inbox">

                <a href="/inbox/${message['id']}">
                    <div class="td_a">
                        %if 'age' in message['header']:
                            <div class="inbox_row_date">
                                Sent ${message['header']['age']} ago
                            </div>
                        %endif
                        %if 'subject' in message:
                            ${message['subject']}
                        %endif
                    </div>
                </a>

            </td>

            <td class="inbox_td_actions">

                ## Normal Message
                %if 'relay' not in message:

                    %if 'header' in message and message['header']['status'] == 'Accepted':
                        <div class="center_delete_x">
                            <div data-action="delete" class="inbox_action delete_their_request" title="Delete"></div>
                        </div>
                    %else:
                        <div class="center_action_group">
                            <div class="delete_x_here"></div>

                            <div class="quick_btn_container">
                                <div data-request-type="intro" data-action="accept" class="inbox_action quick_accept" title="Accept"></div>
                                <div data-action="deny" class="inbox_action quick_deny" title="Deny"></div>
                            </div>
                        </div>
                    %endif

                ## Curated and Managed Message
                %elif 'relay' in message:
                    <div class="center_action_group">
                        <div class="delete_x_here"></div>

                        <div class="quick_btn_container">
                            <div data-request-type="intro" data-action="send" class="inbox_action quick_send" title="Forward"></div>
                            <div data-action="deny" class="inbox_action quick_deny" title="Deny"></div>
                        </div>
                    </div>
                %endif

            </td>
        </tr>
    %endif
</%def>

## For the Inbox Friends List View
<%def name="make_inbox_friends_row(message)">
    %if 'header' in message and message['header']['status'] != 'Declined':
        <tr class="tr_inbox_row" data-message-id="${message['id']}">

            <td class="table_icon row_inbox">
                <div class="inbox_icon_new"></div>
                <div class="inbox_icon_container">

                    <a href="/inbox/${message['id']}">
                        <div class="td_a">
                            %if 'header' in message and message['header']['status'] == 'Accepted':
                                <div class="inbox_friend_icon_accepted"></div>
                            %else:
                                <div class="inbox_friend_icon"></div>
                            %endif

                            <p>Friend</p>
                        </div>
                    </a>
                </div>
            </td>

            ## The Requestor
            <td class="inbox_td_requestor row_inbox"
                %if 'unread' in message and message['unread'] is True:
                    data-unread="true"
                %else:
                    data-unread="false"
                %endif
            >
                <a href="/inbox/${message['id']}">
                    <div class="td_a">
                        <ul>
                            <li class="latoregular">${message['sender']['label']}</li>
                            <li>
                                % if 'title' in message['sender'] and message['sender']['title'] is not None:
                                    <span class="inbox-title">${message['sender']['title']}</span>
                                % endif
                            </li>
                            <li>
                                % if 'company' in message['sender'] and message['sender']['company'] is not None:
                                    <span class="inbox-company">${message['sender']['company']}</span>
                                % endif
                            </li>
                            <li class="timestamp">
                                %if 'age' in message['header']:
                                    Sent ${message['header']['age']} ago
                                %endif
                            </li>
                        </ul>
                    </div>
                </a>
            </td>

            ## Wants to meet
            <td class="i_want_to_meet row_inbox"
                %if 'unread' in message and message['unread'] is True:
                    data-unread="true"
                %else:
                    data-unread="false"
                %endif
            >
                <a href="/inbox/${message['id']}">
                    <div class="td_a"> </div>
                </a>
            </td>

            ## Their Message
            <td class="inbox_td_message row_inbox"
                %if 'unread' in message['header'] and message['header']['unread'] is True:
                    data-unread="true"
                %else:
                    data-unread="false"
                %endif
            >

                <a href="/inbox/${message['id']}">
                    <div class="td_a">
                        %if 'subject' in message:
                            ${message["subject"]}
                        %endif
                    </div>
                </a>
            </td>

            <td class="inbox_td_actions">
                %if 'header' in message and message['header']['status'] == 'Accepted':
                    <div class="center_delete_x">
                        <div data-action="delete" class="inbox_action delete_their_request" title="Delete"></div>
                    </div>
                %else:
                    <div class="center_action_group">
                        <div class="delete_x_here"></div>

                        <div class="quick_btn_container">
                            <div data-request-type="friend" data-action="accept_friend" class="inbox_action quick_accept"></div>
                            <div data-action="deny_friend" class="inbox_action quick_deny"></div>
                        </div>
                    </div>
                %endif
            </td>
        </tr>
    % endif
</%def>