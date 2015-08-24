from .. import SmartView
from pyramid.view import view_config
from fusion import tools

class Connect(SmartView):
    """This is the view for connecting to 3rd party data sources."""

    @view_config(route_name="connect", request_method="GET")
    @view_config(route_name="connect:provider", request_method="GET")
    @view_config(route_name="connect:provider:stream", request_method="GET")
    def get(self):
        member = self.member
        if member is None:
            #TODO: Redirect to the login page
            raise Exception("You are not logged in!")


        callback = self.param("callback")
        if callback is not None:
            self.session["callback"] = callback

        provider_name = self.param("provider")
        provider = self.oauth(provider_name)

        uri = provider.generate_authorization_uri()
        return self.redirect(uri)


class ConnectCallback(SmartView):
    """This is the view for handling 3rd party api callbacks."""
    success = "connect/success.mak"

    @view_config(route_name="connect:provider:callback", request_method="GET")
    def get(self):
        if self.authenticated is False:
            return self.force_login()


        state = self.param("state")
        code = self.param("code")
        if code is None:
            code = self.param("oauth_token")
            if code is not None:
                verifier = self.param("oauth_verifier")
                if verifier is not None:
                    code = "%s\n%s" % (code, verifier)


        provider = self.oauth(state=state, code=code)

        #if provider.name.lower() == "gmail":
        #    accounts = provider.analytics_accounts()
        #    print "wtf..."

        #try:
        #    provider.fetch_token()
        #    token = provider.token
        #    return self.emit_json({"token": token})
        #except Exception, ex:
        #    return self.emit_json({"error": ex.message})

        #if provider.name.lower() == "hotmail" or provider.name.lower() == "yahoo":
        #    token = provider.fetch_token()
        #    return self.emit_json({"token": token})

        callback = self.session["callback"]
        if callback is not None:
            self.session.pop("callback")
            print callback


        try:
            if callback is not None:
                provider.refresh_token()
                return self.redirect(callback)

            contacts = provider.snarf()
            if provider.name.lower() == "yahoo":# or provider.name.lower() == "hotmail":
                return self.emit_json(contacts)

            o = {}
            o["total"] = len(contacts)
            o["message"] = "Your contacts have been synced."
            o["provider"] = provider.name
            return self.render(o, template=ConnectCallback.success)
        except Exception, err:
            print err
            return self.emit_json(err)