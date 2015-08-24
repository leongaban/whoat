from pyramid.view import view_config
from . import APIView


class Domains(APIView):

    @view_config(route_name="api_v1_domain", request_method="GET")
    @view_config(route_name="api_v1_domain:method", request_method="GET")
    @view_config(route_name="api_v1_domain:method:param", request_method="GET")
    def get(self):
        matchdict = self.request.matchdict
        method = matchdict.get("method", None)
        if method is not None:
            param = matchdict.get("param", None)
            if param is None:
                matchdict["method"] = "get"
                matchdict["param"] = method

        return self.process("domain")

    @view_config(route_name="api_v1_domains", request_method="GET")
    @view_config(route_name="api_v1_domains:method", request_method="GET")
    @view_config(route_name="api_v1_domains:method:param", request_method="GET")
    def gets(self):
        matchdict = self.request.matchdict
        method = matchdict.get("method", None)
        if method is not None:
            param = matchdict.get("param", None)
            if param is None:
                matchdict["method"] = "get"
                matchdict["param"] = method
                return self.process("domains")

        if method is None:
            return self.process("domains", "list")
        return self.process("domains")


    @view_config(route_name="api_v1_domain", request_method="POST")
    @view_config(route_name="api_v1_domain:method", request_method="POST")
    def post(self):
        matchdict = self.request.matchdict
        method = matchdict.get("method", None)
        if method is not None:
            param = matchdict.get("param", None)
            if param is None:
                matchdict["method"] = "get"
                matchdict["param"] = method

        return self.process("domain")

    @view_config(route_name="api_v1_domains", request_method="POST")
    @view_config(route_name="api_v1_domains:method", request_method="POST")
    @view_config(route_name="api_v1_domains:method:param", request_method="POST")
    def posts(self):
        method = self.request.matchdict.get("method", None)
        if method is None:
            return self.process("domains", "list")
        return self.process("domains")
