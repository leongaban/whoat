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
        <tr class="expand_row"

        % if "member" in contact:
            data-user-id='${get_member_id(contact)}'

        % else:
            data-user-id='${get_contact_id(contact)}'
        % endif
        >

            <td class="expand_friend_label">${contact["label"]}</td>

            <td>
                <div class="btn friend_yellow">Add Friend</div>
            </td>

        ##<tr><td colspan="2" style="border-bottom:1px solid #ccc;"></td></tr>
        </tr>
    %endif
</%def>

<table>
    <thead>
        <tr><td colspan="2" style="padding: 5px 0 10px; border-bottom:1px solid #ccc;"></td></tr>
    </thead>

    <tbody class="expand_tbody">
    % for contact in contacts:
        ${make_contact_row(contact)}
    % endfor
    </tbody>
</table>