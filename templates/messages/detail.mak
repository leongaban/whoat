<%inherit file="../master.mak"/>

<%block name="title">${message["subject"]}</%block>

<%block name="head">
    <%include file="../dashboard/includes.mak"/>
</%block>

<%block name="header">
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

            % if 'inbox' in message['view']:
                <%include file="inbox_details.mak"/>
            % elif 'outbox' in message['view']:
                <%include file="outbox_details.mak"/>
            % endif

        </section>
    </article>

</%block>

<%block name="footer">
    <%include file="../dashboard/footer.mak"/>
</%block>