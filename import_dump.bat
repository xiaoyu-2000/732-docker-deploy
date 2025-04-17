@echo off
setlocal

REM === Set variables ===
set CONTAINER_NAME=mongodb-local
set DUMP_FOLDER=mongo-dump

echo 📦 Starting MongoDB data import...

REM === Check if MongoDB container is running ===
echo 🔍 Checking if MongoDB container is running...
docker ps | findstr %CONTAINER_NAME% >nul
if errorlevel 1 (
    echo ❌ Error: Container %CONTAINER_NAME% is not running.
    echo 👉 Please run: docker compose up -d
    exit /b 1
)

REM === Wait until MongoDB service is ready ===
echo ⏳ Waiting for MongoDB to be ready...
:wait_for_mongo
docker exec -i %CONTAINER_NAME% mongosh --port 27019 --eval "db.adminCommand('ping')" >nul 2>&1
if errorlevel 1 (
    timeout /t 1 >nul
    goto wait_for_mongo
)
echo ✅ MongoDB is ready!

REM === Copy local dump folder into container ===
echo 📂 Copying dump folder into container...
docker cp %DUMP_FOLDER% %CONTAINER_NAME%:/data/dump

REM === Restore data into testdb ===
echo 🧙 Restoring MongoDB data into 'testdb'...
docker exec -it %CONTAINER_NAME% mongorestore --port 27019 --drop --nsInclude="testdb.*" --dir=/data/dump/testdb

echo ✅ MongoDB import complete! 🎉

REM === Optional: Enter Mongo Shell directly (uncomment if needed) ===
REM echo 🚪 Entering Mongo Shell and switching to 'testdb'...
REM docker exec -it %CONTAINER_NAME% mongosh mongodb://localhost:27019/testdb

endlocal
pause
