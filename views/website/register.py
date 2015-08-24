from .. import SmartView
from fusion import tools
from fusion.extension import Extension
from pyramid.view import view_config
# from www.engine import tools


class Register(SmartView):
    restrict_access = False
    template = "website/login_register.mak"

    @view_config(route_name="register", request_method="GET")
    def get(self):
        dic = {}
        obj = {"isRegisterActive": True}

        try:
            source = self.request.GET["source"]
            if tools.not_blank(source) is not None:
                obj["source"] = source
        except KeyError:
            pass

        try:
            #try and get the contact param, if specified, to auto-fill the form fields
            contact = self.request.GET["contact"]
            if tools.not_blank(contact) and contact != "0":
                o = tools.unpack(contact)
                invitation_id, member_id, contact_id, email = o["i"], o["m"], o["c"], o["e"]

                model = self.contacts.get(contact_id)
                if model is not None:
                    obj["email"] = email
                    obj["first_name"] = model.firstName
                    obj["last_name"] = model.lastName
                    obj["original"] = contact

        except KeyError:
            pass

        # except Exception, ex:
            # print ex.message

        dic['tab'] = 'register'
        dic['obj'] = obj
        return self.render(dic)

    @view_config(route_name="register", request_method="POST")
    def post(self):
        partner_id = self.storage["partner_id"]

        params = self.params

        try:
            email = str(self.param("username"))
            firstName = str(self.param("firstName"))
            lastName = str(self.param("lastName"))
            password = str(self.param("password"))

            if tools.is_blank(password) or len(password.strip()) < 6:
                value = {'result': 'error', 'message': 'The password is too short.'}
                return self.emit_json(value)

            source = "Website"

            try:
                source = self.param("register_source")
                if not source is True:
                    source = "Website"
                elif source.lower().find("partner") > -1:
                    source = source.split(":")[1]
                    source = int(source)
                    source = self.ctx.partners.get(source)

            except Exception, e:
                print e.message

            invitation_id = None
            automatic_verification = False

            try:
                contact = str(params["register_original"])
                # print contact
                if contact and contact != "0":
                    o = tools.unpack(contact)
                    i, m, c, e = o["i"], o["m"], o["c"], o["e"]
                    if e == email and i < 1 or c < 1:
                        if i > 0:
                            invitation_id = i
                        automatic_verification = True
            except:
                pass

            member = self.members.register(
                username=email,
                password=password,
                firstName=firstName,
                lastName=lastName,
                source=source,
                partner_id=partner_id,
                silent=automatic_verification
            )

            # print 'member = ', member
            if automatic_verification is True:
                self.ctx.impersonate(member)
                self.members.verify(email, member=member)

            if invitation_id is not None:
                self.members.notify_invitation_accepted(invitation_id, friend=email)

            if member is not None:
                self.request.session.impersonate(member.id)
                # self.ctx.impersonate(member.id)
                session = self.ctx.session

                try:
                    session.state["newbie"] = True
                    session.save_state()
                except:
                    pass

        except Exception, err:
            print err

            # if isinstance(err, UsernameTakenError):
            if err.message == "The username '" + email + "' has already been registered.":
                value = {'result': 'error', 'message': 'Email already registered'}

            else:
                value = {'result': 'error', 'message': 'There was an error registering you'}

            # value['isRegisterActive'] = True
            # value['first_name'] = firstName
            # value['last_name'] = lastName
            # value['email'] = email

            return self.emit_json(value)

        if member is not None:
            value = {'result': 'success'}
            return self.emit_json(value)

        value = {'result': 'success'}
        return self.emit_json(value)


class RegisterSuccess(SmartView):
    restrict_access = False
    template = "website/register_success.mak"
    # template = "website/verify.mak"

    @view_config(route_name="register_success", request_method="GET")
    def get(self):
        dic = {}

        return self.render(dic)


class AutoVerified(SmartView):
    restrict_access = False
    template = "website/auto_verified.mak"

    @view_config(route_name="auto_verify", request_method="GET")
    def get(self):
        dic = {}

        return self.render(dic)