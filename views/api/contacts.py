from pyramid.view import view_config
from . import APIView


class Contacts(APIView):
    @view_config(route_name="api_v1_contact", request_method="GET")
    @view_config(route_name="api_v1_contact:method", request_method="GET")
    @view_config(route_name="api_v1_contact:method:param", request_method="GET")
    def get(self):
        matchdict = self.request.matchdict
        method = matchdict.get("method", None)
        if method is not None:
            param = matchdict.get("param", None)
            if param is None:
                matchdict["method"] = "get"
                matchdict["param"] = method

        return self.process("contact")

    @view_config(route_name="api_v1_contacts", request_method="GET")
    @view_config(route_name="api_v1_contacts:method", request_method="GET")
    @view_config(route_name="api_v1_contacts:method:param", request_method="GET")
    def gets(self):
        method = self.request.matchdict.get("method", None)
        if method is None:
            return self.process("contacts", "list")
        return self.process("contacts")


    @view_config(route_name="api_v1_contact", request_method="POST")
    @view_config(route_name="api_v1_contact:method", request_method="POST")
    def post(self):
        return self.process("contact")

    @view_config(route_name="api_v1_contacts", request_method="POST")
    @view_config(route_name="api_v1_contacts:method", request_method="POST")
    @view_config(route_name="api_v1_contacts:method:param", request_method="POST")
    def posts(self):
        method = self.request.matchdict.get("method", None)
        if method is None:
            return self.process("contacts", "list")
        return self.process("contacts")
