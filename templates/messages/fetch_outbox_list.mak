<%namespace file="functions.mak" name="functions"/>

%if messages_outbox:
    <table class="the_outbox_table">
        <thead>
             <tr>
                <td></td>
                <td>My Target</td>
                <td>My Message</td>
                <td>Status</td>
            </tr>
        </thead>

        <tbody class="tbody_outbox wire_td_highlighting">
            % for outbox in messages_outbox:
                % if outbox["type"] == "Introduction":
                    ${functions.make_outbox_row(outbox)}
                % endif
            % endfor

            % for friend in messages_outbox:
                % if friend["type"] == "FriendRequest":
                    ${functions.make_outbox_friends_row(friend)}
                %endif
            % endfor
        </tbody>
    </table>

%else:
    <div class="no_outbox_requests clearfix">
        <div class="mag_glass fake_help"></div>
        <div class="no_outbox_info">
            <p>To make a request, perform a search for someone you want to be introducted to.</p>
            <p>To learn more watch this <em>video.</em></p>
            <p>Browse By: <a href="/browse/companies">Companies</a> <a href="/browse/titles">Titles</a> <a href="/browse/regions">Regions</a>
        </div>
    </div>
%endif

<div class="no_outbox_requests_hidden clearfix">
    <div class="mag_glass fake_help"></div>
    <div class="no_outbox_info">
        <p>To make a request, perform a search for someone you want to be introducted to.</p>
        <p>To learn more watch this <em>video.</em></p>
        <p>Browse By: <a href="/browse/companies">Companies</a> <a href="/browse/titles">Titles</a> <a href="/browse/regions">Regions</a>
    </div>
</div>