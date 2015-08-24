from .. import SmartView
from fusion import tools
from pyramid.view import view_config
import re


class Dashboard(SmartView):

    @view_config(route_name="dashboard", request_method="GET")
    def get(self):
        if self.bounced is True:
            return self.redirect()

        dic = {}
        newbie = self.ctx.session.newbie
        member = self.member
        progress = member.progress()
        streams = self.member.contact_streams

        dic['newbie'] = newbie
        dic['member'] = member
        dic['member_label'] = member.label
        dic['username'] = member.username

        dic['progress'] = progress
        dic['watched'] = progress['respond']
        dic['verified'] = progress['verify']
        dic['snarfed'] = progress["snarf"]
        dic['invited'] = progress["invite"]
        dic['request'] = progress['request']
        dic['alerts'] = progress["customalert"]
        dic['video1'] = progress["watchtrainingvideo1"]
        dic['video2'] = progress["watchtrainingvideo2"]
        dic['darked'] = progress["watchtrainingvideo8"]
        dic['streams'] = streams

        messages_outbox = self.ctx.messaging.outbox
        messages_outbox_total = len(messages_outbox)
        messages_outbox = messages_outbox[:3] if len(messages_outbox) > 3 else messages_outbox
        messages_inbox = self.ctx.messaging.inbox
        messages_inbox_total = len([m for m in messages_inbox])
        messages_inbox = messages_inbox[:3] if len(messages_inbox) > 3 else messages_inbox

        dic['messages_outbox'] = messages_outbox
        dic['messages_outbox_total'] = messages_outbox_total
        dic['messages_inbox'] = messages_inbox
        dic['messages_inbox_total'] = messages_inbox_total
        dic['badges'] = self.get_badges()
        dic['recent'] = self.get_recent_searches(limit=5)

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

        if self.member.is_verified is False:
            dic['verified'] = False
        else:
            dic['verified'] = True

        return self.render(dic)

    # For FTUE
    @view_config(route_name="watched_last", request_method="GET")
    def watched_last(self):
        dic = {}
        member = self.member
        progress = member.progress()
        dic['watched'] = progress['respond']

        if dic['watched'] is False:
            self.ctx.messaging.record_action("respond")

        value = {'result': 'success', 'message': 'recorded watched'}

        return self.emit_json(value)

    # DARK FTUE
    @view_config(route_name="dark_seen", request_method="GET")
    def dark_seen(self):
        dic = {}
        member = self.member
        progress = member.progress()
        dic['darked'] = progress["watchtrainingvideo8"]

        if dic['darked'] is False:
            self.ctx.messaging.record_action("watchtrainingvideo8")

        value = {'result': 'success', 'message': 'dark seen'}

        return self.emit_json(value)

    @view_config(route_name="dashboard", request_method="POST")
    def post(self):
        if self.bounced is True:
            return self.redirect()

        username, password = self.param("username"), self.param("password")
        session = self.login(username, password)
        if session is not None:
            return self.render(session)

        member = self.members.get(username)
        if member is None:
            self.warn("Invalid username.", target="username")
        else:
            self.warn("Invalid password.", target="password")

        return self.render()

    @view_config(route_name="verified_check", request_method='POST')
    def check_verified(self):
        value = {'result': 'success', 'message': 'You are verified!'}
        return self.emit_json(value)


# class Testing(SmartView):
#     @view_config(route_name="test", request_method='GET')
#     def verify_check(self):
#         template = "website/verified.mak"
#         # template = "website/no_ie8.mak"
#         dic = {}
#         return self.render(dic, template=template)


# Expand Widget
class GetWidget(SmartView):
    expand = "dashboard/widgets/expand.mak"

    @view_config(route_name="get_expand", request_method='GET')
    def get_expand(self):
        dic = {}
        member = self.member
        coworkers = self.member.coworkers
        inviteable = []
        for coworker in coworkers:
            if len(inviteable) >= 5:
                break
            if ('invited' not in coworker or coworker['invited'] is False) and 'member' not in coworker:
                inviteable.append(coworker)

        dic['coworkers'] = inviteable
        dic['coworkers_count'] = len(coworkers)
        keys = self.query("SELECT ID FROM contact WHERE MemberID=%s ORDER BY ID ASC LIMIT 4;" % str(self.member.id)).scalars()

        if len(keys) > 0:
            contact_list = []
            contacts = member.personal_contacts
            for i in contacts:
                if i['id'] in keys:
                    contact_list.append(i)
            dic["contacts"] = contact_list

        return self.render(dic, template=GetWidget.expand)


