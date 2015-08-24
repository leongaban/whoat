from . import ReportView
from pyramid.view import view_config
import copy
from datetime import datetime
from fusion import constants




class Google_Report(ReportView):
    template = "reports/reports_container.mak"

    @view_config(route_name="reports_google", request_method="GET")
    @view_config(route_name="reports_google", request_method="POST")
    def get_analytics(self):
        builder = self.builder
        whodat_admin = False
        approved_user = False

        start_date = None
        end_date = None

        start_date = '2014-01-01'
        end_date = datetime.date(datetime.now())
        end_date = end_date.strftime('%Y-%m-%d')

        google = {}
        record = {}
        empty_record = {}
        empty_record["downloads"] = 0
        empty_record["members"] = 0
        self.impersonate(6)
        provider = self.oauth("leongaban@gmail.com")
        analytics = provider.analytics
        datapoints = analytics.datapoints(start_date, end_date, "newUsers", dimensions='yearMonth')
        total_app = analytics.datapoints(start_date, end_date, "newUsers")
        #result = googleAnalytics().main(sys.argv, start_date, end_date)

        members = builder.scalars("""
        select
            EXTRACT(YEAR_MONTH FROM datecreated) as the_date,
            count(id) as num_members
        from member
        where datecreated BETWEEN '{start}' AND '{end}'
        group by the_date;
        """.format(start=start_date, end=end_date))
        total_mem = builder.scalar("""
        select
            count(id) as tot_members
        from member
        where datecreated BETWEEN '{start}' AND '{end}'
        """.format(start=start_date, end=end_date))

        start_date = datetime.strptime(start_date, "%Y-%m-%d").date()
        start_date = start_date.strftime('%m-%d-%Y')

        end_date = datetime.strptime(end_date, "%Y-%m-%d").date()
        end_date = end_date.strftime('%m-%d-%Y')

        hub_data = {}

        google['analytics'] = hub_data
        google['f_date'] = start_date
        google['l_date'] = end_date


        google['total_downloads'] = int(total_app['rows'][0][0])
        google['total_members'] = total_mem
        google['page'] = "google"
        member = self.member
        google['member'] = member
        google['member_label'] = member.label
        google['badges'] = self.get_badges()
        google['recent'] = self.get_recent_searches(limit=5)
        result = datapoints['rows']

        for i in result:
            i[0] = datetime.strptime(i[0], "%Y%m").strftime('%m-%Y')

            if i[0] in hub_data:
                record = hub_data[i[0]]
            else:
                hub_data[i[0]] = copy.deepcopy(empty_record)
                record = hub_data[i[0]]
            record['downloads'] = int(i[1])
            record['month_year'] = datetime.strptime(str(i[0]), "%m-%Y").strftime('%Y-%m')

        for i in members:
            i['the_date'] = datetime.strptime(str(i['the_date']), "%Y%m").strftime('%m-%Y')

            if i['the_date'] in hub_data:
                record = hub_data[i['the_date']]
            else:
                hub_data[i['the_date']] = copy.deepcopy(empty_record)
                record = hub_data[i['the_date']]
            record['members'] = i['num_members']
            record['month_year'] = datetime.strptime(str(i['the_date']), "%m-%Y").strftime('%Y-%m')
        return self.render(google, template=Google_Report.template)



