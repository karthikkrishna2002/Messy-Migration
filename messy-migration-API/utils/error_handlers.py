
from flask import jsonify
from werkzeug.exceptions import HTTPException
from utils.response import error_response

def register_error_handlers(app):
    @app.errorhandler(HTTPException)
    def handle_http_exception(e):
        """Handles Flask HTTP exceptions (404, 400, etc.)"""
        return error_response(message=e.description, status_code=e.code)

    @app.errorhandler(400)
    def handle_bad_request(e):
        return error_response(message="Bad Request", status_code=400)

    @app.errorhandler(404)
    def handle_not_found(e):
        return error_response(message="Resource not found", status_code=404)

    @app.errorhandler(405)
    def handle_method_not_allowed(e):
        return error_response(message="Method Not Allowed", status_code=405)

    @app.errorhandler(500)
    def handle_internal_error(e):
        return error_response(message="Internal Server Error", status_code=500)

    @app.errorhandler(Exception)
    def handle_generic_exception(e):
        """Handles any uncaught exceptions"""
        return error_response(message="Unhandled exception", status_code=500, errors=str(e))
