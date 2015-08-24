<%inherit file="master.mak"/>

<%block name="title">Their Requests</%block>

<%block name="head">
    <%include file="dashboard/includes.mak"/>
</%block>

<%block name="header">
    <%include file="dashboard/top_bar.mak"/>
</%block>

<%block name="sidebar">
    <%include file="dashboard/sidebar.mak"/>
</%block>

<%block name="body">
    ## Show FTUE if newbie
    <%include file="modals/tour.mak"/>
    <div class="overlay"></div>

    <article id="contentWrapper" role="main">
        <section id="content">
            <%include file="messages/inbox_list.mak"/>
        </section>
    </article>
</%block>

<%block name="footer">
    <%include file="dashboard/footer.mak"/>
</%block>