#class googleAnalytics(object):
#    # The file with the OAuth 2.0 Client details for authentication and authorization.
#    client_file = constants.WORKSPACE.file('client_secret.json')
#    CLIENT_SECRETS = client_file.uri
#
#    # A helpful message to display if the CLIENT_SECRETS file is missing.
#    MISSING_CLIENT_SECRETS_MESSAGE = '%s is missing' % CLIENT_SECRETS
#
#    # The Flow object to be used if we need to authenticate.
#    FLOW = flow_from_clientsecrets(
#        CLIENT_SECRETS,
#        scope='https://www.googleapis.com/auth/analytics.readonly',
#        redirect_uri="http://localhost:6547/oauth",
#        message=MISSING_CLIENT_SECRETS_MESSAGE
#    )
#    # A file to store the access token
#    TOKEN_FILE_NAME = 'analytics.dat'
#
#    def prepare_credentials(self, argv):
#        # Retrieve existing credendials
#        storage = Storage(self.TOKEN_FILE_NAME)
#        credentials = storage.get()
#
#        # If existing credentials are invalid and Run Auth flow
#        # the run method will store any new credentials
#        if credentials is None or credentials.invalid:
#            #parser = argparse.ArgumentParser(description=__doc__,
#            #    formatter_class=argparse.RawDescriptionHelpFormatter,
#            #    parents=[tools.argparser])
#            #flags = parser.parse_args(argv[1:])
#            #credentials = run_flow(self.FLOW, storage, flags) #run Auth Flow and store credentials
#            credentials = run(self.FLOW, storage)
#
#        return credentials
#
#    def initialize_service(self, argv):
#        # 1. Create an http object
#        http = httplib2.Http()
#
#        # 2. Authorize the http object
#        credentials = googleAnalytics.prepare_credentials(self, argv)
#        http = credentials.authorize(http)  # authorize the http object
#
#        # 3. Build the Analytics Service Object with the authorized http object
#        return build('analytics', 'v3', http=http)
#
#    def main(self, argv, start_date, end_date):
#        # Step 1. Get an analytics service object.
#        service = googleAnalytics.initialize_service(self, argv)
#
#        try:
#        # Step 2. Get the user's first profile ID.
#            profile_id = googleAnalytics.get_first_profile_id(self, service)
#
#            if profile_id:
#                # Step 3. Query the Core Reporting API.
#                results = googleAnalytics.get_results(self, service, profile_id, start_date, end_date)
#
#                # Step 4. Output the results.
#                googleAnalytics.print_results(self, results)
#
#                return(results['rows'])
#
#        except TypeError, error:
#            # Handle errors in constructing a query.
#            print ('There was an error in constructing your query : %s' % error)
#
#        except HttpError, error:
#        # Handle API errors.
#            print ('Arg, there was an API error : %s : %s' %
#               (error.resp.status, error._get_reason()))
#
#        except AccessTokenRefreshError:
#        # Handle Auth errors.
#            print ('The credentials have been revoked or expired, please re-run '
#                   'the application to re-authorize')
#
#    def get_first_profile_id(self, service):
#        # Get a list of all Google Analytics accounts for this user
#        accounts = service.management().accounts().list().execute()
#
#        if accounts.get('items'):
#            # Get the first Google Analytics account
#            firstAccountId = accounts.get('items')[0].get('id')
#
#            # Get a list of all the Web Properties for the first account
#            webproperties = service.management().webproperties().list(accountId=firstAccountId).execute()
#
#            if webproperties.get('items'):
#                # Get the first Web Property ID
#                firstWebpropertyId = webproperties.get('items')[0].get('id')
#
#                # Get a list of all Views (Profiles) for the first Web Property of the first Account
#                profiles = service.management().profiles().list(
#                    accountId=firstAccountId,
#                    webPropertyId=firstWebpropertyId).execute()
#
#                if profiles.get('items'):
#                    # return the first View (Profile) ID
#                    return profiles.get('items')[0].get('id')
#
#        return None
#
#    def get_results(self, service, profile_id, start_date, end_date):
#        # Use the Analytics Service Object to query the Core Reporting API
#        return service.data().ga().get(
#            ids='ga:' + profile_id,
#            start_date=start_date,
#            end_date=end_date,
#            dimensions='ga:date',
#            metrics='ga:pageviews').execute()
#
#    def print_results(self, results):
#        # Print data nicely for the user.
#        if results:
#            print 'First View (Profile): %s' % results.get('profileInfo').get('profileName')
#            print 'Total Visits: %s' % results.get('rows')[0][0]
#
#        else:
#            print 'No results found'