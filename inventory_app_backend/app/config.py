import os

# 优先使用 docker-compose 提供的环境变量，否则默认本地开发
MONGO_URI = os.environ.get("MONGO_URI", "mongodb://localhost:27017/testdb")
