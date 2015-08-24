from .. import SmartView
from pyramid.view import view_config


class IntroModal(SmartView):
    template = "modals/modal_details.mak"

    @view_config(route_name="get_new_modal", request_method='GET')
    def get_new_modal(self):

        return self.render()