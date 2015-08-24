<%inherit file="../master.mak"/>

<%block name="title">
    %if context['view'] is 'forgot_password':
        Forgot your password?
    %else:
        Reset your password
    %endif
</%block>

<%block name="head">
    <%include file="includes.mak"/>
</%block>

<%block name="header">

</%block>

<%block name="body">

	<div class="register_container">
        
        <div class="register_box">

            <div class="center_logo">
                <a href="/" title="Who@"><div class="whoat_logo"></div></a>
            </div>

            %if context['view'] is 'forgot_password':

                <div id="forgot_password_error" class="close_error">
                    <p class="forgot_password_error_msg">That email is not registered</p> <div class="x close_error"></div>
                </div>

                <div id="forgot_password">

                    <div class="forgot_form_box">
                        <form id="forgot-form" action="" method="post">
                            <input type="email" id="reset_email" tabindex="1" name="email" onblur="if (this.value == '') {this.value = 'email to reset password';}" onfocus="if (this.value == 'email to reset password') {this.value = '';}" value="email to reset password" placeholder="">

                            <a href="/login" tabindex="3">&lt; Back to login</a>
                            <button type="submit" id="btn_forgot_password" tabindex="2">submit</button>

                            <div id="forgot-password-background"></div>
                        </form>
                    </div>
                </div>
            %else:
                <div id="forgot_password_error" class="close_error">
                    <p class="forgot_password_error_msg">That email is not registered</p> <div class="x close_error"></div>
                </div>

                <div id="reset_password">

                    <div class="forgot_form_box">

                        <header>
                            <h1>Choose a new password</h1>
                            <p>Use 6 characters or more</p>
                        </header>
    
                        <form id="reset-form" action="" method="post">
                            <input type="password"
                               id="reset-password-input"
                               name="resetPass1" onblur="if (this.value == '') {this.placeholder = 'password';}" onfocus="if (this.placeholder == 'password') {this.placeholder = '';}"
                               placeholder="password"/>

                            <input type="password"
                               id="reset-password-input2"
                               name="resetPass2" onblur="if (this.value == '') {this.placeholder = 'repeat password';}" onfocus="if (this.placeholder == 'repeat password') {this.placeholder = '';}"
                               placeholder="repeat password"/>

                            <button type="submit" id="submit-to-reset">submit</button>

                            <div id="reset-form-background"></div>
                        </form>
                    </div>

                </div>
            %endif

        </div>

    </div>

</%block>

<%block name="footer">
    <%include file="../dashboard/footer.mak"/>
</%block>