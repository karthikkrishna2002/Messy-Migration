
def success_response(data=None, message="Success", status_code=200):
    return {
        "status": "success",
        "message": message,
        "data": data
    }, status_code

def error_response(message="Something went wrong", status_code=400, errors=None):
    return {
        "status": "error",
        "message": message,
        "errors": errors
    }, status_code
