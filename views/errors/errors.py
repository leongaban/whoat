from pyramid.view import view_config
from pyramid.httpexceptions import HTTPForbidden
from pyramid.view import notfound_view_config
from pyramid.events import subscriber, NewRequest
from pyramid.httpexceptions import HTTPFound
from .. import SmartView


class Errors(SmartView):
    NotFound = "errors/not_found.mak"
    General = "errors/general.mak"

    @notfound_view_config()
    def not_found(self):
        def render_service_not_found(self):
            error = {
                "message": "The service endpoint could not be found.",
                "code": 404
            }
            self.status_code = 500
            return self.emit_json(error)

        uri = self.uri.lower()
        if uri.endswith("/favicon.ico"):
            uri = self.request.host_url
            uri = "%s/static/favicon.ico" % uri
            #print uri
            return HTTPFound(location=uri)

        if uri.find("/api/") > -1:
            # service not found...
            return render_service_not_found(self)

        # ex = self.request.exception
        return self.render(template=Errors.NotFound)

    # @view_config(context=Exception)
    # def error_view(self):
    #     return self.render(template=Errors.General)


@subscriber(NewRequest)
def csrf_validation(event):
    request = event.request
    token = request.session.get_csrf_token()
    if token is None or token != request.session.get_csrf_token():
        raise HTTPForbidden, "CSRF token is missing or invalid"