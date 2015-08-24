from fusion import tools
from . import SmartView
from pyramid.view import view_config


class Onboard(SmartView):

    @view_config(route_name="onboard", request_method='GET')
    @view_config(route_name="onboard/", request_method='GET')
    def get(self):
        token = self.param("auth")
        if token is not None:
            member = self.ctx.members.eval_auth_token(token)
            if member is not None:
                self.session.impersonate(member)

        template = Onboard.Desktop
        return self.render(template)

    @view_config(route_name="onboard", request_method='POST')
    @view_config(route_name="onboard/", request_method='POST')
    def post(self):
        member = self.member
        template = Onboard.Desktop

        password = self.request.POST["password"]
        confirm_password = self.request.POST["confirm_password"]
        if password != confirm_password:
            return self.render(template, value={"message": "Error - the passwords don't match!"})
        self.members.force_change_password(member=member, password=password)
        return self.render(template, value={"message": "success"})