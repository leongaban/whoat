from pyramid.httpexceptions import HTTPFound
from pyramid.httpexceptions import HTTPNotFound
from pyramid.response import Response
from pyramid.view import view_config
# from www.engine import tools
from .. import SmartView
import cStringIO
import time

import copy
from datetime import datetime, timedelta
from pyramid.response import FileResponse


class ReportView(SmartView):
    # dashboard_template = "reports/reports.mak"

    @property
    def builder(self):
        # builder = self.get_local("builder")
        # if builder is not None:
        #     return builder

        start, end = self.param("sd"), self.param("ed")
        builder = ReportBuilder(self.ctx, start, end)
        # self.set_local("builder", builder)
        return builder

    @view_config(route_name="reports", request_method="GET")
    def get(self):
        template = ReportView.dashboard_template
        builder = self.builder
        if builder.member.is_verified is False:
            networks = 0
        elif builder.member.is_whoat_admin is True:
            networks = builder.scalars("SELECT DISTINCT ID from network")
            networks = ",".join([str(n) for n in networks])
        else:
            networks = builder.networks
            networks = ",".join([str(n) for n in networks])

        page ="dash"
        report = {}
        report['page'] = page

        member = self.member
        newbie = self.ctx.session.newbie
        profile = self.member.profile
        profile = profile.deflate()
        profile["avatar"] = self.avatar_uri_large
        report['profile'] = profile
        report['newbie'] = newbie
        report['verified'] = None
        report['member'] = member

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

        member_network_clause = "SELECT MemberID FROM network_member WHERE NetworkID IN({networks})".format(networks=networks)

        accepted_requests = builder.scalars("""
            SELECT
                ar.datemodified AS a_record_date,
                ar.datemodified AS date_accepted,
                COUNT(ar.id) AS accepted_requests
            FROM introduction AS a
            JOIN introduction_request AS ar ON ar.introductionID = a.id
            JOIN network_member nm ON nm.MemberID = a.MemberID
            JOIN network n ON n.ID = nm.NetworkID
            JOIN organization o ON o.NetworkID = n.ID
            WHERE ar.accepted = 1 AND ar.introductionID IN(
                SELECT ID
                FROM introduction
                WHERE ar.datemodified IS NOT NULL AND MemberID IN({clause})
                )
            GROUP BY DATE(a_record_date);
        """.format(clause=member_network_clause))
        declined_requests = builder.scalars("""
            SELECT
                ar.datemodified AS d_record_date,
                ar.datemodified AS date_declined,
                COUNT(ar.id) AS declined_requests
            FROM introduction AS a
            JOIN introduction_request AS ar ON ar.introductionID = a.id
            JOIN network_member nm ON nm.MemberID = a.MemberID
            JOIN network n ON n.ID = nm.NetworkID
            JOIN organization o ON o.NetworkID = n.ID
            WHERE ar.declined =1 AND ar.introductionID IN(
                SELECT ID
                FROM introduction
                WHERE ar.datemodified IS NOT NULL AND MemberID IN({clause})
                )
            GROUP BY DATE(d_record_date);
        """.format(clause=member_network_clause))
        pending_requests = builder.scalars("""
            SELECT
                a.datecreated AS p_record_date,
                a.datecreated AS date_pending,
                COUNT(ar.id) AS pending_requests
            FROM introduction AS a
            JOIN introduction_request AS ar ON ar.introductionID = a.id
            JOIN network_member nm ON nm.MemberID = a.MemberID
            JOIN network n ON n.ID = nm.NetworkID
            JOIN organization o ON o.NetworkID = n.ID
            WHERE ar.pending =1 IS NOT NULL AND ar.introductionID IN(
                SELECT ID
                FROM introduction
                WHERE ar.datemodified IS NULL AND MemberID IN({clause})
                )
            GROUP BY DATE(p_record_date);
        """.format(clause=member_network_clause))
        total_requests =  builder.scalars("""
            SELECT
                a.DateCreated AS c_record_date,
                a.datecreated AS date_created,
                COUNT(ar.id) AS total_requests
            FROM introduction AS a
            JOIN introduction_request AS ar ON ar.introductionID = a.id
            JOIN network_member nm ON nm.MemberID = a.MemberID
            JOIN network n ON n.ID = nm.NetworkID
            JOIN organization o ON o.NetworkID = n.ID
            WHERE ar.introductionID IN(
                SELECT ID
                FROM introduction
                WHERE MemberID IN({clause})
                )
            GROUP BY DATE(c_record_date);
            """.format(clause=member_network_clause))

        for ele in accepted_requests:
            ele["a_record_date"] = ele["a_record_date"].strftime('%m-%d-%Y')
        for ele in declined_requests:
            ele["d_record_date"] = ele["d_record_date"].strftime('%m-%d-%Y')
        for ele in pending_requests:
            ele["p_record_date"] = ele["p_record_date"].strftime('%m-%d-%Y')
        for ele in total_requests:
            ele["c_record_date"] = ele["c_record_date"].strftime('%m-%d-%Y')

        hub_data = {}
        report["hub_data"] = hub_data
        record = {}
        empty_record = {}
        empty_record["accepted_requests"] = 0
        empty_record["declined_requests"] = 0
        empty_record["pending_requests"] = 0
        empty_record["total_requests"] = 0

        for i in accepted_requests:
            if i["a_record_date"] in hub_data:
                record = hub_data[i["a_record_date"]]
            else:
                hub_data[i["a_record_date"]] =copy.deepcopy(empty_record)
                record = hub_data[i["a_record_date"]]
            record["accepted_requests"] = i["accepted_requests"]
            if i["date_accepted"]:
                record["date_of"] = i["date_accepted"]

        for i in declined_requests:
            if i["d_record_date"] in hub_data:
                record = hub_data[i["d_record_date"]]
            else:
                hub_data[i["d_record_date"]] =copy.deepcopy(empty_record)
                record = hub_data[i["d_record_date"]]
            record["declined_requests"] = i["declined_requests"]
            if i["date_declined"]:
                record["date_of"] = i["date_declined"]

        for i in pending_requests:
            if i["p_record_date"] in hub_data:
                record = hub_data[i["p_record_date"]]
            else:
                hub_data[i["p_record_date"]] =copy.deepcopy(empty_record)
                record = hub_data[i["p_record_date"]]
            record["pending_requests"] = i["pending_requests"]
            if i["date_pending"]:
                record["date_of"] = i["date_pending"]

        for i in total_requests:
            if i["c_record_date"] in hub_data:
                record = hub_data[i["c_record_date"]]
            else:
                hub_data[i["c_record_date"]] =copy.deepcopy(empty_record)
                record = hub_data[i["c_record_date"]]
            record["total_requests"] = i["total_requests"]
            if i["date_created"]:
                record["date_of"] = i["date_created"]

        columns = []
        rows_temp = []
        rows = []
        for r in hub_data:
              t = hub_data[r]
              for k,v in t.items():
                  columns.append(k)
              break
        for r in hub_data:
            t = hub_data[r]
            for k,v in t.items():
                rows_temp.append(v)
            rows.append(rows_temp)
        name = "Organization Member Data"

        # spreadsheet = Spreadsheet() #create a new spreadsheet instance
        # spreadsheet.add_page(name, rows, columns) #add a page to the spreadsheet
        # excel_data = spreadsheet.export()


        # file = builder.file_export_data(excel_data)
        # report["file"] = file.body

        return self.render(template, value=report)

