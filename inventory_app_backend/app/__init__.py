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

    # ✅ 允许跨域 + 携带 Cookie
    CORS(app, supports_credentials=True, origins=["http://localhost:3000"])

    # ✅ Secret key + Cookie 设置
    app.secret_key = os.environ.get("SECRET_KEY", "dev-secret-key")
    app.config.update(
        SESSION_COOKIE_SAMESITE="None",   # 👈 允许跨站请求发送 cookie
        SESSION_COOKIE_SECURE=True        # 👈 Cookie 仅在 https 下生效（开发时也要设置）
    )

    # ✅ 上传设置
    app.config['UPLOAD_FOLDER'] = os.path.join(os.path.dirname(__file__), '..', 'static', 'uploads')
    app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

    # ✅ MongoDB
    client = MongoClient(MONGO_URI)
    db = client["testdb"]

    # ✅ 注册路由
    register_routes(app, db)

    return app
