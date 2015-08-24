from fusion import tools
from fusion import constants
from .. import settings
from pyramid.session import signed_serialize
from pyramid.session import signed_deserialize

secure_cookie = False if constants.ENVIRONMENT.lower().startswith("dev") else True

class Session(object):
    def __init__(self, *args):
        self.request = args[0]
        self.response = self.request.response
        if settings.api_uri is None:
            settings.uri = self.request.host_url
            settings.api_uri = "{uri}/api/v1".format(uri=self.request.host_url)

        self.__ctx = tools.context()
        self.__token = tools.guid(length=32)
        self.__session = None
        self.__ctx.ip_address = self.request.client_addr
        self.__ctx.user_agent_string = self.request.user_agent

        cookie = self.request.cookies.get(settings.cookie_name, None)
        if cookie is not None:
            cookie = self.__ctx.codex.unseal(cookie)
            token = cookie["value"]
            try:
                if token != "0":
                    self.__session = self.__ctx.session_restore(token)
                    self.__ctx.uid = token
            except Exception, ex:
                #self.response.delete_cookie(cookie_name)#this may not do anything
                #raise ex
                pass

        if self.__session is None:
            self.__session = self.__ctx.sessions.create_anonymous_session()

        self.__token = self.__session.token
        self.__state = {} if self.__ctx.session is None else self.__ctx.session.state
        self.__pending_cookies = None



    def nullify_session_cookie(self):
        self.create_cookie(settings.cookie_name, "0")

    def impersonate(self, member):
        self.__ctx.impersonate(member)
        self.__session = self.__ctx.session
        self.__token = self.__session.token
        self.create_session_cookie(self.__token)

    def create_session_cookie(self, *token):
        token = token[0] if len(token) > 0 else self.__session.token
        self.create_cookie(settings.cookie_name, token)

    #def create_session_cookie(self):
    #    self.create_cookie(settings.cookie_name, self.__session.token)

    def create_cookie(self, name, value):
        def attach(name, cookie, response):
            timeout = settings.cookie_timeout
            if secure_cookie is False:
                response.set_cookie(
                    name,
                    value=cookie,
                    max_age=timeout
                )
                return response

            response.set_cookie(
                name,
                value=cookie,
                max_age=timeout,
                secure=True
            )
            return response


        cookie = self.__ctx.codex.seal(value=value)
        cookie_func = tools.curry(attach, name, cookie)
        if self.__pending_cookies is None:
            self.__pending_cookies = {}
        self.__pending_cookies[name] = cookie_func

    def attach_cookies(self, response):
        cookies = self.__pending_cookies
        if cookies is None:
            return response
        cookies = cookies.values()
        [cookie(response) for cookie in cookies]
        return response

    # @classmethod
    # def is_mobile(cls, request):
    #     request.mobile = False
    #     if 'HTTP_USER_AGENT' in request.headers.environ:
    #         user_agent = request.headers.environ['HTTP_USER_AGENT']
    #         b = reg_b.search(user_agent)
    #         v = reg_v.search(user_agent[0:4])
    #         if b or v:
    #             return True
    #
    #     return False

    def restore(self, token):
        session = self.__ctx.session_restore(token)
        if session is not None:
            self.__session = session
            self.create_session_cookie()
        return session

    def login(self, username, password):
        session = self.__ctx.login(username=username, password=password)
        if session is not None:
            self.__session = session
            self.create_session_cookie()
        return session

    def logout(self):
        if self.authenticated is False:
            return

        self.__ctx.logout()
        self.nullify_session_cookie()
        self.invalidate()

    @property
    def newbie(self):
        return self.__session.newbie

    @property
    def verified(self):
        return self.__session.verified

    @property
    def member(self):
        return self.__session.member

    @property
    def device(self):
        return self.__session.device

    @property
    def stream(self):
        return self.__session.stream

    @property
    def authenticated(self):
        return self.__session.authenticated

    @property
    def ctx(self):
        return self.__ctx

    @property
    def token(self):
        return self.__token

    @classmethod
    def plugin(cls, plugin):
        name = plugin.func_name
        setattr(cls, name, plugin)

    def deflate(self):
        object = self.__session.preview()
        return object

    def dispose(self):
        """Dispose of the session and related resources."""
        try:
            self.__session.clear()
        except:
            pass
        self.__session = None
        self.__state = None
        self.__ctx = None
        tools.remove_context()


    # def __getattr__(self, method):
    #     fn = getattr(self.__ctx, method)
    #     return fn

    def invalidate(self):
        """ Invalidate the session.  The action caused by
        ``invalidate`` is implementation-dependent, but it should have
        the effect of completely dissociating any data stored in the
        session with the current request.  It might set response
        values (such as one which clears a cookie), or it might not."""
        #self.logout()
        #cookie = signed_serialize({"token": "-1"}, Session.Secret)
        #self.request.response.set_cookie("whodat", cookie, max_age=1)

        try:
            self.response.delete_cookie(settings.cookie_name)
        except:
            pass

        #self.request.response.delete_cookie(settings.cookie_name)
        #self.__ctx.logout()

    def changed(self):
        """ Mark the session as changed. A user of a session should
        call this method after he or she mutates a mutable object that
        is *a value of the session* (it should not be required after
        mutating the session itself).  For example, if the user has
        stored a dictionary in the session under the key ``foo``, and
        he or she does ``session['foo'] = {}``, ``changed()`` needn't
        be called.  However, if subsequently he or she does
        ``session['foo']['a'] = 1``, ``changed()`` must be called for
        the sessioning machinery to notice the mutation of the
        internal dictionary."""
        raise NotImplementedError()

    def flash(self, msg, queue='', allow_duplicate=True):
        storage = self.setdefault('_f_' + queue, [])
        if allow_duplicate or (msg not in storage):
            storage.append(msg)
            print storage
            # """ Push a flash message onto the end of the flash queue represented
            # by ``queue``.  An alternate flash message queue can used by passing
            # an optional ``queue``, which must be a string.  If
            # ``allow_duplicate`` is false, if the ``msg`` already exists in the
            # queue, it will not be readded."""
            # raise NotImplementedError()

    def pop_flash(self, queue=''):
        return self.pop('_f_' + queue, [])
        # """ Pop a queue from the flash storage.  The queue is removed from
        # flash storage after this message is called.  The queue is returned;
        # it is a list of flash messages added by
        # :meth:`pyramid.interfaces.ISesssion.flash`"""
        # raise NotImplementedError()

    def peek_flash(self, queue=''):
        temp = self.get('_f_' + queue, [])
        return temp
        # """ Peek at a queue in the flash storage.  The queue remains in
        # flash storage after this message is called.  The queue is returned;
        # it is a list of flash messages added by
        # :meth:`pyramid.interfaces.ISesssion.flash`
        # """
        # raise NotImplementedError()

    def new_csrf_token(self):
        """ Create and set into the session a new, random cross-site request
        forgery protection token.  Return the token.  It will be a string."""
        #token = str(uuid.uuid1())
        token = tools.guid(length=32)
        self.__token = token
        return token

    def get_csrf_token(self):
        """ Return a random cross-site request forgery protection token.  It
        will be a string.  If a token was previously added to the session via
        ``new_csrf_token``, that token will be returned.  If no CSRF token
        was previously set into the session, ``new_csrf_token`` will be
        called, which will create and set a token, and this token will be
        returned.
        """
        token = self.__token
        if token is None:
            return self.new_csrf_token()
        return token

    # mapping methods
    def __getitem__(self, key):
        """Get a value for a key

        A ``KeyError`` is raised if there is no value for the key.
        """
        return self.__session.get(key)
        #return self.__state[key]

    def get(self, key, default=None):
        """Get a value for a key

        The default is returned if there is no value for the key.
        """
        return self.__session.get(key, default=default)
        #return self.__state.get(key, default)

    def __delitem__(self, key):
        """Delete a value from the mapping using the key.

        A ``KeyError`` is raised if there is no value for the key.
        """
        return self.__session.delete(key)
        #self.__state.__delitem__(key)

    def __setitem__(self, key, value):
        """Set a new item in the mapping."""
        self.__session.set(key, value)
        #self.__state[key] = value

    def keys(self):
        """Return the keys of the mapping object.
        """
        return self.__session.state.keys()
        #return self.__state.keys()

    def values(self):
        """Return the values of the mapping object.
        """
        return self.__session.state.values()
        #return self.__state.values()

    def items(self):
        """Return the items of the mapping object.
        """
        return self.__session.state.items()
        #return self.__state.items()

    def iterkeys(self):
        """iterate over keys; equivalent to __iter__"""
        return self.__session.state.iterkeys()
        #return self.__state.iterkeys()

    def itervalues(self):
        """iterate over values"""
        return self.__session.state.itervalues()
        #return self.__state.itervalues()

    def iteritems(self):
        """iterate over items"""
        return self.__session.state.iteritems()
        #return self.__state.iteritems()

    def clear(self):
        """delete all items"""
        return self.__session.state.clear()
        #self.__state.clear()

    def update(self, d):
        """ Update D from E: for k in E.keys(): D[k] = E[k]"""
        for key in d.keys():
            val = d[key]
            self.__session.set(key, val)
            #self._state[key] = d[key]

    def setdefault(self, key, default=None):
        """ D.setdefault(k[,d]) -> D.get(k,d), also set D[k]=d if k not in D """
        #return self.__state.setdefault(key, default)
        return self.__session.state.setdefault(key, default)

    def pop(self, k, *args):
        """remove specified key and return the corresponding value
        ``*args`` may contain a single default value, or may not be supplied.
        If key is not found, default is returned if given, otherwise
        ``KeyError`` is raised"""
        #return self.__state.pop(k, *args)
        return self.__session.state.pop(k, *args)

    def popitem(self):
        """remove and return some (key, value) pair as a
        2-tuple; but raise ``KeyError`` if mapping is empty"""
        #return self.__state.popitem()
        return self.__session.state.popitem()

    def __len__(self):
        """Return the number of items in the session."""
        #return self.__state.__len__()
        return len(self.__session.state.keys())

    def __iter__(self):
        """Return an iterator for the keys of the mapping object."""
        #return self.__state.__iter__()
        return self.__session.state.__iter__()

    def __contains__(self, key):
        """Return true if a key exists in the mapping."""
        #return self.__state.__contains__(key)

        return self.__session.state.__contains__(key)

