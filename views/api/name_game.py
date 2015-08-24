from pyramid.view import view_config
from . import APIView


class NameGame(APIView):
    @view_config(route_name="api_v1_name_game", request_method="GET")
    @view_config(route_name="api_v1_name_game:method", request_method="GET")
    @view_config(route_name="api_v1_name_game:method:param", request_method="GET")
    def get(self):
        return self.process("name_game")

    @view_config(route_name="api_v1_name_games", request_method="GET")
    @view_config(route_name="api_v1_name_games:method", request_method="GET")
    @view_config(route_name="api_v1_name_games:method:param", request_method="GET")
    def gets(self):
        method = self.request.matchdict.get("method", None)
        if method is None:
            return self.process("name_games", "list")
        return self.process("name_games")


    @view_config(route_name="api_v1_name_game", request_method="POST")
    @view_config(route_name="api_v1_name_game:method", request_method="POST")
    def post(self):
        return self.process("name_game", flat=False)

    @view_config(route_name="api_v1_name_games", request_method="POST")
    @view_config(route_name="api_v1_name_games:method", request_method="POST")
    @view_config(route_name="api_v1_name_games:method:param", request_method="POST")
    def posts(self):
        method = self.request.matchdict.get("method", None)
        if method is None:
            return self.process("name_games", "list", flat=False)
        return self.process("name_games", flat=False)
