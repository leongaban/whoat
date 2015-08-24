from .. import SmartView
from pyramid.view import view_config



class Companies(SmartView):
    restrict_access = False
    friend_mak = "dashboard/ftue/company_alert_triggers.mak"

    @view_config(route_name="companies", request_method="GET")
    @view_config(route_name="companies:param", request_method="GET")
    def get(self):
        txt = self.param("param")
        companies = self.organizations.autocomplete(txt)

        # for x, c in enumerate(companies):
        #     abc = c.members.__len__()
        #     members = self.ctx.query("SELECT COUNT(DISTINCT MemberID) FROM network_member WHERE NetworkID={id};".format(id=c.network_id)).scalar()
        #     if members is None:
        #         members = 0
        #     o = {"id": c.id, "label": c.label, "members": members}
        #     companies[x] = o

        # company_list = [{'id': c.id, 'label': c.label, 'members': c.members.__len__()} for c in companies]
        company_list = [{'id': c.id, 'label': c.label} for c in companies]
        companies = {'companies': company_list}
        # return self.write(companies)
        return self.render(companies, template=Companies.friend_mak)
