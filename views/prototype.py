from . import SmartView
from pyramid.view import view_config


class Prototype(SmartView):

    @view_config(route_name="prototype", request_method="GET")
    def get(self):
        return self.render()