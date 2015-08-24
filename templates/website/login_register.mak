<%inherit file="../master.mak"/>

<%block name="title">Who@ A new and private way of leveraging your contacts to expand your business.</%block>

<%block name="head">
    <%include file="includes.mak"/>
</%block>

<%block name="header">

</%block>

<%block name="body">

	<div class="register_container">
		
		<div class="register_box" data-tab-type="${tab}">

			<div class="center_logo">
				<a href="/" title="Who@"><div class="whoat_logo"></div></a>
			</div>

			<div class="orange_border"></div>

			<div class="login_tab">
				<span class="on_login_tab">
					<ul>
						<li id="tab_login" class="login_selected">Login</li>
						<li id="tab_register" class="register_unselected"><span>Register</span></li>
					</ul>
				</span>

				<span class="on_register_tab">
					<ul>
						<li id="tab_login" class="login_unselected"><span>Login</span></li>
						<li id="tab_register" class="register_selected">Register</li>
					</ul>
				</span>
			</div>

			## LOGIN
			<div id="login_form">
                <form class="login_form" action="" method="post">

					<input type="text"
						   id="login_input_email" value="email" name="username"
						   onblur="if (this.value == '') {this.value = 'email';}"
						   onfocus="if (this.value == 'email') {this.value = '';}"
						   autocomplete="off"/>

					<div class="tip_error_message" id="error_login_email">
						<span class="error_email_span">A valid email is required</span> <div class="x"></div>
					</div>

					<input type="password"
						   id="login_input_password"
						   name="password"
						   placeholder="Password"
						   autocomplete="off"/>

					<div class="tip_error_message" id="error_login_password">
						<span class="error_password_span">A valid email is required</span> <div class="x"></div>
					</div>

                    <a href="/forgot/password" id="forgot-your-password">Forgot your password?</a>
                    <button id="login_page_submit" type="submit">login</button>

                    %if 'bounce' in obj:
                        <input type="hidden" id="bounce" name="bounce" value='${obj["bounce"]}' autocomplete="off"/>
                    %endif

                </form>
			</div>

			## REGISTER
			<div id="register_form">

				<!-- <div id="freemail_warning">We suggest using a business email to get the most out of Who@</div> -->
				
				<form class="register-form go-bottom" action="" method="post">

##                  USERNAME / EMAIL
                    %if 'email' in obj and obj['email'] is not None:
                        <input type="text" id="register_email"
						   name="register_email" onblur="if (this.value == '') {this.value = '${obj["email"]}';}" onfocus="if (this.value == '${obj["email"]}') {this.value = '';}" maxlength="255"
						   value="${obj['email']}" autocomplete="off"/>
                    %else:
                        <input type="text" id="register_email"
						   name="register_email" onblur="if (this.value == '') {this.value = 'Business email (preferred)';}" onfocus="if (this.value == 'Business email (preferred)') {this.value = '';}" maxlength="255"
						   value="Business email (preferred)" autocomplete="off"/>
                    %endif

                    <div id="register_input_error">
                    	<div id="input_error_message">Email already registered</div>
                    </div>

                    <div class="tip-register_email" id="register-error-email"><span></span></div>

                    <div class="tip-register_password" id="register-error-password"><span></span></div>

						<!-- <div class="email-tip-icon"><img src="/assets/img/public/question-icon.png" alt="?"/></div> -->
						<!-- <div class="tip-message" id="message-email"><span>We recommend a valid work email</span></div>
						<div class="tip-error-message" id="error-email"><span>A valid email is required</span></div> -->

##					FIRST NAME
                    %if 'email' in obj and obj['email'] is not None:
                        <input type="text" id="register_firstname"
						   name="register_first_name" onblur="if (this.value == '') {this.value = '${obj['first_name']}';}" onfocus="if (this.value == '${obj['first_name']}') {this.value = '';}"
						   value="${obj['first_name']}" autocomplete="off"/>
                    %else:
                        <input type="text" id="register_firstname"
						   name="register_first_name" onblur="if (this.value == '') {this.value = 'First name';}" onfocus="if (this.value == 'First name') {this.value = '';}"
						   value="First name" autocomplete="off"/>
                    %endif

##					LAST NAME
                    %if 'email' in obj and obj['email'] is not None:
                        <input type="text" id="register_lastname"
						   name="register_last_name" onblur="if (this.value == '') {this.value = '${obj['last_name']}';}" onfocus="if (this.value == '${obj['last_name']}') {this.value = '';}"
						   value="${obj['last_name']}" autocomplete="off"/>
                    %else:
                        <input type="text" id="register_lastname"
						   name="register_last_name" onblur="if (this.value == '') {this.value = 'Last name';}" onfocus="if (this.value == 'Last name') {this.value = '';}"
						   value="Last name" autocomplete="off"/>
                    %endif

##                  ORIGINAL
                    %if 'original' in obj and obj['original'] is not None:
                        <input type="hidden" id="register_original"
						   name="register_original" value="${obj['original']}" autocomplete="off"/>
                    %endif

##                  SOURCE
                    %if 'source' in obj and obj['source'] is not None:
                        <input type="hidden" id="register_source"
						   name="register_source" value="${obj['source']}" autocomplete="off"/>
                    %endif

##					PASSWORD
					<input type="password" id="register_password"
						   name="register_password" placeholder="Password (6 characters min)" autocomplete="off"/>

						##<div class="password-tip-icon"><img src="/assets/img/public/question-icon.png" alt="?"/></div>
						##<div class="tip-message" id="message-password"><span>Minimum 6 Characters</span></div>
						##<div class="tip-register_password" id="register-error-password"><span></span></div>
	
					<a href="/forgot/password" id="forgot-your-password2">Forgot your password?</a>
					<button type="submit" id="the_register_button">register</button>					
				</form>

			</div>

			<div class="mini_footer">
				<ul>
					<li><a href="/terms" target="_blank" title="read our terms and conditions">terms</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="/terms#privacypolicy" target="_blank" title="read our privacy policy">privacy</a></li>
					<li>Copyright &copy; <script>document.write(new Date().getFullYear())</script> WhoAt LLC.</li>
					<li>All rights reserved.</li>
				</ul>
			</div>

		</div>

	</div>

</%block>

<%block name="footer"></%block>