from . import SmartView
from pyramid.view import view_config
from fusion import tools


class Analytics(SmartView):
    template = "reports/reports_container.mak"

    @view_config(route_name="reports:analytics", request_method="GET")
    @view_config(route_name="reports:analytics", request_method="POST")
    def handle(self):
        #if self.body is None:
        #    return self.render()

        metrics, start_date, end_date = None, None, None

        if self.body is not None:
            if 'start' in self.body:
                start_date = self.body['start']
            if 'end' in self.body:
                end_date = self.body['end']

            if 'metrics' in self.body:
                metrics = self.body['metrics']

        if start_date is None:
            start_date = "2014-01-01"
        if end_date is None:
            end_date = "2014-01-01"
        if metrics is None:
            metrics = ["sessions", "pageviews"]
        analytics = self.oauth("rodenberg@gmail.com").analytics
        points = analytics.datapoints(start_date, end_date, metrics)
        print "WOMP!"
        return self.render()