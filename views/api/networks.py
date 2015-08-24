from pyramid.view import view_config
from . import APIView



class Networks(APIView):

    @view_config(route_name="api_v1_network", request_method="GET")
    @view_config(route_name="api_v1_network:method", request_method="GET")
    @view_config(route_name="api_v1_network:method:param", request_method="GET")
    def get(self):
        return self.process("network")

    @view_config(route_name="api_v1_networks", request_method="GET")
    @view_config(route_name="api_v1_networks:method", request_method="GET")
    @view_config(route_name="api_v1_networks:method:param", request_method="GET")
    def gets(self):
        method = self.request.matchdict.get("method", None)
        if method is None:
            return self.process("networks", "list")
        return self.process("networks")


    @view_config(route_name="api_v1_network", request_method="POST")
    @view_config(route_name="api_v1_network:method", request_method="POST")
    def post(self):
        return self.process("network")

    @view_config(route_name="api_v1_networks", request_method="POST")
    @view_config(route_name="api_v1_networks:method", request_method="POST")
    @view_config(route_name="api_v1_networks:method:param", request_method="POST")
    def posts(self):
        method = self.request.matchdict.get("method", None)
        if method is None:
            return self.process("networks", "list")
        return self.process("networks")
