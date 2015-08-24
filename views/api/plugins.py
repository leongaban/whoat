from fusion.api.errors import *
from pyramid.view import view_config
from . import APIView


class Members(APIView):

    @view_config(route_name="api_v1_plugin", request_method="GET")
    @view_config(route_name="api_v1_plugin:method", request_method="GET")
    @view_config(route_name="api_v1_plugin:method:param", request_method="GET")
    def get(self):
        #method = self.request.matchdict.get("method", None)
        return self.process("plugin")

    @view_config(route_name="api_v1_plugins", request_method="GET")
    @view_config(route_name="api_v1_plugins:method", request_method="GET")
    @view_config(route_name="api_v1_plugins:method:param", request_method="GET")
    def gets(self):
        method = self.request.matchdict.get("method", None)
        if method is None:
            return self.process("plugins", "list")
        #if method.lower() == "login":
        #    ex = ServiceNotFoundException("The requested service does not support get requests.")
        #    return self.emit_json(ex)

        return self.process("plugins")


    @view_config(route_name="api_v1_plugin", request_method="POST")
    @view_config(route_name="api_v1_plugin:method", request_method="POST")
    def post(self):
        return self.process("plugin")

    @view_config(route_name="api_v1_plugins", request_method="POST")
    @view_config(route_name="api_v1_plugins:method", request_method="POST")
    @view_config(route_name="api_v1_plugins:method:param", request_method="POST")
    def posts(self):
        method = self.request.matchdict.get("method", None)
        if method is None:
            return self.process("plugins", "list")
        return self.process("plugins")
