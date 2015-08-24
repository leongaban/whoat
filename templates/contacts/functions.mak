## CREATE CONTACT ROWS
## ====================================================

## Get User ID for contact
<%def name="get_contact_id(contact)">
    ${contact["id"]}
</%def>

## Get Member ID:
<%def name="get_member_id(contact)">
    ${contact["member"]["id"]}
</%def>

## Get Invited Status:
<%def name="get_invited_status(contact)">
    %if 'invited' in contact and contact['invited'] == 1:
        ${contact["invited"]}
    %endif
</%def>

## Get Contact Type
<%def name="get_contact_type(contact)">
    % if "member" in contact:
        member
    %else:
        contact
    % endif
</%def>

## Get Contact Type
<%def name="get_contact_details(contact)">
    % if "details" in contact:
        ${contact['details']}
    % endif
</%def>

## Get Friend Status of contact
<%def name="get_friend_status(contact)">
    % if 'member' in contact:

        % if 'friend' in contact and contact['friend'] == 1:
            true
        % else:
            false
        % endif

    % else:
        false
    % endif
</%def>

<%def name="make_contact_row(contact)">
    <tr data-user='${get_contact_type(contact)}'
        data-user-id='${get_contact_id(contact)}'
        data-friend='${get_friend_status(contact)}'
        data-invited='${get_invited_status(contact)}'

        % if "member" in contact:
            data-member-id='${get_member_id(contact)}'
        % endif

        % if "hidden" in contact:
            class="contact_hidden"
        % endif
        >

        <td class="td_contacts_avatar">
            <a class="open_modal">
                % if "member" in contact:
                    % if "avatar" in contact:
                        <div class="member_with_avatar">
                            <div class="mini_whoat"></div>
                            <img src="${contact['avatar']}" title="${contact['label']}" alt=""/>
                        </div>
                    % else:
                        <div class="contact_avatar"></div>
                    % endif

                % else:
                    % if "avatar" in contact:
                        <div class="contact_with_avatar">
                            <img src="${contact['avatar']}" title="${contact['label']}" alt=""/>
                        </div>
                    % else:
                        <div class="contact_avatar"></div>
                    % endif

                % endif
            </a>
        </td>

        <td class="td_contacts_vcard"><a class="open_modal"><div class="vcard_gray"></div></a></td>

        <td class="td_contacts_name">${contact["label"]}</td>

        <td class="td_contacts_title">
            % if "title" in contact and contact["title"] is not None:
                ${contact["title"]}
            % else:

            % endif
        </td>

        <td class="td_contacts_company">
            % if "company" in contact and contact["company"] is not None:
                ${contact["company"]}
            % else:

            % endif
        </td>

        ## Friend & Invite

        % if 'invitable' in contact and contact['invitable'] == 1:
            <td class="td_contacts_friend">
                <button class="btn add_friend">Add Friend</button>
            </td>

        % elif 'friendable' in contact and contact['friendable'] == 1:
            <td class="td_contacts_friend">
                <button class="btn add_friend">Add Friend</button>
            </td>

        % elif 'friend' in contact and contact['friend'] == 1:
            <td class="td_contacts_invite">
                <button class="btn unfriend">Unfriend</button>
            </td>

        % elif 'invited' in contact and contact['invited'] == 1:
            <td class="td_contacts_friend">
                <div class="invited">Pending</div>
            </td>

        % elif 'pending' in contact and contact['pending'] == 1:
            <td class="td_contacts_friend">
                <div class="invited">Pending</div>
            </td>

        % elif 'invitable' in contact and contact['invitable'] == 1:
            <td class="td_contacts_friend">
                <button class="btn add_friend">Add Friend</button>
            </td>

        ## not friendable
        % else:
            <td class="td_contacts_friend"></td>
        % endif
    </tr>
</%def>


