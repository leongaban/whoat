from . import SmartView
from pyramid.view import view_config


class Logout(SmartView):
    restrict_access = False

    @view_config(route_name="logout", request_method="GET")
    def get(self):
        self.logout()
        return self.redirect("home")

    @view_config(route_name="logout", request_method="POST")
    def post(self):
        self.logout()
        return self.redirect("home")