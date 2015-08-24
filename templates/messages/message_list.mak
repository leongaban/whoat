<%inherit file="../master.mak"/>

<%block name="title">
    %if 'message_type' in type and type['message_type'] == 'outbox':
        My Requests
    %elif 'message_type' in type and type['message_type'] == 'inbox':
        Their Requests
    %endif
</%block>

<%block name="head">
    <%include file="../dashboard/includes.mak"/>
</%block>

<%block name="header">
    <%include file="../dashboard/top_bar.mak"/>
</%block>

<%block name="sidebar">
    <%include file="../dashboard/sidebar.mak"/>
</%block>

<%block name="body">
    <article id="contentWrapper" role="main">
        <section id="content">
            %if 'message_type' in type and type['message_type'] == 'outbox':
                <%include file="outbox_list.mak"/>
            %elif 'message_type' in type and type['message_type'] == 'inbox':
                <%include file="inbox_list.mak"/>
            %endif
        </section>
    </article>
</%block>

<%block name="footer">
    <%include file="../dashboard/footer.mak"/>
</%block>