## CREATE SEARCH ROWS
## ====================================================
<%def name="make_search_row(contact)">
    <tr data-user-details='${to_json(contact)}'
        data-contact-id='${get_contact_id(contact)}'

        % if "member" in contact:
            data-member-id='${get_member_id(contact)}'
        % endif
        >

        <td class="request_btn">
            %if len([n for n in contact["networks"] if n["type"] == "Personal"]) > 0:

                ## personal contact
                %if len([n for n in contact["networks"] if n["type"] != "Personal"]) > 0:

                    ## this contact with at least one other network match
                    <button
                        data-user="contact"
                        data-modal="intro_request_combo"
                        class="open_modal">Request Intro</button>
                %else:

                    ## this contact only exists in this members address book
                    <button
                        data-user="contact"
                        data-modal="contact_details"
                        class="open_modal">Contact Details</button>
                %endif

            %else:

                ## target is not in this members address book
                <button
                    data-user="target"
                    data-modal="intro_request"
                    class="open_modal">Request Intro</button>
            %endif
        </td>

        <td class="search_label">
            ${contact["label"]}
        </td>
        <td class="search_title">
            %if "title" in contact:
                ${contact["title"]}
            %endif
        </td>
        <td class="search_company">
            %if "organization" in contact:
                ${contact["organization"]}
            %endif
        </td>

        <td class="search_network_col personal_col">
            %if len([network for network in contact["networks"] if network["type"] == "Personal"]) > 0:
                <div class="blue_check"></div>
            %endif
        </td>
        <td class="search_network_col">
            %if len([network for network in contact["networks"] if network["type"] == "Organization"]) > 0:
                <div class="blue_check"></div>
                <span>${network["organization_count"]}</span>
            %endif
        </td>
        <td class="search_network_col">
            %if len([network for network in contact["networks"] if network["type"] == "Group"]) > 0:
                <div class="blue_check"></div>
                <span>${network["group_count"]}</span>
            %endif
        </td>
        <td class="search_network_col">
            %if len([network for network in contact["networks"] if network["type"] == "Friends"]) > 0:
                <div class="blue_check"></div>
                <span>${network["friend_count"]}</span>
            %endif
        </td>
    </tr>
</%def>

## INVITE COWORKERS
## ====================================================
<%def name="display_coworkers(coworker)">
    %if coworker:
        <tr>
            <td>
                %if 'member' in coworker:
                    <div class="member_box"></div>
                %else:
                    <input class="css-checkbox" type="checkbox" />
                    <input id="${coworker['id']}"
                           class="css-checkbox css-checkbox-chk invite-check-val"
                           type="checkbox"
                           value="${coworker['id']}"/>
                    <label for="${coworker['id']}" name="" class="css-label"></label>
                %endif
            </td>
            <td class="td_border_right">
                %if 'label' in coworker:
                    ${coworker['label']}
                %endif
            </td>
            <td class="td_border_right">
                <div class="invite_emails">
                    %if 'emails' in coworker:
                        %for email in coworker['emails']:
                            <span>'${email['label']}'</span>
                        %endfor
                    %endif
                </div>
            </td>
            <td class="td_border_right">
                %if 'title' in coworker:
                    ${coworker["title"]}
                %endif
            </td>
            <td>
                %if 'company' in coworker:
                    ${coworker["company"]}
                %endif
            </td>
        </tr>
    %endif
</%def>


## CREATE RECENT SEARCHES ROWS
## ====================================================
<%def name="make_recent_row(term)">
    <tr>
        <td class="term">
            % if 'alias' in term:
                <a href="/search/${term['term']}/${term['alias']}">${term['alias']}</a>
            % else:
                <a href="/search/${term['term']}">${term['term']}</a>
            % endif
        </td>
        <td class="age">
            <p>ago</p>

            <span>
                % if 'age' in term:
                    ${term['age']}
                % endif
            </span>
        </td>
    </tr>
</%def>


## BROWSE
## ====================================================
<%def name="display_companies(search_result)">
    %if search_result:
        <tr>
            <td class="browse_rows" data-browse-id="${search_result['id']}">
                %if 'label' in search_result:
                    <a href="/search/company_id:${search_result['id']}/${search_result['label']}">${search_result['label']}</a>
                %endif
            </td>
            <td>${search_result['count']}</td>
        </tr>
    %endif
</%def>

<%def name="display_titles(search_result)">
    %if search_result:
        <tr>
            <td class="browse_rows" data-browse-id="${search_result['id']}">
                %if 'label' in search_result:
                    <a href="/search/title_id:${search_result['id']}/${search_result['label']}">${search_result['label']}</a>
                %endif
            </td>
            <td>${search_result['count']}</td>
        </tr>
    %endif
</%def>

<%def name="display_regions(search_result)">
    %if search_result:
        <tr>
            <td class="browse_rows" data-browse-id="${search_result['id']}">
                %if 'label' in search_result:
                    <a href="/search/location_id:${search_result['id']}/${search_result['label']}">${search_result['label']}</a>
                %endif
            </td>
            <td>${search_result['count']}</td>
        </tr>
    %endif
</%def>


<%!
   import simplejson as json

   def to_json( d ):
       return json.dumps(d)
%>