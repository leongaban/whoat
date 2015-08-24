from .. import SmartView
from pyramid.view import view_config
import random
from fusion import tools


class Profile(SmartView):
    template = "member/profile.mak"

    @view_config(route_name="profile", request_method="GET")
    def get(self):
        dic = {}
        member = self.member
        dic['member'] = member
        dic['badges'] = self.get_badges()
        dic['recent'] = self.get_recent_searches(limit=5)
        if hasattr(member, 'profile'):
            dic['profile'] = member.profile
        else:
            dic['profile'] = None
        dic['born'] = member.born_on_date
        # dic['enterprise'] = member.is_whoat_admin
        dic['enterprise'] = member.is_enterprise_account
        if hasattr(member, 'groups'):
            dic['groups'] = member.groups
        else:
            dic['groups'] = None
        if hasattr(member, 'proxy'):
            dic['proxy'] = member.proxy
        else:
            dic['proxy'] = None
        dic['subscribe'] = member.options.mail_flag
        return self.render(dic)

    @view_config(route_name="save_profile", request_method='POST')
    def save(self):
        success_msgs = ['Saved! Thanks for updating!', "Profile Saved, doesn't it feel great to be updated?"]
        error_msgs = ["Please use valid emails and phone numbers"]

        try:
            if 'params' in self.body:
                params = self.body['params']
            if 'firstName' in params and 'lastName' in params:
                first_name, last_name = params["firstName"], params["lastName"]
            if 'organization' in params and 'title' in params:
                organization, title = params["organization"], params["title"]
            if 'phones' in params and 'emails' in params and 'deleted' in params:
                phones, emails, remove = params["phones"], params["emails"], params["deleted"]

            # proxy = params['proxy']
            # proxy_label = params['proxy_label']
            #
            # if proxy == "Admin email here":
            #     self.member.clear_contact_proxy()
            # else:
            #     self.member.set_contact_proxy(proxy, label=proxy_label)

            for e in emails:
                e['key'] = str(e['key'])
                e['label'] = str(e['label'])
                e['tag'] = str(e['tag'])

            for p in phones:
                p['label'] = str(p['label'])
                p['tag'] = str(p['tag'])

            for r in remove:
                r = str(r)

            self.profiles.update(
                firstName=first_name,
                lastName=last_name,
                organization=organization,
                title=title,
                emails=emails,
                phones=phones,
                remove=remove
            )

            value = {'result': 'success', 'message': random.choice(success_msgs)}
            return self.emit_json(value)

        except Exception, err:
            print err
            value = {'result': 'error', 'message': err}
            return self.emit_json(value)

    @view_config(route_name="join_group", request_method='GET')
    @view_config(route_name="join_group", request_method='POST')
    def join_group(self):
        table = self.request.POST
        code = table.keys()[0]
        code = code.replace('"', '').strip()
        member = self.member

        if code is None:
            value = {'result': 'error', 'message': "Please specify a valid group code."}
            return self.emit_json(value)

        groups = member.groups
        groups = [g for g in groups if g.code.lower() == code.lower()]
        if len(groups) > 0:
            value = {'result': 'error', 'message': "You are already a member of that group."}
            return self.emit_json(value)

        # code = code.strip()
        # group = member.subscribe(code)
        # if group is None:
        #     value = {'result': 'error', 'message': "Invalid group code."}
        #     return self.emit_json(value)


        try:
            group = self.ctx.groups.get(code)
            member.subscribe(code)
            success_msgs = ['Success! You are now a member of '+group.label]
            value = {'result': 'success', 'message': random.choice(success_msgs)}
            return self.emit_json(value)

        except Exception, ex:
            print ex.message
            value = {'result': 'error', 'message': "You cannot join the group at this time."}
            return self.emit_json(value)

    @view_config(route_name="leave_group", request_method='GET')
    def leave_group(self):
        code = self.param("id")

        if code is None:
            value = {'result': 'error', 'message': "Please specify a valid group code."}
            return self.emit_json(value)

        group = self.ctx.groups.get(code)
        if group is None:
            value = {'result': 'error', 'message': "Invalid group code."}
            return self.emit_json(value)

        member = self.member
        groups = member.groups
        groups = [g for g in groups if g.id == group.id]

        if len(groups) == 0:
            value = {'result': 'error', 'message': "You are not currently a member of that group."}
            return self.emit_json(value)

        try:
            group.unsubscribe(member)
            value = {'result': 'success', 'message': 'You are no longer a member of ' + group.label + "."}
            return self.emit_json(value)

        except Exception, ex:
            print ex.message
            if ex.message == "You cannot leave your own group.":
                value = {'result': 'error', 'message': "You cannot leave the group you created."}
            else:
                value = {'result': 'error', 'message': "You cannot leave the group at this time."}
            return self.emit_json(value)

    @view_config(route_name="add_proxy", request_method='GET')
    @view_config(route_name="add_proxy", request_method='POST')
    def add_proxy(self):
        proxy = self.params.get('proxy', None)
        if proxy is not None:
            proxy = tools.html_sanitize(proxy)
        try:
            if proxy is None:
                self.member.clear_contact_proxy()
                value = {'result': 'success', 'message': 'You have removed your proxy email address.'}
            else:
                self.member.set_contact_proxy(proxy)
                value = {'result': 'success', 'message': 'You have added ' + proxy + " as your Admin Proxy email."}
            return self.emit_json(value)

        except Exception, e:
            print e
            value = {'result': 'error', 'message': "You cannot add a proxy email at this time."}
            return self.emit_json(value)

    @view_config(route_name="avatar_update", request_method='POST')
    def avatar_update(self):
        try:
            image = self.request.POST['datafile']
            self.ctx.members.update_avatar_image(image.file.read(), self.ctx.member)
            value = {'result': 'success', 'message': 'Updating Profile Pic! :)'}

        except Exception, ex:
            print ex.message
            value = {'result': 'error', 'message': "There was an error with the upload"}

        return self.emit_json(value)


