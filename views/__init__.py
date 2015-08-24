from fusion import tools
from fusion.api.errors import *
from fusion.extension import Extension
from .. import settings
from pyramid.view import view_config
from pyramid.response import Response
from pyramid.renderers import render_to_response
from pyramid.httpexceptions import HTTPFound
from pyramid.httpexceptions import HTTPNotFound
import urllib2


class SmartView(Extension):
    template = None
    restrict_access = True
    model_type = None

    def __init__(self, context, request):
        self.session = request.session
        self.request = request
        self.status_code = 200
        self.content_type = "text/html"

        Extension.__init__(self)

        self.__params = None, None
        self.__body = None
        self.__warnings = None
        self.__redirect = None
        self.__partial = False
        self.__storage = None

        token = self.param("token")
        if token is not None:
            self.session.restore(token)

        if self.__class__.restrict_access is True:
            self.evaluate()
            if self.authenticated is False:
                self.session["redirect"] = self.request.path
                self.__redirect = tools.app_uri("login")


        request.add_finished_callback(self.__destroy__)#tools.curry(__destroy__, self))

    @property
    def storage(self):
        storage = self.__storage
        if storage is not None:
            return storage
        storage = self.ctx.session.storage
        self.__storage = storage
        return storage

    def __destroy__(self, request):
        try:
            self.session.dispose()
        except:
            pass
        self.session = None
        self.__storage = None


    @property
    def partial(self):
        if self.__partial is True:
            return True
        json = self.param("json")
        if json is True or json == 1:
            return True
        return False


    @property
    def bounced(self):
        return True if self.__redirect is not None else False

    @property
    def uri(self):
        pfx = self.request.host_url
        sfx = self.request.path_qs
        uri = "%s%s" % (pfx, sfx)
        return uri

    def emit_jsonp(self, callback, content):
        if isinstance(content, basestring) is False:
            if isinstance(content, Exception):
                self.status_code = 500
                error = content
                content = {
                    "error": {
                        "message": error.message
                    }
                }
                try:
                    code = error.code
                    content["error"]["code"] = code
                except:
                    pass
            content = tools.json_encode_pretty(content) if __debug__ is True else tools.json_encode(content)

        js = "%s(%s);" % (callback, content)
        return self.__proxy__(Response(js, content_type="application/javascript", charset="utf8", status_code=self.status_code))

    def emit_json(self, data):
        if isinstance(data, basestring) is False:
            if isinstance(data, Exception):
                self.status_code = 500
                error = data
                data = {
                    "error": {
                        "message": error.message
                    }
                }
                try:
                    code = error.code
                    data["error"]["code"] = code
                except:
                    pass

            data = tools.json_encode_pretty(data) if __debug__ is True else tools.json_encode(data)

        return self.__proxy__(Response(data, content_type="application/json", status_code=self.status_code))


    def write(self, *args, **kwargs):
        if len(args) == 1 and isinstance(args[0], basestring) is True:
            data = args[0]
            if data[0] == "[" or data[0] == "{":
                return self.__proxy__(Response(data, content_type="application/json"), data)
            return self.__proxy__(Response(data, content_type="text/html"), data)

        object = self.__objectify__(*args, **kwargs)
        data = tools.json(object) if settings.debug_mode is False else tools.json_encode_pretty(object)
        response = Response(data, content_type="application/json")
        return self.__proxy__(response, object)

    def render(self, *args, **kwargs):
        template = kwargs.get("template", None)
        if template is not None:
            kwargs.pop("template")

        if template is None and len(args) == 1 and len(kwargs) > 0:
            template = args[0]
            args = ()

        object = self.__objectify__(*args, **kwargs)
        if self.partial is True:
            data = tools.json(object) if settings.debug_mode is False else tools.json_encode_pretty(object)
            response = Response(data, content_type="application/json")
            return self.__proxy__(response, object)

        if isinstance(object, list) is True:
            model_type = self.__class__.model_type
            if model_type is not None:
                model_type = "%ss" % model_type
            else:
                model_type = "objects"

            o = {}
            o[model_type] = object
            object = o

        #object["inject"] = self.create_inject_string()

        if template is None:
            template = self.__class__.template
        if template is None:
            class_name = self.__class__.__name__.lower()
            template = "%s.mak" % class_name
        template = "www:templates/%s" % template
        response = render_to_response(template, object, request=self.request)
        body = response.body
        buffer = []
        buffer.append(body)
        buffer.append("<script>")
        buffer.append("widget.settings.uri = '{uri}';".format(uri=settings.uri))
        buffer.append("widget.settings.api_uri = '{uri}';".format(uri=settings.api_uri))

        session = self.session
        if session is not None and session.authenticated is True:
            buffer.append("widget.settings.token = '{token}';".format(token=session.token))
            session = session.deflate()
            session = tools.json(session)
            buffer.append("widget.settings.session = widget.unjson('{session}');".format(session=session))
            #buffer.append("alert(widget.json(widget.settings.session));")

        buffer.append("</script>")
        body = "\n".join(buffer)
        response.body = body
        #response.body = "{prefix}{body}".format(prefix="<script>alert('hey');</script>", body=response.body)
        return self.__proxy__(response, object)

    def __proxy__(self, response, *object):
        object = object[0] if len(object) > 0 else None
        # MemberObjectPrint
        # if object is not None:
        #     print tools.json_encode_pretty(object)

        self.session.attach_cookies(response)
        return response

    def create_inject_string(self):
        # inject = {
        #     "uri": settings.api_uri,
        #     "debug": str(settings.debug_mode)
        # }
        # warnings = self.__warnings
        # if warnings is not None:
        #     inject["warnings"] = warnings
        # inject = tools.json(inject)
        # return inject
        return ""

    def redirect(self, *path, **params):
        if len(path) == 0 and len(params) == 0:
            return self.force_login()

        uri = path[0] if len(path) > 0 else self.__redirect
        uri = uri.strip()
        absolute = False


        txt = uri.lower()
        if txt.startswith("www."):
            uri = "http://{uri}".format(uri=uri)
            absolute = True
        elif txt.startswith("http://") or txt.startswith("https://"):
            absolute = True

        if absolute is True:
            if len(params) > 0:
                query_string = tools.encode_url_params(**(params))
                uri = "{uri}?{query_string}".format(uri=uri, query_string=query_string)
            return self.__proxy__(HTTPFound(location=uri))

        if absolute is False:
            path = self.request.host_url
            if uri[0] != "/":
                uri = "%s/%s" % (path, uri)
            else:
                uri = "%s%s" % (path, uri)

            if len(params) > 0:
                query_string = []
                for key in params:
                    val = params[key]
                    try:
                        val = tools.urllib2.quote(val)
                    except:
                        if val is None:
                            val = ""
                        else:
                            val = str(val)
                            val = tools.urllib2.quote(val)
                    query_string.append("%s=%s" % (key, val))
                query_string = "&".join(query_string)
                uri = "%s?%s" % (uri, query_string)

        return self.__proxy__(HTTPFound(location=uri))

        #redirect = self.__redirect
        #if redirect is not None:
        #    return HTTPFound(location=redirect)

        #path = path[0]
        #pfx = path.split("/")[0].strip().lower()
        #if pfx.find("http:") > -1 or pfx.find("https:") > -1:
        #    uri = "%s?%s" % (path, tools.key_val_encode(**params)) if len(params.keys()) > 0 else path
        #    return HTTPFound(location=uri)
        #
        #uri = tools.app_uri(path, **params)
        #return self.__proxy__(HTTPFound(location=uri))


    def force_login(self):
        uri = self.request.path_url
        query_string = self.request.query_string
        if tools.not_blank(query_string):
            uri = "%s?%s" % (uri, query_string)
        bounce = self.encrypt(uri)
        #bounce = "bounce={bounce}".format(bounce=bounce)
        uri = "login?bounce=%s" % bounce
        return self.redirect(uri)


    @property
    def params(self):
        tbl, query_string = self.__params
        if tbl is not None:
            return tbl

        tbl = {}
        try:
            query_string = {}
            src = self.request.GET
            params = src._items
            for key, val in params:
                if val is not None and val.isdigit() is True:
                    val = int(val)
                elif val is not None and len(val) < 10:
                    if val.lower() == "true":
                        val = True
                    elif val.lower() == "false":
                        val = False
                tbl[key.lower()] = val

            for key in tbl.keys():
                query_string[key] = val
        except:
            pass

        try:
            src = self.request.POST
            params = src._items
            for key, val in params:
                if val is not None and val.isdigit() is True:
                    val = int(val)
                elif val is not None and len(val) < 10:
                    if val.lower() == "true":
                        val = True
                    elif val.lower() == "false":
                        val = False
                tbl[key.lower()] = val
        except:
            pass

        try:
            src = self.request.matchdict
            for key in src.keys():
                val = src[key]
                tbl[key.lower()] = val

        except:
            pass

        try:
            if len(tbl.keys()) < 1:
                src = self.body
                if isinstance(src, dict) is True:
                    for key in src.keys():
                        if tbl.get(key.lower(), None) is None:
                            val = src[key]
                            tbl[key.lower()] = val
        except:
            pass
        self.__params = (tbl, query_string)
        return tbl

    @property
    def body(self):
        body = self.__body
        if body is not None:
            if body == -1:
                return None
            return body

        request = self.request
        try:
            body = request.body
            if body is not None and len(body) > 0:
                if body[0] == "[" or body[0] == "{":
                    try:
                        body = tools.unquote(body)
                    except:
                        pass

                    try:
                        body = tools.unjson(body)
                    except:
                        pass
                else:
                    body = urllib2.unquote(body)
                    body = tools.key_val_decode(body)
            else:
                body = None
        except:
            body = None

        self.__body = body if body is not None else -1
        return body

    def param(self, name, *aliases):
        tbl = self.params
        key = name.strip().lower()
        try:
            return tbl[key]
        except KeyError:
            for alias in aliases:
                try:
                    return tbl[alias.strip().lower()]
                except KeyError:
                    pass
            return None

    # def attach_session(self, token):
    #     self.ctx.attach_session(token)

    def evaluate(self):
        if self.authenticated is True:
            return self

        params = self.params
        try:
            token = params["token"]
            self.session.restore(token)
        except:
            pass

    def warn(self, message, target=None, level=0):
        if self.__warnings is None:
            self.__warnings = []
        warning = {
            "label": message,
            "level": level
        }
        if target is not None:
            warning["target"] = target
        self.__warnings.append(warning)
        return self

    @property
    def authenticated(self):
        return self.session.authenticated

    @property
    def ip_address(self):
        return self.request.client_addr

    def __objectify__(self, *args, **kwargs):
        def objectify(obj):
            if isinstance(obj, list) is True and len(obj) > 0:
                if tools.is_model(obj[0]) is True:
                    try:
                        obj = [o.preview() for o in obj]
                    except:
                        obj = [o.preview() for o in obj if o is not None]
                return obj
            elif tools.is_model(obj) is True:
                return obj.preview()
            elif isinstance(obj, dict) is True:
                keys = obj.keys()
                for key in keys:
                    val = obj[key]
                    if isinstance(val, list) is True and len(val) > 0 and tools.is_model(val[0]) is True:
                        val = [o.preview() for o in val]
                        obj[key] = val
                    elif tools.is_model(val) is True:
                        val = val.preview()
                        obj[key] = val
            elif isinstance(obj, Exception) is True:
                ctx = self.ctx
                ctx.journal.record_error(obj)
                member = ctx.get_member()
                if __debug__ is True or member is not None and member.is_whoat_admin is True:
                    return {
                        "error": {
                            "message": obj.message,
                            "stack": obj.stack,
                            "code": obj.code
                        }
                    }

                return {
                    "error": {
                        "message": obj.message,
                        "code": obj.code
                    }
                }
            return obj

        object = {} if len(args) == 0 else objectify(args[0])
        keys = kwargs.keys()
        if len(keys) > 0:
            for key in keys:
                val = kwargs[key]
                obj = objectify(val)
                object[key] = obj
        return object

    def encrypt(self, data):
        data = self.ctx.codex.weak_encrypt(data)
        data = tools.urllib2.quote(data)
        return data

    def decrypt(self, data):
        data = tools.urllib2.unquote(data)
        data = self.ctx.codex.weak_decrypt(data)
        return data


    @classmethod
    def plugin(cls, plugin):
        name = plugin.func_name
        setattr(cls, name, plugin)

    @view_config(context=Exception)
    def on_app_error(self):
        template = "errors/general.mak"

        ex = self.request.exception
        if isinstance(ex, FusionError) is False:
            ex = FusionError(ex.message, inner=ex)
            print ex.message
            tools.info("on_app_error handler: %s" % ex.message)

        return self.render(template)

        #error = self.request_context
        #
        #template = "errors/general.mak"
        #if isinstance(error, FusionError) is False:
        #    message = error.message
        #    error = FusionError(message, inner=error)
        #
        #
        #if isinstance(error, NotAuthenticatedError) is True:
        #    self.session["bounce"] = self.request.path_qs
        #    return self.redirect("login")
        #
        ##error.save(self.ctx)
        #return self.render(template)

