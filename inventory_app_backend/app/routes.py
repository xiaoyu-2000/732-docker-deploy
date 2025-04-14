import os

import matplotlib
import pandas as pd
matplotlib.use("Agg")  #  使用非图形界面的后端
import matplotlib.pyplot as plt
from flask import request, jsonify, session, send_file
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
from .inventory import InventoryManager
from .chart_data import ChartDataManager


def register_routes(app, db):
    user_collection = db["users"]
    inventory = InventoryManager(db)


    # 设置上传路径和允许的图片格式
    UPLOAD_FOLDER = os.path.join("static", "uploads")
    ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}
    app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

    def allowed_file(filename):
        return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

    def login_required(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            if "user_id" not in session:
                return jsonify({"error": "Unauthorized. Please login first."}), 403
            return f(*args, **kwargs)
        return decorated_function

    @app.route("/")
    def home():
        return "Flask + MongoDB Inventory App is running!"

    @app.route("/users")
    def get_users():
        users = []
        for u in user_collection.find():
            u["_id"] = str(u["_id"])
            users.append(u)
        return jsonify(users)

    @app.route("/register", methods=["POST"])
    def register():
        data = request.get_json()
        name = data.get("name")
        email = data.get("email")
        password = data.get("password")

        if not name or not email or not password:
            return jsonify({"error": "Name, email and password are required"}), 400

        if user_collection.find_one({"email": email}):
            return jsonify({"error": "Email already registered"}), 409

        hashed_pw = generate_password_hash(password, method='pbkdf2:sha256')

        user = {
            "name": name,
            "email": email,
            "password": hashed_pw
        }
        result = user_collection.insert_one(user)
        return jsonify({"message": "User registered successfully!", "id": str(result.inserted_id)}), 201

    @app.route("/login", methods=["POST"])
    def login():
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 400

        user = user_collection.find_one({"email": email})
        if not user:
            return jsonify({"error": "User not found"}), 404

        if not check_password_hash(user["password"], password):
            return jsonify({"error": "Incorrect password"}), 401

        session["user_id"] = str(user["_id"])
        session["email"] = user["email"]

        return jsonify({
            "message": "Login successful!",
            "user": {
                "id": str(user["_id"]),
                "name": user.get("name"),
                "email": user.get("email")
            }
        }), 200

    @app.route("/logout", methods=["POST"])
    def logout():
        session.clear()
        return jsonify({"message": "Logged out successfully"}), 200

    @app.route("/products", methods=["GET"])
    @login_required
    def get_products():
        return jsonify(inventory.get_all_products())

    @app.route("/products/<product_id>", methods=["GET"])
    @login_required
    def get_product_by_id(product_id):
        result, code = inventory.get_product_by_id(product_id)
        return jsonify(result), code

    @app.route("/products/<product_id>", methods=["DELETE"])
    @login_required
    def delete_product(product_id):
        result, code = inventory.delete_product(product_id)
        return jsonify(result), code

    @app.route("/products/<product_id>", methods=["PUT"])
    @login_required
    def update_product(product_id):
        name = request.form.get("name")
        sku = request.form.get("sku")
        quantity = request.form.get("quantity")
        price = request.form.get("price")

        image_url = None
        if "image" in request.files:
            file = request.files["image"]
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                save_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
                os.makedirs(os.path.dirname(save_path), exist_ok=True)
                file.save(save_path)
                image_url = f"/static/uploads/{filename}"

        update_data = {}
        if name: update_data["name"] = name
        if sku: update_data["sku"] = sku
        if quantity: update_data["quantity"] = quantity
        if price: update_data["price"] = price
        if image_url: update_data["image"] = image_url

        result, code = inventory.update_product(product_id, update_data)
        return jsonify(result), code

    @app.route("/products/add", methods=["POST"])
    @login_required
    def add_product():
        name = request.form.get("name")
        sku = request.form.get("sku")
        quantity = request.form.get("quantity", 0)
        price = request.form.get("price", 0.0)

        image_url = None
        if "image" in request.files:
            file = request.files["image"]
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                save_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
                os.makedirs(os.path.dirname(save_path), exist_ok=True)
                file.save(save_path)
                image_url = f"/static/uploads/{filename}"

        product_data = {
            "name": name,
            "sku": sku,
            "quantity": int(quantity),
            "price": float(price)
        }

        if image_url:
            product_data["image"] = image_url

        result, code = inventory.add_product(product_data)
        return jsonify(result), code

    @app.route("/upload-image", methods=["POST"])
    def upload_image():
        if "image" not in request.files:
            return jsonify({"error": "No image file provided"}), 400

        file = request.files["image"]
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            save_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
            os.makedirs(os.path.dirname(save_path), exist_ok=True)
            file.save(save_path)

            image_url = f"/static/uploads/{filename}"
            return jsonify({"image_url": image_url}), 200

        return jsonify({"error": "Invalid file type"}), 400

    #导出数据的api
    @app.route("/export-products", methods=["GET"])
    def export_products():
        products = list(db["products"].find())  # db 是你连接的 MongoDB
        for p in products:
            p["_id"] = str(p["_id"])  # 处理 ObjectId

        df = pd.DataFrame(products)
        csv_path = os.path.join(app.root_path, "..", "static", "inventory_export.csv")
        df.to_csv(csv_path, index=False)

        return send_file(csv_path, as_attachment=True)

    # 生成饼状图和柱状图的api
    @app.route("/chart/products", methods=["GET"])
    def product_chart():
        products = list(db["products"].find())

        names = [p["name"] for p in products]
        quantities = [p["quantity"] for p in products]

        # 生成柱状图
        plt.figure(figsize=(10, 5))
        plt.bar(names, quantities, color="skyblue")
        plt.title("Product Inventory - Bar Chart")
        plt.xlabel("Product")
        plt.ylabel("Quantity")
        plt.xticks(rotation=45)
        plt.tight_layout()
        bar_path = "static/charts/bar_chart.png"
        plt.savefig(bar_path)
        plt.close()

        # 生成饼状图
        plt.figure(figsize=(6, 6))
        plt.pie(quantities, labels=names, autopct="%1.1f%%", startangle=140)
        plt.title("Product Inventory - Pie Chart")
        plt.tight_layout()
        pie_path = "static/charts/pie_chart.png"
        plt.savefig(pie_path)
        plt.close()

        return jsonify({
            "bar_chart": "/" + bar_path,
            "pie_chart": "/" + pie_path
        })


    chart_data_manager = ChartDataManager(db)

    @app.route("/api/chart-data", methods=["GET"])
    @login_required
    def get_chart_data():
        data = chart_data_manager.get_inventory_data()
        return jsonify(data)
