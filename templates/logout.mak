<%inherit file="master.mak"/>

<%block name="title">Who@ Logged Out</%block>

<%block name="head">

</%block>

<%block name="header">
    You have been logged out.
    <form id="form" action="login" method="GET">
        <input type="text" name="username" id="username" value='' />
        <input type="password" name="password" id="password" value='' />
        <input type="submit" value="submit" />
    </form>
</%block>