########### ---------------------------------------------------- data per day graph route ---------------------------------------------------- ###########

    @view_config(route_name="reports_dashboard_intros", request_method="GET")
    def intros(self):
        builder = self.builder
        if builder.member.is_verified is False:
            networks = 0
        elif builder.member.is_whoat_admin is True:
            networks = builder.scalars("SELECT DISTINCT ID from network")
            networks = ",".join([str(n) for n in networks])
        else:
            networks = builder.networks
            networks = ",".join([str(n) for n in networks])

        report = {}

        member_network_clause = "SELECT MemberID FROM network_member WHERE NetworkID IN({networks})".format(networks=networks)

        accepted_requests = builder.scalars("""
            SELECT
                ar.datemodified AS a_record_date,
                COUNT(ar.id) AS accepted_requests
            FROM introduction AS a
            JOIN introduction_request AS ar ON ar.introductionID = a.id
            JOIN network_member nm ON nm.MemberID = a.MemberID
            JOIN network n ON n.ID = nm.NetworkID
            JOIN organization o ON o.NetworkID = n.ID
            WHERE ar.accepted =1 AND ar.introductionID IN(
                SELECT ID
                FROM introduction
                WHERE ar.datemodified IS NOT NULL AND MemberID IN({clause})
                )
            GROUP BY DATE(a_record_date);
        """.format(clause=member_network_clause))
        declined_requests = builder.scalars("""
            SELECT
                ar.datemodified AS d_record_date,
                COUNT(ar.id) AS declined_requests
            FROM introduction AS a
            JOIN introduction_request AS ar ON ar.introductionID = a.id
            JOIN network_member nm ON nm.MemberID = a.MemberID
            JOIN network n ON n.ID = nm.NetworkID
            JOIN organization o ON o.NetworkID = n.ID
            WHERE ar.declined =1 AND ar.introductionID IN(
                SELECT ID
                FROM introduction
                WHERE ar.datemodified IS NOT NULL AND MemberID IN({clause})
                )
            GROUP BY DATE(d_record_date);
        """.format(clause=member_network_clause))
        pending_requests = builder.scalars("""
            SELECT
                a.datecreated AS p_record_date,
                COUNT(ar.id) AS pending_requests
            FROM introduction AS a
            JOIN introduction_request AS ar ON ar.introductionID = a.id
            JOIN network_member nm ON nm.MemberID = a.MemberID
            JOIN network n ON n.ID = nm.NetworkID
            JOIN organization o ON o.NetworkID = n.ID
            WHERE ar.pending =1 AND ar.introductionID IN(
                SELECT ID
                FROM introduction
                WHERE ar.datemodified IS NULL AND MemberID IN({clause})
                )
            GROUP BY DATE(p_record_date);
        """.format(clause=member_network_clause))
        total_requests =  builder.scalars("""
            SELECT
                a.DateCreated AS c_record_date,
                COUNT(ar.id) AS total_requests
            FROM introduction AS a
            JOIN introduction_request AS ar ON ar.introductionID = a.id
            JOIN network_member nm ON nm.MemberID = a.MemberID
            JOIN network n ON n.ID = nm.NetworkID
            JOIN organization o ON o.NetworkID = n.ID
            WHERE ar.introductionID IN(
                SELECT ID
                FROM introduction
                WHERE MemberID IN({clause})
                )
            GROUP BY DATE(c_record_date);
            """.format(clause=member_network_clause))
        first_last = builder.scalars("""
        SELECT
            MIN(ar.datecreated) AS first_date,
            MAX(ar.datecreated) AS last_date
        FROM introduction AS a
        JOIN introduction_request AS ar ON ar.introductionID = a.id
        JOIN network_member nm ON nm.MemberID = a.MemberID
        JOIN network n ON n.ID = nm.NetworkID
        JOIN organization o ON o.NetworkID = n.ID
        WHERE ar.introductionID IN(
            SELECT ID
            FROM introduction
            WHERE MemberID IN({clause})
        );
        """.format(clause=member_network_clause))

        for ele in accepted_requests:
            ele["a_record_date"] = ele["a_record_date"].strftime('%m-%d-%Y')
        for ele in declined_requests:
            ele["d_record_date"] = ele["d_record_date"].strftime('%m-%d-%Y')
        for ele in pending_requests:
            ele["p_record_date"] = ele["p_record_date"].strftime('%m-%d-%Y')
        for ele in total_requests:
            ele["c_record_date"] = ele["c_record_date"].strftime('%m-%d-%Y')

        hub_data = {}
        if first_last[0]["first_date"] and first_last[0]["last_date"]:
            hub_data = {
                "f_date":first_last[0]["first_date"].strftime('%m-%d-%Y'),
                "l_date":first_last[0]["last_date"].strftime('%m-%d-%Y')
            }
        else:
            hub_data = {
                "f_date":(datetime.datetime.now() + datetime.timedelta(-30)).strftime('%m-%d-%Y'),
                "l_date":time.strftime('%m-%d-%Y')
            }

        record = {}
        empty_record = {}
        empty_record["accepted_requests"] = 0
        empty_record["declined_requests"] = 0
        empty_record["pending_requests"] = 0
        empty_record["total_requests"] = 0

        for i in accepted_requests:
            if i["a_record_date"] in hub_data:
                record = hub_data[i["a_record_date"]]
            else:
                hub_data[i["a_record_date"]] =copy.deepcopy(empty_record)
                record = hub_data[i["a_record_date"]]
            record["accepted_requests"] = i["accepted_requests"]

        for i in declined_requests:
            if i["d_record_date"] in hub_data:
                record = hub_data[i["d_record_date"]]
            else:
                hub_data[i["d_record_date"]] =copy.deepcopy(empty_record)
                record = hub_data[i["d_record_date"]]
            record["declined_requests"] = i["declined_requests"]

        for i in pending_requests:
            if i["p_record_date"] in hub_data:
                record = hub_data[i["p_record_date"]]
            else:
                hub_data[i["p_record_date"]] =copy.deepcopy(empty_record)
                record = hub_data[i["p_record_date"]]
            record["pending_requests"] = i["pending_requests"]

        for i in total_requests:
            if i["c_record_date"] in hub_data:
                record = hub_data[i["c_record_date"]]
            else:
                hub_data[i["c_record_date"]] =copy.deepcopy(empty_record)
                record = hub_data[i["c_record_date"]]
            record["total_requests"] = i["total_requests"]

        return self.respond(hub_data)

