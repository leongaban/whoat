from .. import SmartView
from pyramid.view import view_config
# from www.engine import tools


class ForgotPassword(SmartView):
    restrict_access = False
    template = "website/forgot_password.mak"

    @view_config(route_name="forgot_password", request_method="GET")
    def get(self):
        context = {'view': 'forgot_password'}

        #grab the user name if it is in the session
        if 'username' in self.request.session:
            username = self.request.session['username']
            context['username'] = username

        return self.render(context)

    @view_config(route_name="forgot_password", request_method='POST')
    def postForgotPassword(self):

        try:
            reset_email = self.param("reset_email")

            if self.members.get(reset_email) is None:
                message = {'result': 'error', 'message': 'That email is not registered'}
                return self.emit_json(message)

            else:
                self.members.request_password_reset(member=reset_email)
                message = {'result': 'success', 'message': 'A reset password email has been sent to '+reset_email+'!'}
                return self.emit_json(message)

        except Exception, err:
            print err

            message = {'result': 'error', 'message': err}
            return self.emit_json(message)


class ResetPassword(SmartView):
    restrict_access = False
    template = "website/forgot_password.mak"

    @view_config(route_name="reset_password", request_method="GET")
    def get(self):
        context = {'view': 'reset_password'}

        return self.render(context)

    @view_config(route_name="reset_password", request_method='POST')
    def postResetPassword(self):

        try:
            password, repeatPassword, hotlink = self.param("resetPass1"), self.param("resetPass2"), self.param("hotlink")

            if password != repeatPassword:

                message = {'result': 'error', 'message': 'The password and repeat password must match.'}
                return self.emit_json(message)

            if hotlink is None:
                message = {'result': 'error', 'message_expired': 'This password reset email link has already been used.  Please request another password change if needed.'}
                return self.emit_json(message)

            token = hotlink
            hotlink = self.hotlinks.execute(token, password=password)
            self.ctx.query("DELETE FROM hotlink WHERE ID=@id;", id=hotlink.id).update()

            message = {'result': 'success', 'message': 'Your password has been reset!'}
            return self.emit_json(message)

        except Exception, err:
            print err
            message = {'result': 'error', 'message_expired': 'The reset password request has expired. Please make a new request.'}
            return self.emit_json(message)