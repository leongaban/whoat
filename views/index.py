from . import SmartView
from pyramid.view import view_config


class Home(SmartView):
    restrict_access = False

    @view_config(route_name="index", request_method="GET")
    def get(self):
        if self.authenticated is False:
            return self.redirect("home")
            # return self.redirect("login")
        return self.redirect("dashboard")
        # return self.redirect("home")
        #session = self.session
        #session["mobile"] = True
        #return self.render(contact="RON")