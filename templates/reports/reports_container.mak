##<%namespace file="functions.mak" name="functions"/>

<%inherit file="../master.mak"/>

<%block name="title">Reports</%block>

<%block name="head">
    <%include file="includes.mak"/>
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
        <section id="content">
            <%include file="reports_widgets.mak"/>
        </section>
    </article>
</%block>

<%block name="footer">
    <%include file="../dashboard/footer.mak"/>
</%block>