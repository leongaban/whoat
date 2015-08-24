<%namespace file="functions.mak" name="functions"/>

<section class="widget intro_outbox_list orange_widget">
    <div class="widget_lid">
        <div class="white_outbox_icon"></div>
        <h2>My Requests</h2>
        %if messages_outbox_total == 0:
            <h4>You haven't requested any intros</h4>
        %else:
            <div class="default_outbox_count">
                <h4 class="goto_outbox">Viewing <em class="viewing_outbox_num">${len(messages_outbox)}</em> of <em class="viewing_outbox_total">${messages_outbox_total}</em></h4>
            </div>
            <div class="fetch_outbox_count"></div>
        %endif
        <div class="minimize"></div>
    </div>

    <section id="my_requests" class="module">
        <div class="widget_content">

            <div class="default_outbox_list">
                %if messages_outbox:
                    <table class="the_outbox_table">
                        <thead>
                             <tr>
                                <td></td>
                                <td>My Prospect</td>
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
                            ##<p>To learn more watch this <em>video.</em></p>
                            <p>Browse By: <a href="/view/companies">Companies</a> <a href="/view/titles">Titles</a> <a href="/view/regions">Regions</a>
                        </div>
                    </div>
                %endif

                <div class="no_outbox_requests_hidden clearfix">
                    <div class="mag_glass fake_help"></div>
                    <div class="no_outbox_info">
                        <p>To make a request, perform a search for someone you want to be introducted to.</p>
                        ##<p>To learn more watch this <em>video.</em></p>
                        <p>View All: <a href="/view/companies">Companies</a> <a href="/view/titles">Titles</a> <a href="/view/regions">Regions</a>
                    </div>
                </div>

            </div>

            <div class="loading_next_box">
                <img src="/static/img/utility/loading-bubbles.svg" width="64" height="64" />
            </div>
            
            <div class="fetch_next_outbox_list"></div>

        </div>
    </section>

</section>