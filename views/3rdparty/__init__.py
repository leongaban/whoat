from .. import SmartView
from pyramid.view import view_config


class recruit_military(SmartView):
    template = "recruitmilitary/index.mak"

    @view_config(route_name="recruitmilitary", request_method='GET')
    def recruitmilitary(self):
        dic = {}
        return self.render(dic)


class perspectives_14(SmartView):
    template = "perspectives14/index.mak"

    @view_config(route_name="perspectives14", request_method='GET')
    def perspectives14(self):
        dic = {}
        return self.render(dic)