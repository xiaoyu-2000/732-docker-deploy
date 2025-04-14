# config.py
from pymongo import MongoClient

# 本地 Docker MongoDB 连接地址
client = MongoClient("mongodb://localhost:27017")

# 默认连接 testdb
db = client["testdb"]
