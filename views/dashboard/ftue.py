from .. import SmartView
from fusion import tools
from pyramid.view import view_config


class WhiteFtue(SmartView):
    white = "dashboard/ftue/ftue.mak"

    @view_config(route_name="white_ftue", request_method='GET')
    def white_ftue(self):
        dic = {}
        return self.render(dic, template=WhiteFtue.white)


class DarkFtue(SmartView):
    dark = "dashboard/ftue/dark.mak"
    final = "dashboard/ftue/dark_final.mak"

    @view_config(route_name="dark_ftue", request_method='GET')
    def dark_ftue(self):
        dic = {}
        return self.render(dic, template=DarkFtue.dark)

    @view_config(route_name="dark_final", request_method='GET')
    def dark_final(self):
        dic = {}
        return self.render(dic, template=DarkFtue.final)


class LoadVideo(SmartView):
    template = "dashboard/ftue/watch_video.mak"

    @view_config(route_name="get_ftue_video", request_method='GET')
    def get_ftue_video(self):
        return self.render()


class ExpandInvite(SmartView):
    invite_mak = "dashboard/ftue/invite_coworkers.mak"

    @view_config(route_name="get_ftue_invite", request_method='GET')
    def get_ftue_invite(self):
        dic = {}
        coworkers = self.member.coworkers
        dic['coworkers'] = coworkers
        dic['coworkers_count'] = len(coworkers)
        return self.render(dic, template=ExpandInvite.invite_mak)


class ExpandFriends(SmartView):
    friend_mak = "dashboard/ftue/invite_friends.mak"

    @view_config(route_name="get_ftue_friend", request_method='GET')
    def get_ftue_friend(self):
        dic = {}
        member = self.member
        keys = self.query("SELECT ID FROM contact WHERE MemberID=%s ORDER BY ID ASC LIMIT 100;" % str(self.member.id)).scalars()

        if len(keys) > 0:
            contact_list = []
            contacts = member.personal_contacts
            for i in contacts:
                if i['id'] in keys:
                    contact_list.append(i)
            dic["contacts"] = contact_list
            return self.render(dic, template=ExpandFriends.friend_mak)


class RecallScripts(SmartView):
    scripts = "dashboard/recall_scripts.mak"

    @view_config(route_name="get_scripts", request_method='GET')
    def get_scripts(self):
        dic = {}
        return self.render(dic, template=RecallScripts.scripts)