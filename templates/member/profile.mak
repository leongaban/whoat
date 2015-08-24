<%inherit file="../master.mak"/>

<%block name="title">Edit Your Profile</%block>

<%block name="head">
    <%include file="../dashboard/includes.mak"/>
</%block>

<%namespace file="../messages/functions.mak" name="functions"/>

<%block name="header">
    <div class="notification_container"></div>
    <%include file="../dashboard/top_bar.mak"/>
</%block>

<%block name="sidebar">
    <%include file="../dashboard/sidebar.mak"/>
</%block>

<%block name="modals">
    <div class="reset_password_modal">
        <form id="update_pass_form" action="" method="post" novalidate>
            <section>
                <h1>Reset Password</h1>
                <ul>
                    <li><label>Current Password</label></li>
                    <li><input type="password" id="reset_current_password" name="currentpassword" value="" placeholder="enter your current password" autocomplete="off"/></li>

                    <li><label>New Password*</label></li>
                    <li><input type="password" id="reset_new_password1" name="newpassword" value="" placeholder="enter a new password" autocomplete="off"/></li>

                    <li><label>Repeat New Password*</label></li>
                    <li><input type="password" id="reset_new_password2" name="newpasswordagain" value="" placeholder="enter your current password" autocomplete="off"/></li>
                </ul>

                <div class="reset_modal_footer">
                    <div class="close_reset_pass_modal">Cancel</div>
                    <button class="btn reset_pass_btn">reset password</button>
                </div>
            </section>
        </form>
    </div>

    <div class="make_primary_email">
        <form id="make_primary_form" action="" method="post" novalidate>
            <section>
                <h1>Change Primary Email</h1>
                <ul>
                    <li><label>Confirm New Primary Email/Username</label></li>
                    <li><input type="text" id="confirm_primary_email" name="confirmprimaryemail" value="" autocomplete="off"/></li>

                    <li><label>Password</label></li>
                    <li><input type="password" id="enter_current_password" name="entercurrentpassword" value="" placeholder="enter your current password" autocomplete="off"/></li>
                </ul>

                <div class="reset_modal_footer">
                    <div class="close_make_primary_modal">Cancel</div>
                    <button class="btn make_primary_btn">change primary</button>
                </div>
            </section>
        </form>
    </div>
</%block>

<%block name="body">
    <article id="contentWrapper" role="main">
        <section id="content" class="profile_widget">
            <%include file="edit_profile.mak"/>
        </section>
    </article>
</%block>

<%block name="footer">
    <%include file="../dashboard/footer.mak"/>
</%block>