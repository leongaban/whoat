from pyramid.view import view_config
from . import APIView


class System(APIView):
    @view_config(route_name="api_v1_system", request_method="GET")
    @view_config(route_name="api_v1_system:method", request_method="GET")
    @view_config(route_name="api_v1_system:method:param", request_method="GET")
    def get(self):
        return self.process("system")


    @view_config(route_name="api_v1_system", request_method="POST")
    @view_config(route_name="api_v1_system:method", request_method="POST")
    @view_config(route_name="api_v1_system:method:param", request_method="POST")
    def post(self):
        return self.process("system", flat=False)
