<%namespace file="functions.mak" name="functions"/>

<%inherit file="../master.mak"/>

<%block name="title">Sync Contacts</%block>

<%block name="head">
    <%include file="../dashboard/includes.mak"/>
</%block>

<%namespace file="functions.mak" name="functions"/>

<%block name="header">
    <div class="notification_container"></div>
    <%include file="../dashboard/top_bar.mak"/>
</%block>

<%block name="sidebar">
    <%include file="../dashboard/sidebar.mak"/>
</%block>

<%block name="body">
    <article id="contentWrapper" role="main">
        <section id="content" class="sync_page">

            <%block name="my_contact">
                <div class="widget_msg">
                    <p></p><div class="close_widget_msg"></div>
                </div>

                <section id="sync_your_contacts" class="widget intro_outbox orange_widget">
                    <div class="widget_lid">
                        <h2>Sync Your Contacts</h2>
                    </div>

                    <div class="widget_content">
                        <p>We <strong>don't</strong> download your calendar, notes, emails or any other data besides contacts.<br/> If you add additional contacts to your exchange, please re-sync with Who@.</p>

                        <div class="sync_streams clearfix">
                            <ul>
                                <li>
                                    <div class="mobile_sync_row stream_row">
                                        %if len([stream for stream in streams if stream["type"] == "Device"]) > 0:
                                            % for stream in streams:
                                                %if stream["type"] == "Device":
                                                    %if stream["device"] == "iPhone":
                                                        <div class="stream_type_device goto_itunes">
                                                            <div class="iphone_logo"></div>
                                                        </div>
                                                    %else:
##                                                        <div class="stream_type_device goto_itunes">
##                                                            <div class="android_logo"></div>
##                                                        </div>
                                                    %endif
                                                %endif
                                            % endfor
                                        %else:
                                        %endif

                                        <div class="iphone_stats stream_stats remove_left_margin">

                                            %if len([stream for stream in streams if stream["type"] == "Device"]) > 0:
                                                % for stream in streams:
                                                    %if stream["type"] == "Device":
                                                        <table class="snarfed_table">
                                                            <thead>
                                                                <tr>
                                                                    <th>Device:</th>
                                                                    <th>Name:</th>
                                                                    <th>Last Sync:</th>
                                                                    <th title="Contacts with full name and a phone or email">Resolved Contacts: <div class="td_help"></div></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>
                                                                        <div class="stat_box">${stream["device"]}</div>
                                                                    </td>

                                                                    <td>
                                                                        <div class="stat_box">${stream["label"]}</div>
                                                                    </td>

                                                                    <td>
                                                                        <div class="stat_box">${stream["last_sync"]}</div>
                                                                    </td>

                                                                    <td>
                                                                        <div class="stat_box">${stream["contacts"]["unique"]}</div>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                     %endif
                                                % endfor

                                            %else:
                                                <div class="no_mobile_synced">
                                                    <p>You haven't synced a mobile device.</p>

                                                    <div class="apple_store_logo goto_itunes"></div>
                                                    <div class="app_button">
##                                                        <section>
##                                                            <div class="android_store_logo"></div>
##                                                        </section>
                                                    </div>
                                                </div>
                                            %endif

                                        </div>
                                    </div>
                                </li>

                                <li class="the_exchange_li">
                                    <div class="exchange_sync_row stream_row">
                                        <div class="stream_type">
                                            <div class="exchange_logo start_exchange_snarf"></div> <em>Exchange</em>
                                        </div>
                                        <div class="exchange_stats stream_stats">
                                            %if len([stream for stream in streams if stream["type"] == "Exchange"]) > 0:
                                                %for stream in streams:
                                                    %if stream['type'] == "Exchange":
                                                        <table class="snarfed_table">
                                                            <thead>
                                                                <tr>
                                                                    <th>Username:</th>
                                                                    <th>Last Sync:</th>
                                                                    <th>Resolved Contacts:
                                                                        <div class="td_help">
                                                                            <div class="help_bubble">
                                                                                Contacts with full name and a phone or email
                                                                            </div>
                                                                        </div>
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>
                                                                        <div class="stat_box">${stream["account"]}</div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="stat_box">${stream["last_sync"]}</div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="stat_box">${stream["contacts"]["unique"]}</div>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    %endif
                                                %endfor

                                            %else:

                                            %endif
                                        </div>
                                        <div class="sync_plus start_exchange_snarf"></div>
                                    </div>
                                </li>

                                <li class="ajax_exchange_row">
                                    <div id="temp_row_exchange"></div>
                                </li>

                                <li class="the_gmail_li">
                                    <div class="gmail_sync_row stream_row">
                                        <div class="stream_type">
                                            <div class="gmail_logo start_sync_gmail"></div> <em>Gmail</em>
                                        </div>
                                        <div class="gmail_stats stream_stats">
                                            %if len([stream for stream in streams if stream["type"] == "Gmail"]) > 0:
                                                %for stream in streams:
                                                    %if stream['type'] == "Gmail":
                                                        <table class="snarfed_table">
                                                            <thead>
                                                                <tr>
                                                                    <th>Username:</th>
                                                                    <th>Last Sync:</th>
                                                                    <th>Resolved Contacts:
                                                                        <div class="td_help">
                                                                            <div class="help_bubble">
                                                                                Contacts with full name and a phone or email
                                                                            </div>
                                                                        </div>
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>
                                                                        <div class="stat_box">${stream["account"]}</div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="stat_box">${stream["last_sync"]}</div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="stat_box">${stream["contacts"]["unique"]}</div>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    %endif
                                                %endfor
                                                
                                            %else:
                                                
                                            %endif
                                        </div>
                                        <div class="sync_plus start_sync_gmail"></div>
                                    </div>
                                </li>

                                <li class="ajax_gmail_row">
                                    <div id="temp_row_gmail"></div>
                                </li>

                                <li>
                                    <div class="hotmail_sync_row stream_row">
                                        <div class="stream_type">
                                            <div class="hotmail_logo"></div> <em>HotMail</em><p>(Outlook.com)</p>
                                        </div>

                                        <div class="hotmail_stats stream_stats">
                                            <div class="coming_soon">Coming soon</div>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <div class="yahoo_sync_row stream_row">
                                        <div class="stream_type">
                                            <div class="yahoo_logo"></div> <em>Yahoo!</em>
                                        </div>

                                        <div class="yahoo_stats stream_stats">
                                            <div class="coming_soon">Coming soon</div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                </section>
            </%block>

        </section>
    </article>

    <script language="javascript">

        function wireGmailButton() {
            // Start Sync Gmail
            $('.start_sync_gmail').unbind('click').bind('click', function () {
                var url = "/connect/gmail";
                // var url = "/start/gmail";
                var windowName = "popUp";
                var windowSize = "width=600, height=540";
                var win = window.open(url, windowName, windowSize);
                win.focus();
                document.title = 'Who@ Gmail Snarf';
                event.preventDefault();

                WHOAT.notify.topNotify('success', 'Connecting to Google, please be patient.');
            });
        }

        function updateGmailStats(total) {

            // For /Sync page
            $('.the_gmail_li').hide();
            $.get("/get/gmail/stats", function(data) {
                $("#temp_row_gmail").html(data);
                $('.ajax_gmail_row').fadeIn('fast');
                WHOAT.contacts.wireSyncContacts();
            });

            // setTimeout(function() {
            //     location.reload();
            // }, 1);
        }

        wireGmailButton();
    </script>

</%block>

<%block name="footer">
    <%include file="../dashboard/footer.mak"/>
</%block>