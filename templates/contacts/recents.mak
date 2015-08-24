<%namespace file="functions.mak" name="functions"/>

<%inherit file="../master.mak"/>

<%block name="title">Recent Searches</%block>

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

<%block name="modals">
    <%include file="../modals/intro_vcard.mak"/>
</%block>

<%block name="body">
    <article id="contentWrapper" role="main">
        <section id="content">

            <%block name="search_results">
                <div class="widget_msg"><p></p><div class="close_widget_msg"></div></div>

                <section class="widget intro_outbox orange_widget">
                    <div class="widget_lid">
                        <h2>
                            %if len(recents) < 100:
                                ${len(recents)}
                            %endif
                            Most Recent Searches
                        </h2>
                    </div>

                    <section id="search_results" class="module">

                        <div class="widget_content">
                            <table class="recent_results">
                                <thead>
                                     <tr>
                                        <td>Search Term</td>
                                        <td style="text-align:right;">When</td>
                                    </tr>
                                </thead>

                                <tbody>
                                    %if recents > 0:
                                        % for term in recents:
                                            ${functions.make_recent_row(term)}
                                        % endfor
                                    %endif
                                </tbody>
                            </table>
                        </div>

                    </section>
                </section>
            </%block>

        </section>
    </article>
</%block>

<%block name="footer">
    <%include file="../dashboard/footer.mak"/>
</%block>
