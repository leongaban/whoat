from .. import SmartView
from pyramid.view import view_config


class Inbox(SmartView):
    template = "messages/message_list.mak"
    model_type = "message"

    @view_config(route_name="inbox", request_method="GET")
    def get(self):
        if self.bounced is True:
            return self.redirect()

        dic = {}
        type = {}
        member = self.member
        messages_inbox = self.ctx.messaging.inbox
        messages_inbox_total = len([m for m in messages_inbox])
        messages_outbox_unread = self.ctx.messaging.get_outbox_unread_count()
        messages_inbox_unread = self.ctx.messaging.get_inbox_unread_count()

        dic['member'] = member
        dic['badges'] = self.get_badges()
        dic['recent'] = self.get_recent_searches(limit=5)
        dic['messages_inbox'] = messages_inbox
        dic['messages_inbox_total'] = messages_inbox_total
        dic['messages_outbox_unread'] = messages_outbox_unread
        dic['messages_inbox_unread'] = messages_inbox_unread
        type['message_type'] = "inbox"
        dic['type'] = type

        return self.render(dic)


class FetchInboxList(SmartView):
    template = "messages/fetch_inbox_list.mak"

    @view_config(route_name="get_inbox", request_method='GET')
    def get_inbox(self):

        dic = {}
        type = {}
        member = self.member
        messages_inbox = self.ctx.messaging.inbox
        messages_inbox_total = len(messages_inbox)
        messages_inbox = messages_inbox[:3] if len(messages_inbox) > 3 else messages_inbox
        messages_inbox_unread = len([m for m in messages_inbox if m["header"]['unread'] is True])

        dic['member'] = member
        dic['badges'] = self.get_badges()
        dic['messages_inbox'] = messages_inbox
        dic['messages_inbox_total'] = messages_inbox_total
        dic['messages_inbox_unread'] = messages_inbox_unread
        type['message_type'] = "inbox"
        dic['type'] = type

        return self.render(dic)


class FetchInboxCount(SmartView):
    template = "messages/fetch_inbox_count.mak"

    @view_config(route_name="get_inbox_count", request_method='GET')
    def get_inbox(self):

        dic = {}
        messages_inbox = self.ctx.messaging.inbox
        messages_inbox_total = len(messages_inbox)
        messages_inbox = messages_inbox[:3] if len(messages_inbox) > 3 else messages_inbox

        dic['badges'] = self.get_badges()
        dic['messages_inbox'] = messages_inbox
        dic['messages_inbox_total'] = messages_inbox_total

        return self.render(dic)


class FetchInboxUnread(SmartView):
    template = "messages/fetch_unread_count.mak"

    @view_config(route_name="get_inbox_unread", request_method='GET')
    def get(self):

        dic = {}
        dic['type'] = 'inbox'
        dic['badges'] = self.get_badges()

        return self.render(dic)