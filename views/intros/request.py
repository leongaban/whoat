from fusion import tools
import random
from .. import SmartView
from pyramid.view import view_config


class IntroRequest(SmartView):

    # CREATE REQUEST
    @view_config(route_name="introduction:request", request_method="POST")
    def create_request(self):

        contact_id = self.body["params"]["contact_id"]
        message = self.body["params"]["message"]
        networks = self.body["params"]["networks"]
        bounty = self.body["params"]["bounty"]
        networks = [int(network["id"]) for network in networks]

        try:
            self.introductions.request(contact_id, message=message, networks=networks, bounty=bounty)
            # count = self.introductions.request(contact_id, message=message, networks=networks)
            # print "sent intro request to %s people" % str(count)
            # value = {'result': 'success', 'message': 'sent intro request to %s people' % str(count)}
            value = {'result': 'success', 'message': 'sent'}
            return self.emit_json(value)

        except Exception, err:
            value = {'result': 'error', 'message': err}
            return self.emit_json(value)

    # ACCEPT INTRO REQUEST
    @view_config(route_name="accept:request", request_method='POST')
    def accept_intro_request(self):
        success_msg = ["You accepted the request"]

        try:
            id, response = self.param("id"), self.param("response")

            self.ctx.messaging.accept(id, response)
            value = {'result': 'success', 'message': random.choice(success_msg)}
            return self.emit_json(value)

        except Exception, err:
            print err
            value = {'result': 'error', 'message': err}
            return self.emit_json(value)

    # DECLINE REQUEST
    @view_config(route_name="deny:request", request_method='POST')
    def deny_request(self):
        try:
            id, response = self.param("id"), self.param("response")
            self.ctx.messaging.decline(id, response)
            value = {'result': 'success', 'message': 'Request has been declined'}

        except Exception, err:
            value = {'result': 'error', 'message': 'There was an error with denying this request'}
            print err

        return self.emit_json(value)

    # DELETE INBOX MESSAGE
    @view_config(route_name="delete_inbox:request", request_method='POST')
    def delete_inbox_request(self):
        try:
            id = int(self.request.matchdict['message_id'])
            self.ctx.messaging.delete(id)
            value = {'result': 'success', 'message': 'Done, ah if only taking out the trash was so easy'}

        except Exception, err:
            value = {'result': 'error', 'message': 'There was an error with deleting this request'}
            print err

        return self.emit_json(value)

    # DELETE INBOX MESSAGE
    @view_config(route_name="delete_outbox:request", request_method='POST')
    def delete_outbox_request(self):
        try:
            id = int(self.request.matchdict['message_id'])
            self.ctx.messaging.delete(id)
            value = {'result': 'success', 'message': 'Deleted'}

        except Exception, err:
            value = {'result': 'error', 'message': 'There was an error with deleting this request'}
            print err

        return self.emit_json(value)