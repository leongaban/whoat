import random
from .. import SmartView
from pyramid.view import view_config


class Invite(SmartView):
    template = "contacts/invite.mak"

    @view_config(route_name="invite", request_method="GET")
    def get(self):
        if self.bounced is True:
            return self.redirect()

        dic = {}
        coworkers = self.member.coworkers
        member = self.member
        dic['member'] = member
        dic['badges'] = self.get_badges()
        dic['recent'] = self.get_recent_searches(limit=5)
        dic['member_label'] = member.label
        dic['coworkers'] = coworkers
        return self.render(dic)

    @view_config(route_name="invite:coworkers", request_method='POST')
    def inviteCoworkers(self):
        success_msgs = ["Thanks for inviting your colleague!"]
        error_msgs = ['You have no coworkers selected to invite', 'Select at least 1 coworker to invite :)']

        try:
            contact_ids = self.body
            contacts = contact_ids.values()

            if len(contacts) > 1:
                success_msgs = ["Thanks for inviting your colleagues!"]

            # contacts = []
            # for key, value in contact_ids.iteritems():
            #     contacts.append(value)

            self.ctx.members.invite_to_whoat(contacts)
            value = {'result': 'success', 'message': success_msgs}

        except Exception, err:
            print err
            contacts = []
            self.ctx.members.invite_to_whoat(contacts)
            value = {'result': 'error', 'message': random.choice(error_msgs)}

        return self.emit_json(value)

    @view_config(route_name="preview:invite", request_method='POST')
    def previewInvite(self):

        try:
            self.ctx.members.invite_to_whoat(preview=True)
            value = {'result': 'success', 'message': 'Preview invite sent, check your email.'}

        except Exception, err:
            value = {'result': 'error', 'message': 'There was a server error, try again later.'}
            print err

        return self.emit_json(value)