import os
from flask import Flask
from flask_cors import CORS
from pymongo import MongoClient
from .config import MONGO_URI
from .routes import register_routes

def create_app():
    app = Flask(
        __name__,
        static_folder=os.path.join(os.path.dirname(__file__), '..', 'static')
    )

    # Open CORS
    CORS(app, supports_credentials=True, origins=["http://localhost:3000"])

    # Secret Key and Cookie
    app.secret_key = os.environ.get("SECRET_KEY", "dev-secret-key")
    app.config.update(
        SESSION_COOKIE_SAMESITE="None",
        SESSION_COOKIE_SECURE=True
    )

    # Upload
    app.config['UPLOAD_FOLDER'] = os.path.join(os.path.dirname(__file__), '..', 'static', 'uploads')
    app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

    # Connect to db
    client = MongoClient(MONGO_URI)
    db = client.get_database()  # Using url

    register_routes(app, db)

    return app
