from .. import SmartView
from pyramid.view import view_config
from fusion import tools

class OAuth2(SmartView):
    """This is the view for letting 3rd parties connect to our api."""
    agreement_template = "connect/authorize.mak"

    @view_config(route_name="oauth2", request_method="GET")
    def get(self):
        redirect_url = self.param("redirect_url", "redirect_uri", "callback")
        state = self.param("state")
        partner_id = self.storage["partner_id"]
        if partner_id is None:
            client_id = self.param("client_id")
            client_secret = self.param("client_secret")
            partner = self.ctx.partners.find_partner_app(client_id, client_secret)
            if partner is None:
                raise Exception("The client_id and/or client_secret are not valid.")
        else:
            partner = self.ctx.partners.find_partner_app(partner_id)

        if self.authenticated is False:
            self.storage["partner_id"] = partner.id
            return self.force_login()

        if tools.not_blank(redirect_url):
            redirect_url = redirect_url.strip().lower()
            if partner.redirect_uri != redirect_url:
                print "not match!"

        if tools.is_blank(redirect_url):# or partner.redirect_url != redirect_url.strip().lower():
            raise Exception("The redirect url is not valid.")

        if state is not None and isinstance(state, basestring) is False:
            state = tools.stringify(state)

        member = self.member
        if partner.is_linked(member) is False:
            #the member has not signed an agreement for this partner
            template = OAuth2.agreement_template
            roundtrip = self.ctx.codex.encode_key(partner.id)
            object = partner.deflate()

            object["roundtrip"] = roundtrip
            object["state"] = state
            #object["redirect"] = redirect_url
            return self.render(template, partner=object)

        if redirect_url is None or len(redirect_url) < 2:
            redirect_url = partner.redirect_url

        code = partner.subscribe(member)

        if state is not None:
            return self.redirect(redirect_url, code=code, state=state)
        return self.redirect(redirect_url, code=code)


    @view_config(route_name="oauth2:agree", request_method="POST")
    def agree(self):
        if self.authenticated is False:
            return self.force_login()

        state = self.request.POST["state"]
        roundtrip = self.request.POST["roundtrip"]

        partner_id = self.ctx.codex.decode_key(roundtrip)
        partner = self.ctx.partners.get_app(partner_id)
        redirect_url = partner.redirect_uri

        member = self.member
        code = partner.subscribe(member)
        #partner.create_agreement(member)
        #code = partner.create_access_code(member)
        if tools.is_blank(state):
            return self.redirect(redirect_url, code=code)

        return self.redirect(redirect_url, code=code, state=state)


    #@view_config(route_name="oauth2:token", request_method='GET')
    @view_config(route_name="oauth2:token", request_method='POST')
    def token(self):
        code = self.param("code")
        client_id = self.param("client_id")
        client_secret = self.param("client_secret")
        partner = self.ctx.partners.find_partner_app(client_id, client_secret)
        if partner is None:
            raise Exception("The client_id and/or client_secret are not valid.")

        token = partner.create_token(code)
        obj = {"access_token": token}
        return self.emit_json(obj)