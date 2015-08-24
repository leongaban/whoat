${render_intro_request(message)}

<%def name="get_member_emails(sender)">
    %if 'emails' in sender and sender["emails"] is not None:
        %for email in sender["emails"]:
            ${email['label']},
        %endfor
    %endif
</%def>

<%def name="get_member_phones(sender)">
    %if 'phones' in sender and sender["phones"] is not None:
        %for phone in sender["phones"]:
            ${phone['label']},
        %endfor
    %endif
</%def>

<%def name="render_intro_request(message)">
    %if message["type"] == "Introduction":
        <section class="widget intro_inbox_msg orange_widget">
            <div class="widget_lid">

                <h2>
                    %if 'label' in message['sender']:
                        <span class="the_requesters_name"><strong>${message['sender']['label']}</strong></span>
                    %endif

                    Wants to Meet

                    %if 'label' in message['contact']:
                        <strong>${message['contact']['label']}</strong>
                    %endif
                </h2>

                <h5>
                    %if "curated" not in message:
                        Sent ${message['header']['age']} ago
                    %elif "curated" in message and "relay" not in message:
                        Forwarded ${message['header']['age']} ago
                    %else:
                        Sent ${message['header']['age']} ago
                    %endif
                </h5>
                
            </div>

            <section id="their_request_details"
                     data-name-game-id="${message['sender']['id']}" 
                     data-request-type="intro" 
                     class="module">

                <div class="widget_details">

                    <div class="request_details clearfix">

                        <div class="request_details_left">

                            <div class="block_requestor">
                                <div class="avatar_requestor_block">
                                    <div class="avatar_requester_title"><p>Requester</p>
                                        <div class="member_icon"></div>
                                    </div>
                                    <div class="avatar_requester">
                                        <img src="
                                            %if 'avatar' in message['sender']:
                                                ${message['sender']['avatar']}"
                                            %endif
                                        alt=""/>
                                    </div>
                                </div>

                                <div class="the_requestor">
                                    <ul>
                                        <li class="the_sender_label">${message['sender']['label']}</li>

                                        %if message.get("sender", None) is not None and message["sender"].get("title", None) is not None:
                                            <li class="the_sender_title">${message['sender']['title']}</li>
                                        %else:
                                        %endif
                                    
                                        %if message.get("sender", None) is not None and message["sender"].get("company", None) is not None:
                                            <li class="the_sender_company">at ${message['sender']['company']}</li>
                                        %else:
                                        %endif
                                        
                                        <li data-avatar="${message['sender']['avatar']}"
                                            data-member-id="${message['sender']['id']}"
                                            data-get-emails="${get_member_emails(message['sender'])}"
                                            data-get-phones="${get_member_phones(message['sender'])}">
                                            <div class="vcard_button">
                                                <div class="vcard orange open_modal"><p>Requester details</p></div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div class="connected_details">
                                <span>How you're connected:</span>
                                <ul>
                                    %for network in message["networks"]:

                                        %if network['type'] == "Organization":
                                            <li><div class="icon_company_on"></div> <p>${network["label"]}</p></li>

                                        %elif network['type'] == "Group":
                                            <li><div class="icon_groups_on" title="Group"></div> <p>${network["label"]}</p></li>

                                        %endif

                                    %endfor

                                    %if "friends" in message and message["friends"] is True:
                                        <li><div class="icon_friends_on" title="You are friends"></div> <p>Friends</p></li>
                                    %endif
                                </ul>
                            </div>

                            <div class="requestor_message">
                                <span>Requester <em>${message['sender']['label']}'s</em> message: <div class="stamp">sent ${message['header']['age']} ago</div></span>
                                <p>${message["message"]}</p>
                            </div>

                            %if "relay" not in message:

                                %if "curated" in message:
                                    <div class="manager_message">
                                        <span data-id='${message["notes"][0]["member"]["id"]}'><div class="manager">Manager</div> <div class="vcard open_modal"></div> <em class='manager_name open_modal'>${message["notes"][0]["member"]["label"]}'s </em> message: <div class="stamp">forwarded ${message["notes"][0]['timestamp']} ago</div></span>
                                        <p>${message['notes'][0]['message']}</p>
                                    </div>
                                %endif

                            %endif

                            %if "bounty" in message and message["bounty"] is True:
                                <div class="commission_sharing">Commision sharing <div class="small_green_check"></div></div>
                            %endif

                            <div class="wants_to_meet">
                                <ul>
                                    <li><div class="orange_line"></div></li>
                                    <li>WANTS TO MEET PROSPECT</li>
                                    <li class="orange_line_2"><div class="orange_line"></div></li>
                                </ul>
                            </div>

                            <div class="block_target">
                                <div class="avatar_requestor_block">
                                    <div class="avatar_target_title"><p>Your Contact</p></div>
                                    <div class="avatar_target">
                                        ##<img src="${message['contact']['avatar']}" onError="this.onerror=null;this.src='/static/img/dashboard/messages/target_avatar.png';" alt=""/>
                                        <img src="${message['contact']['avatar']}" onerror='WHOAT.modal.imgError("detais");' alt=""/>
                                    </div>
                                </div>

                                <div class="the_target">
                                    <ul>
                                        <li class="bold">${message['contact']['label']}</li>

                                        %if message['contact'].get('title', None) is not None:
                                            <li>${message['contact']['title']}</li>
                                        %endif

                                        %if message['contact'].get('company', None) is not None:
                                            <li>at ${message['contact']['company']}</li>
                                        %endif

                                        <li data-contact-id="${message['contact']['id']}">
                                            <div class="vcard_button">
                                                <div class="vcard orange open_modal"><p>Contact details</p></div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </div>

                        <div class="request_details_right">
                            <div class="center_details_right">

                                ## MESSAGE ACCEPTED
                                %if message['header']['status'] is not None and message['header']['status'] == 'Accepted':
                                    <div class="response_accepted">
                                        <div class="accepted_form">
                                            <form method="post">
                                                <h3>You <strong>Accepted</strong> Their Request</h3>
                                                <p>The recipient will see the contact information in your profile.</p>
                                                <div class="the_accept_textarea">
                                                    <em>Your Message:</em>
                                                    %if 'status' in message['header'] and message['header']['status'] == 'Accepted':
                                                        <div class="accept_response_text">

                                                            %if "curated" in message['notes'][0] and message['notes'][0]['curated'] is True:
                                                                ${message['notes'][1]['message']}
                                                            %else:
                                                                %if 'relay' not in message:
                                                                    ${message['notes'][0]['message']}
                                                                %else:
                                                                    ${message['notes'][1]['message']}
                                                                %endif
                                                            %endif

                                                        </div>
                                                    %else:
                                                        <textarea id="accept_response_text" cols="50" rows="5">I would be happy to make this introduction if possible. Contact me at your convenience.</textarea>
                                                    %endif
                                                </div>
                                            </form>
                                        </div>
                                    </div>

                                ## MESSAGE NOT ACCEPTED
                                %else:
                                    <div class="inbox_details_buttons">
                                        <ul>
                                            %if 'relay' not in message:
                                                <li data-choice="accept">
                                                    <div class="inbox_response_btn big_accept"></div>
                                                    <p>Accept</p>
                                                </li>
                                            %elif 'relay' in message:
                                                <li data-choice="send">
                                                    <div class="inbox_response_btn big_send"></div>
                                                    <p>Send</p>
                                                </li>
                                            %endif

                                            <li><p class="or">Or</p></li>

                                            <li data-choice="deny">
                                                <div class="inbox_response_btn big_deny"></div>
                                                <p>Deny</p>
                                            </li>
                                        </ul>
                                    </div>

                                    <div class="inbox_details_instruction">
                                        We hope you accept the request, but even if you are unable to help, please reply as quickly as possible. Confirm on the next screen..
                                    </div>

                                    <div class="response_form">
                                        <div class="accepted_form">
                                            <form method="post">
                                                <h3>You are <strong>Accepting</strong> Their Request</h3>
                                                <p>The recipient will see the contact information in your profile.</p>
                                                <div class="the_accept_textarea">
                                                    <textarea id="accept_response_text" rows="5" cols="50">I would be happy to make this introduction if possible. Contact me at your convenience.</textarea>
                                                </div>

                                                <div class="submit_container">
                                                    <span class="btn_cancel_message">Cancel</span>
                                                    <button class="btn accept_this_request orange_bg">Send Message</button>
                                                </div>
                                            </form>
                                        </div>

                                        <div class="denied_form">
                                            <form method="post">
                                                <h3>Deny Message</h3>
                                                <p>You remain anonymouse, unless you add your info to the message.</p>
                                                <div class="the_deny_textarea">
                                                    <textarea name="" id="deny_response_text" cols="50" rows="5">Sorry, I am unable to help you at this time. Good luck in your search!</textarea>
                                                </div>
                                                <div class="submit_container">
                                                    <span class="btn_cancel_message">Cancel</span>
                                                    <button class="btn deny_this_request blue_bg">Send Message</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                %endif

                            </div>
                        </div>

                    </div> <!-- request_details -->

                    %if message["name_game"] > 0:
                    <hr class="inbox_details_hr">
                        <section class="inbox_details_name_game">
                            <header title="Contacts you have in common with requester">
                                <div class="name_game_bug fl"></div>
                                <div class="blue fl">
                                    <h3>Name Game Results</h3>
                                </div>
                                <div class="name_game_count orange fr">Common contacts with the requester: ${message["name_game"]}</div>
                            </header>

                            ## Name Game Contact
                            <table class="name_game_results" cellspacing="0" cellpadding="0" border="0">
                                <thead><tr><td></td><td>Name</td><td>Title</td><td>Company</td></tr></thead>

                                ## Repeat this row
                                <tbody class="name_game_rows"></tbody>
                            </table>
                        </section>
                    %else:

                    %endif

                    <div class="intro_details_options">
                        <ul>
                            <li id="back_to_requests">&lt; Back to Incoming Requests</li>
                            <li id="delete_this_request">Delete This Request</li>
                        </ul>
                    </div>

                </div><!-- widget_details -->
                
            </section>

        </section>

    %elif message["type"] == "FriendRequest":
        <section id="their_request_details" 
                     data-sender-id="${message['sender']['id']}"
                     data-request-type="friend" 
                     class="widget intro_inbox orange_widget">

            <div class="widget_lid">
                <h2>
                    %if 'label' in message['sender']:
                        <strong>${message['sender']['label']}</strong>
                    %endif

                    wants to be <strong>friends</strong>
                </h2>

                %if 'age' in message['header']:
                    <h5>Sent ${message['header']['age']} ago</h5>
                %endif
            </div>

            <section class="module">

                <div class="widget_details">

                    <div id="friend_request_message" class="clearfix">

                        <div class="friend_details">

                            <div class="friend_avatar">
                                <div class="member_badge"></div>
                                <img src="${message["sender"]["avatar"]}" title="Hi ${message["sender"]["label"]}!" alt=""/>
                            </div>

                            <div class="friend_requestor">
                                <ul>
                                    <li class="friend_name sender_friend_label">
                                        %if message.get("sender", None) is not None:
                                            ${message['sender']['label']}
                                        %endif
                                    </li>
                                    <li class="sender_friend_title">
                                        %if message.get("sender", None) is not None and message["sender"].get("title", None) is not None:
                                            ${message['sender']['title']}
                                        %else:

                                        %endif
                                    </li>
                                    <li class="sender_friend_company">
                                        %if message.get("sender", None) is not None and message["sender"].get("company", None) is not None:
                                            at ${message['sender']['company']}
                                        %else:

                                        %endif
                                    </li>
                                    <li data-avatar="${message['sender']['avatar']}"
                                        data-member-id="${message['sender']['id']}"
                                        data-get-emails="${get_member_emails(message['sender'])}"
                                        data-get-phones="${get_member_phones(message['sender'])}">

                                        <div class="vcard_button">
                                            <div class="vcard orange open_modal"><p>Contact details</p></div>
                                        </div>
                                        <div class="namegame_button">
                                            <div class="name_game_bug orange open_modal"><p>NameGame Results</p></div>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div class="friend_id_details" data-friend-id="${message['sender']['id']}">
                                <div class="requestor_message">
                                    %if 'message' in message and message['message'] is not None:
                                        <span>${message['sender']['label']}'s message sent ${message['header']['age']} ago</span>
                                        <p>${message["message"]}</p>
                                    %endif
                                </div>
                            </div>

                        </div>

                        %if 'status' in message['header'] and message['header']['status'] == 'Pending':
                            <div class="friend_response_choices">
                                <div class="inbox_details_buttons">
                                    <ul>
                                        <li class="button_accept">
                                            <div class="friend_response big_accept"></div>
                                            <p>Accept</p>
                                        </li>
                                        <li><p class="or">Or</p></li>
                                        <li class="button_deny">
                                            <div class="friend_response big_deny"></div>
                                            <p>Deny</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div class="friend_accepted_message">
                                <div class="center_this_61">
                                    <div class="big_accepted_check"></div>
                                </div>
                                <p>You've accepted ${message["sender"]["label"]}'s friend request and is now in your friend network.</p>
                            </div>

                            <div class="friend_denied_message">
                                <div class="center_this_61">
                                    <div class="big_denied_x"></div>
                                </div>
                                <p>You've declined ${message["sender"]["label"]}'s friend request.</p>
                            </div>

                        %elif 'status' in message['header'] and message['header']['status'] == 'Accepted':
                            <div class="friend_accepted_message_show">
                                <div class="center_this_61">
                                    <div class="big_accepted_check"></div>
                                </div>
                                <p>You've accepted ${message["sender"]["label"]}'s friend request and is now in your friend network.</p>
                            </div>
                        %endif

                    </div>

                    <div class="intro_details_options">
                        <ul>
                            <li id="back_to_requests">&lt; Back to Incoming Requests</li>
                            <li id="delete_this_request">Delete This Request</li>
                        </ul>
                    </div>

                </div>

            </section>
        </section>
    %endif
</%def>

<%!
    import simplejson as json

    def to_json( d ):
        return json.dumps(d)
%>