class AddedGroup(SmartView):
    template = "member/added_group.mak"

    @view_config(route_name="show_group", request_method='GET')
    def show_group(self):

        dic = {}
        member = self.member
        dic['groups'] = member.groups
        return self.render(dic)


class UpdatePassword(SmartView):

    @view_config(route_name="update_password", request_method='GET')
    @view_config(route_name="update_password", request_method='POST')
    def update_password(self):

        old_pass = str(self.param("old_password"))
        new_pass = str(self.param("new_password"))

        try:
            self.ctx.members.change_password(current_password=old_pass, new_password=new_pass)
            value = {'result': 'success', 'message': "Password updated!"}
            return self.emit_json(value)

        except Exception, ex:
            print ex.message
            value = {'result': 'error', 'message': "Try again, make sure new password matches"}
            return self.emit_json(value)


class MakePrimary(SmartView):

    @view_config(route_name="make_primary", request_method='GET')
    @view_config(route_name="make_primary", request_method='POST')
    def make_primary(self):

        new_primary_email = str(self.param("primary_email"))
        current_password = str(self.param("current_pass"))

        try:
            self.ctx.members.change_username(email=new_primary_email, password=current_password)
            value = {'result': 'success', 'message': "Primary Email Updated!"}
            return self.emit_json(value)

        except Exception, ex:
            print ex.message
            value = {'result': 'error', 'message': "Try again, make sure password is correct."}
            return self.emit_json(value)


class UnsubcribeEmails(SmartView):
    @view_config(route_name="email_status", request_method='GET')
    def email_status(self):
        member = self.member
        status = member.options.mail_flag

        try:
            if status is True:
                member.options.mail_flag = False
                value = {'result': 'success', 'message': 'You have Unsubscribed from WhoAt emails.'}
                return self.emit_json(value)

            else:
                member.options.mail_flag = True
                value = {'result': 'success', 'message': 'You have Subscribed to WhoAt emails!'}
                return self.emit_json(value)

        except Exception, e:
            print e
            value = {'result': 'error', 'message': "You cannot Unsubscribed at this time."}
            return self.emit_json(value)