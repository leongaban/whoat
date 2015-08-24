from fusion import tools
from fusion.api.errors import *
from . import SmartView
from pyramid.view import view_config
from pyramid.response import Response


class Handlers(SmartView):
    transparent_gif = None

    # Text to iPHONE
    @view_config(route_name="send_sms_ios", request_method='POST')
    @view_config(route_name="send_sms_ios/", request_method='POST')
    def send_sms_ios(self):
        params = self.request.POST
        phone = str(params["text_app_num"])

        try:
            self.send_sms_application_ios(phone)
            return self.emit_json({"message": "success"})

        except Exception, err:
            print err
            return self.emit_json({"message": "error"})

    def send_sms_application_ios(self, phone):
        link = "https://itunes.apple.com/us/app/who-intro/id777717885"
        message = "Download Who@ from iTunes - {link}".format(link=link)
        self.ctx.sms(message, phone=phone)

    # Resend Verify Email
    @view_config(route_name="resend_verify", request_method='POST')
    def resend_verify_email(self):
        member = self.member
        self.ctx.members.resend_verify_email(member=member, email=member.username)
        value = {'result': 'success', 'message': 'Verify email resent! Check your email and click the link'}
        return self.emit_json(value)

    @view_config(route_name="view_email", request_method='GET')
    def view_email(self):
        id = self.request.matchdict["id"]
        if id.isdigit() is False:
            uuid = id
            id = self.ctx.query("SELECT ID FROM email WHERE UUID=@uuid;", uuid=uuid).scalar()
            if id is None:
                raise FusionError("The email template could not be found: uuid: {uuid}".format(uuid=uuid))

            html = self.ctx.query("SELECT HTML FROM email WHERE ID=%s;" % str(id)).scalar()
            r = Response(html)
            r.content_type = "text/html"
            return r

        if isinstance(id, int) is True or id.isdigit() is True:
            if self.member.is_whoat_admin is True:
                html = self.ctx.query("SELECT HTML FROM email WHERE ID=%s;" % str(id)).scalar()
                r = Response(html)
                r.content_type = "text/html"
                return r

        id = self.ctx.codex.decode_key(id)
        html = self.ctx.query("SELECT HTML FROM email WHERE ID=%s;" % str(id)).scalar()

        r = Response(html)
        r.content_type = "text/html"
        return r

    @view_config(route_name="beacon", request_method='GET')
    def beacon(self):
        try:
            beacon = self.request.matchdict["beacon"]
            hash = tools.hash(beacon)
            if beacon.lower().endswith(".gif"):
                beacon = beacon[:len(beacon) - 4]
            
            beacon = tools.parse_beacon(beacon)
            beacon["_hash_"] = hash
            sql = build_beacon_query(beacon)
            self.ctx.query(sql).insert()
        except:
            pass

        gif = Handlers.transparent_gif
        if gif is None:
            gif = tools.decompress(tools.unbase64("H4sIAKR/vVMC/3P3dLOwTGRkYGRoYACB////K/5kYQQxdUAESIaBidGFwRoAeBOVJyoAAAA="))
            Handlers.transparent_gif = gif

        r = Response(gif)
        r.content_type = "image/gif"
        return r

    @view_config(route_name="xform", request_method='POST')
    def xform(self):
        name = self.param("name")

        if name is None:
            name = "dunno.txt"

        ext = name.lower().split(".")
        ext = ext[len(ext) - 1]

        tmp = tools.temp_file(name)
        input_stream = self.request.body_file
        output_stream = open(tmp.uri, "wb")

        try:
            input_stream.seek(0)
        except Exception, ex:
            message = "Error seeking on input stream -> %s" % ex.message
            print message

        while True:
            #data = input_stream.read(2 << 16)
            data = input_stream.read(512)
            if not data:
                break
            output_stream.write(data)

        output_stream.flush()
        output_stream.close()

        data = None
        if ext == "xls":
            data = tools.xls_to_list(tmp)
        elif ext == "csv":
            data = tmp.read_data()
            data = tools.Text.as_latin_1(data)
            data = tools.Text.to_ascii(data)
            data = tools.csv_to_list(data)
        else:
            data = tmp.read_text()

        tmp.delete()

        if isinstance(data, basestring) is False:
            data = tools.json(data)
            r = Response(data)
            r.content_type = "application/javascript"
            return r

        r = Response(data)
        r.content_type = "text/html"
        return r


def build_beacon_query(beacon):
    if isinstance(beacon, basestring) is True:
        beacon = tools.parse_beacon(beacon)

    hash = None
    try:
        hash = beacon["_hash_"]
        beacon.pop("_hash_")
    except KeyError:
        pass

    fields = {}
    for field in beacon:
        value = beacon[field]
        fields[field] = value

    columns = "%s, DateCreated" % ",".join(fields.keys())
    values = "%s, CURRENT_TIMESTAMP" % ",".join(map(str, fields.values()))
    if hash is None:
        hash = tools.hash("%s%s" % (columns, values))

    columns = "(Hash, %s)" % columns
    values = "(%s, %s)" % (hash, values)
    sql = "INSERT INTO beacons %s VALUES %s;" % (columns, values)
    return sql