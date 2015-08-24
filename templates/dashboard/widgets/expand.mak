<%def name="display_coworkers(coworker)">
    %if coworker:
        %if 'invited' in coworker or 'member' in coworker:

        %else:
            <tr class="w_expand_row" data-invite-id="${coworker['id']}">
                <td class="w_expand_invite_row">
                    <div class="btn invite_blue">Invite</div>
                    <p>
                        %if 'label' in coworker:
                            ${coworker['label']}
                        %endif

                        %if 'emails' in coworker:
                            <span>&nbsp;
                                %for email in coworker['emails']:
                                    (${email['label']})
                                %endfor
                            </span>
                        %endif
                    </p>
                </td>
            </tr>
        %endif

    %endif
</%def>

## Get User ID for contact
<%def name="get_contact_id(contact)">
    ${contact["id"]}
</%def>

## Get Member ID:
<%def name="get_member_id(contact)">
    ${contact["member"]["id"]}
</%def>

<%def name="make_contact_row(contact)">
    %if contact:
        <tr class="w_expand_row" 
            % if "member" in contact:
                data-user-id='${get_member_id(contact)}'
            % else:
                data-user-id='${get_contact_id(contact)}'
            % endif
        >
            <td class="w_expand_invite_row">
                <div class="btn friend_yellow">Add Friend</div>
                <p>
                    %if "label" in contact:
                        ${contact["label"]}
                    %endif
                </p>
            </td>
        </tr>
    %endif
</%def>

<section class="widget expand_widget orange_widget">
    <div class="widget_lid">
        <div class="expand_widget_icon"></div>
        <h2>Expand Your Network</h2>
        <div class="minimize"></div>
    </div>

    <section id="expand_section" class="module">
        <div class="widget_content">

        <div class="glass_groups"></div>

        <div class="expand_table_containers">

            <div class="widget_invite_area">
                <h2>Invite Coworkers</h2>

                <table>
                    <thead>
                        <tr><td class="" style="padding: 5px 0 10px; border-bottom:1px solid #ccc;"></td></tr>
                    </thead>

                    <tbody class="w_expand_tbody">
                        % for coworker in coworkers:
                            ${display_coworkers(coworker)}
                        % endfor
                        <tr><td class="expand_last_td"><a href="/invite">View All Coworkers</a></td></tr>
                    </tbody>
                </table>
            </div>

            <div class="widget_friend_area">
                <h2>Add Friends</h2>

                <table>
                    <thead>
                        <tr><td colspan="2" class="" style="padding: 5px 0 10px; border-bottom:1px solid #ccc;"></td></tr>
                    </thead>

                    <tbody class="w_expand_tbody">

                        <tr class="w_expand_row invite_friend_tr" data-invite-id="">
                            <td class="w_expand_invite_row">

                                <div class="add_friend_input_container">

                                    <div class="btn send_friend">Send</div>

                                    <form id="add_friend_form" action="/avatar/update" method="post" enctype="multipart/form-data" onsubmit="">
                                            
                                        <input type="text" id="add_friend_input" placeholder="Send to: example@email.com" autocomplete="off"/>

                                    </form>
                                </div>
                            </td>
                        </tr>

                        % for contact in contacts:
                            ${make_contact_row(contact)}
                        % endfor
                        
                        <tr><td class="expand_last_td"><a href="/contacts">View All Friendable Contacts</a></td></tr>

                    </tbody>
                </table>
            </div>

        </div>
    </section>
</section>
