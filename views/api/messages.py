from pyramid.view import view_config
from . import APIView


class Messages(APIView):
    @view_config(route_name="api_v1_message", request_method="GET")
    @view_config(route_name="api_v1_message:method", request_method="GET")
    @view_config(route_name="api_v1_message:method:param", request_method="GET")
    def get(self):
        #matchdict = self.request.matchdict
        #method = matchdict.get("method", None)
        #if method is not None:
        #    param = matchdict.get("param", None)
        #    if param is None:
        #        matchdict["method"] = "get"
        #        matchdict["param"] = method

        return self.process("message")

    @view_config(route_name="api_v1_messages", request_method="GET")
    @view_config(route_name="api_v1_messages:method", request_method="GET")
    @view_config(route_name="api_v1_messages:method:param", request_method="GET")
    def gets(self):
        method = self.request.matchdict.get("method", None)
        if method is None:
            return self.process("messages", "list")
        return self.process("messages")


    @view_config(route_name="api_v1_message", request_method="POST")
    @view_config(route_name="api_v1_message:method", request_method="POST")
    def post(self):
        return self.process("message")

    @view_config(route_name="api_v1_messages", request_method="POST")
    @view_config(route_name="api_v1_messages:method", request_method="POST")
    @view_config(route_name="api_v1_messages:method:param", request_method="POST")
    def posts(self):
        method = self.request.matchdict.get("method", None)
        if method is None:
            return self.process("messages", "list")
        return self.process("messages")