@SmartView.plugin
def get_badges(self):
    dic = {}
    messages_outbox_unread = self.ctx.messaging.get_outbox_unread_count()
    messages_inbox_unread = self.ctx.messaging.get_inbox_unread_count()
    dic['outbox_unread'] = messages_outbox_unread
    dic['inbox_unread'] = messages_inbox_unread
    return dic


@SmartView.plugin
def get_recent_searches(self, limit=None):
    searches = self.storage["searches"]
    if searches is not None:
        if limit is not None:
            searches = searches[0:limit]
        return searches
    searches = self.members.search_history(limit=50)
    self.storage["searches"] = searches
    if limit is not None:
        searches = searches[0:limit]
    return searches


# @SmartView.plugin
# def onboarding(self, action):
#
#     # 1) Verify                        : "verified"
#     # 2) Sync Contacts                 : "synced"
#     # 3) Customize Your Alerts         : "pages"
#     # 4) Invite Co-workers and Friends : "inviting"
#     # 5) Watch Training Videos(01/08)  : "video1", "video2"
#     # 6) Search for an Intro           : "searched"
#     # 7) Make an Intro Request         : "requested"
#     # 8) Add Your Title and Company    : "updated"
#     dic = {}
#
#     if action == "verified":
#         dic['actions'] = self.ctx.messaging.record_action("verified")
#
#     elif action == "synced":
#         dic['actions'] = self.ctx.messaging.record_action("synced")
#
#     elif action == "pages":
#         dic['actions'] = self.ctx.messaging.record_action("pages")
#
#     elif action == "inviting":
#         dic['actions'] = self.ctx.messaging.record_action("inviting")
#
#     elif action == "video1":
#         dic['actions'] = self.ctx.messaging.record_action("video1")
#
#     elif action == "video2":
#         dic['actions'] = self.ctx.messaging.record_action("video2")
#
#     elif action == "searched":
#         dic['actions'] = self.ctx.messaging.record_action("searched")
#
#     elif action == "requested":
#         dic['actions'] = self.ctx.messaging.record_action("requested")
#
#     elif action == "updated":
#         dic['actions'] = self.ctx.messaging.record_action("updated")
#
#     # dic['actions'] = self.ctx.messaging.record_action(action=action)
#     return dic


@SmartView.plugin
def logout(self):
    self.session.logout()
    self.session.invalidate()


@SmartView.plugin
def login(self, username, password):
    return self.session.login(username, password)