from . import ReportView
from pyramid.view import view_config
import urllib
import copy


class OnBoard(ReportView):
    template = "reports/reports_container.mak"

    @view_config(route_name="reports_on_board", request_method="GET")
    @view_config(route_name="reports_on_board", request_method="POST")
    def get(self):
        builder = self.builder
        whodat_admin = False
        approved_user = False
        report = {}
        onboard = {}
        org_org = {}
        org_drop_down = {}
        temp_drop_down = {}
        emptyy = {}
        emptyy['title'] = 0
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
                networks.append(org_selected)
            else:
                if len(builder.companies) > 0:
                    networks.append(builder.companies[0].network_id)
                elif len(builder.member.groups) > 0:
                    for group in builder.member.groups:
                        networks.append(group.network_id)
                else:
                    networks.append(builder.member.network_id)

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

        member_network_clause = "SELECT MemberID FROM network_member WHERE NetworkID IN({networks})"\
            .format(networks=networks)
        distinct_member_network_clause = "SELECT DISTINCT MemberID FROM network_member WHERE NetworkID IN({networks})"\
            .format(networks=networks)

        page = "onboard"
        report["page"] = page
        report["onboard"] = onboard
        report["organization"] = org_org
        report['org_drop_down'] = org_drop_down
        report['whodat_admin'] = whodat_admin
        report['approved_user'] = approved_user

        member = self.member
        report['member'] = member
        report['member_label'] = member.label
        record = {}

        empty_record = dict()
        empty_record["name"] = 0
        empty_record["username"] = 0
        empty_record["registered"] = 0
        empty_record["users_w_contacts"] = 0
        empty_record["users_w_introductions"] = 0
        empty_record["users_w_searches"] = 0
        empty_record["users_w_invites"] = 0
        empty_record["c_invited"] = 0

        users = builder.scalars("""
            select
                m.label as c_name,
                m.username as c_username,
                m.id as id
            from network n
            join network_member nm on nm.NetworkID = n.id
            join member m on m.id = nm.MemberID
            where n.id IN({networks})
            group by m.id
        """.format(networks=networks))

        for i in users:
            if i["id"] in onboard:
                record = onboard[i["id"]]
            else:
                onboard[i["id"]] = copy.deepcopy(empty_record)
                record = onboard[i["id"]]
            record["name"] = i["c_name"]
            record["username"] = i["c_username"]
            record['member_id'] = i['id']

        registered = builder.scalars("""
            SELECT
                m.id as id,
                m.verified as registered
            FROM network AS n
            JOIN network_member nm ON nm.NetworkID = n.ID
            JOIN member m ON m.id = nm.MemberID
            WHERE m.verified = 1 and m.ID IN({clause})
            group by m.id;
            """.format(clause=distinct_member_network_clause))

        for i in registered:
            if i["id"] in onboard:
                record = onboard[i["id"]]
            else:
                onboard[i["id"]] = copy.deepcopy(empty_record)
                record = onboard[i["id"]]
            record["registered"] = i["registered"]

        users_w_contacts = builder.scalars("""
            SELECT
                mem_id as id,
                cntct_count AS users_w_contacts
            FROM(
                SELECT
                    m.id AS mem_id,
                    COUNT(distinct c.rootid) as cntct_count
                FROM member AS m
                JOIN contact c ON m.id=c.memberid
                WHERE m.ID IN({clause})
                GROUP BY m.id
            ) AS t
            JOIN network_member nm ON nm.memberid = mem_id
            JOIN network n ON n.id = nm.networkid
            GROUP BY mem_id;
            """.format(clause=distinct_member_network_clause))

        for i in users_w_contacts:
            if i["id"] in onboard:
                record = onboard[i["id"]]
            else:
                onboard[i["id"]] = copy.deepcopy(empty_record)
                record = onboard[i["id"]]
            record["users_w_contacts"] = i["users_w_contacts"]

        users_w_introductions = builder.scalars("""
            SELECT
                mem_id as id,
                number_with_intros AS users_w_introductions
            FROM (
                SELECT
                    m.id AS mem_id,
                    COUNT(DISTINCT i.id) AS number_with_intros
                FROM introduction AS i
                JOIN member m ON m.id = i.memberID
                WHERE m.ID IN({clause})
                GROUP BY m.ID
            ) AS temp
            JOIN network_member nm ON nm.MemberID = mem_id
            JOIN network n ON n.id = nm.NetworkID
            GROUP BY mem_id;
            """.format(clause=member_network_clause))

        for i in users_w_introductions:
            if i["id"] in onboard:
                record = onboard[i["id"]]
            else:
                onboard[i["id"]] = copy.deepcopy(empty_record)
                record = onboard[i["id"]]
            record["users_w_introductions"] = i["users_w_introductions"]

        users_w_searches = builder.scalars("""
            SELECT
                m.id as id,
                count(distinct s.id) as users_w_searches
            FROM search_queries AS s
            JOIN member m ON m.id = s.MemberID
            JOIN network_member nm ON nm.MemberID = m.ID
            JOIN network n ON n.id = nm.NetworkID
            where m.id IN({clause})
            group by m.id;
            """.format(clause=member_network_clause))

        for i in users_w_searches:
            if i["id"] in onboard:
                record = onboard[i["id"]]
            else:
                onboard[i["id"]] = copy.deepcopy(empty_record)
                record = onboard[i["id"]]
            record["users_w_searches"] = i["users_w_searches"]

        users_w_invites = builder.scalars("""
            SELECT
                m.id as id,
                count(distinct i.id) as users_w_invites
            FROM invitation AS i
            JOIN member m ON m.id = i.MemberID
            JOIN network_member nm ON nm.MemberID = m.ID
            JOIN network n ON n.id = nm.NetworkID
            where m.id IN({clause})
            group by m.id;
            """.format(clause=member_network_clause))

        for i in users_w_invites:
            if i["id"] in onboard:
                record = onboard[i["id"]]
            else:
                onboard[i["id"]] = copy.deepcopy(empty_record)
                record = onboard[i["id"]]
            record["users_w_invites"] = i["users_w_invites"]

        title_drop = another_org_select_list + another_group_select_list
        if len(title_drop) > 0:
            org_org['title'] = title_drop[0]['title']
            org_org['net_id'] = title_drop[0]['id']
        else:
            org_org['title'] = "Your Company"
            org_org['net_id'] = 0

        org_org['registered'] = len(registered)
        org_org['users_w_contacts'] = len(users_w_contacts)
        org_org['users_w_introductions'] = len(users_w_introductions)
        org_org['users_w_searches'] = len(users_w_searches)

        # member = self.member
        newbie = self.ctx.session.newbie
        
        report['newbie'] = newbie
        report['verified'] = None
        # report['member'] = member
        report['badges'] = self.get_badges()
        report['recent'] = self.get_recent_searches(limit=5)

        if newbie is True:
            session = self.ctx.session
            try:
                state = session.state
                state.pop("newbie")
            except:
                pass

            try:
                session.save_state()
            except:
                pass

        # if member has not verified, notify them
        if self.member.is_verified is False:
            report['verified'] = False
        else:
            report['verified'] = True

        return self.render(report)

    # def obj_to_clean(self, obj):
    #     out_list = []
    #     added_keys = set()
    #     for row in obj: #tuples here because they are hashable
    #         finder = tuple(row['c_username'])
    #         if finder not in added_keys:
    #             out_list.append(row)
    #             added_keys.add(finder)
    #     return out_list
