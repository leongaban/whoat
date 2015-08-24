import random
from .. import SmartView
from pyramid.view import view_config


class Alerts(SmartView):
    page = "dashboard/pages/alerts.mak"
    added_row = "dashboard/widgets/alert_row.mak"
    add_fute = "dashboard/ftue/added_alert_triggers.mak"
    list = "dashboard/pages/alerts_rows.mak"
    widget_html = "dashboard/widgets/alerts.mak"


    # Alerts Page
    @view_config(route_name="alerts", request_method="GET")
    def get(self):
        dic = {}
        member = self.member
        dic['member'] = member
        dic['member_label'] = member.label
        dic['badges'] = self.get_badges()
        dic['recent'] = self.get_recent_searches(limit=5)
        return self.render(dic, template=Alerts.page)

    # Get Alerts list for Widget
    @view_config(route_name="get_alerts", request_method='GET')
    def get_alerts(self):
        dic = {}
        return self.render(dic, template=Alerts.widget_html)

    # Get Added Alerts List
    @view_config(route_name="show_all_alerts", request_method='GET')
    def show_all_alerts(self):
        dic = {}
        member = self.member
        dic['alerts'] = member.triggers
        return self.render(dic, template=Alerts.list)

    # Add alert from FTUE & Widget
    @view_config(route_name="add_company_alert", request_method='POST')
    def add_company_alert(self):
        dic = {}
        company_id = int(self.body["id"])
        member = self.member
        triggers = member.triggers

        for trigger in triggers:
            if trigger.company and trigger.company.id:
                if company_id == trigger.company.id:
                    value = {'result': 'error', 'message': 'You already added this Alert.'}
                    return self.emit_json(value)

        try:
            created_trigger = member.create_company_trigger(company_id)
            dic['trigger'] = created_trigger.id
            dic['label'] = created_trigger.company.label
            return self.render(dic, template=Alerts.add_fute)

        except Exception, err:
            print err
            value = {'result': 'error', 'message': err}
            return self.emit_json(value)

    # Add alert from page
    @view_config(route_name="add_alert_row", request_method='POST')
    def add_alert_page(self):
        dic = {}
        company_id = int(self.body["id"])
        member = self.member
        triggers = member.triggers

        for trigger in triggers:
            if trigger.company and trigger.company.id:
                if company_id == trigger.company.id:
                    value = {'result': 'error', 'message': 'You already added this Alert.'}
                    return self.emit_json(value)

        try:
            created_trigger = member.create_company_trigger(company_id)
            dic['trigger'] = created_trigger.id
            dic['label'] = created_trigger.company.label
            return self.render(dic, template=Alerts.added_row)

        except Exception, err:
            print err
            value = {'result': 'error', 'message': err}
            return self.emit_json(value)

    @view_config(route_name="delete_company_alert", request_method='POST')
    def delete_company_alert(self):
        company_id = int(self.body["id"])
        member = self.member
        # print company_id

        try:
            member.delete_trigger(company_id)
            value = {'result': 'success', 'message': 'Company alert deleted!'}
            return self.emit_json(value)

        except Exception, err:
            print err
            error = str(err)
            value = {'result': 'error', 'message': error}
            return self.emit_json(value)