#!/bin/bash

# 设置容器名和本地备份路径
CONTAINER_NAME=mongodb-local
DUMP_FOLDER=mongo-dump

echo "📦 Starting MongoDB data import..."

# 检查 Mongo 容器是否在运行
echo "🔍 Checking if MongoDB container is running..."
docker ps | grep $CONTAINER_NAME > /dev/null

if [ $? -ne 0 ]; then
  echo "❌ Error: Container $CONTAINER_NAME is not running."
  echo "👉 请先运行：docker compose up -d"
  exit 1
fi

# 等待 MongoDB 服务启动
echo "⏳ Waiting for MongoDB to be ready..."
until docker exec -i $CONTAINER_NAME mongosh --port 27019 --eval "db.adminCommand('ping')" > /dev/null 2>&1; do
  sleep 1
done
echo "✅ MongoDB is ready!"

# 拷贝本地 dump 文件夹到容器中
echo "📂 Copying dump folder into container..."
docker cp $DUMP_FOLDER $CONTAINER_NAME:/data/dump

# 执行导入操作（导入 testdb）
echo "🧙 Restoring MongoDB data into 'testdb'..."
docker exec -it $CONTAINER_NAME mongorestore --port 27019 --drop --db testdb /data/dump/testdb

echo "✅ MongoDB import complete! 🎉"

# 自动进入 testdb 的交互式 Mongo Shell
echo "🚪 Entering Mongo Shell and switching to 'testdb'..."
docker exec -it $CONTAINER_NAME mongorestore --port 27019 --drop --nsInclude="testdb.*" --dir=/data/dump/testdb
