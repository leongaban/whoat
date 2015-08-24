<section id="sidebar">
    <div class="sidebar_border_fix">
        <div id="user_badge">
            <div class="profile_pic go_to_profile">
                %if 'avatar' in member and member['avatar'] is not None:
                    <img src="${member['avatar']}" title="Hi ${member['label']}!" alt=""/>
                %else:

                %endif
            </div>

            <ul id="user_details">
                <li class="user_name go_to_profile">
                    ${member['label']}
                </li>

                <li class="user_title">
                    %if 'title' in member and member['title'] is not None:
                        ${member['title']}
                    %else:

                    %endif
                </li>

                <li class="user_company">
                    %if 'organization' in member and member['organization'] is not None:
                        ${member['organization']}
                    %else:

                    %endif
                </li>
            </ul>
        </div>

        <div id="dashboard_sidebar_menu">

            <div class="dash-btn outbox_sidebar_btn">
                <div class="outbox_icon goto_outbox" title="Outbox"></div>

                <span class="request_label goto_outbox ipad_hide">
                    My Requests
                </span>

                % if badges['outbox_unread'] > 0:
                    <div class="badge_help">Unread outbox messages</div>
                    <div class="outbox_badge badge">${badges['outbox_unread']}</div>
                    <div class="fetch_outbox_badge"></div>
                    <script>WHOAT.dashboard.home.outbox.reWireOutboxUnread();</script>
                %endif
            </div>

            <div class="dash-btn inbox_sidebar_btn">
                <div class="inbox_icon goto_inbox" title="Inbox"></div>

                <span class="request_label goto_inbox ipad_hide">
                    Their Requests
                </span>

                % if badges['inbox_unread'] > 0:
                    <div class="badge_help">Unread inbox messages</div>
                    <div class="inbox_badge badge">${badges['inbox_unread']}</div>
                    <div class="fetch_inbox_badge"></div>
                    <script>WHOAT.dashboard.home.inbox.reWireInboxUnread();</script>
                %endif
            </div>

            <div class="dash-btn alerts_sidebar_btn">
                <div class="alerts_icon" title="Alerts"></div>

                <span class="request_label ipad_hide">
                    My Alerts
                </span>
            </div>

            <div class="dash-btn reports_sidebar_btn">
                <div class="reports_icon" title="Reports"></div>
                <span class="whoat-report">Reports</span>
            </div>

            %if len(recent) > 0:
                <div class="recent_searches">
                    <ul>
                        <li class="title">
                            <a href="/recent">Recent Searches</a>
                        </li>
                        %for search in recent:
                            %if 'alias' in search:
                                <li>
                                    <a href="/search/${search['term']}/${search['alias']}">
                                        ${search['alias']}
                                    </a>
                                </li>
                            %elif 'term' in search:
                                <li>
                                    <a href="/search/${search['term']}">${search['term']}</a>
                                </li>
                            %endif
                        %endfor
                    </ul>
                </div>
            %else:

            %endif

            <a class="bookmarklet" href='javascript:d=""+(window.getSelection?window.getSelection():document.getSelection?document.getSelection():document.selection.createRange().text);d=d.replace(/\r\n|\r|\n/g," ,");if(!d)d=prompt("Enter search term:", "");if(d!=null)location="https://whoat.net/search/"+escape(d).replace(/ /g,"+");void(0);' title="Who@ Search"><div class="bookmark_gray">Who@ Search</div></a>

            <div class="bookmark_help">
                ##<div class="blue_question"></div>
                <p>Drag Bookmark Tool to your bookmarks.</p>
            </div>

##            <a class="bookmarklet sidebar_bookmark_small" href='javascript:d=""+(window.getSelection?window.getSelection():document.getSelection?document.getSelection():document.selection.createRange().text);d=d.replace(/\r\n|\r|\n/g," ,");if(!d)d=prompt("Enter search term:", "");if(d!=null)location="https://whoat.net/search/"+escape(d).replace(/ /g,"+");void(0);' title="Who@ Search">
##            <div class="bookmark_icon">Who@ Search</div></a>
            
        </div>
    </div>
</section>