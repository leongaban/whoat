from .. import SmartView
from fusion import tools
from pyramid.view import view_config


class Search(SmartView):
    template = "contacts/search.mak"

    @view_config(route_name="search", request_method="GET")
    @view_config(route_name="search:query", request_method="GET")
    @view_config(route_name="search:label", request_method="GET")
    def get(self):
        if self.bounced is True:
            return self.redirect()

        dic = {}
        member = self.member
        dic['member'] = member
        dic['badges'] = self.get_badges()
        dic['recent'] = self.get_recent_searches(limit=5)
        dic['member_label'] = member.label
        query = self.param("query")
        search_label = self.param("label")
        offset = self.param("offset")
        limit = self.param("limit")
        offset = int(offset) if offset is not None else 0
        limit = int(limit) if limit is not None else 200

        query = tools.xpath_sanitize(query)
        contacts = self.search(query, offset=offset, limit=limit)
        search_count = len(contacts)

        #determine which network icons to highlight for each search result
        has_personal = False
        has_organization = False
        has_group = False
        has_friend = False

        for contact in contacts:
            num_personal = 0
            num_organization = 0
            num_group = 0
            num_friend = 0

            for network in contact['networks']:
                type = network['type'].lower()
                if type == 'personal':
                    num_personal += network['count']
                    has_personal = True
                elif type == 'organization' or type == 'company' or type == 'default':
                    num_organization += network['count']
                    has_organization = True
                elif type == 'group':
                    num_group += network['count']
                    has_group = True
                elif type == 'friends':
                    num_friend += network['count']
                    has_friend = True

            network['personal_count'] = num_personal
            network['organization_count'] = num_organization
            network['group_count'] = num_group
            network['friend_count'] = num_friend

        dic['contacts'] = contacts
        dic['query'] = query
        # dic['network'] = network
        dic['has_personal'] = has_personal
        dic['has_organization'] = has_organization
        dic['has_group'] = has_group
        dic['has_friend'] = has_friend
        dic['search_count'] = search_count
        dic['search_label'] = search_label

        self.storage.pop("searches")# remove the searches history

        return self.render(dic)


class Recent(SmartView):
    template = "contacts/recents.mak"

    @view_config(route_name="recent", request_method="GET")
    def get(self):
        if self.bounced is True:
            return self.redirect()

        dic = {}
        member = self.member
        dic['member'] = member
        dic['member_label'] = member.label
        dic['badges'] = self.get_badges()
        searches = self.get_recent_searches()
        dic['recents'] = searches
        dic['recent'] = searches[:5]

        return self.render(dic)