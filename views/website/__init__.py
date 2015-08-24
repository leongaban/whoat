from .. import SmartView
from pyramid.view import view_config


class About(SmartView):
    restrict_access = False
    template = "website/about.mak"

    @view_config(route_name="about", request_method="GET")
    def get(self):
        dic = {}
        return self.render(dic)

class FAQ(SmartView):
    restrict_access = False
    template = "website/faq.mak"

    @view_config(route_name="faq", request_method="GET")
    def get(self):
        dic = {}
        return self.render(dic)


class NoIE8(SmartView):
    restrict_access = False
    template = "website/no_ie8.mak"

    @view_config(route_name="noie8", request_method="GET")
    def get(self):
        dic = {}
        return self.render(dic)