########### ---------------------------------------------------- running total graph route ---------------------------------------------------- ###########

    @view_config(route_name="reports_dashboard_totals", request_method="GET")
    @view_config(route_name="reports_dashboard_totals", request_method="POST")
    def intros_total(self):
        builder = self.builder
        whodat_admin = False
        if builder.member.is_verified is False:
            members = 0
            networks = 0

            #if whoat admin do admin stuff
        elif builder.member.is_whoat_admin is True:

            whodat_admin = True

            #if its an ajax request to this route
            if self.body is not None:
                if 'optionSelected' in self.body:
                    org_selected = self.body['optionSelected']
                    #org_selected = urllib.unquote_plus(org_selected)
                else:
                    org_selected = builder.companies[0].network_id

            else:
                org_selected = builder.companies[0].network_id
                #org_selected = "CBRE"
                #set the company name to Who@ because you are a whoat admin.

            # #build the dropdown list
            # org_contacts = builder.scalars("""
            #     SELECT
            #         n.ID as id,
            #         o.networkid as n_id,
            #         o.label as title,
            #         SUM(cntct_count) AS users_w_contacts
            #     FROM(
            #         SELECT
            #             m.id AS mem_id,
            #             COUNT(c.id) as cntct_count
            #         FROM member AS m
            #         JOIN contact c ON m.id=c.memberid
            #         GROUP BY m.id
            #     ) AS t
            #     JOIN network_member nm ON nm.memberid = mem_id
            #     JOIN network n ON n.id = nm.networkid
            #     JOIN organization o ON o.networkid = n.ID
            #     GROUP BY n.id
            #     ORDER BY title asc;
            #     """)

            # for i in org_contacts:
            #     if i["id"] in org_drop_down:
            #         temp_dropdown = org_drop_down[i["id"]]
            #     else:
            #         org_drop_down[i["id"]] =copy.deepcopy(emptyy)
            #         temp_dropdown = org_drop_down[i["id"]]
            #     temp_dropdown["title"] = i['title']
            #     temp_dropdown['net_id'] = i['n_id']

            # # members = builder.scalars("SELECT DISTINCT id FROM member;")
            # # members = ",".join([str(m) for m in members])

            networks = org_selected

        else:
            #if not whoat admin then get their network id and member ids in the network
            members = builder.companies[0].members
            members = ",".join(map(str, members))
            networks = builder.companies[0].network_id
            org_selected = builder.companies[0].label

        report = {}

        member_network_clause = "SELECT MemberID FROM network_member WHERE NetworkID IN({networks})".format(networks=networks)

        intro_accepted_totals = builder.scalars("""
            SELECT
                DATE(a.datecreated) AS a_date,
                COUNT(a.id) AS daily_count,
                (
                    SELECT
                        COUNT(a1.id)
                    FROM introduction a1
                    WHERE a1.accepted = 1 AND DATE(a1.datecreated) <= a_date AND a1.ID IN(
                        SELECT ID
                        FROM introduction
                        WHERE datemodified IS NOT NULL AND MemberID IN(SELECT MemberID FROM network_member WHERE NetworkID IN(907))
                        )
                ) AS intro_accepted_totals
            FROM introduction AS a
            WHERE a.accepted = 1 AND a.ID IN(
                SELECT ID
                FROM introduction
                WHERE a.datemodified IS NOT NULL AND MemberID IN(SELECT MemberID FROM network_member WHERE NetworkID IN(907))
                )
            GROUP BY a_date;
        """.format(clause=member_network_clause))
        intro_totals = builder.scalars("""
            SELECT
                DATE(a.datecreated) AS t_date,
                COUNT(a.id) AS daily_count,
                (
                    SELECT
                        COUNT(a1.id)
                    FROM introduction a1
                    WHERE DATE(a1.datecreated) <= t_date AND a1.ID IN(
                        SELECT ID
                        FROM introduction
                        WHERE MemberID IN({clause})
                        )
                ) AS intro_totals
            FROM introduction AS a
            WHERE a.ID IN(
                SELECT ID
                FROM introduction
                WHERE MemberID IN({clause})
                )
            GROUP BY t_date;
        """.format(clause=member_network_clause))

        member_totals = builder.scalars("""
            SELECT
                DATE(m.datecreated) AS m_date,
                COUNT(m.id) AS daily_count,
                (
                    SELECT
                        COUNT(m1.id)
                    FROM member m1
                    WHERE DATE(m1.datecreated) <= m_date AND m1.id IN({clause})
                ) AS member_totals
            FROM member AS m
            WHERE m.id IN({clause})
            GROUP BY m_date;
        """.format(clause=member_network_clause))


        first_last = builder.scalars("""
            SELECT
                DATE(MIN(m.datecreated)) as start_date
            from member m
            WHERE m.id IN({clause});
        """.format(clause=member_network_clause))

        for ele in intro_accepted_totals:
            ele["a_date"] = ele["a_date"].strftime('%m-%d-%Y')
        for ele in intro_totals:
            ele["t_date"] = ele["t_date"].strftime('%m-%d-%Y')
        for ele in member_totals:
            ele["m_date"] = ele["m_date"].strftime('%m-%d-%Y')


        hub_data = {
            "f_date":first_last[0].strftime('%m-%d-%Y')
        }
        record = {}
        empty_record = {}
        empty_record["intro_accepted_totals"] = 0
        empty_record["intro_totals"] = 0
        empty_record["member_totals"] = 0

        for i in intro_accepted_totals:
            if i["a_date"] in hub_data:
                record = hub_data[i["a_date"]]
            else:
                hub_data[i["a_date"]] =copy.deepcopy(empty_record)
                record = hub_data[i["a_date"]]
            record["intro_accepted_totals"] = i["intro_accepted_totals"]

        for i in intro_totals:
            if i["t_date"] in hub_data:
                record = hub_data[i["t_date"]]
            else:
                hub_data[i["t_date"]] =copy.deepcopy(empty_record)
                record = hub_data[i["t_date"]]
            record["intro_totals"] = i["intro_totals"]

        for i in member_totals:
            if i["m_date"] in hub_data:
                record = hub_data[i["m_date"]]
            else:
                hub_data[i["m_date"]] =copy.deepcopy(empty_record)
                record = hub_data[i["m_date"]]
            record["member_totals"] = i["member_totals"]

        return self.respond(hub_data)


