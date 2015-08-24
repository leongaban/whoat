import os
import sys
import settings
from lib import activator
from pyramid.config import Configurator




def main(global_config, **config):
    """ This function returns a Pyramid WSGI application.
    """

    activator.activate(os.path.dirname(os.path.realpath(__file__)), [config["who.solomon"]])

    settings.cookie_name = config["session.cookie.name"]
    settings.cookie_path = config["session.cookie.path"]
    settings.cookie_timeout = int(config["session.cookie.timeout"])
    settings.cookie_secret = config["session.cookie.secret"]
    settings.cookie_secure = False
    flag = config["session.cookie.secure"]
    if flag is not None and flag.lower() == "true":
        settings.cookie_secure = True

    settings.debug_mode = True if config["debug_mode"] == "true" else __debug__

    config = Configurator(settings=config, session_factory=settings.session_factory)
    views = settings.workspace.folder("views")

    route_table = {}
    views = views.children
    views.append(settings.workspace.folder("views"))
    for view in views:
        route = view.file("routes.ini")
        if route.exists:
            txt = route.read_text()
            lines = txt.split("\n")
            for x in xrange(len(lines)):
                line = lines[x]
                line = line.strip().replace("\r", "")
                if len(line) == 0:
                    lines[x] = None
                elif line[0] == "#" or line[0] == ";":
                    lines[x] = None

            lines = [l for l in lines if l is not None]
            #lines = [l.strip() for l in lines if len(l) > 2]# and l.strip().startswith("#") is False]
            for line in lines:
                parts = line.split("=")
                if len(parts) > 1:
                    key, val = parts[0].strip(), parts[1].strip()
                    route_table[key] = (key, val)

    routes = route_table.values()
    [config.add_route(key, val) for key, val in routes]

    # routes = views.files(recursive=True, patterns="*.ini")
    # routes = [route.read_lines() for route in routes]
    # for x in xrange(len(routes)):
    #     route_list = routes[x]
    #     for route in route_list:
    #         entry = route.strip()
    #         if len(entry) == 0 or entry[0] == "#":
    #             continue
    #
    #         entry = route.split("#")[0]
    #         entry = entry.strip()
    #         parts = entry.split("=")
    #         if len(parts) == 2:
    #             key, val = parts[0].strip(), parts[1].strip()
    #             config.add_route(key, val)


    # config.include('pyramid_chameleon')
    config.include('pyramid_mako')
    config.add_static_view('static', 'static', cache_max_age=3600)
    #config.add_route('home', '/')
    config.scan()
    return config.make_wsgi_app()
