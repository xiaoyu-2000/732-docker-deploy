import os
from dotenv import load_dotenv

# ✅ 加载 settings.env 文件中的变量
dotenv_path = os.path.join(os.path.dirname(__file__), '..', 'settings.env')
load_dotenv(dotenv_path)


PORT = int(os.getenv("FLASK_RUN_PORT", 5000))


MONGO_URI = os.environ.get("MONGO_URI", "mongodb://localhost:27017/mydatabase")
