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

    # ✅ 启用 CORS 并允许携带 Cookie
    CORS(app, supports_credentials=True, origins=["http://localhost:3000"])

    # ✅ 设置 Secret Key 和 Cookie 相关配置
    app.secret_key = os.environ.get("SECRET_KEY", "dev-secret-key")
    app.config.update(
        SESSION_COOKIE_SAMESITE="None",
        SESSION_COOKIE_SECURE=True
    )

    # ✅ 设置上传目录
    app.config['UPLOAD_FOLDER'] = os.path.join(os.path.dirname(__file__), '..', 'static', 'uploads')
    app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 最大 16MB 上传限制

    # ✅ 数据库连接
    client = MongoClient(MONGO_URI)
    db = client.get_database()  # 使用 URI 中指定的数据库名

    # ✅ 注册路由并注入 db
    register_routes(app, db)

    return app
