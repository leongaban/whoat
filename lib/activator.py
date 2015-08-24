import sys
from .. import settings

def activate(workspace, modules):
    if len(settings.modules) > 0:
        return

    for module in modules:
        sys.path.append(module)


    from fusion import app
    from fusion import tools
    from fusion import constants
    constants.PROJECT = "www"

    ctx = app.load()

    from session import Session

    settings.workspace = tools.folder(workspace)
    settings.session_factory = Session
    #settings.api_uri = tools.app_uri("api/v1")
    return ctx