########### ---------------------------------------------------- heatmap contact graph route ---------------------------------------------------- ###########

    @view_config(route_name="reports_graph_heatmap_contact", request_method="GET")
    def heatmap_graph_c(self):
        builder = self.builder
        if builder.member.is_verified is False:
            networks = 0
            # domains = 0
        elif builder.member.is_whoat_admin is True:
            networks = builder.scalars("SELECT DISTINCT ID from network")
            # domains = builder.scalars("SELECT DISTINCT ID from domain")
            networks = ",".join([str(n) for n in networks])
            # domains = ",".join([str(d) for d in domains])
        else:
            networks = builder.networks
            # domains = builder.domains
            networks = ",".join([str(n) for n in networks])
            # domains = ",".join([str(d.id) for d in domains])

        date_range = self.request.body
        if date_range == "":
            start_date = "2012/01/01"
            end_date = time.strftime("%Y/%m/%d", time.gmtime(time.time() + 60*60*24))
        else:
            start_date = self.request.params["start"]
            end_date = self.request.params["end"]

        hub_data = {}
        record_data = {}

        # page = "heat_contact"
        # report["page"] = page
        # report["contacts_heatmap"] = contacts_heatmap
        # report["start"] = start_date
        # report["end"] = end_date

        member_network_clause = "SELECT MemberID FROM network_member WHERE NetworkID IN({networks})".format(networks=networks)
        record = {}
        report = {}
        report_record = {}
        hub_data['reportData'] = report


        empty_record = {}
        empty_record["contacts_per"] = 0
        empty_record["area_code"] = 0
        empty_record["label"] = 0

        empty_report = {}
        empty_report["latitude"] = 0
        empty_report["longitude"] = 0

        lat_long = builder.select("""
            select
                g.areacode as id,
                g.latitude as latitude,
                g.longitude as longitude
            from contact c
            join member m on m.id = c.MemberID
            join contact_geolocation cg on cg.ContactID=c.id
            join geolocation g on g.id = cg.GeolocationID
            WHERE m.id IN({clause}) AND c.datecreated BETWEEN '{start}' AND '{end}'
            group by g.AreaCode;
            """.format(start=start_date, end=end_date, clause=member_network_clause))

        for i in lat_long:
            if i["id"] in report:
                report_record = report[i["id"]]
            else:
                report[i["id"]] =copy.deepcopy(empty_report)
                report_record = report[i["id"]]
            report_record["latitude"] = i["latitude"]
            report_record["longitude"] = i["longitude"]

        contacts_per = builder.select("""
            select
                g.areacode as code,
                g.areacode as area_code,
                g.state as state,
                g.label as name,
                count(distinct c.rootid) as contacts_per
            from contact c
            join member m on m.id = c.MemberID
            join contact_geolocation cg on cg.ContactID=c.id
            join geolocation g on g.id = cg.GeolocationID
            WHERE m.id IN({clause}) AND c.datecreated BETWEEN '{start}' AND '{end}'
            group by g.AreaCode
            order by contacts_per desc;
            """.format(start=start_date, end=end_date, clause=member_network_clause))

        hub_data['recordData'] = contacts_per

        #for i in contacts_per:
        #    if i["id"] in record_data:
        #        record = record_data[i["id"]]
        #    else:
        #        record_data[i["id"]] =copy.deepcopy(empty_record)
        #        record = record_data[i["id"]]
        #    record["contacts_per"] = i["contacts_per"]
        #    record["area_code"] = i["area_code"]
        #    record["label"] = i["label"]
        #    record["state"] = i["state"]

        return self.respond(hub_data)

