from .. import SmartView
from pyramid.view import view_config


class Titles(SmartView):
    restrict_access = False
    model_type = "title"


    @view_config(route_name="titles", request_method="GET")
    @view_config(route_name="titles:param", request_method="GET")
    def get(self):
        txt = self.param("param")
        titles = self.titles.autocomplete(txt)
        return self.write(titles)




