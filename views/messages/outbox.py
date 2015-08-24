from .. import SmartView
from pyramid.view import view_config


class Outbox(SmartView):
    template = "messages/message_list.mak"
    model_type = "message"

    @view_config(route_name="outbox", request_method="GET")
    def get(self):
        if self.bounced is True:
            return self.redirect()

        dic = {}
        type = {}
        member = self.member
        messages_outbox = self.ctx.messaging.outbox
        messages_outbox_total = len(messages_outbox)
        messages_inbox_unread = self.ctx.messaging.get_inbox_unread_count()

        dic['member'] = member
        dic['badges'] = self.get_badges()
        dic['recent'] = self.get_recent_searches(limit=5)
        dic['messages_outbox'] = messages_outbox
        dic['messages_outbox_total'] = messages_outbox_total
        dic['messages_outbox_inbox'] = messages_inbox_unread
        type['message_type'] = "outbox"
        dic['type'] = type

        return self.render(dic)


class FetchOutboxList(SmartView):
    template = "messages/fetch_outbox_list.mak"

    @view_config(route_name="get_outbox", request_method='GET')
    def get_outbox(self):

        dic = {}
        type = {}
        member = self.member
        messages_outbox = self.ctx.messaging.outbox
        messages_outbox_total = len(messages_outbox)
        messages_outbox = messages_outbox[:3] if len(messages_outbox) > 3 else messages_outbox

        dic['member'] = member
        dic['badges'] = self.get_badges()
        dic['messages_outbox'] = messages_outbox
        dic['messages_outbox_total'] = messages_outbox_total
        type['message_type'] = "outbox"
        dic['type'] = type

        return self.render(dic)


class FetchOutboxCount(SmartView):
    template = "messages/fetch_outbox_count.mak"

    @view_config(route_name="get_outbox_count", request_method='GET')
    def get_outbox(self):

        dic = {}
        messages_outbox = self.ctx.messaging.outbox
        messages_outbox_total = len(messages_outbox)
        messages_outbox = messages_outbox[:3] if len(messages_outbox) > 3 else messages_outbox

        dic['badges'] = self.get_badges()
        dic['messages_outbox'] = messages_outbox
        dic['messages_outbox_total'] = messages_outbox_total

        return self.render(dic)


class FetchOutboxUnread(SmartView):
    template = "messages/fetch_unread_count.mak"

    @view_config(route_name="get_outbox_unread", request_method='GET')
    def get(self):

        dic = {}
        dic['type'] = 'outbox'
        dic['badges'] = self.get_badges()

        return self.render(dic)