from .. import SmartView
from pyramid.view import view_config
import random


class MyContacts(SmartView):
    template = "contacts/contacts.mak"
    model_type = "contact"

    @view_config(route_name="contacts", request_method="GET")
    def get(self):
        if self.bounced is True:
            return self.redirect()

        dic = {}
        member = self.member
        dic['member'] = member
        dic['badges'] = self.get_badges()
        dic['recent'] = self.get_recent_searches(limit=5)
        dic['member_label'] = member.label
        offset = self.param("offset")
        limit = self.param("limit")
        limit = 1000 if limit is None else limit
        offset = 0 if offset is None else offset
        keys = self.query("SELECT ID FROM contact WHERE MemberID=%s AND ID > %s ORDER BY ID ASC LIMIT %s;" % (str(self.member.id), str(offset), str(limit))).scalars()

        if len(keys) > 0:
            # contacts = self.contacts.get(keys)
            contacts = member.personal_contacts
            # objects = [c.objectify() for c in contacts]
            dic["contacts"] = contacts
            # dic['objects'] = objects
            return self.render(dic)

        return self.render(dic)

    @view_config(route_name="contact_hide", request_method='POST')
    @view_config(route_name="contacts_hide", request_method='POST')
    def hide(self):

        id = self.params['params']['id']

        if id is None:
            id = self.request.body
            if id.isdigit() is True:
                id = int(id)
            if id is None:
                raise Exception("The contact id parameter cannot be null!")

        if isinstance(id, basestring) is True:
            id = int(id)

        try:
            self.contacts.hide(id)
            value = {'result': 'success', 'message': "Contact has been hidden from network"}
            return self.emit_json(value)

        except Exception, err:
            print err
            value = {'result': 'error', 'message': "There was an error, please try again later"}
            return self.emit_json(value)

    @view_config(route_name="contact_show", request_method='POST')
    @view_config(route_name="contacts_show", request_method='POST')
    def show(self):

        id = self.params['params']['id']

        if id is None:
            id = self.request.body
            if id.isdigit() is True:
                id = int(id)
            if id is None:
                raise Exception("The contact id parameter cannot be null!")

        if isinstance(id, basestring) is True:
            id = int(id)

        try:
            self.contacts.unhide(id)
            value = {'result': 'success', 'message': "Contact now available for network search"}
            return self.emit_json(value)

        except Exception, err:
            print err
            value = {'result': 'error', 'message': "There was an error, please try again later"}
            return self.emit_json(value)

    @view_config(route_name="add_friend", request_method="GET")
    @view_config(route_name="add_friend", request_method="POST")
    def add_friend(self):

        id = self.param("id")

        if id is None:
            id = self.request.body
            if id.isdigit() is True:
                id = int(id)
            if id is None:
                raise Exception("The contact id parameter cannot be null!")

        if isinstance(id, basestring) is True:
            id = int(id)

        try:
            self.ctx.members.add_friends(id)
            value = {'result': 'success', 'message': 'Friend request sent!'}
            return self.emit_json(value)

        except Exception, err:
            value = {'result': 'error', 'message': err}
            print err

            return self.emit_json(value)

    @view_config(route_name="add_friend_email", request_method="POST")
    def add_friend_email(self):

        try:
            # params = self.params
            # email = str(self.param("email"))
            email = self.body['email']
            self.members.add_friend(email)

            value = {'result': 'success', 'message': email+' invited!'}
            return self.emit_json(value)

        except Exception, err:
            print err
            value = {'result': 'error', 'message': err}
            return self.emit_json(value)


    @view_config(route_name="un_friend", request_method="GET")
    @view_config(route_name="un_friend", request_method="POST")
    def un_friend(self):

        user_id = self.param("id")

        try:
            self.ctx.members.unfriend(user_id)
            value = {'result': 'success', 'message': 'Contact removed from friends network'}
            return self.emit_json(value)

        except Exception, err:
            value = {'result': 'error', 'message': err}
            print err

            return self.emit_json(value)