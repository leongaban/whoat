from . import ReportView
from pyramid.view import view_config
import urllib
import copy


class Unregistered(ReportView):
    template = "reports/reports_container.mak"

    @view_config(route_name="reports_unregistered", request_method="GET")
    @view_config(route_name="reports_unregistered", request_method="POST")
    def get(self):
        builder = self.builder
        whodat_admin = False
        report = {}
        onboard = {}
        org_org = {}
        org_drop_down = {}
        temp_drop_down = {}
        emptyy = {}
        emptyy['title'] = 0
        approved_user = False
        networks = []

        if builder.member.is_verified is False:
            networks = []

            #if whoat admin do admin stuff
        elif builder.member.is_whoat_admin is True:
           
            whodat_admin = True

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

        member_network_clause = "SELECT MemberID FROM network_member WHERE NetworkID IN({networks})"\
            .format(networks=networks)

        domains = "SELECT label FROM domain WHERE NetworkID IN({networks})".format(networks=networks)
        
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

        page = "unregistered"
        report["page"] = page
        report["onboard"] = onboard
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
        empty_record["name"] = 0
        empty_record["username"] = 0
        empty_record["registered"] = 0
        empty_record["c_invited"] = 0

        known_contacts = builder.scalars("""
            select
                o.id as org_id,
                c.label as c_name,
                ce.label as c_username,
                c.id as id,
                if(i.EmailAddress is not null, 1, 0) as invited
            from contact c
            join contact_email ce on ce.contactid = c.id
            join domain d on d.id = ce.domainid
            left join invitation i on i.rootid = c.rootid
            join contact_affiliation ca on ca.ContactID = c.ID
            join organization o on o.id = ca.OrganizationID
            where o.networkid IN({networks}) and c.ID IN(
                SELECT DISTINCT RootID from contact)
            AND d.label IN({domains})
            group by c.id
            order by c.label;
        """.format(networks=networks, domains=domains))
        if len(known_contacts) > 0:
            known_g_contacts_cleaned = [known_contacts[0]]
        else:
            known_g_contacts_cleaned = []
        known_contacts_cleaned = Unregistered.obj_to_clean(self, known_contacts)

        final_contacts = known_contacts_cleaned + known_g_contacts_cleaned
        if len(final_contacts) > 0:
            known_members = builder.scalars("""
            SELECT
                m.id as id,
                m.Username as m_username
            FROM network AS n
            JOIN network_member nm ON nm.NetworkID = n.ID
            JOIN member m ON m.id = nm.MemberID
            WHERE m.verified = 1 and m.ID IN({clause})
            group by m.id;
            """.format(clause=member_network_clause))

            memd = Unregistered.get_usernames(self, known_members)
            my_list = Unregistered.is_member_filter(self, memd, final_contacts)

            #final_known_contacts = Unregistered.obj_to_clean(self, my_list)
            for i in my_list:
                kc_id = i['id']
                #kc_id = '%dA11' %kc_id
                if kc_id in onboard:
                    record = onboard[kc_id]
                else:
                    onboard[kc_id] = copy.deepcopy(empty_record)
                    record = onboard[kc_id]
                record["name"] = i["c_name"]
                record["username"] = i["c_username"]
                record['contact_id'] = i['id']
                record['c_invited'] = i['invited']
        
        title_drop = another_org_select_list + another_group_select_list
        if len(title_drop) > 0:
            org_org['title'] = title_drop[0]['title']
            org_org['net_id'] = title_drop[0]['id']
        else:
            org_org['title'] = "Your Company"
            org_org['net_id'] = 0

        org_org['not_invited'] = len(known_contacts_cleaned)

        # member = self.member
        # newbie = self.ctx.session.newbie
        # profile = self.member.profile
        # profile = profile.deflate()
        # profile["avatar"] = self.avatar_uri_large
        # report['profile'] = profile
        # report['newbie'] = newbie
        # report['verified'] = None
        # report['member'] = member

        # if newbie is True:
        #     session = self.ctx.session
        #     try:
        #         state = session.state
        #         state.pop("newbie")
        #     except:
        #         pass

        #     try:
        #         session.save_state()
        #     except:
        #         pass

        # # if member has not verified, notify them
        # if self.member.is_verified is False:
        #     report['verified'] = False
        # else:
        #     report['verified'] = True

        return self.render(report)

    def obj_to_clean(self, obj):
        outlist=[]
        added_keys = set()
        for row in obj: #tuples here because they are hashable
            finder = tuple(row['c_username'])   
            if finder not in added_keys:
                outlist.append(row)
                added_keys.add(finder)
        return outlist

    def get_usernames(self, members):
        names = []
        cnt = len(members)
        for x in xrange(cnt):
            r = members[x]
            txt = r['m_username'].strip().lower()
            names.append(txt)
        return names


    def is_member_filter(self, members, contacts):
        cnt = len(contacts)
        for x in xrange(cnt):
            r = contacts[x]
            txt = r["c_username"].strip().lower()
            words = txt.split(" ")
            for word in words:
                if word in members:
                    contacts[x] = None
                    continue
        return [r for r in contacts if r is not None]


