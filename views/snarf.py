from fusion import tools
from fusion.api.errors import *
import urllib2
from . import SmartView
from pyramid.view import view_config


class Snarf(SmartView):

    @view_config(route_name="snarf", request_method="POST")
    def snarf(self):
        token = self.param("token")
        if token is not None:
            self.ctx.session_restore(token)

        member = self.member

        file = member.shared_folder.file("%s.txt" % tools.guid())
        file.parent.create()

        input_stream = self.request.body_file
        output_stream = open(file.uri, "wb")

        try:
            input_stream.seek(0)
        except Exception, ex:
            message = "Error seeking on input stream -> %s" % ex.message
            print message

        while True:
            data = input_stream.read(512)
            if not data:
                break
            output_stream.write(data)

        output_stream.flush()
        output_stream.close()
        data = file.read_text()
        file.delete()

        data = urllib2.unquote(data)
        #print data
        if data.startswith("contacts="):
            data = data[9:]
            #print data
        contacts = tools.unbase64(data)
        contacts = tools.unjson(contacts)
        self.mailer.diagnostic("The contact snarf.", member, attachment=("contacts.json", tools.json(contacts)))
        return self.render()