from app import create_app
from app.config import PORT  # ✅ 从配置中读取端口

app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=PORT, debug=True)
