# Hi there! This is my Inventory Management Flask APP (Docker-Based)

This project is a fully containerized inventory management system that includes:

- ✅ React Frontend (served by Nginx)
- ✅ Flask Backend API (RESTful)
- ✅ MongoDB Database

## Which means
> You don't need to install Node.js, Python, pip, or MongoDB!
>
> With Docker installed, you can run the entire system with a single command.

---

## 📦 Prerequisites

### 0️⃣ Install Docker Desktop

If you haven’t installed Docker yet:

- **Windows**: https://www.docker.com/products/docker-desktop  
- **macOS**: https://www.docker.com/products/docker-desktop

Once installed, open Docker Desktop and make sure it’s **running**.

---

## 🚀 Getting Started

### 1️⃣ Clone this repository

```bash
git clone https://github.com/xiaoyu-2000/732-docker-deploy.git
cd 732-docker-deploy
```


### 2️⃣ Start all services (frontend, backend, and MongoDB)

```bash
docker compose up --build
```

This will:
- Build the frontend (React)
- Build the backend (Flask)
- Start MongoDB
- Launch everything in connected containers


### 3️⃣ (Optional - First Time Only) Import MongoDB Data
> When you run the project for the first time, the data in the database is not automatically loaded into the backend due to the volume being mounted before the MongoDB container finishes initializing. So you need to import the sample data.

> First: Open a new terminal and navigate to the root directory of the project. For example:
```bash
cd ~/Desktop/732-docker-deploy
```
> Then, you need to import sample data, run the following script:
```bash
./import_dump.sh
```
This will:
- Copy the dump folder into the MongoDB container
- Restore the `testdb` database inside the container

You only need to do this **once** on a fresh setup.

---

## 🌐 System Access

| Service       | Address                  |
|---------------|--------------------------|
| Frontend UI   | http://localhost:3000    |
| Backend API   | http://localhost:5000    |
| MongoDB (URI) | mongodb://localhost:27017 |

---

## 🛑 Stop the System

To stop all running services:

- Press `Ctrl + C` in the terminal
- Or use:

```bash
docker compose down
```

---
