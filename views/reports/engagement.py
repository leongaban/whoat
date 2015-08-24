from . import ReportView
from pyramid.view import view_config
import urllib
import copy
from datetime import date, timedelta
from fusion import tools


class Engagement(ReportView):
    template = "reports/reports_container.mak"

    @view_config(route_name="reports_engagement", request_method="GET")
    @view_config(route_name="reports_engagement", request_method="POST")
    def get(self):

        builder = self.builder
        whodat_admin = False
        report = {}
        engagement = {}
        org_org = {}
        org_drop_down = {}
        empty_drop = {'title': 0}
        approved_user = False
        networks = []
        start_date = None
        end_date = None

        if builder.member.is_verified is False:
            networks = []

            #if whoat admin do admin stuff
        elif builder.member.is_whoat_admin is True:
           
            whodat_admin = True

            #if its an ajax request to this route
        if self.body is not None:
            if 'start' in self.body:
                start_date = self.body['start']
            if 'end' in self.body:
                end_date = self.body['end']
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
        if start_date is not None:
            try:
                start_date = tools.stringify(tools.chronos.parse(start_date))
            except Exception, e:
                print(e)
                start_date = None

        if end_date is not None:
            try:
                end_date = tools.stringify(tools.chronos.parse(end_date))
            except Exception, e:
                print(e)
                end_date = None

        member_network_clause = "SELECT MemberID FROM network_member WHERE NetworkID IN({networks})"\
            .format(networks=networks)
        distinct_member_network_clause = "SELECT DISTINCT MemberID FROM network_member WHERE NetworkID IN({networks})"\
            .format(networks=networks)

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

        temp_drop_down = {}
        for i in final_drop_down:
            if i["id"] in org_drop_down:
                temp_drop_down = org_drop_down[i["id"]]
            else:
                org_drop_down[i["id"]] = copy.deepcopy(empty_drop)
                temp_drop_down = org_drop_down[i["id"]]
            temp_drop_down["title"] = i['title']
            temp_drop_down['net_id'] = i['n_id']
        
        page = "engage"
        report["page"] = page
        report["engagement"] = engagement
        report["organization"] = org_org
        report['org_drop_down'] = org_drop_down
        report['whodat_admin'] = whodat_admin
        report['approved_user'] = approved_user
        member = self.member
        report['member'] = member
        report['member_label'] = member.label
        report['badges'] = self.get_badges()
        report['recent'] = self.get_recent_searches(limit=5)

        if start_date is None:
            start_date = date(2012, 01, 01).strftime('%Y-%m-%d')
        if end_date is None:
            end_date = date.today().strftime('%Y-%m-%d')

        temp_date = date.today().strftime('%Y-%m-%d')

        if temp_date == end_date:
            end_date = (date.today() + timedelta(days=1)).strftime('%Y-%m-%d')

        record = dict()

        d = date(2000, 01, 01)

        empty_record = dict()
        empty_record['name'] = 0
        empty_record["username"] = 0
        empty_record["enterprise"] = 0
        empty_record["onboard_complete"] = 0
        empty_record["users_w_introductions"] = 0
        empty_record["users_w_accepted_req"] = 0
        empty_record["most_recent_intro"] = d
        empty_record["most_recent_intro_a"] = d
        empty_record["users_w_pending_req"] = 0
        empty_record["users_w_declined_req"] = 0
        empty_record["users_w_searches"] = 0
        empty_record["users_w_invites"] = 0
        empty_record["browse_searches"] = 0
        empty_record["bar_searches"] = 0
        empty_record["users_w_contacts"] = 0
        empty_record["users_w_friends"] = 0
        empty_record["users_w_friends_p"] = 0
        empty_record["most_recent_friend"] = 0
        empty_record["most_recent_friend_a"] = 0

        users = builder.scalars("""
            select 
                m.label as name,
                m.username as username,
                m.id as id
            from network n
            join network_member nm on nm.NetworkID = n.id
            join member m on m.id = nm.MemberID
            where n.id IN({networks})
            group by m.id
            """.format(networks=networks))
        for i in users:
            if i["id"] in engagement:
                record = engagement[i["id"]]
            else:
                engagement[i["id"]] = copy.deepcopy(empty_record)
                record = engagement[i["id"]]
            record["name"] = i["name"]
            record["username"] = i["username"]
            record['member_id'] = i['id']

        enterprise = builder.scalars("""
            SELECT
                m.id as id,
                r.label as enterprise
            FROM roles r
            join role_member rm on rm.RoleID = r.ID
            join member m on m.id = rm.MemberID
            JOIN network_member nm ON nm.MemberID = m.id
            JOIN network n ON n.id = nm.NetworkID
            where n.id IN({networks}) AND m.datecreated BETWEEN '{start}' AND '{end}'
            group by m.id;
            """.format(networks=networks, start=start_date, end=end_date))
        for i in enterprise:
            if i["id"] in engagement:
                record = engagement[i["id"]]
            else:
                engagement[i["id"]] = copy.deepcopy(empty_record)
                record = engagement[i["id"]]
            record["enterprise"] = i["enterprise"]
            record['member_id'] = i['id']

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
                WHERE m.ID IN({clause}) AND c.datecreated BETWEEN '{start}' AND '{end}'
                GROUP BY m.id
            ) AS t
            JOIN network_member nm ON nm.memberid = mem_id
            JOIN network n ON n.id = nm.networkid
            GROUP BY mem_id;
            """.format(clause=distinct_member_network_clause, start=start_date, end=end_date))
        org_contacts = 0
        for i in users_w_contacts:
            if i["id"] in engagement:
                record = engagement[i["id"]]
            else:
                engagement[i["id"]] = copy.deepcopy(empty_record)
                record = engagement[i["id"]]
            record["users_w_contacts"] = i["users_w_contacts"]
            org_contacts += i["users_w_contacts"]
            record['member_id'] = i['id']

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
                AND i.datecreated BETWEEN '{start}' AND '{end}'
                GROUP BY m.ID
            ) AS temp
            JOIN network_member nm ON nm.MemberID = mem_id
            JOIN network n ON n.id = nm.NetworkID
            GROUP BY mem_id;
            """.format(clause=member_network_clause, start=start_date, end=end_date))
        org_introductions = 0
        for i in users_w_introductions:
            if i["id"] in engagement:
                record = engagement[i["id"]]
            else:
                engagement[i["id"]] = copy.deepcopy(empty_record)
                record = engagement[i["id"]]
            record["users_w_introductions"] = i["users_w_introductions"]
            org_introductions += i["users_w_introductions"]
            record['member_id'] = i['id']

        users_w_accepted_req = builder.scalars("""
            SELECT
                mem_id as id,
                number_with_intros AS users_w_accepted_req
            FROM (
                SELECT
                    m.id AS mem_id,
                    COUNT(DISTINCT i.id) AS number_with_intros
                FROM introduction AS i
                JOIN member m ON m.id = i.memberID
                WHERE i.accepted = 1 AND m.ID IN({clause}) AND i.datemodified BETWEEN '{start}' AND '{end}'
                GROUP BY m.ID
            ) AS temp
            JOIN network_member nm ON nm.MemberID = mem_id
            JOIN network n ON n.id = nm.NetworkID
            GROUP BY mem_id;
            """.format(clause=member_network_clause, start=start_date, end=end_date))
        org_accepted_req = 0
        for i in users_w_accepted_req:
            if i["id"] in engagement:
                record = engagement[i["id"]]
            else:
                engagement[i["id"]] = copy.deepcopy(empty_record)
                record = engagement[i["id"]]
            record["users_w_accepted_req"] = i["users_w_accepted_req"]
            org_accepted_req += i["users_w_accepted_req"]
            record['member_id'] = i['id']

        users_w_pending_req = builder.scalars("""
            SELECT
                mem_id as id,
                number_with_intros AS users_w_pending_req
            FROM (
                SELECT
                    m.id AS mem_id,
                    COUNT(DISTINCT i.id) AS number_with_intros
                FROM introduction AS i
                JOIN member m ON m.id = i.memberID
                WHERE i.pending = 1 AND m.ID IN({clause}) AND i.datecreated BETWEEN '{start}' AND '{end}'
                GROUP BY m.ID
            ) AS temp
            JOIN network_member nm ON nm.MemberID = mem_id
            JOIN network n ON n.id = nm.NetworkID
            GROUP BY mem_id;
            """.format(clause=member_network_clause, start=start_date, end=end_date))
        org_pending_req = 0
        for i in users_w_pending_req:
            if i["id"] in engagement:
                record = engagement[i["id"]]
            else:
                engagement[i["id"]] = copy.deepcopy(empty_record)
                record = engagement[i["id"]]
            record["users_w_pending_req"] = i["users_w_pending_req"]
            org_pending_req += i["users_w_pending_req"]
            record['member_id'] = i['id']

        users_w_declined_req = builder.scalars("""
            SELECT
                mem_id as id,
                number_with_intros AS users_w_declined_req
            FROM (
                SELECT
                    m.id AS mem_id,
                    COUNT(DISTINCT i.id) AS number_with_intros
                FROM introduction AS i
                JOIN member m ON m.id = i.memberID
                WHERE i.declined = 1 AND m.ID IN({clause}) AND i.datemodified BETWEEN '{start}' AND '{end}'
                GROUP BY m.ID
            ) AS temp
            JOIN network_member nm ON nm.MemberID = mem_id
            JOIN network n ON n.id = nm.NetworkID
            GROUP BY mem_id;
            """.format(clause=member_network_clause, start=start_date, end=end_date))
        org_declined_req = 0
        for i in users_w_declined_req:
            if i["id"] in engagement:
                record = engagement[i["id"]]
            else:
                engagement[i["id"]] = copy.deepcopy(empty_record)
                record = engagement[i["id"]]
            record["users_w_declined_req"] = i["users_w_declined_req"]
            org_declined_req += i["users_w_declined_req"]
            record['member_id'] = i['id']

        users_w_searches = builder.scalars("""
            select 
                mem_id as id, 
                users_w_searches, 
                users_w_browses as browse_searches, 
                if(users_w_browses is null, users_w_searches, users_w_searches - users_w_browses) as bar_searches 
            FROM (
            SELECT
                m.id as mem_id,
                count(distinct s.id) as users_w_searches
            FROM search_queries AS s
            JOIN member m ON m.id = s.MemberID
            JOIN network_member nm ON nm.MemberID = m.ID
            JOIN network n ON n.id = nm.NetworkID
            where m.id IN({clause}) AND s.datecreated BETWEEN '{start}' AND '{end}'
            group by m.id
            ) as what
            left join(
            SELECT
                m.id as member_id,
                count(distinct s.id) as users_w_browses
            FROM search_queries AS s
            JOIN member m ON m.id = s.MemberID
            JOIN network_member nm ON nm.MemberID = m.ID
            JOIN network n ON n.id = nm.NetworkID
            where m.id IN({clause}) AND (s.datecreated BETWEEN '{start}' AND '{end}') AND s.Term like "%_id:%"
            group by m.id) as t on t.member_id = mem_id;
            """.format(clause=member_network_clause, start=start_date, end=end_date))
        org_searches = 0
        for i in users_w_searches:
            if i["id"] in engagement:
                record = engagement[i["id"]]
            else:
                engagement[i["id"]] = copy.deepcopy(empty_record)
                record = engagement[i["id"]]
            record["users_w_searches"] = i["users_w_searches"]
            org_searches += i["users_w_searches"]
            record["browse_searches"] = i["browse_searches"]
            record["bar_searches"] = i["bar_searches"]
            record['member_id'] = i['id']

        users_w_invites = builder.scalars("""
            SELECT
                m.id as id,
                COUNT(distinct i.id) AS users_w_invites
            FROM invitation AS i
            JOIN member m ON i.MemberID = m.ID
            JOIN network_member nm ON nm.MemberID = m.ID
            JOIN network n ON n.ID = nm.NetworkID
            WHERE m.id IN({clause}) AND i.datecreated BETWEEN '{start}' AND '{end}'
            GROUP BY m.id
            """.format(clause=member_network_clause, start=start_date, end=end_date))
        org_invites = 0
        for i in users_w_invites:
            if i["id"] in engagement:
                record = engagement[i["id"]]
            else:
                engagement[i["id"]] = copy.deepcopy(empty_record)
                record = engagement[i["id"]]
            record["users_w_invites"] = i["users_w_invites"]
            org_invites += i["users_w_invites"]
            record['member_id'] = i['id']

        recent_intro = builder.scalars("""
            SELECT
                mem_id as id,
                datediff(NOW(), recent_intro) as most_recent_intro
            FROM (
                SELECT
                    m.id AS mem_id,
                    MAX(i.DateCreated) as recent_intro
                FROM introduction AS i
                JOIN member m ON m.id = i.memberID
                WHERE m.ID IN({clause}) AND i.datecreated BETWEEN '{start}' AND '{end}'
                GROUP BY m.ID
            ) AS temp
            JOIN network_member nm ON nm.MemberID = mem_id
            JOIN network n ON n.id = nm.NetworkID
            GROUP BY mem_id;
            """.format(clause=member_network_clause, start=start_date, end=end_date))

        for i in recent_intro:
            if i["id"] in engagement:
                record = engagement[i["id"]]
            else:
                engagement[i["id"]] = copy.deepcopy(empty_record)
                record = engagement[i["id"]]
            record["most_recent_intro"] = i["most_recent_intro"]
            record['member_id'] = i['id']

        recent_accepted = builder.scalars("""
            SELECT
                mem_id as id,
                datediff(NOW(), recent_intro) as most_recent_intro_a
            FROM (
                SELECT
                    m.id AS mem_id,
                    MAX(i.DateModified) as recent_intro
                FROM introduction AS i
                JOIN introduction_request ir on ir.introductionid = i.id
                JOIN member m ON m.id = ir.memberID
                WHERE i.accepted = 1 AND m.ID IN({clause}) AND i.datemodified BETWEEN '{start}' AND '{end}'
                GROUP BY m.ID
            ) AS temp
            JOIN network_member nm ON nm.MemberID = mem_id
            JOIN network n ON n.id = nm.NetworkID
            GROUP BY mem_id;
            """.format(clause=member_network_clause, start=start_date, end=end_date))

        for i in recent_accepted:
            if i["id"] in engagement:
                record = engagement[i["id"]]
            else:
                engagement[i["id"]] = copy.deepcopy(empty_record)
                record = engagement[i["id"]]
            record["most_recent_intro_a"] = i["most_recent_intro_a"]
            record['member_id'] = i['id']

        total_friends = builder.scalars("""
            SELECT 
                MemberID as id,
                COUNT(ID) as total_friends
            FROM member_friends 
            WHERE MemberID IN ({clause}) AND datecreated BETWEEN '{start}' AND '{end}'
            GROUP BY MemberID;
            """.format(clause=member_network_clause, start=start_date, end=end_date))
        org_friends = 0
        for i in total_friends:
            if i["id"] is not None:
                if i['id'] in engagement:
                    record = engagement[i["id"]]
                else:
                    engagement[i["id"]] = copy.deepcopy(empty_record)
                    record = engagement[i["id"]]
                record["users_w_friends"] = i["total_friends"]
                org_friends += i["total_friends"]
                record['member_id'] = i['id']
            else:
                continue

        friends_pending = builder.scalars("""
            SELECT 
                MemberID as id,
                COUNT(ID) as friends_pending
            FROM member_friends_pending 
            WHERE MemberID IN ({clause}) AND datecreated BETWEEN '{start}' AND '{end}'
            GROUP BY MemberID;
            """.format(clause=member_network_clause, start=start_date, end=end_date))
        org_friends_p = 0
        for i in friends_pending:
            if i["id"] is not None:
                if i['id'] in engagement:
                    record = engagement[i["id"]]
                else:
                    engagement[i["id"]] = copy.deepcopy(empty_record)
                    record = engagement[i["id"]]
                record["users_w_friends_p"] = i["friends_pending"]
                org_friends_p += i["friends_pending"]
                record['member_id'] = i['id']
            else:
                continue

        recent_friend = builder.scalars("""
            SELECT
                mem_id as id,
                datediff(NOW(), recent_friend) as most_recent_friend
            FROM (
                SELECT
                    mf.MemberID AS mem_id,
                    MAX(mf.DateCreated) as recent_friend
                FROM member_friends_pending AS mf
                WHERE mf.MemberID IN({clause}) AND mf.datecreated BETWEEN '{start}' AND '{end}'
                GROUP BY mf.MemberID
            ) AS temp
            GROUP BY mem_id;
            """.format(clause=member_network_clause, start=start_date, end=end_date))
        for i in recent_friend:
            if i["id"] in engagement:
                record = engagement[i["id"]]
            else:
                engagement[i["id"]] = copy.deepcopy(empty_record)
                record = engagement[i["id"]]
            record["most_recent_friend"] = i["most_recent_friend"]
            record['member_id'] = i['id']

        recent_friend_accepted = builder.scalars("""
            SELECT
                mem_id as id,
                datediff(NOW(), recent_friend) as most_recent_friend_a
            FROM (
                SELECT
                    mf.MemberID AS mem_id,
                    MAX(mf.DateCreated) as recent_friend
                FROM member_friends AS mf
                WHERE mf.MemberID IN({clause}) AND mf.datecreated BETWEEN '{start}' AND '{end}'
                GROUP BY mf.MemberID
            ) AS temp
            GROUP BY mem_id;
            """.format(clause=member_network_clause, start=start_date, end=end_date))
        for i in recent_friend_accepted:
            if i["id"] in engagement:
                record = engagement[i["id"]]
            else:
                engagement[i["id"]] = copy.deepcopy(empty_record)
                record = engagement[i["id"]]
            record["most_recent_friend_a"] = i["most_recent_friend_a"]
            record['member_id'] = i['id']



        title_drop = another_org_select_list + another_group_select_list
        if len(title_drop) > 0:
            org_org['title'] = title_drop[0]['title']
            org_org['net_id'] = title_drop[0]['id']
        else:
            org_org['title'] = "Your Company"
            org_org['net_id'] = 0
        if org_contacts:
            org_org['users_w_contacts'] = org_contacts
        else:
            org_org['users_w_contacts'] = 0

        if org_introductions:
            org_org['users_w_introductions'] = org_introductions
        else:
            org_org['users_w_introductions'] = 0

        if org_searches:
            org_org['users_w_searches'] = org_searches
        else:
            org_org['users_w_searches'] = 0

        if org_accepted_req:
            org_org['users_w_accepted_req'] = org_accepted_req
        else:
            org_org['users_w_accepted_req'] = 0

        if org_pending_req:
            org_org['users_w_pending_req'] = org_pending_req
        else:
            org_org['users_w_pending_req'] = 0

        if org_declined_req:
            org_org['users_w_declined_req'] = org_declined_req
        else:
            org_org['users_w_declined_req'] = 0

        if org_friends:
            org_org['users_w_friend_req'] = org_friends
        else:
            org_org['users_w_friend_req'] = 0

        if org_friends_p:
            org_org['users_w_friend_req_p'] = org_friends_p
        else:
            org_org['users_w_friend_req_p'] = 0

        if org_invites:
            org_org['users_w_invites'] = org_invites
        else:
            org_org['users_w_invites'] = 0

        return self.render(report)