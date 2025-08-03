from flask import Flask, request, jsonify
from utils.error_handlers import register_error_handlers
from routes.user_routes import user_bp
from flask_cors import CORS
import sqlite3
import json
app = Flask(__name__)
CORS(app) 
app.register_blueprint(user_bp)
    
register_error_handlers(app)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5009, debug=True)