########### ---------------------------------------------------- heatmap contact graph route ---------------------------------------------------- ###########

    @view_config(route_name="reports_graph_heatmap_user", request_method="GET")
    def heatmap_graph_u(self):
        builder = self.builder
        if builder.member.is_verified is False:
            networks = 0
            # domains = 0
        elif builder.member.is_whoat_admin is True:
            networks = builder.scalars("SELECT DISTINCT ID from network")
            # domains = builder.scalars("SELECT DISTINCT ID from domain")
            networks = ",".join([str(n) for n in networks])
            # domains = ",".join([str(d) for d in domains])
        else:
            networks = builder.networks
            # domains = builder.domains
            networks = ",".join([str(n) for n in networks])
            # domains = ",".join([str(d.id) for d in domains])

        date_range = self.request.body
        if date_range == "":
            start_date = "2012/01/01"
            end_date = time.strftime("%Y/%m/%d", time.gmtime(time.time() + 60*60*24))
        else:
            start_date = self.request.params["start"]
            end_date = self.request.params["end"]

        hub_data = {}
        record_data = {}

        # page = "heat_contact"
        # report["page"] = page
        # report["contacts_heatmap"] = contacts_heatmap
        # report["start"] = start_date
        # report["end"] = end_date

        member_network_clause = "SELECT MemberID FROM network_member WHERE NetworkID IN({networks})".format(networks=networks)
        record = {}
        report = {}
        report_record = {}
        hub_data['reportData'] = report


        # empty_record = {}
        # empty_record["contacts_per"] = 0
        # empty_record["area_code"] = 0
        # empty_record["label"] = 0

        empty_report = {}
        empty_report["latitude"] = 0
        empty_report["longitude"] = 0

        lat_long = builder.select("""
            select
                g.areacode as id,
                g.latitude as latitude,
                g.longitude as longitude
            FROM geolocation AS g
            join member_phone mp on mp.areacode = g.areacode
            JOIN member m ON m.id = mp.MemberID
            WHERE m.verified = 1 AND m.id IN({clause}) AND m.datecreated BETWEEN '{start}' AND '{end}'
            group by g.AreaCode;
            """.format(start=start_date, end=end_date, clause=member_network_clause))

        for i in lat_long:
            if i["id"] in report:
                report_record = report[i["id"]]
            else:
                report[i["id"]] =copy.deepcopy(empty_report)
                report_record = report[i["id"]]
            report_record["latitude"] = i["latitude"]
            report_record["longitude"] = i["longitude"]

        users_per = builder.select("""
            SELECT
                g.areacode as id,
                COUNT(m.id) AS users_per,
                g.areacode as code,
                g.state as state,
                g.label as name
            FROM geolocation AS g
            join member_phone mp on mp.areacode = g.areacode
            JOIN member m ON m.id = mp.MemberID
            WHERE m.verified = 1 AND m.id IN({clause}) AND m.datecreated BETWEEN '{start}' AND '{end}'
            GROUP BY g.areacode;
            """.format(start=start_date, end=end_date, clause=member_network_clause))

        hub_data['recordData'] = users_per

        #for i in contacts_per:
        #    if i["id"] in record_data:
        #        record = record_data[i["id"]]
        #    else:
        #        record_data[i["id"]] =copy.deepcopy(empty_record)
        #        record = record_data[i["id"]]
        #    record["contacts_per"] = i["contacts_per"]
        #    record["area_code"] = i["area_code"]
        #    record["label"] = i["label"]
        #    record["state"] = i["state"]

        return self.respond(hub_data)

