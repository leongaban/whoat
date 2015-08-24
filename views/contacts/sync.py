from .. import SmartView
from pyramid.view import view_config


class Invite(SmartView):
    template = "contacts/sync.mak"

    @view_config(route_name="sync", request_method="GET")
    def get(self):
        if self.bounced is True:
            return self.redirect()

        dic = {}
        member = self.member
        streams = self.member.contact_streams
        dic['member'] = member
        dic['badges'] = self.get_badges()
        dic['recent'] = self.get_recent_searches(limit=5)
        dic['member_label'] = member.label
        dic["streams"] = streams
        return self.render(dic)

    @view_config(route_name="sync_exchange", request_method='POST')
    def syncExchange(self):

        type, username, password, domain, server = self.param("type"), self.param("email"), self.param("password"), self.param("domain"), self.param("server")

        try:
            if type == 'simple':
                contacts = self.ctx.exchange.authenticate(username, password).snarf()
            elif type == 'advanced':
                contacts = self.ctx.exchange.authenticate(username, password, domain, server).snarf()

            total_contacts = len(contacts)
            value = {'result': 'success', 'message': 'Your %s Exchange contacts have been synced.' % str(total_contacts), 'total': str(total_contacts)}

        except Exception, err:
            print err

            if type == 'simple':
                value = {'result': 'error', 'message': 'Please check your username/password'}
            elif type == 'advanced':
                value = {'result': 'error', 'message': 'Please verify that all your info is correct, or contact support for help'}

        return self.emit_json(value)


class updateExchangeRow(SmartView):
    template = "contacts/updated_exchange.mak"

    @view_config(route_name="get_exchange_stats", request_method='GET')
    def get_exchange_stats(self):
        dic = {}
        member = self.member
        streams = self.member.contact_streams
        dic['member'] = member
        dic['member_label'] = member.label
        dic["streams"] = streams
        return self.render(dic)


class updateGmailRow(SmartView):
    template = "contacts/updated_gmail.mak"

    @view_config(route_name="get_gmail_stats", request_method='GET')
    def get_gmail_stats(self):
        dic = {}
        member = self.member
        streams = self.member.contact_streams
        dic['member'] = member
        dic['member_label'] = member.label
        dic["streams"] = streams
        return self.render(dic)


class SyncHelp(SmartView):
    Template_Iphone = "modals/help_iphone.mak"
    Template_Outlook = "modals/help_outlook.mak"
    Template_Android = "modals/help_android.mak"

    dic = {}

    @view_config(route_name="help_iphone", request_method='GET')
    def help_iphone(self):
        return self.render(SyncHelp.dic, template=SyncHelp.Template_Iphone)

    @view_config(route_name="help_outlook", request_method='GET')
    def help_outlook(self):
        return self.render(SyncHelp.dic, template=SyncHelp.Template_Outlook)

    @view_config(route_name="help_android", request_method='GET')
    def help_android(self):
        return self.render(SyncHelp.dic, template=SyncHelp.Template_Android)
