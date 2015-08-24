from fusion.api.errors import *
from pyramid.view import view_config
from . import APIView


class Members(APIView):

    @view_config(route_name="api_v1_member", request_method="GET")
    @view_config(route_name="api_v1_member:method", request_method="GET")
    @view_config(route_name="api_v1_member:method:param", request_method="GET")
    def get(self):
        method = self.request.matchdict.get("method", None)
        if method is not None and method.lower() == "login":
            ex = ServiceNotFoundException("The requested service does not support get requests.")
            return self.emit_json(ex)

        return self.process("member")

    @view_config(route_name="api_v1_members", request_method="GET")
    @view_config(route_name="api_v1_members:method", request_method="GET")
    @view_config(route_name="api_v1_members:method:param", request_method="GET")
    def gets(self):
        method = self.request.matchdict.get("method", None)
        if method is None:
            return self.process("members", "list")
        if method.lower() == "login":
            ex = ServiceNotFoundException("The requested service does not support get requests.")
            return self.emit_json(ex)

        return self.process("members")


    @view_config(route_name="api_v1_member", request_method="POST")
    @view_config(route_name="api_v1_member:method", request_method="POST")
    def post(self):
        return self.process("member")

    @view_config(route_name="api_v1_members", request_method="POST")
    @view_config(route_name="api_v1_members:method", request_method="POST")
    @view_config(route_name="api_v1_members:method:param", request_method="POST")
    def posts(self):
        method = self.request.matchdict.get("method", None)
        if method is None:
            return self.process("members", "list")
        return self.process("members")
