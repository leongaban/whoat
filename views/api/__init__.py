from pyramid.httpexceptions import HTTPFound
from pyramid.httpexceptions import HTTPNotFound
from pyramid.response import Response
from pyramid.response import FileResponse
from pyramid.view import view_config
from fusion import tools
from fusion.api.errors import *
from fusion.api.io import File
from .. import SmartView


class APIView(SmartView):

    def process(self, *args, **kwargs):
        try:
            return self.__process__(*args, **kwargs)
        except Exception, ex:
            if isinstance(ex, FusionError) is False:
                ex = FusionError(ex)

            if __debug__ is True:
                error = {
                    "message": ex.message,
                    "stack": ex.stack,
                    "code": ex.code
                }
            else:
                error = {
                    "message": ex.message,
                    "code": ex.code
                }
            response = {"error": error}
            return self.emit_json(response)

    def __process__(self, *args, **kwargs):
        #user_agent = self.request.user_agent
        table = self.request.matchdict
        flat, logged = kwargs.get("flat", True), True

        token = self.param("token")
        params = self.params
        jsonp = None
        try:
            callback = params["callback"]
            if callback is not None and len(callback) > 1:
                jsonp = callback
                params.pop("callback")
        except KeyError:
            pass

        method = table.get("method", self.param("method"))
        if method is not None:
            if method.isdigit() is True or method.find("@") > -1:
                params["id"] = int(method) if method.isdigit() else method
                method = "get"

        if method is None:
            try:
                method = "%s.%s" % (args[0], args[1])
            except:
                pass
        elif len(args) > 0:
            method = "%s.%s" % (args[0], method)


        if table.get("param", None) is not None:
            param = table["param"]
            if len(param) > 0:
                if param[0] == "[" or param[0] == "{":
                    o = tools.unjson(param)
                    if isinstance(o, list) is False:
                        keys = o.keys()
                        for key in keys:
                            params[key] = o[key]
                    else:
                        params["param"] = o
                else:
                    params["param"] = param


        body = self.body
        if body is not None:
            if token is None:
                try:
                    token = body["token"]
                except KeyError:
                    pass
            if method is None:
                try:
                    method = body["method"]
                except KeyError:
                    pass

            try:
                if params is None:
                    params = {}

                body_params = body["params"]
                if body_params is not None:
                    body.pop("params")
                    for key in body_params:
                        val = body_params[key]
                        params[key] = val

                    try:
                        body.pop("method")
                    except:
                        pass
            except:
                pass

            #if params is None or len(params.keys()) == 0:
            #    try:
            #        params = body["params"]
            #        body = params
            #    except KeyError:
            #        pass


        if token is None:
            token = self.get_token_cookie()



        if body is None or len(body) == 0:
            body = {} if params is None else params
        elif len(params) > 0:
            for key in params:
                val = params[key]
                body[key] = val

        if len(args) > 2:
            lst = list(args)[2:]
            for x in xrange(len(lst)):
                k, v = lst[x]
                body[k] = v

        ctx = self.ctx
        ctx.ip_address = self.request.client_addr
        if token is not None:
            ctx.session_restore(token)
            try:
                self.session.create_session_cookie(token)
            except:
                pass


        member, session = ctx.member, ctx.session
        if method is None:
            method = "system.about"



        version, error, obj = None, None, None
        if method.lower().startswith("system") is True:
            logged = False


        sw = tools.stopwatch()
        try:
            version = body.get("v", None)
            if isinstance(version, basestring) is True:
                version = float(version)
        except:
            pass

        if version is not None and version < 0.02:
            obj = APIVersionError("You are using an outdated version of the Who@ mobile client, please download and install the latest version from the app store.")

        data = None
        try:
            data = self.request.body
        except:
            pass

        if obj is None:
            try:
                obj = ctx.svc_call(method, data, **(body))
                if obj is None:
                    obj = {}
            except Exception, ex:
                obj = ex

        if isinstance(obj, File) is True:
            file = obj
            response = FileResponse(
                file.uri,
                request=self.request,
                content_type=file.file_type.mime_type
            )
            return response


        ms = sw.elapsed()
        if isinstance(obj, list) is True and len(obj) > 0:
            if tools.is_model(obj[0]) is True:
                try:
                    obj = [o.preview() for o in obj]
                except:
                    obj = [o.preview() for o in obj if o is not None]
        elif tools.is_model(obj) is True:
            obj = obj.preview()
        elif isinstance(obj, Exception) is True:
            if isinstance(obj, FusionError) is False:
                obj = FusionError(obj)

            #obj.save(self.ctx)
            self.status_code = 500
            message = "Error invoking the service." if isinstance(obj, ServiceNotFoundException) is False else obj.message
            code, stack, uuid = None, None, None
            try:
                code = obj.code
            except:
                pass
            try:
                uuid = obj.uuid
            except:
                pass

            if member is not None and member.is_whoat_admin is True:
                if isinstance(obj, ServiceNotFoundException) is False:
                    message = obj.message
                try:
                    stack = obj.stack
                except:
                    pass

            error = {"message": message}
            if code is not None:
                error["code"] = code
            if stack is not None:
                error["stack"] = stack
            if uuid is not None:
                error["uuid"] = uuid


        response = obj
        pretty = False
        if error is not None:
            response = {"error": error}
            pretty = True
        else:
            method_name = method.strip().lower()
            if method_name == "member.login" or method_name == "member.authenticate":
                try:
                    token = response["token"]
                    self.session.create_session_cookie(token)
                except:
                    pass
            elif method_name == "member.logout":
                try:
                    self.session.invalidate()
                except:
                    pass



            flag = False
            try:
                pretty_flag = self.request.GET["pretty"]
                if pretty_flag == "1" or pretty_flag.strip().lower() == "true":
                    pretty = True
                    flag = True
            except:
                flag = False

            if pretty is False:
                if session.is_mobile is False:
                    pretty = True if self.ctx.debug_mode is True else False
            else:
                pretty = False if session.is_mobile is True else False

        if flat is False:
            if error is None:
                response = {"result": response}# if pretty is False else response

            response["time"] = ms
        try:
            if pretty is False and flag is True:
                pretty = True

            #if pretty is True:
            #    response = tools.json_encode_pretty(response)
            response = tools.json_encode_pretty(response) if pretty is True else tools.json_encode(response)
        except Exception, ex:
            msg = "Error serializing the response to json. %s" % ex.message
            raise Exception(msg)

        if logged is True:
            logged = ctx.debug_mode

        if logged is True:
            try:
                if kwargs["logged"] is False:
                    logged = False
            except:
                logged = True if method.strip().lower() != "system.logs" else False


        if logged is True:
            uri = self.request.path
            query_params = self.request.GET

            if len(query_params) > 0:
                query_params = tools.key_val_encode(**(query_params))
                uri = "{uri}?{query_params}".format(uri=uri, query_params=query_params)

            base_url = tools.constants.APP_URI
            if base_url[len(base_url) - 1] == "/" and uri[0] == "/":
                uri = uri[1:]
            uri = "{base}{uri}".format(base=base_url, uri=uri)

            object = {}
            body = self.request.body
            if isinstance(body, basestring) is True:
                if tools.is_blank(body) is True:
                    body = None
                elif body[0] == "[" or body[0] == "{":
                    try:
                        body = tools.unjson(body.strip())
                    except:
                        pass
                elif body.find("=") > -1:
                    try:
                        body = tools.key_val_decode(body)
                    except:
                        pass



            request_heading = {}
            request_heading["uri"] = uri
            request_heading["method"] = self.request.method
            request_heading["headers"] = {}
            headers = self.request.headers
            header_names = headers.keys()
            for name in header_names:
                value = headers[name]
                if tools.not_blank(value) is True:
                    request_heading["headers"][name] = value

            object["_"] = request_heading

            object = {}
            object["uri"] = uri
            object["method"] = self.request.method
            object["headers"] = request_heading["headers"]
            if body is not None:
                object["body"] = body
            ctx.api_request_log(method, request=object, response=response, error=error, elapsed=ms)

        if jsonp is None:
            return self.emit_json(response)
        return self.emit_jsonp(jsonp, response)

    def set_token_cookie(self, token):
        self.request.session["who_api"] = token

    def get_token_cookie(self):
        try:
            return self.request.session["who_api"]
        except:
            return None

    @view_config(route_name="api_v1", request_method="GET")
    def get(self):
        return self.process()

    @view_config(route_name="api_v1", request_method="POST")
    def post(self):
        return self.process()

    @view_config(route_name="api_v1_me", request_method="GET")
    def route_me(self):
        return self.process("member", "current")

    @view_config(route_name="api_v1_session", request_method="GET")
    def route_session(self):
        return self.process("system", "session")

    @view_config(route_name="api_v1_feedback", request_method="GET")
    def route_feedback(self):
        return self.process("system", "feedback")

    @view_config(route_name="api_v1_profile", request_method="GET")
    def route_profile(self):
        return self.process("member", "profile")

    @view_config(route_name="api_v1_inbox", request_method="GET")
    def route_inbox(self):
        return self.process("member", "inbox")

    @view_config(route_name="api_v1_outbox", request_method="GET")
    def route_outbox(self):
        return self.process("member", "outbox")

    @view_config(route_name="api_v1_login:param", request_method="GET")
    def route_login(self):
        return self.process("member", "login")

    @view_config(route_name="api_v1_logout", request_method="GET")
    def route_logout(self):
        return self.process("member", "logout")

    @view_config(route_name="api_v1_titles", request_method="GET")
    @view_config(route_name="api_v1_titles:param", request_method="GET")
    def route_titles(self):
        return self.process("system", "titles")

    @view_config(route_name="api_v1_companies", request_method="GET")
    @view_config(route_name="api_v1_companies:param", request_method="GET")
    def route_companies(self):
        return self.process("system", "companies")

    @view_config(route_name="api_v1_autocomplete", request_method="GET")
    @view_config(route_name="api_v1_autocomplete:param", request_method="GET")
    def route_autocomplete(self):
        return self.process("system", "autocomplete")