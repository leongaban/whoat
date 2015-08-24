# import os
# import sys
# from .. import settings
# modules = settings.modules
# for module in modules:
#     sys.path.append(module)

# from fusion import app
# from fusion import tools

#app.load()



# from fusion import app

# ctx = app.load()
# ctx.system.initialize()
# # if ctx.get_query("SELECT COUNT(*) FROM network WHERE TypeID=5;").scalar() == 0:
# #     execs = ctx.networks.create_firewall(label="Who@ Executives", organization=1, threshold=10)
# #     peons = ctx.networks.create_firewall(label="Who@ Peons", organization=1, threshold=1)
# #     ctx.networks.assign_gatekeeper(network=execs, member=ctx.members.get("bill@whoat.net"))
# #     ctx.networks.assign_gatekeeper(network=peons, member=ctx.members.get("bill@whoat.net"))
# #     ctx.networks.attach_network_member(network=execs, member=ctx.members.get("lee@whoat.net"))
# #     ctx.networks.attach_network_member(network=peons, member=ctx.members.get("scott@whoat.net"))
# #     ctx.networks.attach_network_member(network=peons, member=ctx.members.get("jeff@whoat.net"))
# #     ctx.networks.attach_network_member(network=peons, member=ctx.members.get("ron@whoat.net"))
# #     ctx.networks.attach_network_member(network=peons, member=ctx.members.get("leon@whoat.net"))
#
# def context():
#     return app.enter()