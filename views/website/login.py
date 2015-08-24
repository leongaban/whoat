from .. import SmartView
from pyramid.view import view_config
# from www.engine import tools


class Login(SmartView):
    restrict_access = False
    template = "website/login_register.mak"

    @view_config(route_name="login", request_method="GET")
    def get(self):
        dic = {}
        obj = {"isRegisterActive": False}

        try:
            source = self.request.GET["source"]
            if source is not None:
                dic["source"] = source
        except KeyError:
            pass

        try:
            bounce = self.request.GET["bounce"]
            if bounce is not None:
                dic["bounce"] = bounce
        except KeyError:
            pass

        username, password = self.param("username"), self.param("password")
        if username is not None:
            session = self.login(username, password)
            return self.render(session)

        dic['tab'] = 'login'
        dic['obj'] = obj
        return self.render(dic)

    @view_config(route_name="login", request_method="POST")
    def post(self):
        username, password = self.param("username"), self.param("password")

        session = self.login(username, password)
        if session is not None:
            if self.partial is True:
                return self.render(session)
            try:
                bounce = self.param("bounce")
                bounce = self.decrypt(bounce)
                dic = {'result': 'bounce', 'message': bounce}
                return self.emit_json(dic)
            except:
                pass

            dic = {'result': 'success', 'message': 'success'}
            return self.emit_json(dic)

        else:
            member = self.members.get(username)
            if member is None:
                dic = {'result': 'error', 'message': 'Username not registered'}
                return self.emit_json(dic)
            else:
                dic = {'result': 'error', 'message': 'Invalid password'}
                return self.emit_json(dic)