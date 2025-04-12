# from flask import Flask, jsonify, request
# from flask_cors import CORS
# from pymongo import MongoClient
# from config import MONGO_URI  # 记得你有一个 config.py 存放 MONGO_URI
#
# app = Flask(__name__)
# CORS(app)  # 启用跨域支持，默认允许所有前端访问
#
# # 连接 MongoDB
# client = MongoClient(MONGO_URI)
# db = client["testdb"]         # 数据库名（你也可以改）
# collection = db["users"]      # 集合名（相当于数据表）
#
# # 首页测试接口
# @app.route("/")
# def home():
#     return "Flask + MongoDB is working!"
#
# # 获取所有用户
# @app.route("/users")
# def get_users():
#     try:
#         users = []
#         for u in collection.find():
#             u["_id"] = str(u["_id"])  # 将 ObjectId 转成字符串
#             users.append(u)
#         return jsonify(users)
#     except Exception as e:
#         return jsonify({"error": str(e)})
#
# # 注册接口
# @app.route("/register", methods=["POST"])
# def register():
#     data = request.get_json()
#
#     name = data.get("name")
#     email = data.get("email")
#
#     if not name or not email:
#         return jsonify({"error": "Name and email are required"}), 400
#
#     if collection.find_one({"email": email}):
#         return jsonify({"error": "Email already registered"}), 409
#
#     user = {"name": name, "email": email}
#     result = collection.insert_one(user)
#
#     return jsonify({
#         "message": "User registered successfully!",
#         "id": str(result.inserted_id)
#     }), 201
#
# # 登录接口
# @app.route("/login", methods=["POST"])
# def login():
#     data = request.get_json()
#     email = data.get("email")
#
#     if not email:
#         return jsonify({"error": "Email is required"}), 400
#
#     user = collection.find_one({"email": email})
#     if not user:
#         return jsonify({"error": "User not found"}), 404
#
#     return jsonify({
#         "message": "Login successful!",
#         "user": {
#             "id": str(user["_id"]),
#             "name": user.get("name"),
#             "email": user.get("email")
#         }
#     }), 200
#
# if __name__ == "__main__":
#     app.run(debug=True)
