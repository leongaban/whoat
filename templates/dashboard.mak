<%inherit file="master.mak"/>

<%block name="title">
    %if snarfed is False:
        Who@ Tour
    %else:
        Who@ Dashboard
    %endif
</%block>

<%block name="head">
    <%include file="dashboard/includes.mak"/>
</%block>

<%block name="body">

    <div class="white_cover"></div>

    <%include file="dashboard/dash.mak"/>

    <article id="contentWrapper" role="main" class="main_dash">
        <section id="content">
            <%include file="dashboard/load_widgets.mak"/>
        </section>
    </article>

</%block>

<%block name="footer">
    <%include file="dashboard/footer.mak"/>
</%block>