########### ---------------------------------------------------- full top graph route ---------------------------------------------------- ###########
    def previous_quarter(self, ref):
        quarter = (ref.month - 1) // 3
        prev_quarter = (quarter - 1) % 4
        return datetime(ref.year if quarter>0 else ref.year-1, prev_quarter*3+1, 1)
    def previous_quarter_last(self, ref):
        if ref.month < 4:
            return datetime(ref.year - 1, 12, 31)
        elif ref.month < 7:
            return datetime(ref.year, 3, 31)
        elif ref.month < 10:
            return datetime(ref.year, 6, 30)
        return datetime(ref.year, 9, 30)

    @view_config(route_name="reports_dashboard_dynamic_intros", request_method="GET")
    def dynamic_intros(self):
        builder = self.builder
        import datetime

        seven_days = {}
        seven_days['start'] = datetime.date.today() - timedelta(days=7)
        seven_days['end'] = datetime.date.today()
        seven_days['type'] = 'seven_days'

        thirty_days = {}
        today = datetime.date.today()
        first = datetime.date(day=1, month=today.month - 1, year=today.year)
        last = datetime.date(day=1, month=today.month, year=today.year)
        thirty_days['end'] = last - datetime.timedelta(days=1)
        thirty_days['start'] = first
        thirty_days['type'] = 'thirty_days'

        quarter = {}
        x = datetime.date.today()
        prev_quart_first = self.previous_quarter(x)
        prev_quart_last = self.previous_quarter_last(x)

        quarter['end'] = prev_quart_last
        quarter['start'] = prev_quart_first
        quarter['type'] = 'quarter'

        year_to_date = {}
        first_year = datetime.date(datetime.date.today().year, 1, 1)
        year_to_date['start'] = first_year
        year_to_date['end'] = today
        year_to_date['type'] = 'year_to_date'

        date_compile = []

        date_compile.append(seven_days)
        date_compile.append(thirty_days)
        date_compile.append(quarter)
        date_compile.append(year_to_date)

        hub_data = {}

        for i in date_compile:
            beginning = i['start']
            ending = i['end']
            sql_data = {}

            accepted_req = builder.scalar("""
                SELECT
                    COUNT(DISTINCT i.id) AS number_with_intros
                FROM introduction AS i
                JOIN member m ON m.id = i.memberID
                WHERE i.accepted = 1 AND i.datecreated between '{begin}' AND '{end}';
                """.format(begin=beginning, end=ending))

            registered = builder.scalar("""
                SELECT
                    count(m.id)
                FROM network AS n
                JOIN network_member nm ON nm.NetworkID = n.ID
                JOIN member m ON m.id = nm.MemberID
                join organization o on o.networkid = n.id
                WHERE m.verified = 1
                    and m.datecreated between '{begin}' AND '{end}';
                """.format(begin=beginning, end=ending))

            searches = builder.scalar("""
                select
                    mem_id as id,
                    users_w_searches,
                    users_w_browses as browse_searches,
                    if(users_w_browses is null, users_w_searches, users_w_searches - users_w_browses) as bar_searches
                FROM (
                SELECT
                    m.id as mem_id,
                    count(distinct s.id) as users_w_searches
                FROM search_query AS s
                JOIN member m ON m.id = s.MemberID
                JOIN network_member nm ON nm.MemberID = m.ID
                JOIN network n ON n.id = nm.NetworkID
                JOIN organization o ON o.NetworkID = n.ID
                where s.datecreated between '{begin}' AND '{end}'
                ) as what
                left join(
                SELECT
                    m.id as member_id,
                    count(distinct s.id) as users_w_browses
                FROM search_query AS s
                JOIN member m ON m.id = s.MemberID
                JOIN network_member nm ON nm.MemberID = m.ID
                JOIN network n ON n.id = nm.NetworkID
                JOIN organization o ON o.NetworkID = n.ID
                where s.SearchTerm like "%_id:%" AND s.datecreated between '{begin}' AND '{end}'
                ) as t on t.member_id = mem_id;
                """.format(begin=beginning, end=ending))

            introductions = builder.scalar("""
                SELECT
                    COUNT(DISTINCT i.id) AS number_with_intros
                FROM introduction AS i
                JOIN member m ON m.id = i.memberID
                WHERE i.datecreated between '{begin}' AND '{end}';
                """.format(begin=beginning, end=ending))

            unique_contacts = builder.scalar("""
                select
                    count(distinct c.rootid)
                from contact c
                where c.DateCreated between '{begin}' AND '{end}';
                """.format(begin=beginning, end=ending))

            total_orgs = builder.scalar("""
                select
                    count(distinct o.id)
                from organization o
                where o.DateCreated between '{begin}' AND '{end}';
                """.format(begin=beginning, end=ending))




            if accepted_req:
                sql_data['accepted_req'] = accepted_req
            else:
                sql_data['accepted_req'] = 0

            if registered:
                sql_data['registered'] = registered
            else:
                sql_data['registered'] = 0

            if searches:
                sql_data['searches'] = searches['users_w_searches']
            else:
                sql_data['searches'] = 0

            if introductions:
                sql_data['introductions'] = introductions
            else:
                sql_data['introductions'] = 0

            if searches:
                sql_data['unique_contacts'] = unique_contacts
            else:
                sql_data['unique_contacts'] = 0

            if total_orgs:
                sql_data['total_orgs'] = total_orgs
            else:
                sql_data['total_orgs'] = 0




            if i['type'] == "seven_days":
                hub_data['seven_days'] = sql_data
            elif i['type'] == "thirty_days":
                hub_data['thirty_days'] = sql_data
            elif i['type'] == "quarter":
                hub_data['quarter'] = sql_data
            elif i['type'] == "year_to_date":
                hub_data['year_to_date'] = sql_data





        #hub_data["introductions"] = intro_Requests_Made
        return self.respond(hub_data)



