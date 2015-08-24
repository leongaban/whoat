from pyramid.view import view_config
from . import APIView


class Admin(APIView):

    @view_config(route_name="api_v1_admin", request_method="GET")
    @view_config(route_name="api_v1_admin:method", request_method="GET")
    @view_config(route_name="api_v1_admin:method:param", request_method="GET")
    def get(self):
        return self.process("admin")

    @view_config(route_name="api_v1_admins", request_method="GET")
    @view_config(route_name="api_v1_admins:method", request_method="GET")
    @view_config(route_name="api_v1_admins:method:param", request_method="GET")
    def gets(self):
        method = self.request.matchdict.get("method", None)
        if method is None:
            return self.process("admins", "list")
        return self.process("admins")


    @view_config(route_name="api_v1_admin", request_method="POST")
    @view_config(route_name="api_v1_admin:method", request_method="POST")
    def post(self):
        return self.process("admin")

    @view_config(route_name="api_v1_admins", request_method="POST")
    @view_config(route_name="api_v1_admins:method", request_method="POST")
    @view_config(route_name="api_v1_admins:method:param", request_method="POST")
    def posts(self):
        method = self.request.matchdict.get("method", None)
        if method is None:
            return self.process("admins", "list")
        return self.process("admins")
