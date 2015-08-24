from .. import SmartView
from pyramid.view import view_config


class Browse(SmartView):
    restrict_access = False
    template = "contacts/browse.mak"

    def get_browse_data(self, browse_type):

        member = self.member
        browse_results = {'member': member, 'member_label': member.label}

        if browse_type == 'companies':
            companies = self.ctx.member.histogram().companies
            companies = sorted(companies, key=lambda o: o["label"], reverse=False)
            browse_results['companies'] = companies
            browse_results['tab'] = 'companies'

        elif browse_type == 'titles':
            titles = self.ctx.member.histogram().titles
            titles = sorted(titles, key=lambda o: o["label"], reverse=False)
            browse_results['titles'] = titles
            browse_results['tab'] = 'titles'

        else:  # else if regions do region stuff
            regions = self.ctx.member.histogram().locations
            regions = sorted(regions, key=lambda o: o["label"], reverse=False)
            browse_results['regions'] = regions
            browse_results['tab'] = 'regions'

        return browse_results

    @view_config(route_name="browse_companies", request_method="GET")
    @view_config(route_name="browse_companies:param", request_method="GET")
    def getCompanies(self):
        browse_results = self.get_browse_data('companies')
        browse_results['badges'] = self.get_badges()
        browse_results['recent'] = self.get_recent_searches(limit=5)
        return self.render(browse_results)

    @view_config(route_name="browse_titles", request_method="GET")
    @view_config(route_name="browse_titles:param", request_method="GET")
    def getTitles(self):
        browse_results = self.get_browse_data('titles')
        browse_results['badges'] = self.get_badges()
        browse_results['recent'] = self.get_recent_searches(limit=5)
        return self.render(browse_results)

    @view_config(route_name="browse_regions", request_method="GET")
    @view_config(route_name="browse_regions:param", request_method="GET")
    def getRegions(self):
        browse_results = self.get_browse_data('regions')
        browse_results['badges'] = self.get_badges()
        # browse_results['recent'] = self.members.search_history(limit=10)
        browse_results['recent'] = self.get_recent_searches(limit=5)
        return self.render(browse_results)