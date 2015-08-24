from . import ReportView
from pyramid.view import view_config
import urllib
import copy
from fusion import tools


class Search(ReportView):
    template = "reports/reports_container.mak"

    @view_config(route_name="reports_searches", request_method="GET")
    @view_config(route_name="reports_searches", request_method="POST")
    def get(self):
        builder = self.builder
        whodat_admin = False
        report = {}
        searched = {}
        org_org = {}
        org_drop_down = {}
        temp_drop_down = {}
        emptyy = {'title':  0}
        approved_user = False

        networks = []

        if builder.member.is_verified is False:
            networks = []

            #if whoat admin do admin stuff
        elif builder.member.is_whoat_admin is True:
           
            whodat_admin = True

        #if its an ajax request to this route
        if self.body is not None:
            if 'optionSelected' in self.body:
                org_selected = self.body['optionSelected']
                org_selected = urllib.unquote_plus(org_selected)
                org_selected = str(int(org_selected))
                if org_selected == '6':
                    networks = builder.scalars("SELECT DISTINCT ID from network")
                else:
                    networks.append(org_selected)
            #get all networks if a member of whoat
            elif len(builder.companies) > 0 and builder.companies[0].network_id == 6:
                networks = builder.scalars("SELECT DISTINCT ID from network")
            #regular customer, get their network info
            else:
                if len(builder.companies) > 0:
                    networks.append(builder.companies[0].network_id)
                elif len(builder.member.groups) > 0:
                    for group in builder.member.groups:
                        networks.append(group.network_id)
                else:
                    networks.append(builder.member.network_id)
        #get all networks if a member of whoat
        elif len(builder.companies) > 0 and builder.companies[0].network_id == 6:
            networks = builder.scalars("SELECT DISTINCT ID from network")
        #regular customer, get their network info
        else:
            if len(builder.companies) > 0:
                networks.append(builder.companies[0].network_id)
            elif len(builder.member.groups) > 0:
                for group in builder.member.groups:
                    networks.append(group.network_id)
            else:
                networks.append(builder.member.network_id)

        temp = builder.obj_clean(networks)
        networks = ",".join([str(n) for n in temp])

        words = tools.workspace("curses.txt").read_lines()
        naughty = [word.strip() for word in words]

        org_select_list = builder.scalars("""
            SELECT
                n.ID as id,
                o.networkid as n_id,
                o.label as title,
                SUM(cntct_count) AS users_w_contacts
            FROM(
                SELECT
                    m.id AS mem_id,
                    COUNT(distinct c.rootid) as cntct_count
                FROM member AS m
                JOIN contact c ON m.id=c.memberid
                GROUP BY m.id
            ) AS t
            JOIN network_member nm ON nm.memberid = mem_id
            JOIN network n ON n.id = nm.networkid
            JOIN organization o ON o.networkid = n.ID
            GROUP BY n.id
            ORDER BY title asc;
            """.format(networks=networks))

        group_select_list = builder.scalars("""
            SELECT
                n.ID as id,
                g.networkid as n_id,
                g.label as title,
                SUM(cntct_count) AS users_w_contacts
            FROM(
                SELECT
                    m.id AS mem_id,
                    COUNT(distinct c.rootid) as cntct_count
                FROM member AS m
                JOIN contact c ON m.id=c.memberid
                GROUP BY m.id
            ) AS t
            JOIN network_member nm ON nm.memberid = mem_id
            JOIN network n ON n.id = nm.networkid
            JOIN groups g ON g.networkid = n.ID
            GROUP BY n.id
            ORDER BY title asc;
            """.format(networks=networks))

        another_org_select_list = builder.scalars("""
            SELECT
                n.ID as id,
                o.networkid as n_id,
                o.label as title,
                SUM(cntct_count) AS users_w_contacts
            FROM(
                SELECT
                    m.id AS mem_id,
                    COUNT(distinct c.rootid) as cntct_count
                FROM member AS m
                JOIN contact c ON m.id=c.memberid
                GROUP BY m.id
            ) AS t
            JOIN network_member nm ON nm.memberid = mem_id
            JOIN network n ON n.id = nm.networkid
            JOIN organization o ON o.networkid = n.ID
            WHERE n.ID IN({networks})
            GROUP BY n.id
            ORDER BY title asc;
            """.format(networks=networks))

        another_group_select_list = builder.scalars("""
            SELECT
                n.ID as id,
                g.networkid as n_id,
                g.label as title,
                SUM(cntct_count) AS users_w_contacts
            FROM(
                SELECT
                    m.id AS mem_id,
                    COUNT(distinct c.rootid) as cntct_count
                FROM member AS m
                JOIN contact c ON m.id=c.memberid
                GROUP BY m.id
            ) AS t
            JOIN network_member nm ON nm.memberid = mem_id
            JOIN network n ON n.id = nm.networkid
            JOIN groups g ON g.networkid = n.ID
            WHERE n.ID IN({networks})
            GROUP BY n.id
            ORDER BY title asc;
            """.format(networks=networks))

        if whodat_admin is True:
            final_drop_down = org_select_list + group_select_list
        else:
            final_drop_down = another_org_select_list + another_group_select_list
        if len(final_drop_down) > 1:
            approved_user = True

        for i in final_drop_down:
            if i["id"] in org_drop_down:
                temp_drop_down = org_drop_down[i["id"]]
            else:
                org_drop_down[i["id"]] = copy.deepcopy(emptyy)
                temp_drop_down = org_drop_down[i["id"]]
            temp_drop_down["title"] = i['title']
            temp_drop_down['net_id'] = i['n_id']

        page = "searched"
        report["page"] = page
        report["searched"] = searched
        report["organization"] = org_org
        report['org_drop_down'] = org_drop_down
        report['whodat_admin'] = whodat_admin
        report['approved_user'] = approved_user

        member = self.member
        report['member'] = member
        report['member_label'] = member.label
        report['badges'] = self.get_badges()
        report['recent'] = self.get_recent_searches(limit=5)

        record = {}

        empty_record = dict()
        empty_record["organ"] = 0
        empty_record["searched_for"] = 0
        empty_record["num_searches"] = 0
        empty_record["most_recent"] = 0

        searching = builder.scalars("""
            SELECT
                if(s.Alias is not null, s.Alias, s.Term) as searched_for,
                if(o.label is not null, o.Label, g.Label) as organ,
                s.id as id,
                count(distinct s.id) as num_searches,
                min(date(s.datecreated)) as most_recent
            FROM search_queries AS s
            JOIN member m ON m.id = s.MemberID
            JOIN network_member nm ON nm.MemberID = m.ID
            JOIN network n ON n.id = nm.NetworkID
            left JOIN organization o ON o.NetworkID = n.ID
            left join groups g on g.NetworkID = n.ID
            where n.id IN({networks})
            group by searched_for
            order by num_searches desc;
            """.format(networks=networks))

        cleaned_search = self.fuck_filter(naughty, searching)

        for i in cleaned_search:
            if i["id"] in searched:
                record = searched[i["id"]]
            else:
                searched[i["id"]] = copy.deepcopy(empty_record)
                record = searched[i["id"]]
            record["organ"] = i["organ"]
            record["searched_for"] = i["searched_for"]
            record['num_searches'] = i['num_searches']
            record['most_recent'] = i['most_recent']

        title_drop = another_org_select_list + another_group_select_list
        if len(title_drop) > 0:
            org_org['title'] = title_drop[0]['title']
            org_org['net_id'] = title_drop[0]['id']
        else:
            org_org['title'] = "Your Company"
            org_org['net_id'] = 0

        return self.render(report)

    def fuck_filter(self, naughty_words, records):
        cnt = len(records)
        for x in xrange(cnt):
            r = records[x]
            txt = r["searched_for"].strip().lower()
            words = txt.split(" ")
            for word in words:
                if word in naughty_words:
                    records[x] = None
                    continue
        return [r for r in records if r is not None]