# class Session():
#     Secret = None
#
#     def __init__(self, *args):
#         self.request = args[0]
#         self.__token = None
#         self.__state = {}
#         self.__ctx = ContextFactory.create()
#         self.__session = None
#
#         secret = Session.Secret
#         cookie = self.request.cookies.get("whodat", None)
#         if cookie is not None:
#             cookie = signed_deserialize(cookie, secret)
#             token = cookie["token"]
#
#             try:
#                 session = self.__ctx.session_restore(token)
#                 if session is not None:
#                     self.__token = token
#                     self.__session = session
#                     member = session.member_id
#                     if member is not None:
#                         member = self.__ctx.members.get(member)
#                     self.__ctx.bind(session=session, member=member)
#                     return
#             except Exception, err:
#                 self.request.response.delete_cookie("whodat")#this may not do anything
#                 print err
#
#         ip_address = self.request.client_addr
#         self.__ctx.ip_address = ip_address
#         session = self.__ctx.sessions.create_anonymous_session()
#         #session = self.__ctx.sessions.new_browser_session(ip_address=ip_address)
#
#         cookie = signed_serialize({"token": session.token}, secret)
#         self.request.response.set_cookie("whodat", cookie, max_age=31536000)
#         self.__session = session
#         self.__ctx.bind(session=session)
#         self.__token = session.guid
#
#     @property
#     def ctx(self):
#         return self.__ctx
#
#     @property
#     def token(self):
#         return self.__token
#
#     @classmethod
#     def plugin(cls, plugin):
#         name = plugin.func_name
#         #fn = curry(Session.Extend, plugin)
#         #setattr(cls, name, fn)
#         setattr(cls, name, plugin)
#
#
#     def invalidate(self):
#         """ Invalidate the session.  The action caused by
#         ``invalidate`` is implementation-dependent, but it should have
#         the effect of completely dissociating any data stored in the
#         session with the current request.  It might set response
#         values (such as one which clears a cookie), or it might not."""
#         #self.logout()
#         #cookie = signed_serialize({"token": "-1"}, Session.Secret)
#         #self.request.response.set_cookie("whodat", cookie, max_age=1)
#         self.request.response.delete_cookie("whodat")
#         self.__ctx.logout()
#
#
#     def changed(self):
#         """ Mark the session as changed. A user of a session should
#         call this method after he or she mutates a mutable object that
#         is *a value of the session* (it should not be required after
#         mutating the session itself).  For example, if the user has
#         stored a dictionary in the session under the key ``foo``, and
#         he or she does ``session['foo'] = {}``, ``changed()`` needn't
#         be called.  However, if subsequently he or she does
#         ``session['foo']['a'] = 1``, ``changed()`` must be called for
#         the sessioning machinery to notice the mutation of the
#         internal dictionary."""
#         raise NotImplementedError()
#
#
#     def flash(self, msg, queue='', allow_duplicate=True):
#         storage = self.setdefault('_f_' + queue, [])
#         if allow_duplicate or (msg not in storage):
#             storage.append(msg)
#             print storage
#             # """ Push a flash message onto the end of the flash queue represented
#             # by ``queue``.  An alternate flash message queue can used by passing
#             # an optional ``queue``, which must be a string.  If
#             # ``allow_duplicate`` is false, if the ``msg`` already exists in the
#             # queue, it will not be readded."""
#             # raise NotImplementedError()
#
#     def pop_flash(self, queue=''):
#         return self.pop('_f_' + queue, [])
#         # """ Pop a queue from the flash storage.  The queue is removed from
#         # flash storage after this message is called.  The queue is returned;
#         # it is a list of flash messages added by
#         # :meth:`pyramid.interfaces.ISesssion.flash`"""
#         # raise NotImplementedError()
#
#     def peek_flash(self, queue=''):
#         temp = self.get('_f_' + queue, [])
#         return temp
#         # """ Peek at a queue in the flash storage.  The queue remains in
#         # flash storage after this message is called.  The queue is returned;
#         # it is a list of flash messages added by
#         # :meth:`pyramid.interfaces.ISesssion.flash`
#         # """
#         # raise NotImplementedError()
#
#     def new_csrf_token(self):
#         """ Create and set into the session a new, random cross-site request
#         forgery protection token.  Return the token.  It will be a string."""
#         token = str(uuid.uuid1())
#         self.__token = token
#         return token
#
#
#     def get_csrf_token(self):
#         """ Return a random cross-site request forgery protection token.  It
#         will be a string.  If a token was previously added to the session via
#         ``new_csrf_token``, that token will be returned.  If no CSRF token
#         was previously set into the session, ``new_csrf_token`` will be
#         called, which will create and set a token, and this token will be
#         returned.
#         """
#         token = self.__token
#         if token is None:
#             return self.new_csrf_token()
#         return token
#
#     # mapping methods
#     def __getitem__(self, key):
#         """Get a value for a key
#
#         A ``KeyError`` is raised if there is no value for the key.
#         """
#         return self.__state[key]
#
#     def get(self, key, default=None):
#         """Get a value for a key
#
#         The default is returned if there is no value for the key.
#         """
#         return self.__state.get(key, default)
#
#     def __delitem__(self, key):
#         """Delete a value from the mapping using the key.
#
#         A ``KeyError`` is raised if there is no value for the key.
#         """
#         self.__state.__delitem__(key)
#
#
#     def __setitem__(self, key, value):
#         """Set a new item in the mapping."""
#         self.__state[key] = value
#
#     def keys(self):
#         """Return the keys of the mapping object.
#         """
#         return self.__state.keys()
#
#     def values(self):
#         """Return the values of the mapping object.
#         """
#         return self.__state.values()
#
#     def items(self):
#         """Return the items of the mapping object.
#         """
#         return self.__state.items()
#
#     def iterkeys(self):
#         "iterate over keys; equivalent to __iter__"
#         return self.__state.iterkeys()
#
#     def itervalues(self):
#         "iterate over values"
#         return self.__state.itervalues()
#
#     def iteritems(self):
#         "iterate over items"
#         return self.__state.iteritems()
#
#     def clear(self):
#         "delete all items"
#         self.__state.clear()
#
#     def update(self, d):
#         " Update D from E: for k in E.keys(): D[k] = E[k]"
#         for key in d.keys():
#             self._state[key] = d[key]
#
#
#     def setdefault(self, key, default=None):
#         " D.setdefault(k[,d]) -> D.get(k,d), also set D[k]=d if k not in D "
#         return self.__state.setdefault(key, default)
#
#     def pop(self, k, *args):
#         """remove specified key and return the corresponding value
#         ``*args`` may contain a single default value, or may not be supplied.
#         If key is not found, default is returned if given, otherwise
#         ``KeyError`` is raised"""
#         return self.__state.pop(k, *args)
#
#     def popitem(self):
#         """remove and return some (key, value) pair as a
#         2-tuple; but raise ``KeyError`` if mapping is empty"""
#         return self.__state.popitem()
#
#     def __len__(self):
#         """Return the number of items in the session."""
#         return self.__state.__len__()
#
#     def __iter__(self):
#         """Return an iterator for the keys of the mapping object."""
#         return self.__state.__iter__()
#
#     def __contains__(self, key):
#         """Return true if a key exists in the mapping."""
#         return self.__state.__contains__(key)
