<%inherit file="../master.mak"/>

<%block name="title">
    ${provider}
    Contacts Imported
</%block>

<%block name="head">
    <%include file="../dashboard/includes.mak"/>
</%block>

<%block name="header">
    
</%block>

<%block name="body">
##    <div id="gmail_synced_container">
##        <div class="gmail_synced_message">
##
##            <h1>You have successfully imported ${total} <br/> contacts in from ${provider}!</h1>
##
##            <p class="resolver_comment">Our snazzy resolver will determine the correct number<br> of <strong>total resolved contacts.</strong></p>
##            <p>We define a contact as containing at least a First Name, Last Name and either a Phone Number or Email Address.</p>
##
##            <hr style="margin-top:20px;">
##
##            <div class="gmail_synced_logo_center">
##                <div class="whoat_logo_svg"></div>
##            </div>
##
##            <h2>You can close this window now.</h2>
##
##        </div>
##    </div>

    <script language="javascript">
    
        function updateSyncPage() {
           window.opener.updateGmailStats(${total});
           window.close();
        }

        updateSyncPage();
    </script>
</%block>