from pyramid.view import view_config
from . import APIView


class Devices(APIView):

    @view_config(route_name="api_v1_device", request_method="GET")
    @view_config(route_name="api_v1_device:method", request_method="GET")
    @view_config(route_name="api_v1_device:method:param", request_method="GET")
    def get(self):
        matchdict = self.request.matchdict
        method = matchdict.get("method", None)
        if method is not None:
            param = matchdict.get("param", None)
            if param is None:
                matchdict["method"] = "get"
                matchdict["param"] = method

        return self.process("device")

    @view_config(route_name="api_v1_devices", request_method="GET")
    @view_config(route_name="api_v1_devices:method", request_method="GET")
    @view_config(route_name="api_v1_devices:method:param", request_method="GET")
    def gets(self):
        matchdict = self.request.matchdict
        method = matchdict.get("method", None)
        if method is not None:
            param = matchdict.get("param", None)
            if param is None:
                matchdict["method"] = "get"
                matchdict["param"] = method
                return self.process("devices")

        if method is None:
            return self.process("devices", "list")
        return self.process("devices")


    @view_config(route_name="api_v1_device", request_method="POST")
    @view_config(route_name="api_v1_device:method", request_method="POST")
    def post(self):
        matchdict = self.request.matchdict
        method = matchdict.get("method", None)
        if method is not None:
            param = matchdict.get("param", None)
            if param is None:
                matchdict["method"] = "get"
                matchdict["param"] = method

        return self.process("device")

    @view_config(route_name="api_v1_devices", request_method="POST")
    @view_config(route_name="api_v1_devices:method", request_method="POST")
    @view_config(route_name="api_v1_devices:method:param", request_method="POST")
    def posts(self):
        method = self.request.matchdict.get("method", None)
        if method is None:
            return self.process("devices", "list")
        return self.process("devices")
