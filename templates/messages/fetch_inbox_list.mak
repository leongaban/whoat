<%namespace file="functions.mak" name="functions"/>

%if messages_inbox:
    <table class="the_inbox_table">
        <thead class="inbox_thead">
             <tr>
                <td></td>
                <td>Requestor</td>
                <td>Wants to meet</td>
                <td>Message
                    <div id="inbox_thead_message" class="td_help">
                        <div class="help_container">
                            <div class="help_bubble">
                                Click request to customize a response message</div>
                        </div>
                    </div>
                </td>
                <td>Actions
                    <div id="inbox_thead_actions" class="td_help">
                    <div class="help_container">
                        <div class="help_bubble">Quickly accept<br/> or deny a request</div>
                    </div>
                    </div>
                </td>
            </tr>
        </thead>

        <tbody class="wire_td_highlighting">
            % for inbox in messages_inbox:
                % if inbox["type"] == "Introduction":
                    ${functions.make_inbox_row(inbox)}
                %endif
            % endfor

            % for friend in messages_inbox:
                % if friend["type"] == "FriendRequest":
                    ${functions.make_inbox_friends_row(friend)}
                %endif
            % endfor
        </tbody>
    </table>

%else:
    <div class="no_inbox_requests clearfix">
        <div class="nerd"></div>

        <div class="no_inbox_info">
            <p>You currently have no requests pending.</p>
            <p>Expand your network to greater benefit you and your colleagues.</p>
            <div class="invite_options">
                <div class="invite_avatar"></div>
                <a href="/contacts">Invite Friends</a>
                <p class="or">OR</p>
                <div class="icon_company"></div>
                <a href="/invite">Invite Coworkers</a>
            </div>
        </div>
    </div>
%endif

<div class="no_inbox_requests_hidden clearfix">
    <div class="nerd"></div>
    <div class="no_inbox_info">
        <p>You currently have no requests pending.</p>
        <p>Expand your network to greater benefit you and your colleagues.</p>
        <div class="invite_options">
            <div class="invite_avatar" title="Friends network"></div>
            <a href="/contacts">Invite Friends</a>
            <p class="or">OR</p>
            <div class="icon_company" title="Company network"></div>
            <a href="/invite">Invite Coworkers</a>
        </div>
    </div>
</div>