class ReportBuilder(object):
    def __init__(self, ctx, start_date, end_date):
        self.ctx = ctx
        self.member = ctx.member
        self.companies = self.member.organizations
        self.networks = [c.network_id for c in self.companies]
        self.domains = []
        for company in self.companies:
            self.domains.extend(company.domains)
        self.domains = dict((d.id, d) for d in self.domains).values()


        if start_date is not None and end_date is not None:
            try:
                start_date = tools.chronos.parse(start_date)
            except:
                start_date = None

            try:
                end_date = tools.chronos.parse(end_date)
            except:
                end_date = None

            if start_date is not None and end_date is not None:
                self.start_date = start_date
                self.end_date = end_date
            else:
                self.start_date = None
                self.end_date = None
        else:
            self.start_date = None
            self.end_date = None


    def scalars(self, sql, *args, **params):
        return self.ctx.query(sql, *args, **params).scalars()

    def scalar(self, sql, *args, **params):
        return self.ctx.query(sql, *args, **params).scalar()

    def select(self, sql, *args, **params):
        return self.ctx.query(sql, *args, **params).select()

    def query(self, sql, *args, **params):
        return self.ctx.query(sql, *args, **params)

    def file_export_data(self, data):
        file = self.ctx.temp_file("report.xls")
        file.write_data(data)
        #return FileResponse(file.uri, content_type='text/csv')
        return Response(file.uri, content_type="text/csv")

    def obj_clean(self, obj):
        outlist=[]
        added_keys = set()
        for row in obj: #tuples here because they are hashable
            if row not in added_keys:
                outlist.append(row)
                added_keys.add(row)
        return outlist


class Spreadsheet(object):
    def __init__(self):
        import xlwt
        self.workbook = xlwt.Workbook(encoding="utf-8")

    def add_page(self, name, records, columns, aliases=None):
        ##print "do whatever it is you need to do to create a page"
        sheet = self.workbook.add_sheet(name)
        row_cnt = len(records)
        col_cnt = len(columns)
        if col_cnt == 0:
            if row_cnt > 0:
                record = records[0]
                columns = record.__dict__.keys() if hasattr(record, "__dict__") is True else record.keys()
                col_cnt = len(columns)

        for y in xrange(col_cnt):
            #column, alias = aliases[y]
            sheet.write(0, y)

        for x in xrange(row_cnt):
            record = records[x]
            for y in xrange(col_cnt):
                #column = columns[y]
                value = record[y]#.get(column, None)
                sheet.write(x + 1, y, value)

    def export(self):
        """Convert the workbook to a string."""
        buffer = cStringIO.StringIO()
        self.workbook.save(buffer)
        data = buffer.getvalue()
        buffer.close()
        return data
