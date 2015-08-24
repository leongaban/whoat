from . import SmartView
from pyramid.view import view_config


class Home(SmartView):
    restrict_access = False

    @view_config(route_name="home", request_method="GET")
    def get(self):
        # 2/0
        dic = {}
        member = self.member
        dic['member'] = member
        return self.render(dic)

    @view_config(route_name="home", request_method="POST")
    def post(self):
        return self.render()


class Terms(SmartView):
    template = "website/terms.mak"

    @view_config(route_name="terms", request_method="GET")
    def get(self):
        return self.render()