class VerifyCheck(SmartView):
    restrict_access = False
    mak_desktop = "website/auto_verified.mak"
    mak_mobile = "website/verified.mak"

    # Uses re.py to figure out mobile or desktop
    reg_b = re.compile(r"(android|bb\\d+|meego).+mobile|avantgo|bada\\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino", re.I|re.M)
    reg_v = re.compile(r"1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\\-(n|u)|c55\\/|capi|ccwa|cdm\\-|cell|chtm|cldc|cmd\\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\\-s|devi|dica|dmob|do(c|p)o|ds(12|\\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\\-|_)|g1 u|g560|gene|gf\\-5|g\\-mo|go(\\.w|od)|gr(ad|un)|haie|hcit|hd\\-(m|p|t)|hei\\-|hi(pt|ta)|hp( i|ip)|hs\\-c|ht(c(\\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\\-(20|go|ma)|i230|iac( |\\-|\\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\\/)|klon|kpt |kwc\\-|kyo(c|k)|le(no|xi)|lg( g|\\/(k|l|u)|50|54|\\-[a-w])|libw|lynx|m1\\-w|m3ga|m50\\/|ma(te|ui|xo)|mc(01|21|ca)|m\\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\\-2|po(ck|rt|se)|prox|psio|pt\\-g|qa\\-a|qc(07|12|21|32|60|\\-[2-7]|i\\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\\-|oo|p\\-)|sdk\\/|se(c(\\-|0|1)|47|mc|nd|ri)|sgh\\-|shar|sie(\\-|m)|sk\\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\\-|v\\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\\-|tdg\\-|tel(i|m)|tim\\-|t\\-mo|to(pl|sh)|ts(70|m\\-|m3|m5)|tx\\-9|up(\\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\\-|your|zeto|zte\\-", re.I|re.M)

    @classmethod
    def is_mobile(cls, request):
        request.mobile = False
        if 'HTTP_USER_AGENT' in request.headers.environ:
            user_agent = request.headers.environ['HTTP_USER_AGENT']
            b = VerifyCheck.reg_b.search(user_agent)
            v = VerifyCheck.reg_v.search(user_agent[0:4])
            if b or v:
                return True

        return False

    @view_config(route_name="verify", request_method='GET')
    def verify_check(self):

        if VerifyCheck.is_mobile(self.request):
            template = VerifyCheck.mak_mobile

        else:
            template = VerifyCheck.mak_desktop

        dic = {}

        hotlink = self.param("hotlink")
        hotlink = self.ctx.hotlinks.execute(hotlink)
        state = hotlink.state
        email = state["email"]
        # message = "Verified email address: %s" % email

        # o = {
        #     "message": message,
        #     "email": email,
        #     "redirect": tools.constants.APP_URI
        # }

        if email is not None:
            self.request.session.impersonate(email)
            session = self.ctx.session
            # self.ctx.impersonate(email)
            # session = self.ctx.session

        self.request.session.impersonate(email)
        session = self.ctx.session

        member = self.member
        dic['username'] = member.username

        try:
            contacts = session.member.state["contacts"]
            if contacts == 0:
                session.state["newbie"] = True
                session.save_state()
        except:
            pass

        #self.request.session.create_session_cookie()
        # return self.render(value=o)

        return self.render(dic, template=template)
        # return self.render(dic)


class ViewTourModal(SmartView):
    template = "modals/tour.mak"

    @view_config(route_name="show_ftue", request_method='GET')
    def show_ftue(self):
        dic = {}
        streams = self.member.contact_streams
        dic["streams"] = streams
        return self.render(dic)